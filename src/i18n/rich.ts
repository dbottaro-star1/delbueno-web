/**
 * Tiny inline markup for copy that lives in data files, so legal pages can keep their links and bold text without
 * HTML strings (and without `set:html`, which the lint rules ban):
 *
 *   **bold**              a <strong>
 *   [label](key)          a link; `key` is looked up in the links the page passes to <Rich>
 *
 * The parser only produces plain nodes. Components render them as elements, so nothing in the copy can inject markup.
 */
export type RichNode =
  { type: 'text'; value: string } | { type: 'strong'; value: string } | { type: 'link'; label: string; key: string };

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([\w-]+)\)/g;

export function parseRich(text: string): RichNode[] {
  const nodes: RichNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push({ type: 'text', value: text.slice(last, index) });
    if (match[1] !== undefined) nodes.push({ type: 'strong', value: match[1] });
    else nodes.push({ type: 'link', label: match[2], key: match[3] });
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push({ type: 'text', value: text.slice(last) });
  return nodes;
}
