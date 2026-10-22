import { body, validationResult } from 'express-validator';

/**
 * Validation and sanitization rules for POST /api/contact
 */
export const contactValidationRules = [
  // 1. Anti-spam honeypot check (hidden field)
  body('website')
    .optional()
    .custom((val) => {
      if (val && val.trim().length > 0) {
        throw new Error('Bot detected via honeypot.');
      }
      return true;
    }),

  // 2. Name validation and sanitization
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters long.')
    .escape(),

  // 3. Email validation and normalization
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address (e.g. name@domain.com).')
    .normalizeEmail(),

  // 4. Optional subject validation
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Subject cannot exceed 150 characters.')
    .escape(),

  // 5. Message validation and sanitization
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message content is required.')
    .bail()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters long.')
    .escape(),
];

/**
 * Middleware to check validation results and return formatted HTTP 400 response
 */
export const validateContactInput = (req, res, next) => {
  // Validate request body exists
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request: Request body cannot be empty.',
    });
  }

  // Honeypot check
  if (req.body.website && req.body.website.trim().length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Automated submission rejected.',
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMap = {};
    errors.array().forEach((err) => {
      if (!errorMap[err.path]) {
        errorMap[err.path] = err.msg;
      }
    });

    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // First human-readable error message
      errors: errorMap,
    });
  }

  next();
};
