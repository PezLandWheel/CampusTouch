import { canAccessSystemsSection, isSameOrigin, json, requireSystemsAdmin } from '../../_shared/auth.js';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const imageTypes = {
  'image/jpeg': { extension: 'jpg', signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  'image/png': { extension: 'png', signature: (bytes) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, index) => bytes[index] === byte) },
  'image/webp': { extension: 'webp', signature: (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP' },
};

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: 'Origen no permitido.' }, 403);
  const auth = await requireSystemsAdmin(request, env);
  if (auth.response) return auth.response;
  if (!canAccessSystemsSection(auth.user.role, 'news', true)) return json({ error: 'Tu rol no puede subir imágenes para noticias.' }, 403);
  if (!env.NEWS_IMAGES) return json({ error: 'El bucket de imágenes aún no está conectado a Pages.' }, 503);

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_IMAGE_BYTES + 65536) return json({ error: 'La imagen debe pesar 8 MB o menos.' }, 413);

  let file;
  try { file = (await request.formData()).get('image'); }
  catch { return json({ error: 'No se pudo leer el archivo enviado.' }, 400); }
  if (!file || typeof file.arrayBuffer !== 'function') return json({ error: 'Selecciona un archivo de imagen.' }, 400);
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) return json({ error: 'La imagen debe pesar entre 1 byte y 8 MB.' }, 413);

  const imageType = imageTypes[file.type];
  if (!imageType) return json({ error: 'Formato no admitido. Usa JPG, PNG o WebP.' }, 415);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!imageType.signature(bytes)) return json({ error: 'El contenido del archivo no coincide con su formato de imagen.' }, 415);

  const key = `${crypto.randomUUID()}.${imageType.extension}`;
  await env.NEWS_IMAGES.put(key, bytes, {
    httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' },
    customMetadata: { uploadedBy: auth.user.id },
  });
  return json({ imageUrl: `/api/news-images/${key}` }, 201);
}
