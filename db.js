const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'cxt.db'));

// Enable WAL mode for performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Init schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    uid           INTEGER UNIQUE NOT NULL,
    username      TEXT UNIQUE NOT NULL COLLATE NOCASE,
    email         TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    display_name  TEXT NOT NULL DEFAULT '',
    bio           TEXT NOT NULL DEFAULT '',
    avatar_url    TEXT NOT NULL DEFAULT '',
    theme         TEXT NOT NULL DEFAULT 'glass',
    bg_type       TEXT NOT NULL DEFAULT 'color',
    bg_value      TEXT NOT NULL DEFAULT '#0a0a14',
    accent_color  TEXT NOT NULL DEFAULT '#7c3aed',
    social_links  TEXT NOT NULL DEFAULT '[]',
    views         INTEGER NOT NULL DEFAULT 0,
    created_at    INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS counters (
    key   TEXT PRIMARY KEY,
    value INTEGER NOT NULL DEFAULT 0
  );

  INSERT OR IGNORE INTO counters (key, value) VALUES ('total_users', 0);
`);

// ── Prepared statements ──────────────────────────────────────────────────────

const stmts = {
  createUser: db.prepare(`
    INSERT INTO users (uid, username, email, password_hash, display_name)
    VALUES (?, ?, ?, ?, ?)
  `),

  incrementCounter: db.prepare(`
    UPDATE counters SET value = value + 1 WHERE key = ?
  `),

  getCounter: db.prepare(`
    SELECT value FROM counters WHERE key = ?
  `),

  getUserByUsername: db.prepare(`
    SELECT * FROM users WHERE username = ? COLLATE NOCASE
  `),

  getUserByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ? COLLATE NOCASE
  `),

  getUserById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),

  updateUser: db.prepare(`
    UPDATE users
    SET display_name = ?, bio = ?, avatar_url = ?, theme = ?,
        bg_type = ?, bg_value = ?, accent_color = ?, social_links = ?
    WHERE id = ?
  `),

  changePassword: db.prepare(`
    UPDATE users SET password_hash = ? WHERE id = ?
  `),

  incrementViews: db.prepare(`
    UPDATE users SET views = views + 1 WHERE username = ? COLLATE NOCASE
  `),

  getTotalUsers: db.prepare(`
    SELECT value FROM counters WHERE key = 'total_users'
  `),

  getAllUsers: db.prepare(`
    SELECT id, uid, username, display_name, avatar_url, views, created_at
    FROM users ORDER BY uid ASC
  `)
};

// ── Helper functions ─────────────────────────────────────────────────────────

const createUser = db.transaction((username, email, passwordHash) => {
  stmts.incrementCounter.run('total_users');
  const uid = stmts.getCounter.get('total_users').value;
  const result = stmts.createUser.run(uid, username, email, passwordHash, username);
  return { id: result.lastInsertRowid, uid };
});

const getTotalUsers = () => {
  return stmts.getTotalUsers.get()?.value ?? 0;
};

const getUserByUsername = (username) => {
  return stmts.getUserByUsername.get(username) ?? null;
};

const getUserByEmail = (email) => {
  return stmts.getUserByEmail.get(email) ?? null;
};

const getUserById = (id) => {
  return stmts.getUserById.get(id) ?? null;
};

const updateUser = (id, data) => {
  stmts.updateUser.run(
    data.display_name,
    data.bio,
    data.avatar_url,
    data.theme,
    data.bg_type,
    data.bg_value,
    data.accent_color,
    JSON.stringify(data.social_links ?? []),
    id
  );
};

const changePassword = (id, hash) => {
  stmts.changePassword.run(hash, id);
};

const incrementViews = (username) => {
  stmts.incrementViews.run(username);
};

const getAllUsers = () => {
  return stmts.getAllUsers.all();
};

module.exports = {
  db,
  createUser,
  getTotalUsers,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  updateUser,
  changePassword,
  incrementViews,
  getAllUsers
};
