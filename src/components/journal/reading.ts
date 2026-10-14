/** Journal helpers: reading time, categories and related posts. */
import type { Lang } from '../../i18n/config';
import { formatShortDate as formatShortLocalDate } from '../../i18n';
import { getJournal, type JournalEntry } from '../../lib/content';

/** Average adult reading speed used for every "min read" figure on the site. */
export const WORDS_PER_MINUTE = 230;

/** Words in a Markdown body, ignoring code blocks, images, link targets, HTML and Markdown syntax. */
export function wordCount(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[\s>#*+-]+/gm, ' ')
    .replace(/[*_`|~]+/g, ' ');
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Whole minutes to read a Markdown body (words / 230, rounded up, never below 1). */
export function readingMinutes(body: string | undefined): number {
  return Math.max(1, Math.ceil(wordCount(body) / WORDS_PER_MINUTE));
}

export const categorySlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export interface Category {
  name: string;
  slug: string;
  count: number;
}

/** Categories of the listed posts, largest first. */
export async function getCategories(): Promise<Category[]> {
  const posts = await getJournal();
  const map = new Map<string, Category>();
  for (const { data } of posts) {
    const slug = categorySlug(data.category);
    const current = map.get(slug) ?? { name: data.category, slug, count: 0 };
    current.count += 1;
    map.set(slug, current);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Up to `max` listed posts from the same category, newest first, topped up with the newest others. */
export async function getRelated(entry: JournalEntry, max = 3): Promise<JournalEntry[]> {
  const others = (await getJournal()).filter((e) => e.id !== entry.id);
  const same = others.filter((e) => e.data.category === entry.data.category);
  const rest = others.filter((e) => e.data.category !== entry.data.category);
  return [...same, ...rest].slice(0, max);
}

export const formatShortDate = (date: Date, lang: Lang = 'en'): string => formatShortLocalDate(date, lang);
