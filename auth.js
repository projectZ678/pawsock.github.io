const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cxt-lol-secret-change-in-production-2024';
const COOKIE_NAME = 'cxt_session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

const setAuthCookie = (res, payload) => {
  const token = signToken(payload);
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  return token;
};

const clearAuthCookie = (res) => {
  res.clearCookie(COOKIE_NAME);
};

// Middleware: requires valid session
const requireAuth = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid session' });

  req.userId = payload.id;
  next();
};

// Middleware: attaches user if logged in, otherwise null
const optionalAuth = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    const payload = verifyToken(token);
    if (payload) req.userId = payload.id;
  }
  next();
};

module.exports = {
  signToken,
  verifyToken,
  setAuthCookie,
  clearAuthCookie,
  requireAuth,
  optionalAuth,
  COOKIE_NAME
};
