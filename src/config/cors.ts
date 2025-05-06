import { FastifyCorsOptions } from '@fastify/cors';

/**
 * Define environment-specific allowed origins.
 * You can expand or conditionally load these based on NODE_ENV or other env vars.
 */
const allowedOrigins: string[] = [
  'http://localhost:5173', // Local Vite dev
  'https://www.rollforlanguage.com', // Production frontend
  'https://bug-free-parakeet-x5p69xpg56qvfvvx5-4000.app.github.dev', // Frontend Codespaces
  'https://bug-free-parakeet-x5p69xpg56qvfvvx5-4001.app.github.dev',
  // Future: add staging, admin panel, mobile app domains here
];

/**
 * Build the main CORS options object.
 * We handle preflight, allowed methods, credentials, and origin validation.
 */
export const corsOptions: FastifyCorsOptions = {
  origin: (origin, cb) => {
    if (!origin) {
      // Allow requests with no origin (e.g., curl, Postman)
      cb(null, true);
    } else if (allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error(`Not allowed by CORS: ${origin}`), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // Add any exposed headers you want
  credentials: true,
  maxAge: 86400, // Cache preflight response for 1 day
  preflightContinue: false, // Let Fastify auto-handle OPTIONS
};
