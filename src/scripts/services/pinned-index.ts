/**
 * /services/ signature moment. On wide screens the four disciplines are a list that stays pinned while you scroll:
 * the active service lights up, its hairline illustration draws itself and its description swaps in.
 * On phones and tablets (and with reduced motion) it is four plain stacked blocks, each drawing when it scrolls in.
 */
import type { Motion } from '../motion';

export function initPinnedIndex({ gsap, ScrollTrigger }: Motion): void {
  const sec = document.querySelector<HTMLElement>('[data-idx]');
  if (!sec) return;
  const items = Array.from(sec.querySelectorAll<HTMLElement>('.idx-item'));
  const bar = sec.querySelector<HTMLElement>('.idx-bar i');

  const draw = (item: HTMLElement, on: boolean) => item.querySelector('.art-draw')?.classList.toggle('is-drawn', on);

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (min-height: 600px)', () => {
    sec.classList.add('idx-on');
    let current = -1;
    const setActive = (i: number) => {
      if (i === current) return;
      current = i;
      items.forEach((item, k) => {
        item.classList.toggle('is-active', k === i);
        draw(item, k === i);
      });
    };
    setActive(0);

    const st = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        setActive(Math.min(items.length - 1, Math.floor(self.progress * items.length)));
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    // Keyboard users tabbing through the names follow along.
    const offs = items.map((item, i) => {
      const onFocus = () => setActive(i);
      item.addEventListener('focusin', onFocus);
      return () => item.removeEventListener('focusin', onFocus);
    });

    return () => {
      st.kill();
      offs.forEach((off) => off());
      sec.classList.remove('idx-on');
      items.forEach((item) => item.classList.remove('is-active'));
      if (bar) bar.style.transform = '';
    };
  });

  mm.add('(max-width: 1023px), (max-height: 599px)', () => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          draw(entry.target as HTMLElement, true);
          io.unobserve(entry.target);
        }),
      { threshold: 0.3 },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  });
}
