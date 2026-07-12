import { Router } from 'express';
import { db } from '../database.js';

export const emergencyRouter = Router();

emergencyRouter.get('/:id', (req, res) => {
  const row = db.prepare('SELECT payload FROM emergency_units WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Emergency unit not found' });
  res.json(JSON.parse(row.payload));
});
