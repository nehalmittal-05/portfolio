import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import connectDB, { getDbStatus } from './config/db.js';

import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure server/.env is loaded reliably regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize MongoDB connection
connectDB();

// Configure CORS using CLIENT_URL environment variable
const allowedOriginEnv = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = allowedOriginEnv.split(',').map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, postman, server-to-server)
    if (!origin) return callback(null, true);

    // Allow all local dev servers (localhost and 127.0.0.1 on any port)
    const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

    // Allow Vercel preview and production domains (*.vercel.app)
    let isVercel = false;
    try {
      const url = new URL(origin);
      isVercel = url.hostname.endsWith('.vercel.app');
    } catch {
      isVercel = false;
    }

    if (isLocalhost || isVercel || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }

    // Safely reject unauthorized origins without throwing an unhandled exception
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Disposition'],
};

app.use(cors(corsOptions));

// Body parsing with safe size limits to prevent memory exhaustion
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Logging middleware in development
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Ensure database connection is ready for incoming requests (vital for serverless cold starts)
app.use('/api', async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err) {
      console.warn('MongoDB connection middleware notice:', err.message);
    }
  }
  next();
});

// Global API rate limiting
app.use('/api', apiRateLimiter);

/**
 * @route   GET /api/health
 * @desc    System and database health check route
 * @access  Public
 */
app.get('/api/health', (req, res) => {
  const db = getDbStatus();
  return res.status(200).json({
    status: 'ok',
    service: 'MERN Portfolio Backend API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: db.connected,
      readyState: db.readyState,
      host: db.host,
      name: db.name,
      mode: db.mode,
      hasUri: db.hasUri,
      lastError: db.lastError,
    },
  });
});

// Mount modular API routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/resume', resumeRoutes);

// Direct shortcut route for /api/portfolio-data
app.use('/api', portfolioRoutes);

// Catch undefined 404 routes under /api
app.use('/api/*', notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 MERN Portfolio Server active on port ${PORT}`);
  console.log(`📡 Health Check:  http://localhost:${PORT}/api/health`);
  console.log(`📬 Contact API:   http://localhost:${PORT}/api/contact`);
  console.log(`📁 Portfolio API: http://localhost:${PORT}/api/portfolio-data`);
  console.log(`🌐 Allowed CORS:  ${allowedOriginEnv}`);
  console.log(`=================================================\n`);
});

export default app;
