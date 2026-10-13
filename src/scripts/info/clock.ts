/** Live local time in Punta del Este (GMT-3) for every [data-clock]. The time zone has no daylight saving. */
const ZONE = 'America/Montevideo';

export function initClock(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-clock]'));
  if (!nodes.length) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: ZONE });
  let last = '';
  const tick = () => {
    const now = fmt.format(new Date());
    if (now === last) return;
    last = now;
    nodes.forEach((n) => {
      n.textContent = now;
    });
  };
  tick();
  window.setInterval(tick, 5000);
}
