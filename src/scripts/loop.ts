/**
 * One shared gsap.ticker callback for every frame-by-frame effect on a page (particles, flight, marquees,
 * strip inertia). gsap.ticker runs on requestAnimationFrame, which browsers already pause in background
 * tabs, so there is no manual visibility check: one would leave the layout unpositioned in webviews and
 * prerendered pages that report the page as hidden while still painting.
 */
import { gsap } from 'gsap';

type Tick = (time: number, deltaMs: number) => void;

const ticks = new Set<Tick>();
let running = false;

function run(time: number, deltaMs: number): void {
  ticks.forEach((fn) => fn(time, deltaMs));
}

/** Register a per-frame callback. Returns a function that removes it. */
export function addTick(fn: Tick): () => void {
  ticks.add(fn);
  if (!running) {
    running = true;
    gsap.ticker.add(run);
  }
  return () => {
    ticks.delete(fn);
    if (!ticks.size && running) {
      running = false;
      gsap.ticker.remove(run);
    }
  };
}
