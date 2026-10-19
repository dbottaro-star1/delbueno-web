import type { Localized } from '../config';

/** The four headline numbers of the studio, shown on the home page and on the about page. Values live in the components. */
export interface StatsCopy {
  years: string;
  products: string;
  returning: string;
  clutch: string;
  stars: string;
}

export const statsCopy: Localized<StatsCopy> = {
  en: {
    years: 'years designing digital products',
    products: 'products shipped',
    returning: 'of clients come back for more',
    clutch: 'on Clutch',
    stars: 'stars',
  },
  es: {
    years: 'años diseñando productos digitales',
    products: 'productos lanzados',
    returning: 'de los clientes vuelven por más',
    clutch: 'en Clutch',
    stars: 'estrellas',
  },
};

/** The client names shown as type on the home and about pages. Company names are the same in every language. */
export const CLIENT_NAMES = ['BigID', 'JFrog', 'NetApp', 'Palo Alto Networks', 'Uleadz'] as const;
