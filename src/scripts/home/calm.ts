/**
 * Decorative motion that runs by itself (the marquees and the particle drift) settles after a few seconds without
 * scrolling and wakes when the visitor scrolls again. That satisfies WCAG 2.2.2 (Pause, Stop, Hide) without a
 * control: nothing moves on its own for more than about five seconds, and what moves while scrolling is the
 * visitor's own doing. Consumers multiply their speed by `calm.level` (1 = full speed, 0 = at rest).
 */
import { addTick } from '../loop';

const CALM_AFTER_MS = 3800; // quiet time before motion starts to ease out; the ease takes about a second more
const EASE = 0.06; // per frame

export const calm = { level: 1 };

let lastInput = 0;
let started = false;

/** Start watching for scrolling. Safe to call more than once. */
export function startCalm(): void {
  if (started) return;
  started = true;
  lastInput = performance.now();
  window.addEventListener('scroll', () => (lastInput = performance.now()), { passive: true });
  addTick(() => {
    const target = performance.now() - lastInput > CALM_AFTER_MS ? 0 : 1;
    calm.level += (target - calm.level) * EASE;
    if (calm.level < 0.004) calm.level = 0;
    else if (calm.level > 0.996) calm.level = 1;
  });
}
