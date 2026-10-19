/**
 * Interface strings in Spanish (neutral Latin American, "tú"). Same keys as en.ts: the type is derived from it, so a
 * missing or extra key fails the type check.
 */
import type { en } from './en';

/** Same keys as `en`, any string values. */
export type Shape<T> = { [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

export const es: Shape<typeof en> = {
  brand: {
    tagline: 'Software que se explica solo.',
    speed: 'Empezamos hoy. Primeros conceptos en 48 horas.',
    description:
      'delbueno™ Studio es un estudio de diseño y desarrollo de producto para equipos B2B SaaS y startups, con sede en Punta del Este, Uruguay, que trabaja en remoto en horario de EE. UU.',
    kicker: 'Estudio de diseño de producto',
    siteLabel: 'Blog de {brand}',
  },
  founder: {
    jobTitle: 'Fundador',
    bio: 'Dani Bottaro es el fundador de delbueno™ Studio, un estudio de diseño y desarrollo de producto con sede en Punta del Este, Uruguay. Desde hace más de 10 años diseña productos B2B SaaS, dashboards y sitios web para startups y equipos enterprise, con trabajos para BigID, JFrog, NetApp y Palo Alto Networks. Escribe sobre UX para software complejo, productos de IA y sistemas de diseño.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    newTab: 'se abre en una pestaña nueva',
    homeLink: '{brand}, inicio',
    breadcrumb: 'Ruta de navegación',
  },
  nav: {
    primary: 'Principal',
    mobile: 'Móvil',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
    work: 'Trabajo',
    playground: 'Playground',
    services: 'Servicios',
    engagements: 'Modelos',
    stack: 'Tecnologías',
    journal: 'Blog',
    about: 'Nosotros',
  },
  lang: { inEnglish: 'En inglés', translated: 'Traducido del inglés' },
  footer: {
    blurb: 'Trabajamos en remoto, en horario de EE. UU.',
    explore: 'Explorar',
    studio: 'Estudio',
    contact: 'Contacto',
    elsewhere: 'En redes',
    about: 'Nosotros',
    careers: 'Trabaja con nosotros',
    contactPage: 'Contacto',
    audit: 'Auditoría UX gratis',
    terms: 'Términos',
    privacy: 'Privacidad',
    accessibility: 'Accesibilidad',
  },
  cta: {
    book: 'Agenda una llamada',
    book15: 'Agenda una llamada de 15 minutos',
    audit: 'Pide una auditoría UX gratis',
    or: 'o',
    next: 'Siguiente',
    bookAbout: 'Agenda una llamada sobre {name}',
  },
  pageName: {
    home: 'Inicio',
    work: 'Trabajo',
    playground: 'Playground',
    services: 'Servicios',
    engagements: 'Modelos de trabajo',
    stack: 'Tecnologías',
    industries: 'Industrias',
    about: 'Nosotros',
    contact: 'Contacto',
    journal: 'Blog',
    audit: 'Auditoría UX gratis',
    careers: 'Trabaja con nosotros',
    terms: 'Términos y condiciones',
    privacy: 'Política de privacidad',
    accessibility: 'Declaración de accesibilidad',
  },
  info: { legal: 'Legal', onThisPage: 'En esta página', lastUpdated: 'Última actualización: {date}' },
  journal: {
    latest: 'Lo último',
    minRead: '{n} min de lectura',
    read: 'Leer el artículo',
    all: 'Todos los artículos',
    empty: 'Pronto habrá artículos.',
  },
  faq: { heading: 'Preguntas frecuentes' },
  recognition: {
    label: 'Reconocimientos',
    googleLabel: 'Reseñas positivas',
    rated: 'Calificación de {score} sobre {outOf} en Google, {label}',
  },
  bookCta: { heading: '¿Tienes un producto que debería entenderse solo?' },
  process: { label: 'Proceso', step: 'Paso {n}', heading: 'Empezamos hoy. Conceptos en 48 horas.' },
};
