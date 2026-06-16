const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const db = require('./db');
const { setAuthCookie, clearAuthCookie, requireAuth, optionalAuth } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Uploads ──────────────────────────────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `avatar_${req.userId}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(path.join(__dirname, 'public')));

// ── Validation helpers ───────────────────────────────────────────────────────
const USERNAME_RE = /^[a-zA-Z0-9_-]{3,24}$/;
const RESERVED = new Set([
  'admin', 'api', 'dashboard', 'login', 'logout', 'signup',
  'register', 'settings', 'profile', 'user', 'users', 'static',
  'uploads', 'assets', 'css', 'js', 'img', 'cxt', 'support',
  'help', 'about', 'home', 'index', 'null', 'undefined', 'me'
]);

const isValidUsername = (u) => USERNAME_RE.test(u) && !RESERVED.has(u.toLowerCase());

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password_hash, email, ...safe } = user;
  try { safe.social_links = JSON.parse(safe.social_links); } catch { safe.social_links = []; }
  safe.total_users = db.getTotalUsers();
  return safe;
};

// ── API: Auth ────────────────────────────────────────────────────────────────

// Check username availability
app.get('/api/check/:username', (req, res) => {
  const { username } = req.params;
  if (!isValidUsername(username)) {
    return res.json({ available: false, reason: 'Invalid username' });
  }
  const existing = db.getUserByUsername(username);
  res.json({ available: !existing });
});

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  if (!isValidUsername(username))
    return res.status(400).json({ error: 'Username must be 3–24 characters, letters, numbers, _ or - only' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email address' });

  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' });

  if (db.getUserByUsername(username))
    return res.status(409).json({ error: 'That username is already taken' });

  if (db.getUserByEmail(email))
    return res.status(409).json({ error: 'That email is already registered' });

  try {
    const hash = await bcrypt.hash(password, 12);
    const { id, uid } = db.createUser(username, email, hash);
    setAuthCookie(res, { id });
    res.status(201).json({ ok: true, username, uid });
  } catch (err) {
    // Handle race-condition duplicate
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'That username is already taken' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'All fields are required' });

  const user = db.getUserByUsername(username) ?? db.getUserByEmail(username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  setAuthCookie(res, { id: user.id });
  res.json({ ok: true, username: user.username });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

// ── API: Me ──────────────────────────────────────────────────────────────────

app.get('/api/me', requireAuth, (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(sanitizeUser(user));
});

app.patch('/api/me', requireAuth, (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const current = sanitizeUser(user);

  const allowed_themes = ['glass', 'neon', 'minimal', 'dark', 'gradient'];
  const allowed_bg_types = ['color', 'gradient', 'image'];

  const data = {
    display_name: (req.body.display_name ?? current.display_name).slice(0, 50),
    bio: (req.body.bio ?? current.bio).slice(0, 200),
    avatar_url: req.body.avatar_url ?? current.avatar_url,
    theme: allowed_themes.includes(req.body.theme) ? req.body.theme : current.theme,
    bg_type: allowed_bg_types.includes(req.body.bg_type) ? req.body.bg_type : current.bg_type,
    bg_value: (req.body.bg_value ?? current.bg_value).slice(0, 200),
    accent_color: /^#[0-9a-fA-F]{6}$/.test(req.body.accent_color) ? req.body.accent_color : current.accent_color,
    social_links: Array.isArray(req.body.social_links) ? req.body.social_links.slice(0, 20) : current.social_links
  };

  db.updateUser(req.userId, data);
  res.json({ ok: true });
});

// Avatar upload
app.post('/api/me/avatar', requireAuth, (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const avatarUrl = `/uploads/${req.file.filename}`;

    // Update user record
    const user = db.getUserById(req.userId);
    const current = sanitizeUser(user);
    db.updateUser(req.userId, { ...current, avatar_url: avatarUrl });

    res.json({ ok: true, url: avatarUrl });
  });
});

// Change password
app.post('/api/me/password', requireAuth, async (req, res) => {
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password)
    return res.status(400).json({ error: 'Both fields required' });

  if (new_password.length < 8)
    return res.status(400).json({ error: 'New password must be at least 8 characters' });

  const user = db.getUserById(req.userId);
  const valid = await bcrypt.compare(current_password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

  const hash = await bcrypt.hash(new_password, 12);
  db.changePassword(req.userId, hash);
  res.json({ ok: true });
});

// ── API: Public user ─────────────────────────────────────────────────────────

app.get('/api/users/:username', (req, res) => {
  const user = db.getUserByUsername(req.params.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  db.incrementViews(req.params.username);
  res.json(sanitizeUser(user));
});

// Stats
app.get('/api/stats', (req, res) => {
  res.json({ total_users: db.getTotalUsers() });
});

// ── Page routes ──────────────────────────────────────────────────────────────

const PUBLIC_DIR = path.join(__dirname, 'public');

app.get('/', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'dashboard.html')));

// User profile — must be last
app.get('/:username', (req, res, next) => {
  const { username } = req.params;
  if (!USERNAME_RE.test(username)) return next();
  const user = db.getUserByUsername(username);
  if (!user) return res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
  res.sendFile(path.join(PUBLIC_DIR, 'profile.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`cxt.lol running at http://localhost:${PORT}`);
});
