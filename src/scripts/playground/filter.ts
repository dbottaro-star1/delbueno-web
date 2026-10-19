/** Tag filter chips for the /playground/ grid. Cards stay in the DOM, filtered ones are hidden. */

export function initFilter(root: ParentNode = document): void {
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-shot-item]'));
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  if (!chips.length || !items.length) return;

  const apply = (tag: string) => {
    let n = 0;
    items.forEach((li) => {
      const show = tag === 'all' || (li.dataset.tags ?? '').split('|').includes(tag);
      li.hidden = !show;
      li.classList.remove('is-in');
      if (show) {
        n += 1;
        // restart the entrance animation
        void li.offsetWidth;
        li.classList.add('is-in');
      }
    });
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === tag)));
    if (status) {
      // The sentences come from the page (data-all, data-one, data-many) so they are in the page's language.
      const template = tag === 'all' ? status.dataset.all : n === 1 ? status.dataset.one : status.dataset.many;
      status.textContent = (template ?? '').replace('{n}', String(n)).replace('{tag}', tag);
    }
  };
  chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter ?? 'all')));
}
