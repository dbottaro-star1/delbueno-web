/**
 * Homepage entry. Boots the particle field, the hero stack and flight, marquees, tilt, flip cards and the scroll
 * choreography, all on one shared ticker.
 *
 * Reduced motion (and any failure to start the motion engine) gets the static version: fan drawn once, ordered
 * grid drawn once, everything visible, no Lenis.
 */
import { gsap } from 'gsap';
import { addTick } from '../loop';
import { initMotion, prefersReducedMotion, type Motion } from '../motion';
import { initPlayground } from '../playground';
import { isFinePointer } from '../shell';
import { createFlight, remeasureOnRefresh } from './flight';
import { initFlip } from './flip';
import { initMarquees } from './marquee';
import { createField } from './particles';
import { initReveals } from './reveal';
import { initTilt } from './tilt';

const root = document.documentElement;
const fine = isFinePointer();

function staticPage(): void {
  root.classList.remove('js');
  root.classList.add('rm');
  const field = createField(true);
  const flight = createFlight({ reduce: true, fine: false, field });
  flight?.settleStatic();
  initFlip();
  initPlayground();
}

async function boot(m: Motion): Promise<void> {
  const { ScrollTrigger } = m;
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'expo.out', duration: 1.2 });

  const field = createField(false);
  const flight = createFlight({ reduce: false, fine, field });
  flight?.measure();
  if (flight) remeasureOnRefresh(ScrollTrigger, flight);

  /* ---------- hero intro: starts immediately, it needs no font measuring ---------- */
  const nav = document.getElementById('nav');
  gsap.set('.hl-i, .hero-fade', { opacity: 1 });
  const t0 = performance.now();
  gsap
    .timeline({ delay: 0.15 })
    .fromTo('.hero .hl-i', { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.13, ease: 'expo.out' }, 0.1)
    .fromTo('.hero-fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, 0.55)
    .fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.3);
  if (field) gsap.to(field.st, { intro: 1, duration: 2.4, ease: 'power2.out', delay: 0.2 });
  flight?.startIntro(t0);
  gsap.to('.hero-copy', {
    opacity: 0,
    y: -60,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 40%', scrub: true },
  });
  if (fine && flight) {
    window.addEventListener('pointermove', (e) => flight.setPointer(e.clientX, e.clientY), { passive: true });
  }
  addTick((time, dt) => {
    flight?.render(time);
    field?.tick(time, dt);
  });

  /* ---------- everything else waits for fonts so SplitText measures correctly ---------- */
  let booted = false;
  const rest = () => {
    if (booted) return;
    booted = true;
    gsap.set('.hl-i, .hero-fade, [data-rv], [data-split]', { opacity: 1 });
    flight?.measure();
    initMarquees(m);
    initReveals(m, { flight: root.classList.contains('fly-on') });
    if (fine) initTilt(m);
    initFlip();
    initPlayground();
    ScrollTrigger.refresh();
  };
  (document.fonts?.ready ?? Promise.resolve()).then(rest);
  window.setTimeout(rest, 2500);
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (prefersReducedMotion()) {
  staticPage();
} else {
  initMotion().then((m) => {
    if (!m) return staticPage();
    boot(m).catch((error) => {
      console.error('Homepage motion failed', error);
      root.classList.remove('js', 'fly-on');
      root.classList.add('rm');
    });
  });
}
