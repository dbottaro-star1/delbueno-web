/**
 * Social card for the Kabbalah app pages (/kabbalah/og.png), drawn at build time like the studio cards
 * (src/lib/og-render.ts): satori lays out the text, the Tree of Life is spliced in as SVG, and resvg makes the PNG.
 * Nothing here ships to the browser.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { APP } from './app';

const W = 1200;
const H = 630;

type Element = Parameters<typeof satori>[0];

const font = (pkg: string, file: string) =>
  readFileSync(resolve(process.cwd(), `node_modules/@fontsource/${pkg}/files/${file}`));

const h = (type: string, style: Record<string, unknown>, children?: unknown): unknown => ({
  type,
  props: { style, ...(children === undefined ? {} : { children }) },
});

/**
 * The tree as in src/components/kabbalah/Arbol.astro (320 by 450), with the same example states, as an SVG group
 * placed on the right of the card. It is spliced into satori's output, like the grain of the studio cards.
 */
function arbol(): string {
  const nodos: Record<string, [number, number, string]> = {
    keter: [160, 34, 'sin'],
    bina: [70, 104, 'sin'],
    jojma: [250, 104, 'sin'],
    gevura: [70, 214, 'falta'],
    jesed: [250, 214, 'z2'],
    tiferet: [160, 270, 'z2'],
    hod: [70, 334, 'z1'],
    netzaj: [250, 334, 'exceso'],
    yesod: [160, 382, 'falta'],
    maljut: [160, 428, 'z1'],
  };
  const senderos =
    'keter-jojma keter-bina keter-tiferet jojma-bina jojma-tiferet jojma-jesed bina-tiferet bina-gevura jesed-gevura ' +
    'jesed-tiferet jesed-netzaj gevura-tiferet gevura-hod tiferet-netzaj tiferet-yesod tiferet-hod netzaj-hod ' +
    'netzaj-yesod netzaj-maljut hod-yesod hod-maljut yesod-maljut';
  const lineas = senderos
    .split(' ')
    .map((s) => {
      const [a, b] = s.split('-').map((id) => nodos[id]);
      return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
    })
    .join('');
  const circulos = Object.values(nodos)
    .map(([x, y, estado]) => {
      if (estado === 'falta')
        return `<circle cx="${x}" cy="${y}" r="17" fill="#F4F1EA" stroke="#2F4560" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      if (estado === 'exceso')
        return (
          `<circle cx="${x}" cy="${y}" r="28" fill="rgba(47,69,96,0.07)"/><circle cx="${x}" cy="${y}" r="22" fill="rgba(47,69,96,0.16)"/>` +
          `<circle cx="${x}" cy="${y}" r="17" fill="#2F4560" stroke="#2F4560" stroke-width="1.5"/>`
        );
      if (estado === 'sin')
        return `<circle cx="${x}" cy="${y}" r="17" fill="#FBFAF6" stroke="rgba(30,37,48,0.45)" stroke-width="1"/>`;
      const fill = estado === 'z1' ? '#A9C4DE' : '#D8C29E';
      return `<circle cx="${x}" cy="${y}" r="17" fill="${fill}" stroke="#1E2530" stroke-width="1.5"/>`;
    })
    .join('');
  const daat = `<circle cx="160" cy="152" r="13" fill="none" stroke="rgba(30,37,48,0.4)" stroke-dasharray="3 3"/>`;
  return (
    `<g transform="translate(${W - 72 - 300}, 58) scale(1.11) translate(-28, 0)">` +
    `<g stroke="rgba(30,37,48,0.22)" stroke-width="1">${lineas}</g>${daat}${circulos}</g>`
  );
}

function card(): Element {
  return h(
    'div',
    {
      display: 'flex',
      width: W,
      height: H,
      padding: '0 72px',
      backgroundColor: '#F4F1EA',
      color: '#1E2530',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    [
      h(
        'div',
        { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: H - 116, width: 680 },
        [
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'IBM Plex Mono',
              fontSize: 22,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#5C626C',
            },
            'App para iPhone y Android',
          ),
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'EB Garamond',
              fontWeight: 500,
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
            },
            'Kabbalah para hacer, no para leer.',
          ),
          h('div', { display: 'flex', alignItems: 'flex-end', gap: 28, width: '100%' }, [
            h('div', { display: 'flex', fontFamily: 'EB Garamond', fontWeight: 500, fontSize: 44 }, APP.name),
            h(
              'div',
              { display: 'flex', fontFamily: 'Nanum Pen Script', fontSize: 40, color: '#2B4FB3' },
              `con ${APP.teacher}`,
            ),
          ]),
        ],
      ),
      // Room for the tree, drawn after layout.
      h('div', { display: 'flex', width: 300, height: 514 }),
    ],
  ) as Element;
}

export async function renderKabbalahOg(): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(card(), {
    width: W,
    height: H,
    fonts: [
      {
        name: 'EB Garamond',
        data: font('eb-garamond', 'eb-garamond-latin-500-normal.woff'),
        weight: 500,
        style: 'normal',
      },
      {
        name: 'IBM Plex Mono',
        data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'),
        weight: 500,
        style: 'normal',
      },
      {
        name: 'Nanum Pen Script',
        data: font('nanum-pen-script', 'nanum-pen-script-latin-400-normal.woff'),
        weight: 400,
        style: 'normal',
      },
    ],
  });
  const withTree = svg.replace(/<\/svg>\s*$/, `${arbol()}</svg>`);
  const png = new Resvg(withTree, { fitTo: { mode: 'width', value: W } }).render().asPng();
  return sharp(png)
    .png({ palette: true, quality: 90, effort: 10 })
    .toBuffer()
    .then((buffer) => new Uint8Array(buffer));
}
