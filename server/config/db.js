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
 */
export const connectDB = async () => {
  // Reuse existing connection in serverless warm invocations
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n⚠️  Notice: MONGODB_URI environment variable is not defined in server/.env.');
    console.warn('💡 The server is running with standby memory storage for contact messages.');
    console.warn('   To connect to a live MongoDB database:');
    console.warn('   1. Create a free cluster on MongoDB Atlas (https://www.mongodb.com/atlas)');
    console.warn('   2. Add MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mern_portfolio to server/.env\n');
    isConnected = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000, // 8-second timeout for cloud Atlas connections
    });

    isConnected = true;
    console.log(`\n✨ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Auto-seed collections if empty
    await autoSeedIfEmpty();
  } catch (error) {
    isConnected = false;
    console.warn(`\n⚠️  Notice: MongoDB connection failed: ${error.message}`);
    console.warn('💡 The Express server will continue running smoothly.');
    console.warn('   - GET endpoints will serve structured portfolio data.');
    console.warn('   - POST /api/contact will safely queue messages in server memory.');
    console.warn('   - Check server/.env to ensure your MONGODB_URI is correct and reachable.\n');
  }
};

// Listen to Mongoose connection lifecycle events
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('🟢 Mongoose connection state: CONNECTED');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('🔴 Mongoose connection state: DISCONNECTED');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
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
});

export default connectDB;
