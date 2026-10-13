/**
 * Plays a shot's muted loop only on intent: hover or focus with a fine pointer, or when the card sits in the
 * middle of the strip (or screen) on touch. The video src is attached on the first intent, never before, and
 * the clip pauses whenever its card leaves the screen. Skipped for reduced motion and data saver.
 */
import { prefersReducedMotion } from '../motion';

const FINE = '(hover: hover) and (pointer: fine)';
const MAX_TOUCH_PLAYING = 2;

export function initShotMedia(root: ParentNode = document): void {
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[data-shot][data-video]'));
  if (!links.length) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (prefersReducedMotion() || conn?.saveData) return;

  const fine = window.matchMedia(FINE).matches;
  const strip = root.querySelector<HTMLElement>('[data-strip]');
  const visible = new Set<HTMLVideoElement>();
  const playing: HTMLVideoElement[] = [];

  const stop = (v: HTMLVideoElement) => {
    v.pause();
    v.classList.remove('is-playing');
    const i = playing.indexOf(v);
    if (i >= 0) playing.splice(i, 1);
  };
  const play = (v: HTMLVideoElement) => {
    if (!v.getAttribute('src')) v.src = v.dataset.src ?? '';
    if (!v.src) return;
    v.muted = true;
    v.play().then(
      () => v.classList.add('is-playing'),
      () => {},
    );
    if (!playing.includes(v)) playing.push(v);
    if (!fine) while (playing.length > MAX_TOUCH_PLAYING) stop(playing[0]);
  };

  const pairs = links
    .map((a) => ({ a, v: a.querySelector<HTMLVideoElement>('video') }))
    .filter((p): p is { a: HTMLAnchorElement; v: HTMLVideoElement } => !!p.v);

  // Off-screen clips pause, on every device.
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target.querySelector('video');
      if (!v) return;
      if (en.isIntersecting) visible.add(v);
      else {
        visible.delete(v);
        stop(v);
      }
    });
  });
  pairs.forEach(({ a }) => seen.observe(a));

  if (fine) {
    pairs.forEach(({ a, v }) => {
      a.addEventListener('pointerenter', () => visible.has(v) && play(v));
      a.addEventListener('pointerleave', () => stop(v));
      a.addEventListener('focus', () => play(v));
      a.addEventListener('blur', () => stop(v));
    });
    return;
  }

  // Touch: play whichever card is centred.
  const centred = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        const v = en.target.querySelector('video');
        if (!v) return;
        if (en.isIntersecting) play(v);
        else stop(v);
      });
    },
    strip ? { root: strip, rootMargin: '0px -36% 0px -36%' } : { rootMargin: '-32% 0px -32% 0px' },
  );
  pairs.forEach(({ a }) => centred.observe(a));
}
