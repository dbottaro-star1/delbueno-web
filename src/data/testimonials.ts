import type { ImageMetadata } from 'astro';
import ionatan from '../assets/testimonials/ionatan.png';
import mikaela from '../assets/testimonials/mikaela.png';
import yaron from '../assets/testimonials/yaron.png';
import yehuda from '../assets/testimonials/yehuda.png';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: ImageMetadata;
  /** Slug of the related case study, when there is one. */
  work?: string;
}

/** Client quotes from the old site, with the headshots supplied by the clients. */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Our company had a super challenging project and we were looking for a super sharp and innovative UX/UI designer, and I am happy we found Dani and the team at delbueno. He is the best expression of what it means to be a UI and UX designer, combining these two perfectly by giving the logical and analytical approach that every pixel-perfect design needs.',
    name: 'Yaron S.',
    role: 'Managing Director',
    company: 'Type5 VC',
    photo: yaron,
  },
  {
    quote:
      'The team at delbueno™ Studio has truly been exceptional. From our first interaction, their quick and thoughtful communication, combined with their deep expertise and supportive approach, has been invaluable. Their dedication made the entire web design and development process smooth, efficient, and genuinely empowering for our business.',
    name: 'Yehuda L.',
    role: 'Director, Customer Experience',
    company: 'Uleadz',
    photo: yehuda,
    work: 'uleadz',
  },
  {
    quote:
      "Working with delbueno™ Studio was a delight from start to finish. They seamlessly captured our brand essence in the design, and the user experience they crafted for our mobile app exceeded all expectations. We're now set for success, and it all started with a fantastic partnership.",
    name: 'Ionatan G.',
    role: 'CEO & Co-Founder',
    company: 'Flapz',
    photo: ionatan,
    work: 'flapz',
  },
  {
    quote:
      'In the healthcare sector, precision and reliability are non-negotiable. delbueno™ Studio understood our requirements clearly and delivered a website that reflects our commitment to excellence. Their attention to detail and user experience sets them apart. We appreciate the seamless, trustworthy experience our online platform now provides.',
    name: 'Mikaela B.',
    role: 'Commercial Manager',
    company: 'Mama Bear',
    photo: mikaela,
  },
];

/** The testimonial tied to a case study, if any. */
export function testimonialFor(workSlug: string): Testimonial | undefined {
  return testimonials.find((t) => t.work === workSlug);
}
