/**
 * Sätteri (Astro's Markdown processor) plugin: fails the build when Markdown contains anything that could run
 * code or smuggle in markup. The site has no sanitizer between Markdown and the page, and the content was
 * migrated from a WordPress site that was hacked, so this is the gate.
 *
 * Rejected, with the file and line in the error:
 *   - any raw HTML node (including <script>, <iframe>, <style>, event-handler attributes, comments)
 *   - links, images and reference definitions whose URL scheme is not http:, https:, mailto: or tel:
 *     (so javascript:, data: and vbscript: all fail). Relative paths and #hashes are fine.
 *   - in MDX: script, iframe, style, object, embed and similar elements, on* attributes, and unsafe URLs in
 *     href, src, action and similar attributes
 *
 * Register `contentGuard()` first in `mdastPlugins` so nothing else sees unsafe input.
 *
 * Astro's content loader catches errors thrown while rendering an entry, logs them and carries on without that
 * entry, so the plugin alone would not stop a build. `contentGuardBuild()` is the build gate: an integration
 * that re-checks every .md and .mdx file under src/ when the build starts (independent of the content cache)
 * and throws, which makes `astro build` exit non-zero.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, relative } from 'node:path';
import { defineMdastPlugin, markdownToHtml, mdxToJs } from 'satteri';

const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const DANGEROUS_TAGS = /^(?:script|iframe|frame|frameset|style|object|embed|applet|base|meta|link|form|svg|math)$/i;
const URL_ATTRS = /^(?:href|src|srcset|action|formaction|poster|data|xlink:href|ping)$/i;
const TAG_NAME = /<\s*\/?\s*([a-z][a-z0-9-]*)/i;
const EVENT_ATTR = /\son[a-z]+\s*=/i;

/** @param {string} url */
function unsafeScheme(url) {
  // Browsers drop ASCII whitespace and control characters inside the scheme, so "java\nscript:" still runs.
  const cleaned = String(url).replace(/[\p{Cc}\s]+/gu, '');
  const match = /^([a-z][a-z0-9+.-]*:)/i.exec(cleaned);
  if (!match) return null; // relative path, /root path, ?query or #hash
  const scheme = match[1].toLowerCase();
  return SAFE_SCHEMES.has(scheme) ? null : scheme;
}

/** @param {string} value */
const snippet = (value) => {
  const flat = String(value).replace(/\s+/g, ' ').trim();
  return flat.length > 80 ? flat.slice(0, 77) + '...' : flat;
};

/** What is wrong with a raw HTML string, as a short description. */
function describeHtml(value) {
  const tag = TAG_NAME.exec(value)?.[1]?.toLowerCase();
  if (tag === 'script' || tag === 'iframe' || tag === 'style') return `<${tag}> element`;
  if (EVENT_ATTR.test(value)) return 'event-handler attribute (on*=)';
  if (/^\s*<!--/.test(value)) return 'HTML comment';
  return tag ? `raw HTML <${tag}>` : 'raw HTML';
}

export function contentGuard() {
  return defineMdastPlugin({
    name: 'delbueno-content-guard',
    options: { position: true },

    html(node, ctx) {
      fail(ctx, node, `${describeHtml(node.value)}: ${snippet(node.value)}`);
    },
    link(node, ctx) {
      checkUrl(ctx, node, 'link', node.url);
    },
    image(node, ctx) {
      checkUrl(ctx, node, 'image', node.url);
    },
    definition(node, ctx) {
      checkUrl(ctx, node, 'link definition', node.url);
    },
    mdxJsxFlowElement(node, ctx) {
      checkJsx(ctx, node);
    },
    mdxJsxTextElement(node, ctx) {
      checkJsx(ctx, node);
    },
  });
}

function checkUrl(ctx, node, what, url) {
  const scheme = unsafeScheme(url);
  if (scheme) fail(ctx, node, `${what} with a "${scheme}" URL: ${snippet(url)}`);
}

function checkJsx(ctx, node) {
  const name = node.name ?? '';
  if (DANGEROUS_TAGS.test(name)) fail(ctx, node, `<${name}> element`);
  for (const attr of node.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute') continue;
    if (/^on/i.test(attr.name)) fail(ctx, node, `event-handler attribute ${attr.name}= on <${name}>`);
    if (URL_ATTRS.test(attr.name) && typeof attr.value === 'string') {
      checkUrl(ctx, node, `${attr.name} attribute on <${name}>`, attr.value);
    }
    if (attr.name === 'dangerouslySetInnerHTML' || attr.name === 'set:html') {
      fail(ctx, node, `${attr.name} attribute on <${name}>`);
    }
  }
}

function fail(ctx, node, problem) {
  const file = ctx.fileURL ? relative(process.cwd(), fileURLToPath(ctx.fileURL)) : 'unknown file';
  const line = node.position?.start?.line;
  throw new Error(
    `Unsafe Markdown in ${file}${line ? `:${line}` : ''}\n  ${problem}\n` +
      '  Markdown content may not contain raw HTML, scripts, iframes, event handlers, or javascript:, data: ' +
      'and vbscript: URLs. Rewrite it as plain Markdown. See plugins/satteri-content-guard.mjs.',
  );
}

/**
 * Astro integration: checks every Markdown and MDX file under src/ before a build starts, and fails the build
 * with all problems listed.
 */
export function contentGuardBuild() {
  let root = process.cwd();
  return {
    name: 'delbueno-content-guard-build',
    hooks: {
      'astro:config:setup': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:start': async () => {
        const problems = [];
        for (const file of listContentFiles(join(root, 'src'))) {
          const options = { mdastPlugins: [contentGuard()], fileURL: pathToFileURL(file) };
          try {
            const source = readFileSync(file, 'utf8');
            await (file.endsWith('.mdx') ? mdxToJs(source, options) : markdownToHtml(source, options));
          } catch (error) {
            if (String(error?.message).startsWith('Unsafe Markdown in')) problems.push(error.message);
            else throw error;
          }
        }
        if (problems.length) {
          throw new Error(
            `Content guard: ${problems.length} unsafe Markdown file(s) found.\n\n${problems.join('\n\n')}`,
          );
        }
      },
    },
  };
}

/** @param {string} dir @returns {string[]} */
function listContentFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...listContentFiles(path));
    else if (/\.mdx?$/.test(entry.name)) found.push(path);
  }
  return found;
}
