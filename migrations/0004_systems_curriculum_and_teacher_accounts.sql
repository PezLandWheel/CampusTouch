ALTER TABLE systems_teachers ADD COLUMN account_user_id TEXT REFERENCES users(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_systems_teachers_account ON systems_teachers(account_user_id) WHERE account_user_id IS NOT NULL;

INSERT OR IGNORE INTO systems_semesters (id, career_id, number, name, academic_period, created_at, updated_at) VALUES
  ('systems-2026-2-1', 'ingenieria-sistemas', 1, 'Primer semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-2', 'ingenieria-sistemas', 2, 'Segundo semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-3', 'ingenieria-sistemas', 3, 'Tercer semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-4', 'ingenieria-sistemas', 4, 'Cuarto semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-5', 'ingenieria-sistemas', 5, 'Quinto semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-6', 'ingenieria-sistemas', 6, 'Sexto semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-7', 'ingenieria-sistemas', 7, 'Séptimo semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-8', 'ingenieria-sistemas', 8, 'Octavo semestre', '2026-2', datetime('now'), datetime('now')),
  ('systems-2026-2-9', 'ingenieria-sistemas', 9, 'Noveno semestre', '2026-2', datetime('now'), datetime('now'));

INSERT INTO systems_teachers (id, career_id, display_name, email, specialty, office, office_hours, photo_url, is_active, created_at, updated_at)
SELECT seed.id, 'ingenieria-sistemas', seed.display_name, seed.email, seed.specialty, '', '', seed.photo_url, 1, datetime('now'), datetime('now')
FROM (SELECT 'prof-madeline-narvaez' AS id, 'Madeline Daniela Narvaez Muñoz' AS display_name, 'dirisistemas@umariana.edu.co' AS email, 'Ingeniera de Sistemas · Magíster en Ciberseguridad' AS specialty, 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Madeline-Daniela-Narvaez-Munoz.jpg' AS photo_url UNION ALL
SELECT 'prof-danny-cardenas', 'Danny Michael Cardenas Martínez', 'dacardenas@umariana.edu.co', 'Ingeniero de Sistemas · Magíster en Administración y Competitividad', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Danny-Michael-Cardenas-Martinez.jpg' UNION ALL
SELECT 'prof-einstein-castro', 'Einstein Brezhnev Castro Rosero', 'eincastro225@umariana.edu.co', 'Ingeniero de Sistemas · Especialista en Redes y Servicios Telemáticos', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Einstein-Brezhnev-Castro-Rosero.jpg' UNION ALL
SELECT 'prof-fabian-parra', 'Fabian Parra Pay', 'fparra@umariana.edu.co', 'Ingeniero de Sistemas · Especialista en Docencia Universitaria', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Fabian-Parra-Pay.jpg' UNION ALL
SELECT 'prof-favio-rosero', 'Favio Nicolas Rosero Rodríguez', 'favionrosero@umariana.edu.co', 'Ingeniero Físico · Magíster en Ciencias - Física', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Favio-Nicolas-Rosero-Rodriguez.jpg' UNION ALL
SELECT 'prof-giovanni-hernandez', 'Giovanni Albeiro Hernández Pantoja', 'gihernandez@umariana.edu.co', 'Ingeniero de Sistemas · Especialista en Gerencia Informática', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Giovanni-Albeiro-Hernandez-Pantoja.jpg' UNION ALL
SELECT 'prof-hector-oliva', 'Hector Alfonso Oliva Rojas', 'hecoliva226@umariana.edu.co', 'Ingeniero Electrónico · Magíster en Ingeniería Electrónica y de Computadores', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Hector-Alfonso-Oliva-Rojas.jpg' UNION ALL
SELECT 'prof-javier-lopez', 'Javier Mauricio López Moreno', 'javierm.lopez221@umariana.edu.co', 'Ingeniero de Sistemas · Magíster en Docencia Universitaria', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Javier-Mauricio-Lopez-Moreno.jpg' UNION ALL
SELECT 'prof-john-ortiz', 'John Erick Ortíz Guzmán', 'jeortizg89@gmail.com', 'Ingeniero Electrónico · Doctor en Ingeniería Eléctrica', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/John-Erick-Ortiz-Guzman.jpg' UNION ALL
SELECT 'prof-juan-portilla', 'Juan Carlos Portilla Salas', 'juanca.portilla@umariana.edu.co', 'Ingeniero de Sistemas · Especialista en Gerencia de Proyectos', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Juan-Carlos-Portilla-Salas.jpg' UNION ALL
SELECT 'prof-lilian-cruz', 'Lilian Dayana Cruz Cruz', 'lilcruz225@umariana.edu.co', 'Doctora en Ingeniería Telemática', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Lilian-Dayana-Cruz-Cruz.jpg' UNION ALL
SELECT 'prof-luis-lafaurie', 'Luis Gabriel Lafaurie Ponce', 'luisga.lafaurie@umariana.edu.co', 'Ingeniero Físico · Bioingeniero · Magíster en Ingeniería Química', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Luis-Gabriel-Lafaurie-Ponce.jpg' UNION ALL
SELECT 'prof-omar-ortega', 'Omar José Ortega Moreno', 'omaortega226@umariana.edu.co', 'Ingeniero de Sistemas · Magíster en Seguridad Informática', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Omar-Jose-Ortega-Moreno.jpg' UNION ALL
SELECT 'prof-paola-lopez', 'Paola Fernanda López Recalde', 'paolopez126@umariana.edu.co', 'Ingeniera de Sistemas · Especialista en Ciencia de Datos y Analítica', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Paola-Fernanda-Lopez-Recalde.jpg' UNION ALL
SELECT 'prof-silvia-molina', 'Silvia Alejandra Molina España', 'silmolina226@umariana.edu.co', 'Ingeniera Electrónica · Magíster en Computación', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Silvia-Alejandra-Molina-Espana.jpg' UNION ALL
SELECT 'prof-wilson-castillo', 'Wilson Andrés Castillo Castro', 'wilcastilloc124@umariana.edu.co', 'Ingeniero de Sistemas · Magíster en Ingeniería Computacional', 'https://www.umariana.edu.co/img-profesores/ingenieria-sistemas/Wilson-Andres-Castillo-Castro.jpg') AS seed
WHERE NOT EXISTS (SELECT 1 FROM systems_teachers existing WHERE existing.career_id = 'ingenieria-sistemas' AND lower(existing.display_name) = lower(seed.display_name));

UPDATE systems_teachers
SET account_user_id = (SELECT id FROM users WHERE lower(email) = 'profesor.sistemas.docencia@campustouch.test' AND career_id = 'ingenieria-sistemas' AND is_active = 1 LIMIT 1)
WHERE lower(display_name) = lower('Danny Michael Cardenas Martínez')
  AND EXISTS (SELECT 1 FROM users WHERE lower(email) = 'profesor.sistemas.docencia@campustouch.test' AND career_id = 'ingenieria-sistemas' AND is_active = 1);

UPDATE systems_teachers
SET account_user_id = (SELECT id FROM users WHERE lower(email) = 'profesor.sistemas.horarios@campustouch.test' AND career_id = 'ingenieria-sistemas' AND is_active = 1 LIMIT 1)
WHERE lower(display_name) = lower('Einstein Brezhnev Castro Rosero')
  AND EXISTS (SELECT 1 FROM users WHERE lower(email) = 'profesor.sistemas.horarios@campustouch.test' AND career_id = 'ingenieria-sistemas' AND is_active = 1);

UPDATE systems_schedules SET parallel = '' WHERE career_id = 'ingenieria-sistemas';
