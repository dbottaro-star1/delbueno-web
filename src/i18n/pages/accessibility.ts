import type { Localized } from '../config';
import type { LegalPage } from './legal';

export const accessibilityCopy: Localized<LegalPage> = {
  en: {
    meta: {
      title: 'Accessibility statement',
      description:
        'How delbuenostudio.com approaches accessibility: keyboard use, reduced motion, semantic structure, known limits and how to tell us about a barrier.',
    },
    title: 'Accessibility statement',
    lede: 'We want everyone to be able to use this site. Here is what we do, where we fall short, and how to tell us.',
    sections: [
      {
        id: 'commitment',
        title: 'Our commitment',
        blocks: [
          {
            p: '{brand} is committed to digital accessibility for people of all abilities. We keep improving the experience for everyone and apply the relevant accessibility standards and guidelines to our own website.',
          },
        ],
      },
      {
        id: 'approach',
        title: 'Our approach',
        blocks: [
          {
            ul: [
              '**Standard.** We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, developed by the W3C.',
              '**Ongoing checks.** We review the site as we change it and fix the problems we find. The site has not yet had an independent accessibility audit.',
              '**Design.** Accessibility is part of how we design the pages, not a layer added afterward.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'What the site does',
        blocks: [
          {
            ul: [
              '**Keyboard navigation.** Every link, button and menu works with a keyboard, with a visible focus outline and a skip to content link.',
              '**Reduced motion.** If your device asks for reduced motion, animations, smooth scrolling and pinned effects are turned off and all content is visible.',
              '**Structure.** Pages use one main heading, a logical heading order, landmarks, and breadcrumbs.',
              '**Text alternatives.** Meaningful images have descriptive alternative text, and decorative ones are hidden from screen readers.',
              '**Readable and responsive.** Text uses relative sizes, layouts adapt from phones to large screens, and controls are sized for touch.',
              '**Plain interactions.** There are no forms, no timed content and no sound that plays on its own.',
            ],
          },
        ],
      },
      {
        id: 'limits',
        title: 'Known limits',
        blocks: [
          {
            ul: [
              'The booking page is run by Lemcal, and the Playground links to Dribbble. We do not control the accessibility of those services.',
              'Playground clips are short silent loops that show design motion. They come with a text title and description.',
              'Some older blog articles may have gaps, such as a short image description. We are working through them.',
            ],
          },
        ],
      },
      {
        id: 'feedback',
        title: 'Feedback',
        blocks: [
          {
            p: 'If you hit an accessibility barrier or have a suggestion, write to [{email}](mail) and tell us the page and what happened. We will look into it as soon as we can. Your feedback helps us make the site better for everyone.',
          },
        ],
      },
      {
        id: 'updates',
        title: 'Updates to this statement',
        blocks: [
          {
            p: 'We review this statement from time to time and update it when our practices or standards change. See also our [privacy policy](privacy) and [terms](terms).',
          },
        ],
      },
    ],
  },
  es: {
    meta: {
      title: 'Declaración de accesibilidad',
      description:
        'Cómo aborda delbuenostudio.com la accesibilidad: uso con teclado, movimiento reducido, estructura, límites conocidos y cómo avisarnos de una barrera.',
    },
    title: 'Declaración de accesibilidad',
    lede: 'Queremos que todas las personas puedan usar este sitio. Esto es lo que hacemos, en qué fallamos y cómo avisarnos.',
    sections: [
      {
        id: 'commitment',
        title: 'Nuestro compromiso',
        blocks: [
          {
            p: '{brand} se compromete con la accesibilidad digital para personas de todas las capacidades. Seguimos mejorando la experiencia para todos y aplicamos a nuestro propio sitio web los estándares y las pautas de accesibilidad pertinentes.',
          },
        ],
      },
      {
        id: 'approach',
        title: 'Nuestro enfoque',
        blocks: [
          {
            ul: [
              '**Estándar.** Buscamos seguir las Web Content Accessibility Guidelines (WCAG) 2.1 Nivel AA, desarrolladas por el W3C.',
              '**Revisiones continuas.** Revisamos el sitio a medida que lo cambiamos y corregimos los problemas que encontramos. El sitio todavía no ha tenido una auditoría de accesibilidad independiente.',
              '**Diseño.** La accesibilidad es parte de cómo diseñamos las páginas, no una capa que se agrega después.',
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Qué hace el sitio',
        blocks: [
          {
            ul: [
              '**Navegación con teclado.** Todos los enlaces, botones y menús funcionan con teclado, con un contorno de foco visible y un enlace para saltar al contenido.',
              '**Movimiento reducido.** Si tu dispositivo pide movimiento reducido, se desactivan las animaciones, el desplazamiento suave y los efectos fijados, y todo el contenido queda visible.',
              '**Estructura.** Las páginas usan un único encabezado principal, un orden lógico de encabezados, regiones de referencia (landmarks) y migas de pan.',
              '**Alternativas en texto.** Las imágenes con significado tienen texto alternativo descriptivo, y las decorativas se ocultan a los lectores de pantalla.',
              '**Legible y responsive.** El texto usa tamaños relativos, los diseños se adaptan desde teléfonos hasta pantallas grandes y los controles tienen un tamaño pensado para el tacto.',
              '**Interacciones simples.** No hay formularios, contenido con límite de tiempo ni sonido que se reproduzca solo.',
            ],
          },
        ],
      },
      {
        id: 'limits',
        title: 'Límites conocidos',
        blocks: [
          {
            ul: [
              'La página de reservas la opera Lemcal, y el Playground enlaza a Dribbble. No controlamos la accesibilidad de esos servicios.',
              'Los clips del Playground son bucles cortos y silenciosos que muestran motion de diseño. Vienen con un título y una descripción en texto.',
              'Algunos artículos antiguos del blog pueden tener huecos, como una descripción de imagen demasiado breve. Estamos trabajando en ellos.',
            ],
          },
        ],
      },
      {
        id: 'feedback',
        title: 'Comentarios',
        blocks: [
          {
            p: 'Si encuentras una barrera de accesibilidad o tienes una sugerencia, escribe a [{email}](mail) e indícanos la página y qué pasó. Lo revisaremos lo antes posible. Tus comentarios nos ayudan a mejorar el sitio para todos.',
          },
        ],
      },
      {
        id: 'updates',
        title: 'Actualizaciones de esta declaración',
        blocks: [
          {
            p: 'Revisamos esta declaración cada cierto tiempo y la actualizamos cuando cambian nuestras prácticas o los estándares. Consulta también nuestra [política de privacidad](privacy) y nuestros [términos](terms).',
          },
        ],
      },
    ],
  },
};
