import 'dotenv/config';
import express from 'express';
import { pathToFileURL } from 'node:url';
import { seedDatabase } from './seed.js';
import { citiesRouter } from './routes/cities.js';
import { emergencyRouter } from './routes/emergency.js';

export function createApp() {
  seedDatabase();
  const app = express();
  const allowedOrigins = new Set(
    (process.env.CLIENT_ORIGINS ?? process.env.CLIENT_ORIGIN ?? 'http://localhost:3000,https://hey-revisit.vercel.app/')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
  app.use(express.json());
  app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && allowedOrigins.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRouter);
  app.use('/api/cities', citiesRouter);
  app.use('/api/emergency-units', emergencyRouter);
  return app;
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const port = Number(process.env.PORT ?? 3001);
  createApp().listen(port, () => {
    console.log(`Traffic control API listening on http://localhost:${port}`);
  });
}
