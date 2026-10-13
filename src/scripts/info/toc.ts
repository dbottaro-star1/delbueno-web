/**
 * Section index for long text pages (the legal pages). Marks the section being read and keeps the index collapsed
 * on narrow screens and open and pinned on desktop. Plain scroll listener, so it also works with reduced motion.
 */
const DESKTOP = '(min-width: 1100px)';

export function initToc(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy-link]'));
  if (!links.length) return;
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))));

  const box = document.querySelector<HTMLDetailsElement>('[data-spy-box]');
  if (box) {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => {
      box.open = mq.matches;
      const summary = box.querySelector('summary');
      if (summary) summary.tabIndex = mq.matches ? -1 : 0;
    };
    sync();
    mq.addEventListener('change', sync);
    links.forEach((a) => a.addEventListener('click', () => !mq.matches && (box.open = false)));
  }

  let ticking = false;
  let current = -1;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.3;
    let index = -1;
    targets.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= line) index = i;
    });
    if (index === current) return;
    current = index;
    links.forEach((a, i) => (i === index ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
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
