import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Timeline from '../models/Timeline.js';
import Certificate from '../models/Certificate.js';
import { seedProjects, seedSkills, seedTimeline, seedCertificates } from '../seed/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure server/.env is loaded reliably
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config();

let isConnected = false;
let connectionPromise = null;
let lastConnectionError = null;

/**
 * Auto-seed initial portfolio collections if empty upon successful MongoDB connection
 */
export const autoSeedIfEmpty = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('🌱 MongoDB database is empty. Seeding initial portfolio data...');
      await Project.insertMany(seedProjects);
      await Skill.insertMany(seedSkills);
      await Timeline.insertMany(seedTimeline);
      await Certificate.insertMany(seedCertificates);
      console.log('✅ Initial portfolio collections seeded successfully!');
    } else {
      console.log(`📦 MongoDB already contains ${projectCount} project documents.`);
    }
  } catch (err) {
    console.error('⚠️ Notice during initial collection seeding:', err.message);
  }
};

/**
 * Connect to MongoDB using the MONGODB_URI environment variable
 * Designed for serverless environments with cached connection promise
 */
export const connectDB = async () => {
  // Reuse existing connection in serverless warm invocations
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    lastConnectionError = null;
    return mongoose.connection;
  }

  // Reuse existing connection attempt in progress
  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  if (!uri) {
    console.warn('\n⚠️  Notice: MONGODB_URI environment variable is not defined.');
    console.warn('💡 The server is running with standby memory storage for contact messages.');
    isConnected = false;
    lastConnectionError = 'MONGODB_URI environment variable is not defined.';
    return null;
  }

  connectionPromise = (async () => {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000, // 5-second timeout for cloud Atlas connections
      });

      isConnected = true;
      lastConnectionError = null;
      console.log(`\n✨ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);

      // Auto-seed collections if empty in background
      autoSeedIfEmpty().catch(() => {});
      return conn;
    } catch (error) {
      isConnected = false;
      lastConnectionError = error.message;
      console.warn(`\n⚠️  Notice: MongoDB connection failed: ${error.message}`);
      return null;
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
};

// Listen to Mongoose connection lifecycle events
mongoose.connection.on('connected', () => {
  isConnected = true;
  lastConnectionError = null;
  console.log('🟢 Mongoose connection state: CONNECTED');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('🔴 Mongoose connection state: DISCONNECTED');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  lastConnectionError = err.message;
  console.error('❌ Mongoose connection error:', err.message);
});

/**
 * Returns current database connection status
 */
export const getDbStatus = () => ({
  connected: isConnected && mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || null,
  name: mongoose.connection.name || null,
  mode: isConnected && mongoose.connection.readyState === 1 ? 'MongoDB Live' : 'Standby Memory Queue',
  hasUri: Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim()),
  lastError: lastConnectionError,
});

export default connectDB;
