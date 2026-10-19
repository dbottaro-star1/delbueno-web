/**
 * Hairline illustrations (industry pages and the services hero art). Each one draws on as it enters the viewport and
 * floats gently only while it is on screen, so off-screen art costs nothing.
 */

export function initIndustryArt(): void {
  const arts = Array.from(document.querySelectorAll<SVGElement>('.art-draw')).filter((el) => !el.closest('.idx-item'));
  if (!arts.length) return;

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const el = entry.target as SVGElement;
        el.classList.toggle('is-live', entry.isIntersecting);
        if (entry.isIntersecting) el.classList.add('is-drawn');
      }),
    { threshold: 0.2 },
  );
  arts.forEach((el) => io.observe(el));
}
