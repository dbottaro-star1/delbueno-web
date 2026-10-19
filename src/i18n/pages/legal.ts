/** Shape of a legal page. Text uses the inline markup of ../rich.ts and {brand}, {email} placeholders. */
export type LegalBlock = { p: string } | { ul: string[] };

export interface LegalPage {
  meta: { title: string; description: string };
  title: string;
  lede: string;
  sections: { id: string; title: string; blocks: LegalBlock[] }[];
}

/** Date shown as "Last updated" on every legal page. Change it when the text of a legal page changes. */
export const LEGAL_UPDATED = new Date('2026-10-13T00:00:00Z');
