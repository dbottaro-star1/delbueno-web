import { url } from './url';
import { getCollection, type CollectionEntry } from 'astro:content';
import { shotAltEs, shotTagsEs } from '../data/shots.es';
import type { Lang } from '../i18n/config';
import { formatLongDate } from '../i18n';
import { PAGES, POST_SLUGS } from '../i18n/routes';

/** A case study in either language. Spanish entries live in the `workEs` collection and carry `translationOf`. */
export type WorkEntry = CollectionEntry<'work'> | CollectionEntry<'workEs'>;
export type JournalEntry = CollectionEntry<'journal'>;
/** A Spanish translation of a journal post. Its id is the Spanish slug and `translationOf` names the English post. */
export type JournalEsEntry = CollectionEntry<'journalEs'>;
/** A journal post in either language. */
export type PostEntry = JournalEntry | JournalEsEntry;
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

/** Listed journal posts in English, newest first. Hidden (noindex) posts are left out of indexes, feeds and llms.txt. */
export async function getJournal(): Promise<JournalEntry[]> {
  return (await getAllJournal()).filter((e) => !e.data.noindex);
}

/** True for a Spanish translation, false for an English post. */
export const isSpanishPost = (entry: PostEntry): entry is JournalEsEntry => entry.collection === 'journalEs';

/** Site path of a post: the root for English, /es/blog/<slug>/ for a Spanish translation. */
export const postHref = (entry: PostEntry): string =>
  isSpanishPost(entry) ? `${PAGES.journal.es}${entry.id}/` : `/${entry.id}/`;

/**
 * The Spanish translations, newest first. They must match the table POST_SLUGS in src/i18n/routes.ts exactly (same
 * Spanish slug, same English original, and the original must exist), otherwise the language switcher and the hreflang
 * links would point at pages that do not exist, so the build fails with what is wrong.
 */
export async function getJournalEs(): Promise<JournalEsEntry[]> {
  const [english, spanish] = await Promise.all([getAllJournal(), getCollection('journalEs')]);
  const problems: string[] = [];
  for (const e of spanish) {
    const original = e.data.translationOf;
    if (!english.some((p) => p.id === original))
      problems.push(`${e.id}: translationOf "${original}" is not a journal post`);
    else if (POST_SLUGS[original] !== e.id) {
      problems.push(`${e.id}: POST_SLUGS maps "${original}" to "${POST_SLUGS[original] ?? 'nothing'}"`);
    }
  }
  for (const [original, slug] of Object.entries(POST_SLUGS)) {
    if (!spanish.some((e) => e.id === slug && e.data.translationOf === original)) {
      problems.push(
        `POST_SLUGS lists ${original} as ${slug}, but src/content/journal-es/${slug}.md does not translate it`,
      );
    }
  }
  if (problems.length) {
    throw new Error(`Spanish journal posts do not match POST_SLUGS in src/i18n/routes.ts:\n  ${problems.join('\n  ')}`);
  }
  return spanish.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** English posts in a language: each one is replaced by its Spanish translation when `lang` is Spanish and one exists. */
export async function inLang(posts: JournalEntry[], lang: Lang): Promise<PostEntry[]> {
  if (lang === 'en') return posts;
  const spanish = await getJournalEs();
  return posts.map((p) => spanish.find((e) => e.data.translationOf === p.id) ?? p);
}

/** Listed journal posts for a language, newest first. Spanish lists show translations where they exist. */
export async function getJournalFor(lang: Lang): Promise<PostEntry[]> {
  return inLang(await getJournal(), lang);
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
