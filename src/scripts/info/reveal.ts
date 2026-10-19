/**
 * Scroll reveals shared by the inner pages: masked line reveals on [data-lines], clip-path image reveals on
 * [data-clip] and count-ups on [data-count]. Plain [data-reveal] fades are handled by motion.ts.
 *
 * Nothing runs for reduced motion (whenMotionReady never fires), so everything stays visible. The text of a
 * counter is its final value in the HTML, so it reads correctly without scripts.
 */
import { SplitText } from 'gsap/SplitText';
import { whenMotionReady, type Motion } from '../motion';

const all = <T extends HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));

export function initInfoReveals(): void {
  whenMotionReady((m) => {
    const { gsap } = m;
    gsap.registerPlugin(SplitText);
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      try {
        lines(m);
        clips(m);
        counts(m);
        m.ScrollTrigger.refresh();
      } catch (error) {
        console.error('Info reveals failed', error);
        gsap.set('[data-lines]', { opacity: 1 });
        document.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => (el.style.clipPath = 'none'));
      }
    };
    // SplitText measures lines, so wait for the display font. A timer covers browsers that never resolve it.
    (document.fonts?.ready ?? Promise.resolve()).then(run);
    window.setTimeout(run, 2500);
  });
}

function lines({ gsap }: Motion): void {
  all('[data-lines]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'ln',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { opacity: 1 });
        return gsap.fromTo(
          self.lines,
          { yPercent: 118 },
          {
            yPercent: 0,
            duration: 1.3,
            stagger: 0.09,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      },
    });
  });
}

function clips({ gsap, ScrollTrigger }: Motion): void {
  all('[data-clip]').forEach((el) => {
    const img = el.querySelector('img');
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0% round 14px)' });
    if (img) gsap.set(img, { scale: 1.25 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0% round 14px)',
          duration: 1.4,
          ease: 'expo.out',
          onComplete: () => {
            el.style.clipPath = 'none';
          },
        });
        if (img) gsap.to(img, { scale: 1, duration: 1.9, ease: 'expo.out' });
      },
    });
  });
}

function counts({ gsap, ScrollTrigger }: Motion): void {
  all('[data-count]').forEach((el) => {
    const to = parseFloat(el.dataset.count ?? '0');
    const dec = parseInt(el.dataset.dec || '0', 10);
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(o, { v: to, duration: 2.2, ease: 'power4.out', onUpdate: () => (el.textContent = o.v.toFixed(dec)) }),
    });
  });
}
