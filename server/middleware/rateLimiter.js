import rateLimit from 'express-rate-limit';

/**
 * Contact Submission Rate Limiter
 * Limits incoming POST requests to /api/contact to prevent automated spam and flooding.
 * Allows a maximum of 5 submissions per IP every 15 minutes.
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many contact requests from this IP address. Please wait 15 minutes before sending another message.',
    retryAfterMinutes: 15,
  },
  statusCode: 429,
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json(options.message);
  },
});

/**
 * General API Rate Limiter
 * Protects health and general endpoints from excessive request spikes (100 req / 15 min).
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down and try again later.',
  },
  statusCode: 429,
});
