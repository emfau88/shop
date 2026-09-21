import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
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
  '/konzept/maler/signature/',
  '/konzept/maler/leistungen/',
  '/konzept/maler/gestaltung/',
  '/konzept/maler/kontakt/',
  '/konzept/metallbau/',
  '/konzept/metallbau/signature/',
  '/konzept/metallbau/leistungen/',
  '/konzept/metallbau/einblicke/',
  '/konzept/metallbau/anfrage/',
  '/konzept/galabau/',
  '/konzept/galabau/signature/',
  '/konzept/galabau/leistungen/',
  '/konzept/galabau/gartenideen/',
  '/konzept/galabau/anfrage/',
  '/konzept/sportverein/',
  '/konzept/sportverein/signature/',
  '/konzept/sportverein/training/',
  '/konzept/sportverein/verein/',
  '/konzept/sportverein/probetraining/',
  '/konzept/gastronomie/',
  '/konzept/gastronomie/signature/',
  '/konzept/gastronomie/speisekarte/',
  '/konzept/gastronomie/haus/',
  '/konzept/gastronomie/feiern/',
  '/konzept/gastronomie/reservieren/',
];

function transformHtml(html) {
  const metalViewerScript = html.includes('class="metal-part-viewer"')
    ? `<script type="module" src="${pageBase}/metal-viewer-runtime.js"></script>`
    : '';
  const signatureScript = html.includes('data-signature-page')
    ? `<script type="module" src="${pageBase}/signature-runtime.js"></script>`
    : '';
  const werkformSignatureScript = html.includes(
    'data-signature-brand="werkform"',
  )
    ? `<script type="module" src="${pageBase}/werkform-signature-runtime.js"></script>`
    : '';
  const aufschlagSignatureScript = html.includes(
    'data-signature-brand="aufschlag"',
  )
    ? `<script type="module" src="${pageBase}/aufschlag-signature-runtime.js"></script>`
    : '';
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*(?:rel="modulepreload"|as="script"))[^>]*>/gi, '')
    .replaceAll('="/', `="${pageBase}/`)
    .replaceAll("='/", `='${pageBase}/`)
    .replace(
      /(\b(?:srcset|imagesrcset)=)(['"])(.*?)\2/gi,
      (_match, attribute, quote, srcSet) => {
        const rewritten = srcSet.replace(
          /(^|,\s*)\/(?!shop(?:\/|$))/g,
          `$1${pageBase}/`,
        );
        return `${attribute}${quote}${rewritten}${quote}`;
      },
    )
    .replace(
      '</body>',
      `<script src="${pageBase}/pages-runtime.js" defer></script>${metalViewerScript}${signatureScript}${werkformSignatureScript}${aufschlagSignatureScript}</body>`,
    );
}

async function buildMetalViewerRuntime() {
  await build({
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.join(projectRoot, 'scripts', 'pages-metal-viewer-entry.ts'),
        formats: ['es'],
        fileName: () => 'metal-viewer-runtime.js',
      },
      outDir: clientDirectory,
    },
    configFile: false,
    logLevel: 'warn',
    root: projectRoot,
  });
}

async function buildSignatureRuntime() {
  await build({
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.join(projectRoot, 'scripts', 'pages-signature-entry.ts'),
        formats: ['es'],
        fileName: () => 'signature-runtime.js',
      },
      outDir: clientDirectory,
    },
    configFile: false,
    logLevel: 'warn',
    root: projectRoot,
  });
}

async function buildWerkformSignatureRuntime() {
  await build({
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.join(
          projectRoot,
          'scripts',
          'pages-werkform-signature-entry.ts',
        ),
        formats: ['es'],
        fileName: () => 'werkform-signature-runtime.js',
      },
      outDir: clientDirectory,
    },
    configFile: false,
    logLevel: 'warn',
    root: projectRoot,
  });
}

async function buildAufschlagSignatureRuntime() {
  await build({
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.join(
          projectRoot,
          'scripts',
          'pages-aufschlag-signature-entry.ts',
        ),
        formats: ['es'],
        fileName: () => 'aufschlag-signature-runtime.js',
      },
      outDir: clientDirectory,
    },
    configFile: false,
    logLevel: 'warn',
    root: projectRoot,
  });
}

async function waitForServer(server) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(
        `Preview server exited early with code ${server.exitCode}.`,
      );
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

const server = spawn(
  process.execPath,
  [
    path.join(projectRoot, 'node_modules', 'vinext', 'dist', 'cli.js'),
    'start',
    '--hostname',
    '127.0.0.1',
    '--port',
    String(port),
  ],
  {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
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
  await buildMetalViewerRuntime();
  await buildSignatureRuntime();
  await buildWerkformSignatureRuntime();
  await buildAufschlagSignatureRuntime();
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
  if (server.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise((resolve) => server.once('exit', resolve));
  }
}
