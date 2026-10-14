import type { Localized } from '../config';
import type { PageKey } from '../routes';

export interface NotFoundCopy {
  meta: { title: string; description: string };
  label: string;
  heading: string;
  /** The link text sits between `before` and `after`. */
  lede: { before: string; link: string; after: string };
  links: { page: Extract<PageKey, 'work' | 'playground' | 'journal'>; t: string; d: string }[];
  more: { or: string; home: string; see: string; services: string; or2: string; contact: string };
}

export const notFoundCopy: Localized<NotFoundCopy> = {
  en: {
    meta: {
      title: 'Page not found',
      description:
        'The page you are looking for does not exist or has moved. Go back to the delbueno™ Studio home page, our work or the journal to keep exploring.',
    },
    label: 'Error 404',
    heading: 'This page has moved or never existed.',
    lede: {
      before: 'Pick a way back in. If something you bookmarked is gone,',
      link: 'tell us',
      after: 'and we will point you to it.',
    },
    links: [
      { page: 'work', t: 'Work', d: 'Case studies for B2B SaaS and startups.' },
      { page: 'playground', t: 'Playground', d: 'Shots and motion experiments from Dribbble.' },
      { page: 'journal', t: 'Journal', d: 'Notes on designing complex software.' },
    ],
    more: { or: 'Or go', home: 'home', see: ', see our', services: 'services', or2: 'or', contact: 'get in touch' },
  },
  es: {
    meta: {
      title: 'Página no encontrada',
      description:
        'La página que buscas no existe o cambió de lugar. Vuelve al inicio de delbueno™ Studio, a nuestro trabajo o al blog para seguir explorando el sitio.',
    },
    label: 'Error 404',
    heading: 'Esta página cambió de lugar o nunca existió.',
    lede: {
      before: 'Elige por dónde volver. Si algo que guardaste ya no está,',
      link: 'avísanos',
      after: 'y te llevamos hasta ello.',
    },
    links: [
      { page: 'work', t: 'Trabajo', d: 'Casos de estudio para B2B SaaS y startups.' },
      { page: 'playground', t: 'Playground', d: 'Shots y experimentos de motion de Dribbble.' },
      { page: 'journal', t: 'Blog', d: 'Notas sobre cómo diseñar software complejo, en inglés.' },
    ],
    more: {
      or: 'O ve al',
      home: 'inicio',
      see: ', conoce nuestros',
      services: 'servicios',
      or2: 'o',
      contact: 'escríbenos',
    },
  },
};
