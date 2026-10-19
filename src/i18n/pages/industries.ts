import type { Localized } from '../config';

export interface IndustriesCopy {
  index: {
    meta: { title: string; description: string };
    answer: string;
    label: string;
    heading: string;
    listLabel: string;
    beyondLabel: string;
    beyondHeading: string;
    beyondSub: string;
    ctaHeading: string;
  };
  detail: {
    label: string;
    secondary: string;
    problemsLabel: string;
    /** {name} is the industry name. */
    problemsHeading: string;
    designLabel: string;
    designHeading: string;
    casesLabel: string;
    casesHeading: string;
    postsLabel: string;
    postsHeading: string;
    allPosts: string;
    otherLabel: string;
    otherHeading: string;
  };
}

export const industriesCopy: Localized<IndustriesCopy> = {
  en: {
    index: {
      meta: {
        title: 'Industries: Cloud, Security, DevOps, AI, Fintech',
        description:
          'delbueno™ Studio designs complex B2B software for cloud, cybersecurity, DevOps, AI and fintech teams. See the typical problems in each domain.',
      },
      answer:
        'delbueno™ Studio designs complex B2B software for five industries: cloud, cybersecurity, DevOps, AI and fintech. These are products where the interface carries real complexity, from alert queues and permission models to agent approvals and irreversible payments. Each page below covers the typical problems and the work we have done.',
      label: 'Where we specialize',
      heading: 'Software where the interface carries real complexity.',
      listLabel: 'Industries we design for',
      beyondLabel: 'Beyond the five',
      beyondHeading: 'Not on the list? Ask.',
      beyondSub: 'The same approach has worked in other sectors. Here is the range of the case studies.',
      ctaHeading: 'Building in one of these? Let’s talk.',
    },
    detail: {
      label: 'Industry',
      secondary: 'See our services',
      problemsLabel: 'Typical problems',
      problemsHeading: 'What goes wrong in {name}.',
      designLabel: 'What we design',
      designHeading: 'The screens that carry the weight.',
      casesLabel: 'Related work',
      casesHeading: 'Work behind this page.',
      postsLabel: 'From the blog',
      postsHeading: 'Go deeper.',
      allPosts: 'All blog posts',
      otherLabel: 'Other industries',
      otherHeading: 'Also in our field.',
    },
  },
  es: {
    index: {
      meta: {
        title: 'Industrias: nube, ciberseguridad, DevOps, IA y fintech',
        description:
          'delbueno™ Studio diseña software B2B complejo para equipos de nube, ciberseguridad, DevOps, IA y fintech. Mira los problemas típicos de cada ámbito.',
      },
      answer:
        'delbueno™ Studio diseña software B2B complejo para cinco industrias: nube, ciberseguridad, DevOps, IA y fintech. Son productos donde la interfaz carga con una complejidad real, desde colas de alertas y modelos de permisos hasta aprobaciones de agentes y pagos irreversibles. Cada página de abajo cuenta los problemas típicos y el trabajo que hemos hecho.',
      label: 'En qué nos especializamos',
      heading: 'Software donde la interfaz carga con una complejidad real.',
      listLabel: 'Industrias para las que diseñamos',
      beyondLabel: 'Más allá de las cinco',
      beyondHeading: '¿Tu sector no está en la lista? Pregúntanos.',
      beyondSub: 'El mismo enfoque ha funcionado en otros sectores. Este es el abanico de los casos de estudio.',
      ctaHeading: '¿Construyes en una de estas industrias? Hablemos.',
    },
    detail: {
      label: 'Industria',
      secondary: 'Ver nuestros servicios',
      problemsLabel: 'Problemas típicos',
      problemsHeading: 'Qué sale mal en {name}.',
      designLabel: 'Qué diseñamos',
      designHeading: 'Las pantallas que cargan con el peso.',
      casesLabel: 'Trabajo relacionado',
      casesHeading: 'El trabajo detrás de esta página.',
      postsLabel: 'Del blog',
      postsHeading: 'Profundiza.',
      allPosts: 'Todos los artículos del blog',
      otherLabel: 'Otras industrias',
      otherHeading: 'También en nuestro campo.',
    },
  },
};
