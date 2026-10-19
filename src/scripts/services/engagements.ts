/**
 * /engagements/ signature moment: the comparison rows reveal one by one, and the recommended path (Launch Sprint, then
 * Design Partner) draws itself in the gradient. Also drives the path arrow and the request loop.
 */
import type { Motion } from '../motion';

export function initEngagements({ gsap, ScrollTrigger }: Motion): void {
  const cmp = document.querySelector<HTMLElement>('[data-cmp]');
  if (cmp) {
    const rows = Array.from(cmp.querySelectorAll<HTMLElement>('.cmp-row'));
    const mm = gsap.matchMedia();
    mm.add('(min-width: 861px)', () => {
      gsap.set(
        rows.flatMap((row) => Array.from(row.children)),
        { opacity: 0, y: 26 },
      );
      ScrollTrigger.batch(rows, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          batch.forEach((row, i) =>
            gsap.to(Array.from(row.children), {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.07,
              ease: 'expo.out',
              delay: i * 0.05,
              clearProps: 'transform',
            }),
          ),
      });
    });

    const bars = Array.from(cmp.querySelectorAll<HTMLElement>('.cmp-bar'));
    ScrollTrigger.create({
      trigger: cmp,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(bars, { scaleX: 1, duration: 1.4, stagger: 0.5, ease: 'expo.inOut' }),
    });
  }

  const path = document.querySelector<HTMLElement>('[data-path]');
  if (path) {
    const line = path.querySelector<HTMLElement>('#pthLine');
    const head = path.querySelector<HTMLElement>('#pthHead');
    const nodes = Array.from(path.querySelectorAll<HTMLElement>('.pth-node'));
    ScrollTrigger.create({
      trigger: path,
      start: 'top 78%',
      end: 'bottom 55%',
      scrub: 0.4,
      onUpdate(self) {
        const p = self.progress;
        if (line) gsap.set(line, { scaleX: Math.min(1, p / 0.8) });
        if (head) gsap.set(head, { opacity: p > 0.78 ? 1 : 0 });
        nodes[0]?.classList.toggle('is-on', p > 0.02);
        nodes[1]?.classList.toggle('is-on', p > 0.8);
      },
    });
  }

  const flow = document.querySelector<HTMLElement>('[data-flow]');
  if (flow) {
    const rect = flow.querySelector<SVGRectElement>('#rfClipRect');
    const head = flow.querySelector<HTMLElement>('#rfHead');
    const body = flow.querySelector<HTMLElement>('.rf-body');
    if (rect && body) {
      ScrollTrigger.create({
        trigger: body,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 0.4,
        onUpdate(self) {
          const w = Math.min(1, self.progress / 0.9) * 1000;
          rect.setAttribute('x', String(1000 - w));
          rect.setAttribute('width', String(w));
          if (head) gsap.set(head, { opacity: self.progress > 0.88 ? 1 : 0 });
        },
      });
    }
  }
}
