/**
 * Draws the branded 1200 by 630 social card at build time: satori lays the text out as SVG, a grain layer is spliced
 * in, and @resvg/resvg-js turns it into a PNG. Both are dev dependencies. Nothing here ships to the browser.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgText {
  /** The page title, set large in Syne 800. */
  title: string;
  /** Small mono label above the title, for example "Journal". */
  kicker: string;
}

type Element = Parameters<typeof satori>[0];

/** Font files from @fontsource. Satori reads woff and ttf, not woff2. The build runs from the project root. */
const font = (pkg: string, file: string) =>
  readFileSync(resolve(process.cwd(), `node_modules/@fontsource/${pkg}/files/${file}`));

let fonts: { name: string; data: Buffer; weight: 400 | 800; style: 'normal' }[] | undefined;
const loadFonts = () =>
  (fonts ??= [
    { name: 'Syne', data: font('syne', 'syne-latin-800-normal.woff'), weight: 800, style: 'normal' },
    { name: 'Geist Mono', data: font('geist-mono', 'geist-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
  ]);

/** The same noise as the site's .grain layer, as an SVG overlay that resvg paints over the card. */
const GRAIN =
  `<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch"/>` +
  `<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/></filter>` +
  `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" filter="url(#grain)" opacity="0.09"/>`;

/**
 * Largest type size at which the title fits in four lines. Syne 800 is wide, about 0.87em per character, so the
 * estimate leaves some slack for word wrapping.
 */
function titleSize(title: string): number {
  const lineWidth = 1056;
  for (const size of [124, 108, 96, 84, 74, 64, 56]) {
    const perLine = Math.floor((lineWidth / (0.87 * size)) * 0.88);
    const lines = Math.ceil(title.length / perLine);
    if (lines <= 4 && lines * size * 1.02 <= 372) return size;
  }
  return 48;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown): unknown => ({
  type,
  props: { style, ...(children === undefined ? {} : { children }) },
});

function card({ title, kicker }: OgText): Element {
  const size = titleSize(title);
  return h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: OG_WIDTH,
      height: OG_HEIGHT,
      padding: '64px 72px 56px',
      backgroundColor: '#0a0a0f',
      backgroundImage:
        'radial-gradient(circle at 92% -8%, rgba(63,41,216,0.55) 0%, rgba(123,107,255,0.18) 34%, rgba(10,10,15,0) 62%)',
      color: '#f2f2f5',
    },
    [
      h(
        'div',
        {
          display: 'flex',
          fontFamily: 'Geist Mono',
          fontSize: 24,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(242,242,245,0.6)',
        },
        `(${kicker})`,
      ),
      h(
        'div',
        {
          display: 'flex',
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          lineClamp: 4,
          maxWidth: 1040,
        },
        title,
      ),
      h('div', { display: 'flex', flexDirection: 'column', width: '100%' }, [
        h('div', {
          display: 'flex',
          width: '100%',
          height: 3,
          backgroundImage: 'linear-gradient(90deg, #3f29d8 0%, #7b6bff 45%, #bafb44 100%)',
        }),
        h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28 }, [
          h('div', { display: 'flex', fontFamily: 'Syne', fontWeight: 800, fontSize: 40, letterSpacing: '-0.03em' }, [
            h('span', {}, 'delbueno'),
            h('span', { fontSize: 17, marginLeft: 3, marginTop: 4, letterSpacing: 0 }, '™'),
          ]),
          h(
            'div',
            { display: 'flex', fontFamily: 'Geist Mono', fontSize: 24, color: 'rgba(242,242,245,0.6)' },
            'delbuenostudio.com',
          ),
        ]),
      ]),
    ],
  ) as Element;
}

/** Render one card as PNG bytes. */
export async function renderOg(text: OgText): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(card(text), { width: OG_WIDTH, height: OG_HEIGHT, fonts: loadFonts() });
  const withGrain = svg.replace(/<\/svg>\s*$/, `${GRAIN}</svg>`);
  const png = new Resvg(withGrain, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
  // Film grain does not compress. A 256 color palette keeps each card near 150 KB, under the 300 KB some apps allow.
  return sharp(png)
    .png({ palette: true, quality: 90, effort: 10, dither: 0.7 })
    .toBuffer()
    .then((buffer) => new Uint8Array(buffer));
}
