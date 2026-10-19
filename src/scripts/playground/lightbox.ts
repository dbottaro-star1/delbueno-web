/**
 * Lightbox for Playground shots, built on <dialog>.showModal(): the page behind becomes inert (focus stays inside),
 * Esc closes, and page scroll is locked while it is open. Adds prev/next (buttons, arrow keys, horizontal swipe),
 * swipe down to close, and returns focus to the card that opened it.
 */
import { getMotion, prefersReducedMotion } from '../motion';

export function initLightbox(): void {
  const found = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (!found || typeof found.showModal !== 'function') return;
  const dlg: HTMLDialogElement = found;

  const panel = dlg.querySelector<HTMLElement>('[data-lb-panel]')!;
  const stage = dlg.querySelector<HTMLElement>('[data-lb-stage]')!;
  const img = stage.querySelector<HTMLImageElement>('img')!;
  const video = stage.querySelector<HTMLVideoElement>('video')!;
  const title = dlg.querySelector<HTMLElement>('[data-lb-title]')!;
  const tags = dlg.querySelector<HTMLElement>('[data-lb-tags]')!;
  const link = dlg.querySelector<HTMLAnchorElement>('[data-lb-link]')!;
  const count = dlg.querySelector<HTMLElement>('[data-lb-count]')!;
  const closeBtn = dlg.querySelector<HTMLButtonElement>('[data-lb-close]')!;
  const prevBtn = dlg.querySelector<HTMLButtonElement>('[data-lb-prev]')!;
  const nextBtn = dlg.querySelector<HTMLButtonElement>('[data-lb-next]')!;
  const reduce = prefersReducedMotion();
  const html = document.documentElement;

  let list: HTMLAnchorElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;
  let closing = false;

  const clearVideo = () => {
    video.pause();
    video.classList.remove('is-playing');
    video.removeAttribute('src');
    video.load();
  };

  function show(i: number): void {
    index = (i + list.length) % list.length;
    const a = list[index];
    const d = a.dataset;
    stage.style.setProperty('--lb-ar', `${d.w ?? 16} / ${d.h ?? 9}`);
    img.src = d.full ?? '';
    img.alt = d.alt ?? '';
    title.textContent = d.title ?? '';
    tags.replaceChildren(
      ...(d.tags ?? '')
        .split('|')
        .filter(Boolean)
        .map((t) => {
          const li = document.createElement('li');
          li.textContent = t;
          return li;
        }),
    );
    link.href = a.href;
    count.textContent = `${index + 1} / ${list.length}`;
    prevBtn.disabled = nextBtn.disabled = list.length < 2;
    clearVideo();
    if (d.video && !reduce) {
      video.src = d.video;
      video.muted = true;
      video.play().then(
        () => video.classList.add('is-playing'),
        () => {},
      );
    }
  }

  function open(from: HTMLAnchorElement): void {
    list = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-shot]')).filter(
      (a) => !a.closest('[hidden]'),
    );
    const i = list.indexOf(from);
    if (i < 0) return;
    opener = from;
    closing = false;
    show(i);
    dlg.showModal();
    html.classList.add('lb-open');
    getMotion()?.lenis.stop();
    closeBtn.focus({ preventScroll: true });
  }

  function finish(): void {
    if (dlg.open) dlg.close();
    dlg.classList.remove('is-closing');
    panel.style.transform = '';
    panel.style.opacity = '';
    stage.style.transform = '';
    html.classList.remove('lb-open');
    getMotion()?.lenis.start();
    clearVideo();
    opener?.focus({ preventScroll: true });
    closing = false;
  }

  function close(): void {
    if (closing || !dlg.open) return;
    closing = true;
    if (reduce) return finish();
    dlg.classList.add('is-closing');
    window.setTimeout(finish, 200);
  }

  /* ---- open from any card ---- */
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-shot]');
    if (!a || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(a);
  });
  document.querySelectorAll('a[data-shot]').forEach((a) => a.setAttribute('aria-haspopup', 'dialog'));

  /* ---- controls ---- */
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  dlg.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  dlg.addEventListener(
    'close',
    () => dlg.classList.contains('is-closing') || !html.classList.contains('lb-open') || finish(),
  );
  dlg.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.lb__stage, .lb__bar, .lb__close')) close();
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'Tab') {
      // Belt and braces: wrap focus even though the rest of the page is inert.
      const items = Array.from(dlg.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ---- touch and pen: swipe down closes, swipe sideways moves ---- */
  let pid = -1;
  let sx = 0;
  let sy = 0;
  let axis: '' | 'x' | 'y' = '';
  let t0 = 0;
  let dx = 0;
  let dy = 0;
  dlg.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || (e.target as Element).closest('button, a')) return;
    pid = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    axis = '';
    dx = dy = 0;
    t0 = e.timeStamp;
  });
  dlg.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pid) return;
    dx = e.clientX - sx;
    dy = e.clientY - sy;
    if (!axis && Math.hypot(dx, dy) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'y' && dy > 0) {
      panel.style.transition = 'none';
      panel.style.transform = `translateY(${dy}px)`;
      panel.style.opacity = String(Math.max(0.35, 1 - dy / 420));
    } else if (axis === 'x') {
      stage.style.transition = 'none';
      stage.style.transform = `translateX(${dx * 0.45}px)`;
    }
  });
  const end = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    pid = -1;
    const fast = e.timeStamp - t0 < 260;
    stage.style.transition = panel.style.transition = 'transform 0.35s var(--out), opacity 0.35s';
    if (axis === 'y' && (dy > 90 || (fast && dy > 40))) return close();
    if (axis === 'x' && (Math.abs(dx) > 60 || (fast && Math.abs(dx) > 30))) {
      stage.style.transform = '';
      show(index + (dx < 0 ? 1 : -1));
    } else {
      stage.style.transform = '';
    }
    panel.style.transform = '';
    panel.style.opacity = '';
    window.setTimeout(() => (stage.style.transition = panel.style.transition = ''), 360);
  };
  dlg.addEventListener('pointerup', end);
  dlg.addEventListener('pointercancel', end);
}
