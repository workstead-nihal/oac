// Purpose: publish the imported Link Hub build under /links without changing its design or installing dependencies.
import { cp, readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
console.log('Link Hub prepared at dist/links with verified local HTML assets.');
