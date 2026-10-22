import express from 'express';
import {
  getPortfolioData,
  getSkills,
  getTimeline,
  getCertificates,
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/portfolio-data', getPortfolioData);
router.get('/skills', getSkills);
router.get('/timeline', getTimeline);
router.get('/certificates', getCertificates);

export default router;
