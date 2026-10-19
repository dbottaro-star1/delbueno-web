/**
 * Journal post behaviour: reading progress bar, table of contents tracking and the collapsible contents panel.
 * Plain scroll listeners on purpose: progress is information, so it also works with reduced motion.
 */
const DESKTOP = '(min-width: 1100px)';

export function initPost(): void {
  const article = document.querySelector<HTMLElement>('[data-post-body]');
  if (!article) return;
  const bar = document.querySelector<HTMLElement>('[data-read-bar]');
  const pct = document.querySelector<HTMLElement>('[data-read-pct]');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((el): el is HTMLElement => !!el);

  /* ---- contents panel: open and pinned on desktop, collapsed on mobile ---- */
  const box = document.querySelector<HTMLDetailsElement>('[data-toc-box]');
  if (box) {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => {
      box.open = mq.matches;
      const summary = box.querySelector('summary');
      if (summary) summary.tabIndex = mq.matches ? -1 : 0;
    };
    sync();
    mq.addEventListener('change', sync);
    // Choosing a section on a phone closes the panel so the text is visible.
    links.forEach((a) => a.addEventListener('click', () => !mq.matches && (box.open = false)));
  }

  /* ---- progress and current section ---- */
  let ticking = false;
  let current = -1;
  const update = () => {
    ticking = false;
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.6;
    const progress = total > 0 ? Math.min(1, Math.max(0, (window.innerHeight * 0.2 - rect.top) / total)) : 1;
    if (bar) bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    if (pct) pct.textContent = String(Math.round(progress * 100));

    let index = -1;
    const line = window.innerHeight * 0.3;
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].getBoundingClientRect().top <= line) index = i;
      else break;
    }
    if (index !== current) {
      current = index;
      links.forEach((a, i) =>
        i === index ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'),
      );
    }
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

initPost();
