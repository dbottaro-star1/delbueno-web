import type { Localized } from '../config';
import type { LegalPage } from './legal';

export const privacyCopy: Localized<LegalPage> = {
  en: {
    meta: {
      title: 'Privacy policy',
      description:
        'delbuenostudio.com is a static site with one request form. It uses Hotjar and an ads pixel to see how pages are used. Here is what we receive, and why.',
    },
    title: 'Privacy policy',
    lede: 'This site has no accounts and one form, to request a free UX audit. It uses Hotjar to understand how visitors use its pages and the OpenAI Ads pixel to measure our ads in ChatGPT. Here is the personal information we receive.',
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
              'The Website is a static site. Its only form is the free UX audit request. It has no accounts and no comments.',
              'It uses Hotjar to see how pages are used, through heatmaps and anonymized session recordings. Hotjar sets its own cookies.',
              'Umami and Cloudflare Web Analytics count visits without cookies.',
              'It uses the OpenAI Ads Measurement Pixel to see whether visits from our ads in ChatGPT end in a request. We do not sell data.',
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
            p: 'The Website asks for personal information only in the free UX audit form. We receive it only when you choose to share it:',
          },
          {
            ul: [
              '**Audit form.** If you request a free UX audit, we receive your email address, your product stage, and the link and notes you add. [Web3Forms](web3forms) processes the form and forwards it to our inbox.',
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
            p: 'We use the information you send us to reply to you, to schedule and hold calls, to prepare proposals or a [free UX audit](audit) you ask for, and to meet our legal obligations. We do not sell it, and we use it for advertising only to measure our own ads, as described under Cookies and tracking.',
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Sharing',
        blocks: [
          {
            p: 'We share personal information only with service providers that help us run the studio, such as our email, form, calendar, analytics and ad measurement tools, and when the law requires it or to protect our rights, property or safety.',
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
            p: 'We also use Umami and Cloudflare Web Analytics to count visits. They record page views, clicks on the booking, WhatsApp, email and outbound links, referring sites, device type, browser and approximate location (country and city, worked out from your IP address, which they do not store). Neither sets cookies or identifies you.',
          },
          {
            p: 'We use the [OpenAI Ads Measurement Pixel](openai) to measure whether visits from our ads in ChatGPT lead to an audit request, a WhatsApp message or a booked call. It sets two first party cookies: __oppref, which keeps the reference of the ad you clicked for 30 days, and __obref, a random browser reference that lasts one year. When you send the audit form, the pixel can send OpenAI a SHA-256 hash of the email address you entered, never the address itself, to match the request to an ad. We use this only to measure our ads, not to build audiences.',
          },
          {
            p: 'The Website sets no other cookies. If your browser sends a Global Privacy Control signal, neither Hotjar nor the OpenAI pixel is loaded. You can also block or delete cookies at any time in your browser settings, and the Website keeps working without them.',
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
              '**OpenAI**, which measures our ads in ChatGPT ([OpenAI privacy policy](openai)).',
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
        'delbuenostudio.com es un sitio estático con un formulario. Usa Hotjar y un píxel publicitario para ver cómo se usa. Esto es lo que recibimos, y por qué.',
    },
    title: 'Política de privacidad',
    lede: 'Este sitio no tiene cuentas y tiene un solo formulario, para pedir una auditoría UX gratis. Usa Hotjar para entender cómo los visitantes usan sus páginas y el píxel de OpenAI Ads para medir nuestros anuncios en ChatGPT. Esta es la información personal que recibimos.',
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
              'El Sitio es un sitio estático. Su único formulario es el de la auditoría UX gratis. No tiene cuentas ni comentarios.',
              'Usa Hotjar para ver cómo se usan las páginas, con mapas de calor y grabaciones de sesión anonimizadas. Hotjar establece sus propias cookies.',
              'Umami y Cloudflare Web Analytics cuentan las visitas sin cookies.',
              'Usa el píxel de medición de OpenAI Ads para saber si las visitas que llegan desde nuestros anuncios en ChatGPT terminan en una solicitud. No vendemos datos.',
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
            p: 'El Sitio pide información personal solo en el formulario de la auditoría UX gratis. La recibimos solo cuando decides compartirla:',
          },
          {
            ul: [
              '**Formulario de auditoría.** Si pides una auditoría UX gratis, recibimos tu correo, la etapa de tu producto y el enlace y las notas que agregues. [Web3Forms](web3forms) procesa el formulario y lo reenvía a nuestro correo.',
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
            p: 'Usamos la información que nos envías para responderte, para agendar y realizar llamadas, para preparar propuestas o una [auditoría UX gratis](audit) que nos pidas y para cumplir nuestras obligaciones legales. No la vendemos, y la usamos para publicidad solo para medir nuestros propios anuncios, como se explica en Cookies y seguimiento.',
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Con quién la compartimos',
        blocks: [
          {
            p: 'Compartimos información personal solo con proveedores de servicios que nos ayudan a operar el estudio, como nuestras herramientas de correo, formularios, calendario, analítica y medición de anuncios, y cuando la ley lo exige o para proteger nuestros derechos, nuestra propiedad o nuestra seguridad.',
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
            p: 'También usamos Umami y Cloudflare Web Analytics para contar las visitas. Registran páginas vistas, clics en los enlaces de reserva, de WhatsApp, de correo y externos, sitios de origen, tipo de dispositivo, navegador y ubicación aproximada (país y ciudad, deducidos de tu dirección IP, que no guardan). Ninguno establece cookies ni te identifica.',
          },
          {
            p: 'Usamos el [píxel de medición de OpenAI Ads](openai) para saber si las visitas que llegan desde nuestros anuncios en ChatGPT terminan en una solicitud de auditoría, un mensaje de WhatsApp o una llamada agendada. Establece dos cookies propias: __oppref, que guarda durante 30 días la referencia del anuncio en el que hiciste clic, y __obref, una referencia aleatoria del navegador que dura un año. Cuando envías el formulario de auditoría, el píxel puede enviar a OpenAI un hash SHA-256 del correo que ingresaste, nunca el correo en sí, para asociar la solicitud a un anuncio. Lo usamos solo para medir nuestros anuncios, no para armar audiencias.',
          },
          {
            p: 'El Sitio no establece otras cookies. Si tu navegador envía la señal Global Privacy Control, no se cargan ni Hotjar ni el píxel de OpenAI. También puedes bloquear o borrar las cookies en cualquier momento desde la configuración de tu navegador, y el Sitio sigue funcionando sin ellas.',
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
              '**OpenAI**, que mide nuestros anuncios en ChatGPT ([política de privacidad de OpenAI](openai)).',
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
