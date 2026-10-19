/**
 * The Spanish blog index. The translated posts are in Spanish and the rest are in English, so the page says so and tags
 * the English ones. The English blog index keeps its own copy in src/pages/blog.
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
      'Artículos de delbueno™ Studio sobre UX para nube, ciberseguridad, DevOps e IA, sistemas de diseño y cómo diseñar y construir B2B SaaS, en español e inglés.',
  },
  eyebrow: 'Blog / {n} artículos',
  title: 'Notas sobre cómo diseñar',
  accent: 'software complejo.',
  lede: 'Escritos prácticos sobre UX para productos de nube, ciberseguridad, DevOps e IA, y sobre cómo construir B2B SaaS. Algunos artículos están en español y el resto, por ahora, en inglés.',
};
