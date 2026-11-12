/**
 * Vasija, the Kabbalah app (iOS and Android), published by delbueno SAS with the method of Kevin Jakter.
 * Its pages live under /kabbalah/: a landing with the waitlist, and the privacy, support and account deletion pages
 * that the App Store and Google Play ask for. They are Spanish only (Rioplatense, "vos"), like the app.
 *
 * Name agreed with Kevin on 12 Nov 2026. Brand: the "Tikún" mark with the full name on the web and social media
 * (src/components/kabbalah/LogoVasija.astro), the "Recibir" mark as the app icon and favicon.
 */

export const APP = {
  name: 'Vasija',
  tagline: 'Kabbalah cotidiana',
  /** Full name next to the logo, on the web and in social media materials. */
  fullName: 'Vasija - Kabbalah cotidiana',
  /** Name in the stores (App Store and Google Play). */
  storeName: 'Vasija: Kabbalah cotidiana',
  /** Title of Kevin's workbook, the method behind the app. */
  workbook: 'Kabbalah aplicada a tu vida cotidiana',
  teacher: 'Kevin Jakter',
  /** Legal publisher of the app in the stores. */
  publisher: 'delbueno SAS',
  publisherCountry: 'Uruguay',
  /** Support, privacy requests and account deletion. */
  email: 'hello@delbuenostudio.com',
  /** Date shown on the legal pages. Update it whenever their content changes. */
  legalUpdated: '6 de noviembre de 2026',
} as const;

export const KABBALAH_PATHS = {
  home: '/kabbalah/',
  privacy: '/kabbalah/privacidad/',
  support: '/kabbalah/soporte/',
  deleteAccount: '/kabbalah/borrar-cuenta/',
} as const;

export type EnergiaId =
  'keter' | 'jojma' | 'bina' | 'daat' | 'jesed' | 'gevura' | 'tiferet' | 'netzaj' | 'hod' | 'yesod' | 'maljut';

export interface Energia {
  id: EnergiaId;
  nombre: string;
  hebreo: string;
  /** The area of life it works on, as the workbook's radar names it. */
  area: string;
  zona: 1 | 2 | 3;
}

/** The ten energies of the Tree of Life, from the bottom up, plus Daat. */
export const ENERGIAS: readonly Energia[] = [
  { id: 'maljut', nombre: 'Maljut', hebreo: 'מלכות', area: 'Lo material', zona: 1 },
  { id: 'yesod', nombre: 'Yesod', hebreo: 'יסוד', area: 'Los vínculos', zona: 1 },
  { id: 'hod', nombre: 'Hod', hebreo: 'הוד', area: 'La palabra', zona: 1 },
  { id: 'netzaj', nombre: 'Netzaj', hebreo: 'נצח', area: 'La pasión', zona: 1 },
  { id: 'jesed', nombre: 'Jesed', hebreo: 'חסד', area: 'Dar', zona: 2 },
  { id: 'gevura', nombre: 'Gevurá', hebreo: 'גבורה', area: 'Los límites', zona: 2 },
  { id: 'tiferet', nombre: 'Tiferet', hebreo: 'תפארת', area: 'La autoestima', zona: 2 },
  { id: 'bina', nombre: 'Biná', hebreo: 'בינה', area: 'La mente', zona: 3 },
  { id: 'jojma', nombre: 'Jojmá', hebreo: 'חכמה', area: 'La intuición', zona: 3 },
  { id: 'keter', nombre: 'Keter', hebreo: 'כתר', area: 'El sentido', zona: 3 },
];

export const DAAT: Energia = { id: 'daat', nombre: 'Daat', hebreo: 'דעת', area: 'El hilo que une todo', zona: 3 };

export const ZONAS = [
  { n: 1, nombre: 'Tu yo con el mundo' },
  { n: 2, nombre: 'Tu yo interior emocional' },
  { n: 3, nombre: 'Tu yo mental y espiritual' },
] as const;
