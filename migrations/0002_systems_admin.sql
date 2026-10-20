CREATE TABLE IF NOT EXISTS systems_news (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '/images/systems-lab.png',
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  published_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_systems_news_public ON systems_news(career_id, status, published_at DESC);

CREATE TABLE IF NOT EXISTS systems_semesters (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  number INTEGER NOT NULL,
  name TEXT NOT NULL,
  academic_period TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (career_id, academic_period, number)
);

CREATE TABLE IF NOT EXISTS systems_teachers (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  display_name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  specialty TEXT NOT NULL DEFAULT '',
  office TEXT NOT NULL DEFAULT '',
  office_hours TEXT NOT NULL DEFAULT '',
  photo_url TEXT NOT NULL DEFAULT '',
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS systems_schedules (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  semester_id TEXT NOT NULL REFERENCES systems_semesters(id) ON DELETE RESTRICT,
  subject TEXT NOT NULL,
  parallel TEXT NOT NULL DEFAULT 'A',
  teacher_name TEXT NOT NULL DEFAULT '',
  weekday INTEGER NOT NULL CHECK (weekday BETWEEN 1 AND 7),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  classroom TEXT NOT NULL DEFAULT '',
  schedule_type TEXT NOT NULL DEFAULT 'CLASS' CHECK (schedule_type IN ('CLASS', 'OFFICE_HOURS', 'ADVISORY')),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_systems_schedules_semester ON systems_schedules(semester_id, weekday, start_time);

CREATE TABLE IF NOT EXISTS systems_gallery (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Campus',
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS systems_links (
  id TEXT PRIMARY KEY,
  career_id TEXT NOT NULL DEFAULT 'ingenieria-sistemas',
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS systems_profile (
  career_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  motto TEXT NOT NULL,
  description TEXT NOT NULL,
  contact_email TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT NOT NULL DEFAULT '/images/systems-lab.png',
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO systems_profile (career_id, display_name, motto, description, contact_email, hero_image_url, updated_at)
VALUES ('ingenieria-sistemas', 'Ingeniería de Sistemas', 'Tecnología · Innovación · Futuro',
  'Formamos profesionales capaces de diseñar, desarrollar e innovar soluciones tecnológicas para la sociedad.', '', '/images/systems-lab.png', datetime('now'));

INSERT OR IGNORE INTO systems_news (id, category, title, summary, body, image_url, status, published_at, created_at, updated_at) VALUES
('news-001','ACADEMIA','Semana de la Ingeniería 2024','Conferencias, talleres y actividades para toda la comunidad estudiantil.','La Semana de la Ingeniería reúne a estudiantes y docentes en una agenda de conferencias, talleres prácticos y espacios de encuentro.','/images/systems-lab.png','PUBLISHED','2024-10-03T10:30:00-05:00','2024-10-03T10:30:00-05:00','2024-10-03T10:30:00-05:00'),
('news-002','EVENTOS','Proyecto de innovación estudiantil','Estudiantes de la carrera desarrollan soluciones tecnológicas para la sociedad.','Los equipos estudiantiles presentaron propuestas que aplican tecnología a desafíos de su entorno.','/images/campus-engineering.png','PUBLISHED','2024-09-28T14:15:00-05:00','2024-09-28T14:15:00-05:00','2024-09-28T14:15:00-05:00'),
('news-003','INVESTIGACIÓN','Nuevo laboratorio de desarrollo','La carrera inaugura un espacio con tecnología de última generación.','El nuevo espacio facilita el trabajo colaborativo en programación, pruebas de software y prototipado.','/images/systems-lab.png','PUBLISHED','2024-09-20T09:45:00-05:00','2024-09-20T09:45:00-05:00','2024-09-20T09:45:00-05:00'),
('news-004','INSTITUCIONAL','Nuevos convenios internacionales','La Facultad fortalece sus lazos con universidades de la región.','Los nuevos acuerdos amplían las oportunidades de colaboración académica e intercambio.','/images/campus-engineering.png','PUBLISHED','2024-09-15T16:20:00-05:00','2024-09-15T16:20:00-05:00','2024-09-15T16:20:00-05:00'),
('news-005','TECNOLOGÍA','Taller de Inteligencia Artificial','Participa en el taller práctico sobre IA y sus aplicaciones en la industria.','El taller presenta fundamentos de inteligencia artificial y ejercicios guiados con casos de uso.','/images/systems-lab.png','PUBLISHED','2024-09-10T09:00:00-05:00','2024-09-10T09:00:00-05:00','2024-09-10T09:00:00-05:00'),
('news-006','INSTITUCIONAL','Reconocimiento a nuestros estudiantes','Estudiantes de la carrera obtienen premios en competencia nacional.','La comunidad de Ingeniería de Sistemas celebra el reconocimiento obtenido por sus estudiantes en una competencia nacional.','/images/campus-engineering.png','PUBLISHED','2024-09-02T09:00:00-05:00','2024-09-02T09:00:00-05:00','2024-09-02T09:00:00-05:00'),
('news-007','CONVOCATORIAS','Inscripciones abiertas para semilleros','Conoce los grupos de investigación y encuentra un proyecto para participar.','Los semilleros de la carrera reciben nuevos integrantes para el próximo periodo.','/images/systems-lab.png','PUBLISHED','2024-08-27T09:00:00-05:00','2024-08-27T09:00:00-05:00','2024-08-27T09:00:00-05:00'),
('news-008','ACADEMIA','Encuentro de egresados en tecnología','Profesionales egresados compartirán sus experiencias en el sector.','El encuentro conecta a estudiantes con egresados que trabajan en distintos campos tecnológicos.','/images/campus-engineering.png','PUBLISHED','2024-08-19T09:00:00-05:00','2024-08-19T09:00:00-05:00','2024-08-19T09:00:00-05:00'),
('news-009','EVENTOS','Maratón universitaria de programación','Forma un equipo y resuelve retos de programación durante la jornada.','La maratón propone retos de lógica y programación para equipos de distintos semestres.','/images/systems-lab.png','PUBLISHED','2024-08-12T09:00:00-05:00','2024-08-12T09:00:00-05:00','2024-08-12T09:00:00-05:00'),
('news-010','INVESTIGACIÓN','Prototipos para ciudades inteligentes','Un proyecto de aula explora sensores y datos para mejorar servicios urbanos.','El proyecto integra dispositivos conectados y análisis de datos para crear prototipos de soluciones urbanas.','/images/campus-engineering.png','PUBLISHED','2024-08-05T09:00:00-05:00','2024-08-05T09:00:00-05:00','2024-08-05T09:00:00-05:00'),
('news-011','TECNOLOGÍA','Clínica de desarrollo web','Sesiones de acompañamiento para llevar tus ideas web a un prototipo.','La clínica ofrece sesiones prácticas para planear interfaces, construir prototipos y recibir retroalimentación.','/images/systems-lab.png','PUBLISHED','2024-07-29T09:00:00-05:00','2024-07-29T09:00:00-05:00','2024-07-29T09:00:00-05:00'),
('news-012','INSTITUCIONAL','Colaboración con empresas del sector','Nuevos espacios de mentoría acercan a estudiantes al entorno profesional.','La iniciativa contempla encuentros de mentoría y charlas técnicas con profesionales de empresas del sector.','/images/campus-engineering.png','PUBLISHED','2024-07-22T09:00:00-05:00','2024-07-22T09:00:00-05:00','2024-07-22T09:00:00-05:00');
