import { Router } from 'express';
import { db } from '../database.js';
import { createRoutingPlan } from '../services/routingService.js';

const readCity = (row) => JSON.parse(row.payload);
export const citiesRouter = Router();

citiesRouter.get('/', (_req, res) => {
  const rows = db.prepare('SELECT payload FROM cities ORDER BY name').all();
  res.json(rows.map(readCity));
});

citiesRouter.get('/:id', (req, res) => {
  const row = db.prepare('SELECT payload FROM cities WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'City not found' });
  res.json(readCity(row));
});

citiesRouter.get('/:id/routing-plan', (req, res) => {
  const cityRow = db.prepare('SELECT payload FROM cities WHERE id = ?').get(req.params.id);
  if (!cityRow) return res.status(404).json({ message: 'City not found' });

  const savedPlan = db.prepare('SELECT payload FROM routing_plans WHERE city_id = ?').get(req.params.id);
  if (savedPlan) return res.json(JSON.parse(savedPlan.payload));

  const plan = createRoutingPlan(readCity(cityRow));
  db.prepare('INSERT INTO routing_plans (city_id, payload) VALUES (?, ?)')
    .run(req.params.id, JSON.stringify(plan));
  res.json(plan);
});

citiesRouter.post('/:id/routing-plan/activate', (req, res) => {
  const row = db.prepare('SELECT payload FROM routing_plans WHERE city_id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Routing plan not found. Request it first.' });

  const plan = JSON.parse(row.payload);
  plan.status = 'active';
  plan.activatedAt = new Date().toISOString();
  db.prepare('UPDATE routing_plans SET payload = ?, updated_at = CURRENT_TIMESTAMP WHERE city_id = ?')
    .run(JSON.stringify(plan), req.params.id);
  res.json(plan);
});
