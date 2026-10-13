/** Whole sentences from the start of a text, up to a character limit, for meta descriptions. */
export function metaDescription(text: string, limit = 160): string {
  if (text.length <= limit) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [text];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > limit) break;
    out += sentence;
  }
  if (out) return out.trim();
  const cut = text.slice(0, limit - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '.';
}
