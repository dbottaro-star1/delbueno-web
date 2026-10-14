import { url } from './url';
import { getCollection, type CollectionEntry } from 'astro:content';
import { shotAltEs, shotTagsEs } from '../data/shots.es';
import type { Lang } from '../i18n/config';
import { formatLongDate } from '../i18n';

/** A case study in either language. Spanish entries live in the `workEs` collection and carry `translationOf`. */
export type WorkEntry = CollectionEntry<'work'> | CollectionEntry<'workEs'>;
export type JournalEntry = CollectionEntry<'journal'>;
export type ShotEntry = CollectionEntry<'shots'>;

/** Slug of the case study in the URL: the same in both languages (the Spanish file names its English original). */
export const workSlug = (entry: WorkEntry): string =>
  'translationOf' in entry.data ? entry.data.translationOf : entry.id;

/**
 * Published case studies in a language, ordered by the `order` field. The Spanish set must match the English one
 * exactly, otherwise the language switcher and hreflang links would point at pages that do not exist, so the build
 * fails with the name of the case study that is missing.
 */
export async function getWork(lang: Lang = 'en'): Promise<WorkEntry[]> {
  if (lang === 'en') {
    const entries = await getCollection('work', (e) => !e.data.draft);
    return entries.sort((a, b) => a.data.order - b.data.order);
  }
  const [english, spanish] = await Promise.all([getWork('en'), getCollection('workEs', (e) => !e.data.draft)]);
  const translated = new Set(spanish.map((e) => e.data.translationOf));
  const missing = english.filter((e) => !translated.has(e.id)).map((e) => e.id);
  const orphans = spanish.filter((e) => !english.some((en) => en.id === e.data.translationOf)).map((e) => e.id);
  if (missing.length || orphans.length) {
    throw new Error(
      `Spanish case studies do not match the English ones. Missing in src/content/work-es: ${missing.join(', ') || 'none'}. ` +
        `Without an English original: ${orphans.join(', ') || 'none'}.`,
    );
  }
  return spanish.sort((a, b) => a.data.order - b.data.order);
}

/** All Dribbble shots in the order set by their `order` field. */
export async function getShots(): Promise<ShotEntry[]> {
  const entries = await getCollection('shots');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** Shots for the homepage strip: featured first, then the rest, each group by `order`. */
export async function getHomeShots(max = 12): Promise<ShotEntry[]> {
  const all = await getShots();
  return [...all.filter((s) => s.data.featured), ...all.filter((s) => !s.data.featured)].slice(0, max);
}

/** Every journal post, newest first, including hidden (noindex) ones. Use for routing only. */
export async function getAllJournal(): Promise<JournalEntry[]> {
  const entries = await getCollection('journal');
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Listed journal posts, newest first. Hidden (noindex) posts are left out of indexes, feeds and llms.txt. */
export async function getJournal(): Promise<JournalEntry[]> {
  return (await getAllJournal()).filter((e) => !e.data.noindex);
}

export function formatDate(date: Date, lang: Lang = 'en'): string {
  return formatLongDate(date, lang);
}

/** Drop markdown image lines and collapse blank runs, for llms-full.txt. */
export function plainBody(body: string | undefined): string {
  return (body ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Alt text and tags of a shot in a language. Titles are Dribbble's and stay as published. */
export function shotText(shot: ShotEntry, lang: Lang): { alt: string; tags: string[] } {
  if (lang === 'en') return { alt: shot.data.imageAlt, tags: shot.data.tags };
  return {
    alt: shotAltEs[shot.id] ?? shot.data.imageAlt,
    tags: shot.data.tags.map((tag) => shotTagsEs[tag] ?? tag),
  };
}

/** Public URL for a shot video: local files get the base path, CDN links pass through. */
export function shotVideoSrc(video: string | undefined): string | undefined {
  if (!video) return undefined;
  return /^https:\/\//.test(video) ? video : url(`/${video}`);
}
