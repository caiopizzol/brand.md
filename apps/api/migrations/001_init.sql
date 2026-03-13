CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  client_name TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS briefs (
  project_id TEXT PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  raw_input TEXT,
  client TEXT,
  description TEXT,
  audience TEXT,
  style_direction TEXT,
  deadline TEXT,
  platforms_json TEXT DEFAULT '[]',
  deliverables_json TEXT DEFAULT '[]',
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS brands (
  project_id TEXT PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  source_url TEXT,
  colors_json TEXT DEFAULT '[]',
  typography_json TEXT DEFAULT '[]',
  voice_description TEXT,
  voice_tags_json TEXT DEFAULT '[]',
  logo_urls_json TEXT DEFAULT '[]',
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS visual_references (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  source_url TEXT,
  thumbnail_url TEXT NOT NULL,
  source_platform TEXT NOT NULL,
  style_tags_json TEXT DEFAULT '[]',
  is_selected INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  r2_key TEXT NOT NULL,
  original_filename TEXT,
  tags_json TEXT DEFAULT '[]',
  assigned_deliverable_id TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS deliverables (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  type TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  headline TEXT,
  body_copy TEXT,
  photo_id TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);
