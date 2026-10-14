import type { ImageMetadata } from 'astro';
import clutchTop from '../assets/brand/badges/clutch-top-product-design-uruguay-2025.png';
import clutchVerified from '../assets/brand/badges/clutch-verified.png';
import dribbbleSelect from '../assets/brand/badges/dribbble-select.svg';
import techBehemoths from '../assets/brand/badges/techbehemoths-awards-2025.png';
import { LINKS } from '../lib/site';

export interface Recognition {
  id: string;
  /** Plain name, used for alt text, the link label and the Organization `award` list. */
  name: string;
  /** Where the badge links. Omitted until a public profile URL is confirmed. */
  url?: string;
  image: ImageMetadata;
}

/** Third-party recognition, artwork as supplied by each platform. Order is the display order. */
export const recognition: Recognition[] = [
  {
    id: 'dribbble-select',
    name: 'Dribbble Select agency, Top Product Design Company',
    url: LINKS.dribbble,
    image: dribbbleSelect,
  },
  {
    id: 'clutch-top-2025',
    name: 'Clutch Top Product Design Company, Uruguay 2025',
    url: LINKS.clutch,
    image: clutchTop,
  },
  {
    id: 'clutch-verified',
    name: 'Clutch Verified',
    url: LINKS.clutch,
    image: clutchVerified,
  },
  {
    id: 'techbehemoths-2025',
    name: 'TechBehemoths Awards 2025',
    image: techBehemoths,
  },
];

/** Google review rating, drawn in type (the supplied artwork was too small to stay sharp). */
export const googleRating = {
  score: '4.9',
  outOf: '5',
  /** Set to the Google Business Profile reviews link once confirmed. */
  url: undefined as string | undefined,
};
