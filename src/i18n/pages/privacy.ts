import type { Localized } from '../config';
import type { LegalPage } from './legal';

export const privacyCopy: Localized<LegalPage> = {
  en: {
    meta: {
      title: 'Privacy policy',
      description:
        'delbuenostudio.com is a static site with no forms. It uses Hotjar to see how pages are used. Here is what personal information we receive, and why.',
    },
    title: 'Privacy policy',
    lede: 'This site has no forms and no accounts. It uses Hotjar to understand how visitors use its pages. Here is the personal information we receive.',
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
              'It uses Hotjar to see how pages are used, through heatmaps and anonymized session recordings. Hotjar sets its own cookies.',
              'Umami and Cloudflare Web Analytics count visits without cookies.',
              'It has no advertising tags or tracking pixels, and we do not sell data.',
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
              '**Usage data.** While you browse, Hotjar records how you use the pages: clicks, taps, scrolling and mouse movement, the pages you visit, your device type, browser, screen size and approximate country. Text you type is masked before it leaves your browser. Hotjar does not give us your name or contact details.',
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
            p: 'We share personal information only with service providers that help us run the studio, such as our email, calendar and analytics tools, and when the law requires it or to protect our rights, property or safety.',
          },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and tracking',
        blocks: [
          {
            p: 'We use [Hotjar](hotjar) to understand how visitors use the Website, so we can improve it. Hotjar creates heatmaps and session recordings of page visits and stores its data in the European Union. It sets first party cookies, such as _hjSessionUser and _hjSession, to tell one visit from the next. They last up to one year and are not used for advertising.',
          },
          {
            p: 'We also use Umami and Cloudflare Web Analytics to count visits. They record page views, referring sites, device type, browser and approximate location (country and city, worked out from your IP address, which they do not store). Neither sets cookies or identifies you.',
          },
          {
            p: 'The Website itself sets no other cookies and uses no advertising tags or tracking pixels. If your browser sends a Global Privacy Control signal, Hotjar is not loaded. You can also block or delete cookies at any time in your browser settings, and the Website keeps working without them.',
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
              '**Hotjar**, which measures how the Website is used ([Hotjar privacy policy](hotjar)).',
              '**Umami**, which counts visits ([Umami privacy policy](umami)).',
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
        'delbuenostudio.com es un sitio estático sin formularios. Usa Hotjar para ver cómo se usan las páginas. Esta es la información que recibimos, y por qué.',
    },
    title: 'Política de privacidad',
    lede: 'Este sitio no tiene formularios ni cuentas. Usa Hotjar para entender cómo los visitantes usan sus páginas. Esta es la información personal que recibimos.',
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
              'Usa Hotjar para ver cómo se usan las páginas, con mapas de calor y grabaciones de sesión anonimizadas. Hotjar establece sus propias cookies.',
              'Umami y Cloudflare Web Analytics cuentan las visitas sin cookies.',
              'No tiene etiquetas publicitarias ni píxeles de seguimiento, y no vendemos datos.',
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
              '**Datos de uso.** Mientras navegas, Hotjar registra cómo usas las páginas: clics, toques, desplazamiento y movimiento del mouse, las páginas que visitas, el tipo de dispositivo, el navegador, el tamaño de pantalla y el país aproximado. El texto que escribes se oculta antes de salir de tu navegador. Hotjar no nos da tu nombre ni tus datos de contacto.',
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
            p: 'Compartimos información personal solo con proveedores de servicios que nos ayudan a operar el estudio, como nuestras herramientas de correo, calendario y analítica, y cuando la ley lo exige o para proteger nuestros derechos, nuestra propiedad o nuestra seguridad.',
          },
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies y seguimiento',
        blocks: [
          {
            p: 'Usamos [Hotjar](hotjar) para entender cómo los visitantes usan el Sitio y así mejorarlo. Hotjar crea mapas de calor y grabaciones de sesión de las visitas y guarda sus datos en la Unión Europea. Establece cookies propias, como _hjSessionUser y _hjSession, para distinguir una visita de la siguiente. Duran hasta un año y no se usan para publicidad.',
          },
          {
            p: 'También usamos Umami y Cloudflare Web Analytics para contar las visitas. Registran páginas vistas, sitios de origen, tipo de dispositivo, navegador y ubicación aproximada (país y ciudad, deducidos de tu dirección IP, que no guardan). Ninguno establece cookies ni te identifica.',
          },
          {
            p: 'El Sitio no establece otras cookies y no usa etiquetas publicitarias ni píxeles de seguimiento. Si tu navegador envía la señal Global Privacy Control, Hotjar no se carga. También puedes bloquear o borrar las cookies en cualquier momento desde la configuración de tu navegador, y el Sitio sigue funcionando sin ellas.',
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
              '**Hotjar**, que mide cómo se usa el Sitio ([política de privacidad de Hotjar](hotjar)).',
              '**Umami**, que cuenta las visitas ([política de privacidad de Umami](umami)).',
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
