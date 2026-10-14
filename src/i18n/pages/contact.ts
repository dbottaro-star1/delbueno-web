import type { Localized } from '../config';

export interface ContactCopy {
  meta: { title: string; description: string; schemaName: string };
  eyebrow: string;
  title: string;
  lede: string;
  bookNote: string;
  writeLabel: string;
  emailAria: string;
  mailSubject: string;
  copy: { idle: string; done: string; ok: string; fail: string };
  openMail: string;
  expectLabel: string;
  expectHeading: string;
  expect: { k: string; t: string; d: string }[];
  whereLabel: string;
  /** The live clock sits between `before` and `after`. */
  where: { before: string; after: string };
}

export const contactCopy: Localized<ContactCopy> = {
  en: {
    meta: {
      title: 'Contact: Book a 15 Minute Call',
      description:
        'Book a 15 minute call with delbueno™ Studio or write to hello@delbuenostudio.com. Same day kickoff, first concepts in 48 hours, synced with US hours.',
      schemaName: 'Contact {brand}',
    },
    eyebrow: 'Contact / Talk to us',
    title: 'You are one message away.',
    lede: 'Tell us what you are building. The fastest way to start is a 15 minute call, or write to us and we will reply.',
    bookNote: '15 minutes, booked on Lemcal.',
    writeLabel: 'Or write to us',
    emailAria: 'Email {email}',
    mailSubject: 'Hello delbueno',
    copy: {
      idle: 'Copy email',
      done: 'Copied',
      ok: 'Email address copied to the clipboard.',
      fail: 'Copy is not available here. Use the email link instead.',
    },
    openMail: 'Open in your mail app',
    expectLabel: 'What to expect',
    expectHeading: 'Fast, and in your time zone.',
    expect: [
      {
        k: 'Same day',
        t: 'Kickoff',
        d: 'One focused call to align on goals and scope. We start the moment we hang up.',
      },
      {
        k: '48 hours',
        t: 'First concepts',
        d: 'High-fidelity concepts to react to, not weeks of waiting for a big reveal.',
      },
      {
        k: 'GMT-3',
        t: 'Synced with US hours',
        d: 'We work from Uruguay on Latin America time, so your day and ours overlap.',
      },
    ],
    whereLabel: 'Where we are',
    where: { before: 'Remote first, GMT-3. It is', after: 'here right now.' },
  },
  es: {
    meta: {
      title: 'Contacto: agenda una llamada de 15 minutos',
      description:
        'Agenda una llamada de 15 minutos con delbueno™ Studio o escribe a hello@delbuenostudio.com. Arranque el mismo día y primeros conceptos en 48 horas.',
      schemaName: 'Contacto con {brand}',
    },
    eyebrow: 'Contacto / Habla con nosotros',
    title: 'Estás a un mensaje de distancia.',
    lede: 'Cuéntanos qué estás construyendo. La forma más rápida de empezar es una llamada de 15 minutos, o escríbenos y te respondemos.',
    bookNote: '15 minutos, agendados en Lemcal.',
    writeLabel: 'O escríbenos',
    emailAria: 'Escribir a {email}',
    mailSubject: 'Hola delbueno',
    copy: {
      idle: 'Copiar correo',
      done: 'Copiado',
      ok: 'Dirección de correo copiada al portapapeles.',
      fail: 'Copiar no está disponible aquí. Usa el enlace de correo.',
    },
    openMail: 'Abrir en tu app de correo',
    expectLabel: 'Qué esperar',
    expectHeading: 'Rápido y en tu huso horario.',
    expect: [
      {
        k: 'El mismo día',
        t: 'Arranque',
        d: 'Una llamada enfocada para alinear objetivos y alcance. Empezamos en cuanto colgamos.',
      },
      {
        k: '48 horas',
        t: 'Primeros conceptos',
        d: 'Conceptos en alta fidelidad sobre los que opinar, sin semanas de espera por una gran revelación.',
      },
      {
        k: 'GMT-3',
        t: 'En horario de EE. UU.',
        d: 'Trabajamos desde Uruguay en horario de Latinoamérica, así que tu día y el nuestro se superponen.',
      },
    ],
    whereLabel: 'Dónde estamos',
    where: { before: 'Remoto primero, GMT-3. Ahora son las', after: 'aquí.' },
  },
};
