/**
 * Service pages signature moment: the process ruler fills as you scroll. Today, 24h and 48h light up in turn, then the
 * line branches into the deliverables. On phones the same story runs down a vertical rail.
 */
import type { Motion } from '../motion';

export function initProcess({ gsap, ScrollTrigger }: Motion): void {
  const sec = document.querySelector<HTMLElement>('[data-process]');
  if (!sec) return;
  const list = sec.querySelector<HTMLElement>('.proc-list');
  const rect = sec.querySelector<SVGRectElement>('#procClipRect');
  const fill = sec.querySelector<HTMLElement>('#procFill');
  const steps = Array.from(sec.querySelectorAll<HTMLElement>('.proc-step'));
  if (!list) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 761px)', () => {
    if (rect) rect.setAttribute('width', '0');
    const st = ScrollTrigger.create({
      trigger: list,
      start: 'top 78%',
      end: 'top 22%',
      scrub: 0.4,
      onUpdate(self) {
        const x = Math.min(1, self.progress / 0.9) * 1000;
        rect?.setAttribute('width', String(x));
        steps.forEach((step, i) => step.classList.toggle('is-on', x >= i * 250 && self.progress > 0.01));
      },
    });
    return () => {
      st.kill();
      rect?.setAttribute('width', '1000');
      steps.forEach((step) => step.classList.remove('is-on'));
    };
  });

  mm.add('(max-width: 760px)', () => {
    if (fill) gsap.set(fill, { scaleY: 0 });
    const st = ScrollTrigger.create({
      trigger: list,
      start: 'top 70%',
      end: 'bottom 62%',
      scrub: 0.4,
      onUpdate(self) {
        if (fill) gsap.set(fill, { scaleY: self.progress });
        const h = list.offsetHeight;
        steps.forEach((step) => step.classList.toggle('is-on', self.progress * h >= step.offsetTop - 4));
      },
    });
    return () => {
      st.kill();
      steps.forEach((step) => step.classList.remove('is-on'));
    };
  });
}
