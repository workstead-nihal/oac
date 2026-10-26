// Purpose: publish the imported Link Hub build under /links without changing its design or installing dependencies.
import { cp, readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'Links/docs');
const destination = path.join(root, 'dist/links');
const oldOrigin = 'https://crystal-studio-labs.github.io/OAC-Linktree/';
const publicOrigin = 'https://joinoac.in/links/';

await access(path.join(source, 'index.html'));
await cp(source, destination, { recursive: true, filter: file => path.basename(file) !== 'sitemap.xml' });

// Rewrites deployment metadata only; directory is the generated hub, output is updated text assets.
async function localizeHosting(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await localizeHosting(file);
    } else if (/\.(html|webmanifest|xml|txt|js|css)$/.test(entry.name)) {
      let text = (await readFile(file, 'utf8')).replaceAll(oldOrigin, publicOrigin);
      if (entry.name.endsWith('.html')) {
        text = text.replace(/<meta name="robots" content="[^"]*"\s*\/?>/g, '<meta name="robots" content="noindex, follow">');
      }
      await writeFile(file, text);
    }
  }
}

await localizeHosting(destination);
const html = await readFile(path.join(destination, 'index.html'), 'utf8');
if (!html.includes('noindex, follow') || !html.includes(publicOrigin)) {
  throw new Error('Link Hub metadata was not localized.');
}
// Verifies that HTML assets resolve within the generated hub before GitHub Pages publishes it.
for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g)) {
  await access(path.join(destination, match[1]));
}

// Versions the generated worker with the HTML so installed hubs cannot retain retired card lists.
const release = createHash('sha256').update(html).digest('hex').slice(0, 12);
const worker = `// Purpose: refresh the /links hub when its deployed HTML changes; leave other site caches alone.
const CACHE_NAME = 'oac-links-${release}';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(async cache => {
    const response = await fetch('./', { cache: 'reload' });
    if (response.ok) await cache.put('./', response);
  }).catch(() => {}));
  self.skipWaiting();
});
// Refreshes existing hub windows once after an update, including windows controlled by the old worker.
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('oac-links-') && key !== CACHE_NAME) await caches.delete(key);
    }
    await self.clients.claim();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      const url = new URL(client.url);
      if (url.origin === self.location.origin && url.pathname.startsWith('/links/')) {
        await client.navigate(client.url);
      }
    }
  })());
});
// Requests fresh page HTML while leaving hashed assets to normal browser caching; offline uses this release only.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;
  event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(async () => {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match('./') || Response.error();
  }));
});
`;
await writeFile(path.join(destination, 'sw.js'), worker);
console.log('Link Hub prepared at dist/links with verified local HTML assets.');
