import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';
import { contactValidationRules, validateContactInput } from '../middleware/contactValidator.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact message with rate limiting and validation/sanitization
 */
router.post(
  '/',
  contactRateLimiter,
  contactValidationRules,
  validateContactInput,
  submitContact
);

/**
 * @route   GET /api/contact
 * @desc    Retrieve submitted contact inquiries
 */
router.get('/', getContacts);

export default router;
