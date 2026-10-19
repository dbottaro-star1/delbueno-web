/**
 * Engagement cards. Hover-capable devices flip with CSS (:hover and :focus-within). On touch screens wider than a
 * phone, a tap flips the card; taps on the Book a call link on the back still follow the link. Phones show both
 * faces stacked (CSS), so nothing needs a gesture there.
 */
export function initFlip(scope: ParentNode = document): void {
  const touch = window.matchMedia('(hover: none)');
  const phone = window.matchMedia('(max-width: 760px)');
  scope.querySelectorAll<HTMLElement>('[data-flip]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!touch.matches || phone.matches) return;
      if ((e.target as Element).closest('a, button')) return;
      card.classList.toggle('is-flipped');
    });
  });
  // Tapping outside an open card closes it again.
  document.addEventListener('click', (e) => {
    if (!touch.matches) return;
    const hit = (e.target as Element).closest('[data-flip]');
    scope
      .querySelectorAll<HTMLElement>('[data-flip].is-flipped')
      .forEach((c) => c !== hit && c.classList.remove('is-flipped'));
  });
}
