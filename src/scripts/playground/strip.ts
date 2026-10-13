/**
 * Horizontal strip for the Playground shots.
 *
 * The strip is a plain overflow-x container, so touch swipes get native momentum and never block vertical page
 * scroll. On top of that: mouse drag with inertia, horizontal wheel and trackpad that Lenis does not intercept,
 * arrow buttons and a progress line.
 */
import { addTick } from '../loop';
import { prefersReducedMotion } from '../motion';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function initStrip(root: ParentNode = document): void {
  const strip = root.querySelector<HTMLElement>('[data-strip]');
  if (!strip) return;
  const prev = root.querySelector<HTMLButtonElement>('[data-strip-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-strip-next]');
  const prog = root.querySelector<HTMLElement>('[data-strip-prog]');
  const reduce = prefersReducedMotion();

  /* ---- position readout ---- */
  const update = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    const x = strip.scrollLeft;
    if (prev) prev.disabled = x <= 2;
    if (next) next.disabled = x >= max - 2;
    if (prog) prog.style.transform = `scaleX(${clamp((strip.clientWidth + x) / strip.scrollWidth, 0.05, 1).toFixed(4)})`;
  };
  strip.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(strip);
  update();

  const by = (dir: number) =>
    strip.scrollBy({ left: dir * Math.max(240, strip.clientWidth * 0.7), behavior: reduce ? 'auto' : 'smooth' });
  prev?.addEventListener('click', () => by(-1));
  next?.addEventListener('click', () => by(1));

  /* ---- wheel and trackpad: horizontal gestures belong to the strip, vertical ones stay with Lenis ---- */
  strip.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) e.stopPropagation();
    },
    { passive: true },
  );

  /* ---- mouse drag with inertia (touch uses native scrolling) ---- */
  let down = false;
  let dragging = false;
  let moved = false;
  let pid = -1;
  let startX = 0;
  let startLeft = 0;
  let lastX = 0;
  let lastT = 0;
  let vel = 0; // px per ms
  let coasting = false;
  let off: (() => void) | null = null;

  const stopCoast = () => {
    coasting = false;
    off?.();
    off = null;
  };
  const coast = (_t: number, dtMs: number) => {
    if (!coasting) return;
    const dt = Math.min(dtMs, 50);
    const before = strip.scrollLeft;
    strip.scrollLeft = before + vel * dt;
    vel *= Math.pow(0.94, dt / 16.7);
    if (Math.abs(vel) < 0.02 || strip.scrollLeft === before) stopCoast();
  };

  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    stopCoast();
    down = true;
    dragging = false;
    moved = false;
    pid = e.pointerId;
    startX = lastX = e.clientX;
    startLeft = strip.scrollLeft;
    lastT = e.timeStamp;
    vel = 0;
  });
  strip.addEventListener('pointermove', (e) => {
    if (!down || e.pointerId !== pid) return;
    const dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 5) {
      dragging = true;
      moved = true;
      strip.classList.add('is-dragging');
      strip.setPointerCapture(pid);
    }
    if (!dragging) return;
    strip.scrollLeft = startLeft - dx;
    const dt = e.timeStamp - lastT;
    if (dt > 0) vel = vel * 0.6 + ((lastX - e.clientX) / dt) * 0.4;
    lastX = e.clientX;
    lastT = e.timeStamp;
  });
  const release = (e: PointerEvent) => {
    if (!down || e.pointerId !== pid) return;
    down = false;
    if (!dragging) return;
    dragging = false;
    strip.classList.remove('is-dragging');
    if (strip.hasPointerCapture(pid)) strip.releasePointerCapture(pid);
    // A drag that ends over a card must not count as a click.
    window.setTimeout(() => (moved = false), 0);
    if (!reduce && e.timeStamp - lastT < 80 && Math.abs(vel) > 0.05) {
      coasting = true;
      off = addTick(coast);
    }
  };
  strip.addEventListener('pointerup', release);
  strip.addEventListener('pointercancel', release);
  strip.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
  strip.addEventListener('dragstart', (e) => e.preventDefault());
  // Any native scroll input (wheel, keys, touch) cancels a running coast.
  ['wheel', 'touchstart', 'keydown'].forEach((t) => strip.addEventListener(t, stopCoast, { passive: true }));
}
