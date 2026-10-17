import type { Localized } from '../config';

/** Labels on a journal post page, in the language of the post. */
export interface PostCopy {
  by: string;
  updated: string;
  /** Eyebrow and heading of the related posts section. */
  keepReading: string;
  related: string;
  allArticles: string;
  ctaHeading: string;
  toc: { label: string; title: string };
  author: { label: string; writtenBy: string; aboutStudio: string; allByAuthor: string };
}

export const postCopy: Localized<PostCopy> = {
  en: {
    by: 'By',
    updated: 'Updated',
    keepReading: 'Keep reading',
    related: 'Related posts',
    allArticles: 'All articles',
    ctaHeading: 'Designing complex software? Let us talk.',
    toc: { label: 'Table of contents', title: 'In this article' },
    author: {
      label: 'About the author',
      writtenBy: 'Written by',
      aboutStudio: 'About the studio',
      allByAuthor: 'All articles by Dani',
    },
  },
  es: {
    by: 'Por',
    updated: 'Actualizado',
    keepReading: 'Sigue leyendo',
    related: 'Artículos relacionados',
    allArticles: 'Todos los artículos',
    ctaHeading: '¿Diseñando software complejo? Hablemos.',
    toc: { label: 'Tabla de contenido', title: 'En este artículo' },
    author: {
      label: 'Sobre el autor',
      writtenBy: 'Escrito por',
      aboutStudio: 'Sobre el estudio',
      allByAuthor: 'Todos los artículos de Dani',
    },
  },
};
