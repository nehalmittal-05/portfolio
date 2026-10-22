import Skill from '../models/Skill.js';
import Timeline from '../models/Timeline.js';
import Certificate from '../models/Certificate.js';
import Project from '../models/Project.js';
import { getDbStatus } from '../config/db.js';
import { profileInfo } from '../seed/seedData.js';

export const getPortfolioData = async (req, res) => {
  try {
    const db = getDbStatus();

    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available. Live portfolio data cannot be retrieved.',
        data: null,
      });
    }

    const [projects, skills, timeline, certificates] = await Promise.all([
      Project.find().sort({ order: 1 }),
      Skill.find().sort({ order: 1 }),
      Timeline.find().sort({ order: 1 }),
      Certificate.find().sort({ order: 1 }),
    ]);

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
    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available.',
      });
    }

    const skills = await Skill.find().sort({ order: 1 });

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
    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available.',
      });
    }

    let query = {};
    if (type) query.type = type;
    const timeline = await Timeline.find(query).sort({ order: 1 });

    return res.json({ success: true, count: timeline.length, data: timeline });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const db = getDbStatus();
    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available.',
      });
    }

    const certificates = await Certificate.find().sort({ order: 1 });
    return res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
