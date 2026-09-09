import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'pages-dist');
const clientDirectory = path.join(projectRoot, 'dist', 'client');
const pageBase = '/shop';
const port = 4199;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  '/',
  '/konzepte/',
  '/impressum/',
  '/datenschutz/',
  '/konzept/maler/',
  '/konzept/maler/leistungen/',
  '/konzept/maler/gestaltung/',
  '/konzept/maler/kontakt/',
  '/konzept/metallbau/',
  '/konzept/metallbau/leistungen/',
  '/konzept/metallbau/einblicke/',
  '/konzept/metallbau/anfrage/',
  '/konzept/galabau/',
  '/konzept/galabau/leistungen/',
  '/konzept/galabau/gartenideen/',
  '/konzept/galabau/anfrage/',
];

function transformHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*(?:rel="modulepreload"|as="script"))[^>]*>/gi, '')
    .replaceAll('="/', `="${pageBase}/`)
    .replaceAll("='/", `='${pageBase}/`)
    .replace(
      '</body>',
      `<script src="${pageBase}/pages-runtime.js" defer></script></body>`,
    );
}

async function waitForServer(server) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Preview server exited early with code ${server.exitCode}.`);
    }
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Timed out while waiting for the preview server.');
}

async function rewriteCss(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return rewriteCss(target);
      if (!entry.name.endsWith('.css')) return;
      const css = await readFile(target, 'utf8');
      await writeFile(target, css.replaceAll('url(/', `url(${pageBase}/`));
    }),
  );
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const server = spawn(
  npmCommand,
  ['run', 'start', '--', '--port', String(port)],
  {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    shell: process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);
let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk;
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk;
});

try {
  await waitForServer(server);
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(clientDirectory, outputDirectory, { recursive: true });
  await rewriteCss(outputDirectory);

  for (const route of routes) {
    const response = await fetch(origin + route);
    if (!response.ok) {
      throw new Error(`${route} returned HTTP ${response.status}.`);
    }
    const html = transformHtml(await response.text());
    const routeDirectory = path.join(outputDirectory, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, 'index.html'), html);
  }

  await writeFile(path.join(outputDirectory, '.nojekyll'), '');
  console.log(`Exported ${routes.length} routes to ${outputDirectory}.`);
} catch (error) {
  console.error(serverOutput);
  throw error;
} finally {
  server.kill('SIGTERM');
}
