PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('SUPER_ADMIN', 'CAREER_ADMIN', 'CONTENT_EDITOR', 'SCHEDULE_MANAGER', 'TEACHER_MANAGER', 'CONSULTANT', 'USER')),
  career_id TEXT REFERENCES careers(id) ON DELETE RESTRICT,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK ((role = 'SUPER_ADMIN' AND career_id IS NULL) OR role <> 'SUPER_ADMIN')
);

CREATE INDEX IF NOT EXISTS idx_users_career ON users(career_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON user_sessions(expires_at);

CREATE TABLE IF NOT EXISTS login_attempts (
  identifier TEXT PRIMARY KEY,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO careers (id, name) VALUES
  ('ingenieria-mecatronica', 'Ingeniería Mecatrónica'),
  ('ingenieria-civil', 'Ingeniería Civil'),
  ('ingenieria-sistemas', 'Ingeniería de Sistemas'),
  ('ingenieria-ambiental', 'Ingeniería Ambiental'),
  ('ingenieria-procesos', 'Ingeniería de Procesos');
