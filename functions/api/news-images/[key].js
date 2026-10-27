import { newsImageKey } from '../../_shared/news-images.js';

export async function onRequestGet({ env, params }) {
  const key = newsImageKey(`/api/news-images/${params.key || ''}`);
  if (!key) return new Response('Imagen no encontrada.', { status: 404 });
  if (!env.NEWS_IMAGES) return new Response('Bucket de imágenes no configurado.', { status: 503 });

  const object = await env.NEWS_IMAGES.get(key);
  if (!object) return new Response('Imagen no encontrada.', { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('content-disposition', 'inline');
  return new Response(object.body, { headers });
}
