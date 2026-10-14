/**
 * The Spanish blog index. The posts themselves are in English, so the page says so and tags every entry. The English
 * journal index keeps its own copy in src/pages/journal.
 */
export interface BlogCopy {
  meta: { title: string; description: string };
  /** {n} is the number of articles. */
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
}

export const blogCopy: BlogCopy = {
  meta: {
    title: 'Blog: notas sobre cómo diseñar software complejo',
    description:
      'Artículos en inglés de delbueno™ Studio sobre UX para nube, ciberseguridad, DevOps e IA, sistemas de diseño y cómo diseñar y construir B2B SaaS.',
  },
  eyebrow: 'Blog / {n} artículos en inglés',
  title: 'Notas sobre cómo diseñar',
  accent: 'software complejo.',
  lede: 'Escritos prácticos sobre UX para productos de nube, ciberseguridad, DevOps e IA, y sobre cómo construir B2B SaaS. Por ahora los artículos están en inglés.',
};
