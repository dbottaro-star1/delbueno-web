import type { Localized } from '../config';
import type { LegalPage } from './legal';

export const privacyCopy: Localized<LegalPage> = {
  en: {
    meta: {
      title: 'Privacy policy',
      description:
        'delbuenostudio.com is a static site with no cookies, analytics, tracking pixels or forms. Here is what little personal information we receive, and why.',
    },
    title: 'Privacy policy',
    lede: 'This site sets no cookies, runs no analytics and has no forms. Here is the small amount of personal information we do receive.',
    sections: [
      {
        id: 'summary',
        title: 'In short',
        blocks: [
          {
            p: 'This Privacy Policy describes how {brand} (“we”, “us” or “our”) handles personal information in connection with delbuenostudio.com (the “Website”).',
          },
          {
            ul: [
              'The Website is a static site. It has no forms, no accounts and no comments.',
              'It sets no cookies, runs no analytics and loads no tracking pixels.',
              'Scripts, styles and fonts are served from the Website itself.',
              'Calls are booked on Lemcal, a third party with its own privacy policy.',
              'Email goes to [{email}](mail).',
            ],
          },
        ],
      },
      {
        id: 'collect',
        title: 'Information we receive',
        blocks: [
          {
            p: 'The Website itself does not ask you for personal information. We receive it only when you choose to share it:',
          },
          {
            ul: [
              '**Email.** If you write to us, we receive your email address, your name if you include it, and whatever you put in the message.',
              '**Booking.** If you book a call, Lemcal collects the details you enter there, such as your name, email address and chosen time, and shares them with us so we can meet you.',
            ],
          },
          {
            p: 'Like any website, ours is delivered by a hosting provider and a content delivery network. They may process technical data such as your IP address and request logs to serve pages and keep them secure. We do not use that data to profile or track visitors.',
          },
        ],
      },
      {
        id: 'use',
        title: 'How we use it',
        blocks: [
          {
            p: 'We use the information you send us to reply to you, to schedule and hold calls, to prepare proposals or a [free UX audit](audit) you ask for, and to meet our legal obligations. We do not use it for advertising and we do not sell it.',
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Sharing',
        blocks: [
          {
            p: 'We share personal information only with service providers that help us run the studio, such as our email and calendar tools, and when the law requires it or to protect our rights, property or safety.',
          },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and tracking',
        blocks: [
          {
            p: 'The Website does not set cookies and does not use analytics, tracking pixels, advertising tags or session recording, so there is no cookie banner. Your browser may keep ordinary cached files so pages load faster. You can clear them at any time in your browser settings.',
          },
        ],
      },
      {
        id: 'third-parties',
        title: 'Third party services',
        blocks: [
          {
            p: 'When you follow a link off the Website, the other service applies its own privacy policy. These links include:',
          },
          {
            ul: [
              '**Lemcal**, where you book a call ([open the booking page](book)).',
              '**Dribbble**, which the Playground links to for each shot ([our profile](dribbble)).',
              'Our profiles on LinkedIn, Instagram, YouTube and Clutch, linked from the footer and the contact page.',
            ],
          },
          {
            p: 'We are not responsible for how these services handle your data. Please read their policies before you use them.',
          },
        ],
      },
      {
        id: 'security',
        title: 'Data security',
        blocks: [
          {
            p: 'We take reasonable measures to protect the information we hold from unauthorized access, disclosure, alteration or destruction. No method of transmission over the internet or of electronic storage is completely secure, so we cannot guarantee absolute security.',
          },
        ],
      },
      {
        id: 'rights',
        title: 'Your rights',
        blocks: [
          {
            p: 'You can ask to access, update or delete the personal information we hold about you, and you can ask us to stop contacting you at any time. To do so, write to [{email}](mail).',
          },
        ],
      },
      {
        id: 'children',
        title: 'Children',
        blocks: [
          {
            p: 'The Website is not intended for children under 13. We do not knowingly collect personal information from children, and if we learn that we have, we will delete it.',
          },
        ],
      },
      {
        id: 'changes',
        title: 'Changes',
        blocks: [
          {
            p: 'We may update this policy to reflect changes in our practices or legal requirements. The updated version is posted on this page with a new date at the top.',
          },
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        blocks: [
          {
            p: 'Questions about this policy or our privacy practices? Write to [{email}](mail). See also our [terms and conditions](terms).',
          },
        ],
      },
    ],
  },
  es: {
    meta: {
      title: 'Política de privacidad',
      description:
        'delbuenostudio.com es un sitio estático sin cookies, analítica, píxeles de seguimiento ni formularios. Esto es lo poco que recibimos, y por qué.',
    },
    title: 'Política de privacidad',
    lede: 'Este sitio no usa cookies, no ejecuta analítica y no tiene formularios. Esta es la poca información personal que sí recibimos.',
    sections: [
      {
        id: 'summary',
        title: 'En resumen',
        blocks: [
          {
            p: 'Esta Política de Privacidad describe cómo {brand} (“nosotros” o “nuestro”) maneja la información personal en relación con delbuenostudio.com (el “Sitio”).',
          },
          {
            ul: [
              'El Sitio es un sitio estático. No tiene formularios, cuentas ni comentarios.',
              'No usa cookies, no ejecuta analítica y no carga píxeles de seguimiento.',
              'Los scripts, los estilos y las fuentes se sirven desde el propio Sitio.',
              'Las llamadas se agendan en Lemcal, un tercero con su propia política de privacidad.',
              'Los correos llegan a [{email}](mail).',
            ],
          },
        ],
      },
      {
        id: 'collect',
        title: 'Información que recibimos',
        blocks: [
          {
            p: 'El Sitio en sí no te pide información personal. La recibimos solo cuando decides compartirla:',
          },
          {
            ul: [
              '**Correo.** Si nos escribes, recibimos tu dirección de correo, tu nombre si lo incluyes y lo que pongas en el mensaje.',
              '**Reservas.** Si agendas una llamada, Lemcal recoge los datos que ingresas allí, como tu nombre, tu correo y el horario elegido, y nos los comparte para que podamos reunirnos contigo.',
            ],
          },
          {
            p: 'Como cualquier sitio web, el nuestro lo entrega un proveedor de alojamiento y una red de distribución de contenido. Pueden procesar datos técnicos, como tu dirección IP y registros de solicitudes, para servir las páginas y mantenerlas seguras. No usamos esos datos para perfilar ni rastrear a los visitantes.',
          },
        ],
      },
      {
        id: 'use',
        title: 'Cómo la usamos',
        blocks: [
          {
            p: 'Usamos la información que nos envías para responderte, para agendar y realizar llamadas, para preparar propuestas o una [auditoría UX gratis](audit) que nos pidas y para cumplir nuestras obligaciones legales. No la usamos para publicidad y no la vendemos.',
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Con quién la compartimos',
        blocks: [
          {
            p: 'Compartimos información personal solo con proveedores de servicios que nos ayudan a operar el estudio, como nuestras herramientas de correo y calendario, y cuando la ley lo exige o para proteger nuestros derechos, nuestra propiedad o nuestra seguridad.',
          },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies y seguimiento',
        blocks: [
          {
            p: 'El Sitio no establece cookies y no usa analítica, píxeles de seguimiento, etiquetas publicitarias ni grabación de sesiones, así que no hay banner de cookies. Tu navegador puede guardar archivos comunes en caché para que las páginas carguen más rápido. Puedes borrarlos en cualquier momento desde la configuración de tu navegador.',
          },
        ],
      },
      {
        id: 'third-parties',
        title: 'Servicios de terceros',
        blocks: [
          {
            p: 'Cuando sigues un enlace fuera del Sitio, el otro servicio aplica su propia política de privacidad. Estos enlaces incluyen:',
          },
          {
            ul: [
              '**Lemcal**, donde agendas una llamada ([abrir la página de reservas](book)).',
              '**Dribbble**, al que el Playground enlaza en cada shot ([nuestro perfil](dribbble)).',
              'Nuestros perfiles en LinkedIn, Instagram, YouTube y Clutch, enlazados desde el pie de página y la página de contacto.',
            ],
          },
          {
            p: 'No somos responsables de cómo estos servicios manejan tus datos. Lee sus políticas antes de usarlos.',
          },
        ],
      },
      {
        id: 'security',
        title: 'Seguridad de los datos',
        blocks: [
          {
            p: 'Tomamos medidas razonables para proteger la información que conservamos contra el acceso no autorizado, la divulgación, la alteración o la destrucción. Ningún método de transmisión por internet ni de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.',
          },
        ],
      },
      {
        id: 'rights',
        title: 'Tus derechos',
        blocks: [
          {
            p: 'Puedes pedir acceder a la información personal que tenemos sobre ti, actualizarla o eliminarla, y puedes pedirnos que dejemos de contactarte en cualquier momento. Para hacerlo, escribe a [{email}](mail).',
          },
        ],
      },
      {
        id: 'children',
        title: 'Menores de edad',
        blocks: [
          {
            p: 'El Sitio no está dirigido a menores de 13 años. No recopilamos a sabiendas información personal de menores, y si nos enteramos de que lo hicimos, la eliminaremos.',
          },
        ],
      },
      {
        id: 'changes',
        title: 'Cambios',
        blocks: [
          {
            p: 'Podemos actualizar esta política para reflejar cambios en nuestras prácticas o en los requisitos legales. La versión actualizada se publica en esta página con una fecha nueva al inicio.',
          },
        ],
      },
      {
        id: 'contact',
        title: 'Contacto',
        blocks: [
          {
            p: '¿Preguntas sobre esta política o sobre nuestras prácticas de privacidad? Escribe a [{email}](mail). Consulta también nuestros [términos y condiciones](terms).',
          },
        ],
      },
    ],
  },
};
