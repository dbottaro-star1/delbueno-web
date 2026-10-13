/** 3D tilt, glare and gentle scale on the Selected work cards. Only for hover-capable fine pointers. */
import type { Motion } from '../motion';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function initTilt({ gsap }: Motion, scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>('.wc').forEach((card) => {
    const media = card.querySelector<HTMLElement>('.wc__media');
    if (!media) return;
    gsap.set(media, { transformPerspective: 900 });
    const rx = gsap.quickTo(media, 'rotationX', { duration: 0.7, ease: 'power3' });
    const ry = gsap.quickTo(media, 'rotationY', { duration: 0.7, ease: 'power3' });
    const sc = gsap.quickTo(media, 'scale', { duration: 0.8, ease: 'power3' });
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = media.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      ry(clamp((nx - 0.5) * 14, -9, 9));
      rx(clamp(-(ny - 0.5) * 14, -9, 9));
      media.style.setProperty('--gx', nx * 100 + '%');
      media.style.setProperty('--gy', ny * 100 + '%');
    });
    card.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && sc(1.025));
    card.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
      sc(1);
    });
  });
}
