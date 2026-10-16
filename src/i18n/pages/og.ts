import type { Localized } from '../config';
import type { PageKey } from '../routes';

/** Text of the generated social card for each static page, in each language. See src/lib/og.ts. */
export const OG_STATIC: { page: PageKey; kicker: Localized<string>; title: Localized<string> }[] = [
  {
    page: 'home',
    kicker: { en: 'Product design studio', es: 'Estudio de diseño de producto' },
    title: { en: 'Software that feels obvious.', es: 'Software que se explica solo.' },
  },
  {
    page: 'work',
    kicker: { en: 'Work', es: 'Trabajo' },
    title: {
      en: 'Case studies in B2B SaaS and product design.',
      es: 'Casos de estudio en B2B SaaS y diseño de producto.',
    },
  },
  {
    page: 'playground',
    kicker: { en: 'Playground', es: 'Playground' },
    title: { en: 'UI explorations and motion studies.', es: 'Exploraciones de UI y estudios de motion.' },
  },
  {
    page: 'services',
    kicker: { en: 'Services', es: 'Servicios' },
    title: { en: 'Strategy, design, web and build.', es: 'Estrategia, diseño, web y desarrollo.' },
  },
  {
    page: 'engagements',
    kicker: { en: 'Engagements', es: 'Modelos de trabajo' },
    title: { en: 'Three ways to work together.', es: 'Tres formas de trabajar juntos.' },
  },
  {
    page: 'stack',
    kicker: { en: 'Tech stack', es: 'Tecnologías' },
    title: {
      en: 'The tools behind our design and code.',
      es: 'Las herramientas detrás de nuestro diseño y código.',
    },
  },
  {
    page: 'industries',
    kicker: { en: 'Industries', es: 'Industrias' },
    title: {
      en: 'Cloud, cybersecurity, DevOps, AI and fintech.',
      es: 'Nube, ciberseguridad, DevOps, IA y fintech.',
    },
  },
  {
    page: 'about',
    kicker: { en: 'About', es: 'Nosotros' },
    title: {
      en: 'A product design studio working in US hours.',
      es: 'Un estudio de diseño de producto en horario de EE. UU.',
    },
  },
  {
    page: 'contact',
    kicker: { en: 'Contact', es: 'Contacto' },
    title: { en: 'Book a call or write to us.', es: 'Agenda una llamada o escríbenos.' },
  },
  {
    page: 'journal',
    kicker: { en: 'Blog', es: 'Blog' },
    title: { en: 'Notes on designing complex software.', es: 'Notas sobre cómo diseñar software complejo.' },
  },
  {
    page: 'audit',
    kicker: { en: 'Free UX audit', es: 'Auditoría UX gratis' },
    title: {
      en: 'A 3 point plan for your product in 48 hours.',
      es: 'Un plan de 3 puntos para tu producto en 48 horas.',
    },
  },
  {
    page: 'careers',
    kicker: { en: 'Careers', es: 'Trabaja con nosotros' },
    title: {
      en: 'Not hiring right now, but we read every portfolio.',
      es: 'No estamos contratando ahora, pero leemos cada portafolio.',
    },
  },
  {
    page: 'terms',
    kicker: { en: 'Legal', es: 'Legal' },
    title: { en: 'Terms and conditions.', es: 'Términos y condiciones.' },
  },
  {
    page: 'privacy',
    kicker: { en: 'Legal', es: 'Legal' },
    title: { en: 'Privacy policy.', es: 'Política de privacidad.' },
  },
  {
    page: 'accessibility',
    kicker: { en: 'Legal', es: 'Legal' },
    title: { en: 'Accessibility statement.', es: 'Declaración de accesibilidad.' },
  },
];

/** Kicker above the service and industry cards. */
export const OG_SECTION: Record<'services' | 'industries', Localized<string>> = {
  services: { en: 'Services', es: 'Servicios' },
  industries: { en: 'Industries', es: 'Industrias' },
};
