/**
 * Builds the Content-Security-Policy string from security/csp.json.
 *   cspString()                 the full policy, for the Cloudflare response header
 *   cspString({ meta: true })   the same without the directives a <meta> tag cannot carry (frame-ancestors,
 *                               and upgrade-insecure-requests, which would break the local http preview)
 * Used by src/layouts/BaseLayout.astro, scripts/check-csp.mjs and nothing else.
 */
import policy from './csp.json' with { type: 'json' };

/** @param {{ meta?: boolean }} [options] */
export function cspString({ meta = false } = {}) {
  return Object.entries(policy.directives)
    .filter(([name]) => !(meta && policy.headerOnly.includes(name)))
    .map(([name, sources]) => [name, ...sources].join(' '))
    .join('; ');
}

/** The allowed inline-script hashes, as 'sha256-...' tokens without the quotes. */
export function scriptHashes() {
  return policy.directives['script-src'].filter((s) => s.startsWith("'sha")).map((s) => s.slice(1, -1));
}

/** True when style="" attributes are allowed by the policy. */
export function allowsStyleAttributes() {
  return (policy.directives['style-src-attr'] ?? []).includes("'unsafe-inline'");
}
