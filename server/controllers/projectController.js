import Project from '../models/Project.js';
import { getDbStatus } from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { category, search } = req.query;
    const db = getDbStatus();

    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available. Projects cannot be retrieved.',
        data: [],
      });
    }

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error in getProjects:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const db = getDbStatus();

    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is not available.',
      });
    }

    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const db = getDbStatus();
    if (!db.connected) {
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable for write operations.',
      });
    }

    const newProject = new Project(req.body);
    const saved = await newProject.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
