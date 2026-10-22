import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', createProject);

export default router;
