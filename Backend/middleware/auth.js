import { createHash, randomBytes } from 'node:crypto';
import { db } from '../database.js';

const SESSION_COOKIE = 'traffic_session';
const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 7;

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

function readCookie(header = '') {
  const match = header.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function cookieOptions(req) {
  const secure = req.get('origin')?.startsWith('https://') ?? process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    maxAge: SESSION_LIFETIME_MS,
    path: '/',
  };
}

export function createSession(req, res, userId) {
  const token = randomBytes(32).toString('base64url');
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(Date.now());
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .run(hashToken(token), userId, Date.now() + SESSION_LIFETIME_MS);
  res.cookie(SESSION_COOKIE, token, cookieOptions(req));
}

export function clearSession(req, res) {
  const token = readCookie(req.get('cookie'));
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(token));
  res.clearCookie(SESSION_COOKIE, cookieOptions(req));
}

export function requireAuth(req, res, next) {
  const token = readCookie(req.get('cookie'));
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  const session = db.prepare(`
    SELECT users.id, users.name, users.email
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?
  `).get(hashToken(token), Date.now());
  if (!session) return res.status(401).json({ message: 'Session expired. Please sign in again.' });
  req.user = session;
  next();
}
