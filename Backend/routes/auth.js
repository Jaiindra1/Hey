import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { db } from '../database.js';
import { clearSession, createSession, requireAuth } from '../middleware/auth.js';

export const authRouter = Router();

function safeUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

authRouter.post('/signup', async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ message: 'Name, email, and a password of at least 8 characters are required.' });
    }
    if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }
    const user = { id: randomUUID(), name, email };
    const passwordHash = await bcrypt.hash(password, 12);
    db.prepare('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)')
      .run(user.id, user.name, user.email, passwordHash);
    createSession(req, res, user.id);
    res.status(201).json({ user: safeUser(user) });
  } catch (error) { next(error); }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const user = email && db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !password || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }
    createSession(req, res, user.id);
    res.json({ user: safeUser(user) });
  } catch (error) { next(error); }
});

authRouter.get('/me', requireAuth, (req, res) => res.json({ user: safeUser(req.user) }));
authRouter.post('/logout', (req, res) => {
  clearSession(req, res);
  res.status(204).end();
});
