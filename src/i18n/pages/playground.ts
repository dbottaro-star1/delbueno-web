import type { Localized } from '../config';

export interface PlaygroundCopy {
  meta: { title: string; description: string };
  label: string;
  heading: string;
  lede: string;
  follow: string;
  shots: string;
  filterGroup: string;
  all: string;
  /** Live region text. {n} is the number of shots, {tag} the selected tag. */
  statusAll: string;
  statusOne: string;
  statusMany: string;
  empty: string;
  bookCta: string;
  /** Shot card and lightbox strings. */
  card: { dribbbleShot: string; motion: string };
  lightbox: { close: string; view: string; prev: string; next: string };
}

export const playgroundCopy: Localized<PlaygroundCopy> = {
  en: {
    meta: {
      title: 'Playground: UI explorations and motion studies',
      description:
        'Small experiments, UI explorations and motion studies from delbueno™ Studio. The quick stuff between the big projects, shared on our Dribbble profile.',
    },
    label: 'Dribbble shots',
    heading: 'Playground',
    lede: 'Small experiments, UI explorations and motion studies. The quick stuff between the big projects.',
    follow: 'Follow on Dribbble',
    shots: 'Shots',
    filterGroup: 'Filter shots by tag',
    all: 'All',
    statusAll: 'Showing all {n} shots',
    statusOne: 'Showing {n} shot tagged {tag}',
    statusMany: 'Showing {n} shots tagged {tag}',
    empty: 'New shots are on the way.',
    bookCta: 'Like what you see? Book a call.',
    card: { dribbbleShot: 'Dribbble shot', motion: 'Motion' },
    lightbox: {
      close: 'Close preview',
      view: 'View on Dribbble',
      prev: 'Previous shot',
      next: 'Next shot',
    },
  },
  es: {
    meta: {
      title: 'Playground: exploraciones de UI y estudios de motion',
      description:
        'Experimentos pequeños, exploraciones de UI y estudios de motion de delbueno™ Studio. Lo rápido que hacemos entre proyectos grandes, en Dribbble.',
    },
    label: 'Shots de Dribbble',
    heading: 'Playground',
    lede: 'Experimentos pequeños, exploraciones de UI y estudios de motion. Lo rápido que hacemos entre los proyectos grandes.',
    follow: 'Síguenos en Dribbble',
    shots: 'Shots',
    filterGroup: 'Filtrar shots por etiqueta',
    all: 'Todos',
    statusAll: 'Mostrando los {n} shots',
    statusOne: 'Mostrando {n} shot con la etiqueta {tag}',
    statusMany: 'Mostrando {n} shots con la etiqueta {tag}',
    empty: 'Pronto habrá shots nuevos.',
    bookCta: '¿Te gusta lo que ves? Agenda una llamada.',
    card: { dribbbleShot: 'shot de Dribbble', motion: 'Motion' },
    lightbox: {
      close: 'Cerrar vista previa',
      view: 'Ver en Dribbble',
      prev: 'Shot anterior',
      next: 'Siguiente shot',
    },
  },
};
