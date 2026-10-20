const SESSION_COOKIE = 'campustouch_session';
const SESSION_SECONDS = 60 * 60 * 12;
// Cloudflare Workers rejects PBKDF2 derivations above 100,000 iterations.
const PBKDF2_ITERATIONS = 100000;

export const roleNames = {
  SUPER_ADMIN: 'Administrador Principal',
  CAREER_ADMIN: 'Administrador de Carrera',
  CONTENT_EDITOR: 'Editor de Contenido',
  SCHEDULE_MANAGER: 'Gestor de Horarios',
  TEACHER_MANAGER: 'Gestor de Profesores',
  CONSULTANT: 'Consultor',
  USER: 'Usuario'
};

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
  });
}

export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export async function readJson(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 12000) throw new Error('La solicitud es demasiado grande.');
  try {
    const value = await request.json();
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value;
  } catch {
    throw new Error('La solicitud no tiene un formato válido.');
  }
}

export function cleanText(value, max = 120) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function bytesToBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sha256(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

export async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, key, 256);
  return { salt: bytesToBase64Url(salt), hash: bytesToBase64Url(new Uint8Array(bits)) };
}

export async function verifyPassword(password, saltText, expectedHash) {
  try {
    const result = await hashPassword(password, fromBase64Url(saltText));
    const actual = fromBase64Url(result.hash);
    const expected = fromBase64Url(expectedHash);
    return actual.length === expected.length && crypto.subtle.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function cookieValue(request, name) {
  const cookies = request.headers.get('cookie') || '';
  for (const item of cookies.split(';')) {
    const [key, ...rest] = item.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return '';
}

export function expiredCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export async function createSession(db, userId, remember = false) {
  const raw = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToBase64Url(raw);
  const tokenHash = bytesToBase64Url(await sha256(token));
  const seconds = remember ? 60 * 60 * 24 * 30 : SESSION_SECONDS;
  const now = new Date();
  const expiry = new Date(now.getTime() + seconds * 1000);
  await db.prepare('INSERT INTO user_sessions (id, user_id, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?)')
    .bind(crypto.randomUUID(), userId, tokenHash, now.toISOString(), expiry.toISOString()).run();
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`;
}

export async function currentUser(request, db) {
  const token = cookieValue(request, SESSION_COOKIE);
  if (!token || token.length > 120) return null;
  const tokenHash = bytesToBase64Url(await sha256(token));
  const result = await db.prepare(`SELECT u.id, u.display_name AS displayName, u.email, u.role, u.career_id AS careerId, c.name AS careerName, u.is_active AS active
    FROM user_sessions s JOIN users u ON u.id = s.user_id LEFT JOIN careers c ON c.id = u.career_id
    WHERE s.token_hash = ? AND s.expires_at > ? LIMIT 1`).bind(tokenHash, new Date().toISOString()).first();
  if (!result || result.active !== 1) return null;
  const { active, ...user } = result;
  return user;
}

export async function requirePrincipal(request, env) {
  const user = await currentUser(request, env.DB);
  if (!user || user.role !== 'SUPER_ADMIN') return { response: json({ error: 'No autorizado.' }, 403) };
  return { user };
}

export async function requireSystemsAdmin(request, env) {
  const user = await currentUser(request, env.DB);
  if (!user) return { response: json({ error: 'Inicia sesión para continuar.' }, 401) };
  if (user.role !== 'SUPER_ADMIN' && (user.careerId !== 'ingenieria-sistemas' || user.role === 'USER')) {
    return { response: json({ error: 'Esta cuenta no tiene acceso a Ingeniería de Sistemas.' }, 403) };
  }
  return { user };
}

const systemsRoleAccess = {
  CONTENT_EDITOR: { read: ['dashboard', 'news', 'gallery', 'profile', 'links'], write: ['news', 'gallery', 'profile', 'links'] },
  SCHEDULE_MANAGER: { read: ['dashboard', 'semesters', 'schedules'], write: ['semesters', 'schedules'] },
  TEACHER_MANAGER: { read: ['dashboard', 'teachers'], write: ['teachers'] },
  CONSULTANT: { read: ['dashboard', 'news', 'gallery', 'profile', 'semesters', 'schedules', 'teachers', 'links'], write: [] }
};

export function canAccessSystemsSection(role, section, write = false) {
  if (role === 'SUPER_ADMIN' || role === 'CAREER_ADMIN') return true;
  if (section === 'teacherAccounts') return false;
  const access = systemsRoleAccess[role];
  return Boolean(access && (write ? access.write : access.read).includes(section));
}

export function passwordIsStrong(password) {
  return typeof password === 'string' && password.length >= 12 && password.length <= 128 && /[A-Za-z]/.test(password) && /\d/.test(password);
}
