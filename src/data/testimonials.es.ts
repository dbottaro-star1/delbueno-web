import type { Testimonial } from './testimonials';

/**
 * Spanish translations of the client quotes, keyed by the person's name. The quotes are real, so they are translated
 * faithfully and the page marks them "Traducido del inglés".
 */
export const testimonialsEs: Record<string, Pick<Testimonial, 'quote' | 'role'>> = {
  'Yaron S.': {
    quote:
      'Nuestra empresa tenía un proyecto sumamente desafiante y buscábamos un diseñador UX/UI muy agudo e innovador, y me alegra que hayamos encontrado a Dani y al equipo de delbueno. Es la mejor expresión de lo que significa ser diseñador de UI y UX: combina ambas disciplinas a la perfección, aportando el enfoque lógico y analítico que necesita todo diseño pixel-perfect.',
    role: 'Director general',
  },
  'Yehuda L.': {
    quote:
      'El equipo de delbueno™ Studio ha sido verdaderamente excepcional. Desde nuestra primera interacción, su comunicación rápida y cuidadosa, junto con su profundo conocimiento y su enfoque de apoyo, ha sido invaluable. Su dedicación hizo que todo el proceso de diseño y desarrollo web fuera fluido, eficiente y verdaderamente potenciador para nuestro negocio.',
    role: 'Director de Experiencia del Cliente',
  },
  'Ionatan G.': {
    quote:
      'Trabajar con delbueno™ Studio fue un placer de principio a fin. Capturaron a la perfección la esencia de nuestra marca en el diseño, y la experiencia de usuario que crearon para nuestra app móvil superó todas las expectativas. Ahora estamos listos para el éxito, y todo empezó con una alianza fantástica.',
    role: 'CEO y cofundador',
  },
  'Mikaela B.': {
    quote:
      'En el sector de la salud, la precisión y la confiabilidad no son negociables. delbueno™ Studio entendió con claridad nuestros requisitos y entregó un sitio web que refleja nuestro compromiso con la excelencia. Su atención al detalle y a la experiencia de usuario los distingue. Agradecemos la experiencia fluida y confiable que ahora ofrece nuestra plataforma en línea.',
    role: 'Gerente comercial',
  },
};
