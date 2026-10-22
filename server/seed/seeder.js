import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Timeline from '../models/Timeline.js';
import Certificate from '../models/Certificate.js';
import Contact from '../models/Contact.js';
import { seedProjects, seedSkills, seedTimeline, seedCertificates } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config();

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set in server/.env');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('Connected! Purging old portfolio collections...');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Timeline.deleteMany({});
    await Certificate.deleteMany({});
    await Contact.deleteMany({});

    console.log('Inserting seed collections...');
    await Project.insertMany(seedProjects);
    await Skill.insertMany(seedSkills);
    await Timeline.insertMany(seedTimeline);
    await Certificate.insertMany(seedCertificates);

    console.log('🎉 Seeding successfully completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
