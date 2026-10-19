/**
 * Entry for the services, industries and engagements pages. Runs the shared reveals, then whichever signature
 * moment the page has (pinned service index, process diagram, industry art, comparison table).
 *
 * Reduced motion never reaches this code: whenMotionReady only fires when the motion engine exists. Everything
 * is visible without it.
 */
import { SplitText } from 'gsap/SplitText';
import { whenMotionReady, type Motion } from '../motion';
import { initEngagements } from './engagements';
import { initIndustryArt } from './industry-art';
import { initPinnedIndex } from './pinned-index';
import { initProcess } from './process';

const root = document.documentElement;

function reveals({ gsap, ScrollTrigger }: Motion): void {
  gsap.registerPlugin(SplitText);

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const hero = Boolean(el.closest('.in-hero'));
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
            duration: hero ? 1.5 : 1.3,
            stagger: 0.09,
            ease: 'expo.out',
            delay: hero ? 0.1 : 0,
            scrollTrigger: hero ? undefined : { trigger: el, start: 'top 86%', once: true },
          },
        );
      },
    });
  });

  // hero copy fades in with the headline, everything else as it scrolls into view
  const heroItems = gsap.utils.toArray<HTMLElement>('.in-hero [data-rv]');
  gsap.fromTo(
    heroItems,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', delay: 0.45, clearProps: 'transform' },
  );
  const rest = gsap.utils.toArray<HTMLElement>('[data-rv]').filter((el) => !el.closest('.in-hero'));
  ScrollTrigger.batch(rest, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', overwrite: true, clearProps: 'transform' },
      ),
  });

  // case image reveal: a clip-path wipe, so the card text never waits for the image
  gsap.utils.toArray<HTMLElement>('.in-case__media').forEach((media) => {
    const img = media.querySelector('img');
    gsap.fromTo(
      media,
      { clipPath: 'inset(100% 0% 0% 0% round 12px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 12px)',
        duration: 1.3,
        ease: 'expo.out',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: media, start: 'top 90%', once: true },
      },
    );
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'expo.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: media, start: 'top 90%', once: true },
        },
      );
    }
  });
}

function boot(m: Motion): void {
  const { ScrollTrigger } = m;
  ScrollTrigger.config({ ignoreMobileResize: true });
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    try {
      reveals(m);
      initPinnedIndex(m);
      initProcess(m);
      initIndustryArt();
      initEngagements(m);
      ScrollTrigger.refresh();
    } catch (error) {
      console.error('Page motion failed', error);
      root.classList.remove('js');
      root.classList.add('rm');
      document.querySelectorAll<HTMLElement>('[data-split], [data-rv]').forEach((el) => {
        el.style.opacity = '1';
      });
    }
  };
  // SplitText needs the final font metrics.
  (document.fonts?.ready ?? Promise.resolve()).then(start);
  window.setTimeout(start, 2500);
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

whenMotionReady(boot);
