/**
 * Blog posts are served from the site root (/[slug]/) to keep the old WordPress URLs.
 * A post slug that equals a real top-level route would collide with it, so the build
 * fails loudly instead of silently shadowing a page.
 */
// Top-level files that start with a letter or digit (this excludes the dynamic [slug].astro that imports this
// module), and everything inside sub-folders. Only the file names are used, the modules are never loaded.
const pageFiles = import.meta.glob(['/src/pages/[a-z0-9]*.{astro,ts}', '/src/pages/*/**/*.{astro,ts}']);

/** Top-level path segments owned by real routes, derived from src/pages. */
export function reservedSlugs(): Set<string> {
  const reserved = new Set<string>(['_astro', 'sitemap-index', 'sitemap-0']);
  for (const file of Object.keys(pageFiles)) {
    const first = file.replace('/src/pages/', '').split('/')[0] ?? '';
    const name = first.replace(/\.(astro|ts)$/, '');
    if (name && !name.startsWith('[')) reserved.add(name);
  }
  return reserved;
}

export function assertSlugFree(slug: string): void {
  if (reservedSlugs().has(slug)) {
    throw new Error(
      `Journal post "${slug}" collides with a built-in route at /${slug}/. Rename the file in src/content/journal/.`,
    );
  }
}
