export function newsImageKey(imageUrl) {
  if (typeof imageUrl !== 'string') return null;
  const match = /^\/api\/news-images\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:jpg|png|webp))$/i.exec(imageUrl);
  return match?.[1] || null;
}

export async function deleteNewsImage(env, imageUrl) {
  const key = newsImageKey(imageUrl);
  if (!key || !env.NEWS_IMAGES) return;
  try {
    await env.NEWS_IMAGES.delete(key);
  } catch (error) {
    console.error('No se pudo eliminar la imagen de R2:', error);
  }
}
