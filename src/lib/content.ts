import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'work'>;
export type JournalEntry = CollectionEntry<'journal'>;
export type ShotEntry = CollectionEntry<'shots'>;

/** Published case studies, ordered by the `order` field. */
export async function getWork(): Promise<WorkEntry[]> {
  const entries = await getCollection('work', (e) => !e.data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
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

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** Drop markdown image lines and collapse blank runs, for llms-full.txt. */
export function plainBody(body: string | undefined): string {
  return (body ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
