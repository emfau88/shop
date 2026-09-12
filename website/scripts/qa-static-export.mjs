import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const outputDirectory = path.join(projectRoot, 'pages-dist');
const pageBase = '/shop';
const expectedRouteCount = 25;
const errors = [];
const htmlFiles = [];

async function collectFiles(directory, extension, target) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory())
        return collectFiles(entryPath, extension, target);
      if (entry.name.endsWith(extension)) target.push(entryPath);
    }),
  );
}

function referencesFrom(html) {
  const references = [];
  const pattern = /\b(src|href|srcset|imagesrcset)=(['"])(.*?)\2/gi;
  for (const match of html.matchAll(pattern)) {
    const values = match[1].toLowerCase().includes('srcset')
      ? match[3].split(',').map((candidate) => candidate.trim().split(/\s+/)[0])
      : [match[3]];
    for (const value of values) references.push({ attribute: match[1], value });
  }
  return references;
}

function localTarget(reference, sourceFile) {
  const clean = reference.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(clean))
    return null;
  if (
    clean.startsWith('/') &&
    clean !== pageBase &&
    !clean.startsWith(`${pageBase}/`)
  ) {
    errors.push(
      `${path.relative(outputDirectory, sourceFile)}: unprefixed root path ${reference}`,
    );
    return null;
  }

  let target;
  if (clean === pageBase || clean === `${pageBase}/`) {
    target = outputDirectory;
  } else if (clean.startsWith(`${pageBase}/`)) {
    target = path.join(
      outputDirectory,
      decodeURIComponent(clean.slice(pageBase.length + 1)),
    );
  } else {
    target = path.resolve(path.dirname(sourceFile), decodeURIComponent(clean));
  }

  if (path.extname(target)) return target;
  return path.join(target, 'index.html');
}

await collectFiles(outputDirectory, '.html', htmlFiles);

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) {
    errors.push(
      `${path.relative(outputDirectory, htmlFile)}: expected one h1, found ${h1Count}`,
    );
  }

  for (const reference of referencesFrom(html)) {
    const target = localTarget(reference.value, htmlFile);
    if (!target) continue;
    try {
      await access(target);
    } catch {
      errors.push(
        `${path.relative(outputDirectory, htmlFile)}: missing ${reference.attribute} target ${reference.value}`,
      );
    }
  }
}

if (htmlFiles.length !== expectedRouteCount) {
  errors.push(
    `expected ${expectedRouteCount} HTML routes, found ${htmlFiles.length}`,
  );
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Static export QA passed: ${htmlFiles.length} routes, one H1 each, no missing local targets, no unprefixed root paths.`,
  );
}
