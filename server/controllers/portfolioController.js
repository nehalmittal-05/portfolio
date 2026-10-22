import Skill from '../models/Skill.js';
import Timeline from '../models/Timeline.js';
import Certificate from '../models/Certificate.js';
import Project from '../models/Project.js';
import { getDbStatus } from '../config/db.js';
import {
  profileInfo,
  seedSkills,
  seedTimeline,
  seedCertificates,
  seedProjects,
} from '../seed/seedData.js';

export const getPortfolioData = async (req, res) => {
  try {
    const db = getDbStatus();

    let projects = seedProjects;
    let skills = seedSkills;
    let timeline = seedTimeline;
    let certificates = seedCertificates;

    if (db.connected) {
      try {
        const [dbProjects, dbSkills, dbTimeline, dbCerts] = await Promise.all([
          Project.find().sort({ order: 1 }),
          Skill.find().sort({ order: 1 }),
          Timeline.find().sort({ order: 1 }),
          Certificate.find().sort({ order: 1 }),
        ]);

        if (dbProjects.length > 0) projects = dbProjects;
        if (dbSkills.length > 0) skills = dbSkills;
        if (dbTimeline.length > 0) timeline = dbTimeline;
        if (dbCerts.length > 0) certificates = dbCerts;
      } catch (queryErr) {
        console.warn('Notice querying Mongo collections, falling back to seed:', queryErr.message);
      }
    }

    // Group skills by the required 5 categories
    const groupedSkills = {
      Frontend: skills.filter((s) => s.category === 'Frontend'),
      Backend: skills.filter((s) => s.category === 'Backend'),
      'Programming Languages': skills.filter((s) => s.category === 'Programming Languages'),
      Databases: skills.filter((s) => s.category === 'Databases'),
      'Tools & Technologies': skills.filter((s) => s.category === 'Tools & Technologies'),
    };

    return res.json({
      success: true,
      data: {
        profile: profileInfo,
        projects,
        skills: groupedSkills,
        rawSkills: skills,
        timeline,
        certificates,
        dbStatus: db,
      },
    });
  } catch (error) {
    console.error('Error in getPortfolioData:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSkills = async (req, res) => {
  try {
    const db = getDbStatus();
    let skills = seedSkills;

    if (db.connected) {
      const dbSkills = await Skill.find().sort({ order: 1 });
      if (dbSkills.length > 0) skills = dbSkills;
    }

    const grouped = {
      Frontend: skills.filter((s) => s.category === 'Frontend'),
      Backend: skills.filter((s) => s.category === 'Backend'),
      'Programming Languages': skills.filter((s) => s.category === 'Programming Languages'),
      Databases: skills.filter((s) => s.category === 'Databases'),
      'Tools & Technologies': skills.filter((s) => s.category === 'Tools & Technologies'),
    };

    return res.json({ success: true, data: grouped });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTimeline = async (req, res) => {
  try {
    const { type } = req.query;
    const db = getDbStatus();
    let timeline = seedTimeline;

    if (db.connected) {
      let query = {};
      if (type) query.type = type;
      timeline = await Timeline.find(query).sort({ order: 1 });
    } else if (type) {
      timeline = timeline.filter((t) => t.type === type);
    }

    return res.json({ success: true, count: timeline.length, data: timeline });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const db = getDbStatus();
    let certificates = seedCertificates;

    if (db.connected) {
      certificates = await Certificate.find().sort({ order: 1 });
    }

    return res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
