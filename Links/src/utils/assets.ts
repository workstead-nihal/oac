/**
 * Safely resolves asset paths for both local development and subpath hosting (e.g. GitHub Pages).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${cleanPath}`;
  }
  return `${baseUrl}/${cleanPath}`;
}
