/**
 * Marquees. The velocity band speeds up, reverses and skews with scroll velocity (clamped). The trusted-by row
 * speeds up with Lenis velocity. Both pause while off-screen and settle when the visitor stops scrolling (calm.ts).
 */
import type { Motion } from '../motion';
import { addTick } from '../loop';
import { calm } from './calm';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function cloneGroup(track: HTMLElement): void {
  const group = track.firstElementChild as HTMLElement | null;
  if (!group) return;
  const clone = group.cloneNode(true) as HTMLElement;
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);
}

export function initMarquees({ gsap, ScrollTrigger, lenis }: Motion): void {
  /* ---------- velocity band ---------- */
  const bandEl = document.getElementById('band');
  const bTrack = bandEl?.querySelector<HTMLElement>('.marquee__track');
  if (bandEl && bTrack) {
    cloneGroup(bTrack);
    const bTw = gsap.to(bTrack, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
    bTw.totalTime(30 * 1000);
    const setSkew = gsap.quickSetter(bTrack, 'skewX', 'deg') as (v: number) => void;
    let on = false;
    let lastY = window.scrollY;
    let sv = 0;
    let dir = 1;
    let skew = 0;
    ScrollTrigger.create({
      trigger: bandEl,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => {
        on = s.isActive;
        bTw.paused(!on);
      },
    });
    addTick(() => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!on) return;
      sv += (dy - sv) * 0.12;
      if (Math.abs(sv) > 0.4) dir = sv > 0 ? 1 : -1;
      const boost = Math.min(Math.abs(sv) / 5, 6);
      skew += (clamp(-sv * 0.3, -8, 8) - skew) * 0.2;
      bTw.timeScale(dir * (1 + boost) * calm.level);
      setSkew(skew);
    });
  }

  /* ---------- trusted-by row ---------- */
  const track = document.getElementById('marqueeTrack');
  if (track) {
    cloneGroup(track);
    const mq = gsap.to(track, { xPercent: -50, ease: 'none', duration: 46, repeat: -1 });
    let ts = 1;
    let on = false;
    ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => {
        on = s.isActive;
        mq.paused(!on);
      },
    });
    addTick(() => {
      if (!on) {
        mq.timeScale(ts * calm.level);
        return;
      }
      const v = Math.abs(lenis.velocity);
      ts += (1 + Math.min(v * 0.18, 5) - ts) * 0.08;
      mq.timeScale(ts * calm.level);
    });
  }
}
