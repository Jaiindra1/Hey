import 'dotenv/config';
import express from 'express';
import { pathToFileURL } from 'node:url';

import { seedDatabase } from './seed.js';
import { citiesRouter } from './routes/cities.js';
import { emergencyRouter } from './routes/emergency.js';
import { authRouter } from './routes/auth.js';

export function createApp() {
  seedDatabase();

  const app = express();

  // Allowed origins
  const allowedOrigins = (
    process.env.CLIENT_ORIGINS ||
    process.env.CLIENT_ORIGIN ||
    'http://localhost:3000,https://hey-revisit.vercel.app'
  )
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, '')); // Remove trailing slash

  app.use(express.json());

  app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin) {
      const normalizedOrigin = origin.replace(/\/$/, '');

      if (allowedOrigins.includes(normalizedOrigin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Vary', 'Origin');
        res.header('Access-Control-Allow-Credentials', 'true');
      }
    }

    res.header(
      'Access-Control-Allow-Methods',
      'GET,POST,PATCH,PUT,DELETE,OPTIONS'
    );

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      environment: process.env.NODE_ENV,
    });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/cities', citiesRouter);
  app.use('/api/emergency-units', emergencyRouter);

  return app;
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const port = Number(process.env.PORT || 3001);

  createApp().listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}
