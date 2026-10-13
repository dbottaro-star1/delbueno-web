/**
 * URL helpers. Every internal link and public asset reference goes through url()
 * so the site works under any base path (GitHub Pages preview or custom domain).
 */
import { PROD_ORIGIN } from './site';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** The configured base path without a trailing slash. Empty string for "/". */
export function basePath(): string {
  return import.meta.env.BASE_URL.replace(/\/+$/, '');
}

/**
 * Prefix an internal path with the base path.
 * Page paths get a trailing slash. File paths (with an extension), query strings
 * and hashes are preserved. External URLs, mailto:, tel: and bare "#hash" pass through.
 */
export function url(path: string = '/'): string {
  if (EXTERNAL.test(path) || path.startsWith('#')) return path;

  const match = path.match(/^([^?#]*)(.*)$/);
  let pathname = match?.[1] ?? '';
  const suffix = match?.[2] ?? '';

  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  const lastSegment = pathname.split('/').pop() ?? '';
  if (!pathname.endsWith('/') && !lastSegment.includes('.')) pathname += '/';

  return basePath() + pathname + suffix;
}

/** Remove the base path from a pathname, returning a site-relative path. */
export function stripBase(pathname: string): string {
  const base = basePath();
  if (base && (pathname === base || pathname.startsWith(base + '/'))) {
    pathname = pathname.slice(base.length) || '/';
  }
  return pathname.startsWith('/') ? pathname : '/' + pathname;
}

/** Absolute URL of a site path on the origin this build is actually served from (works on previews). */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  return new URL(url(path), site ?? PROD_ORIGIN).toString();
}

/** Absolute canonical URL on the production domain. Never includes the preview base path. */
export function canonicalUrl(sitePath: string): string {
  const clean = sitePath.startsWith('/') ? sitePath : '/' + sitePath;
  const last = clean.split('/').pop() ?? '';
  const withSlash = clean.endsWith('/') || last.includes('.') ? clean : clean + '/';
  return PROD_ORIGIN + withSlash;
}
