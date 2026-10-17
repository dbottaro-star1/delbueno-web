import type { Localized } from '../config';
import type { LegalPage } from './legal';

export const termsCopy: Localized<LegalPage> = {
  en: {
    meta: {
      title: 'Terms and conditions',
      description:
        'The terms that apply when you use delbuenostudio.com, book a call or request a free UX audit from delbueno™ Studio, including liability and governing law.',
    },
    title: 'Terms and conditions',
    lede: 'These terms govern your use of delbuenostudio.com, operated by {brand}.',
    sections: [
      {
        id: 'agreement',
        title: 'Agreement',
        blocks: [
          {
            p: 'These Terms and Conditions (“Terms”) govern your use of the website delbuenostudio.com (“Website”), operated by {brand} (“we”, “us” or “our”). By accessing or using the Website you agree to be bound by these Terms. If you do not agree, please do not use the Website.',
          },
        ],
      },
      {
        id: 'ip',
        title: 'Intellectual property',
        blocks: [
          {
            p: 'The content of the Website, including text, graphics, logos, images, case studies, blog articles and code, belongs to {brand} or its licensors and is protected by copyright, trademark and other intellectual property laws. You may not use, reproduce, modify or distribute it without our prior written consent.',
          },
          {
            p: 'Case studies and shots show work made by {brand}. Client names and product names belong to their respective owners. Concept projects shown on the Website are self-initiated and are not commissioned by, or affiliated with, the brands they mention.',
          },
        ],
      },
      {
        id: 'use',
        title: 'Acceptable use',
        blocks: [
          {
            p: 'You agree to use the Website for lawful purposes only and to follow all applicable laws and regulations. You may not infringe the rights of others, harass or defame anyone, or try to disrupt or gain unauthorized access to the Website.',
          },
        ],
      },
      {
        id: 'booking',
        title: 'Booking and email',
        blocks: [
          {
            p: 'The Website has no forms. You can book a call through Lemcal, a third party service with its own terms and privacy policy, or write to us at [{email}](mail).',
          },
          {
            p: 'Booking a call or sending an email does not by itself create a client relationship or any obligation for either side. Project work is agreed separately.',
          },
        ],
      },
      {
        id: 'audit',
        title: 'The free UX audit',
        blocks: [
          {
            p: 'The [free UX audit](audit) is offered at our discretion and in limited numbers per week. It is advice based on the information you share and on what we can see of your product. We may decline requests that do not fit our current capacity, and the audit is not a guarantee of any result.',
          },
        ],
      },
      {
        id: 'journal',
        title: 'Blog and content',
        blocks: [
          {
            p: 'Articles in the [blog](journal) are general information about design and product work. They are not professional, legal or financial advice, and you should not rely on them as such.',
          },
        ],
      },
      {
        id: 'links',
        title: 'Third party links',
        blocks: [
          {
            p: 'The Website links to services we do not own or control, including Lemcal for booking, [Dribbble](dribbble) for the Playground, and our profiles on LinkedIn, Instagram and Clutch. We are not responsible for their content, policies or practices. Your use of them is governed by their own terms and privacy policies.',
          },
        ],
      },
      {
        id: 'warranty',
        title: 'Disclaimer of warranties',
        blocks: [
          {
            p: 'The Website is provided on an “as is” and “as available” basis, without warranties of any kind, express or implied. We make no representations about the accuracy, completeness, reliability or suitability of the content on the Website.',
          },
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        blocks: [
          {
            p: 'To the extent permitted by law, in no event shall {brand} or its officers, employees, agents or affiliates be liable for any indirect, incidental, special, consequential or punitive damages arising out of or in connection with your use of the Website or these Terms.',
          },
        ],
      },
      {
        id: 'law',
        title: 'Governing law',
        blocks: [
          {
            p: 'These Terms are governed by and construed in accordance with the laws of Uruguay, without regard to its conflict of law provisions.',
          },
        ],
      },
      {
        id: 'changes',
        title: 'Changes',
        blocks: [
          {
            p: 'We may modify these Terms at any time. Changes take effect when the revised Terms are posted on the Website, and your continued use of the Website afterward means you accept them. The date at the top of this page shows the latest update.',
          },
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        blocks: [
          {
            p: 'If you have questions about these Terms, write to [{email}](mail). See also our [privacy policy](privacy).',
          },
        ],
      },
    ],
  },
  es: {
    meta: {
      title: 'Términos y condiciones',
      description:
        'Los términos al usar delbuenostudio.com, agendar una llamada o pedir una auditoría UX gratis a delbueno™ Studio, con responsabilidad y ley aplicable.',
    },
    title: 'Términos y condiciones',
    lede: 'Estos términos rigen el uso de delbuenostudio.com, operado por {brand}.',
    sections: [
      {
        id: 'agreement',
        title: 'Acuerdo',
        blocks: [
          {
            p: 'Estos Términos y Condiciones (los “Términos”) rigen tu uso del sitio web delbuenostudio.com (el “Sitio”), operado por {brand} (“nosotros” o “nuestro”). Al acceder al Sitio o usarlo, aceptas quedar sujeto a estos Términos. Si no estás de acuerdo, por favor no uses el Sitio.',
          },
        ],
      },
      {
        id: 'ip',
        title: 'Propiedad intelectual',
        blocks: [
          {
            p: 'El contenido del Sitio, incluidos los textos, gráficos, logotipos, imágenes, casos de estudio, artículos del blog y código, pertenece a {brand} o a sus licenciantes y está protegido por las leyes de derechos de autor, de marcas y de otros derechos de propiedad intelectual. No puedes usarlo, reproducirlo, modificarlo ni distribuirlo sin nuestro consentimiento previo por escrito.',
          },
          {
            p: 'Los casos de estudio y los shots muestran trabajo realizado por {brand}. Los nombres de clientes y de productos pertenecen a sus respectivos dueños. Los proyectos conceptuales que se muestran en el Sitio son iniciativas propias y no fueron encargados por las marcas que mencionan ni están afiliados a ellas.',
          },
        ],
      },
      {
        id: 'use',
        title: 'Uso aceptable',
        blocks: [
          {
            p: 'Aceptas usar el Sitio solo con fines lícitos y cumplir todas las leyes y normas aplicables. No puedes vulnerar los derechos de terceros, acosar ni difamar a nadie, ni intentar interrumpir el Sitio u obtener acceso no autorizado a él.',
          },
        ],
      },
      {
        id: 'booking',
        title: 'Reservas y correo',
        blocks: [
          {
            p: 'El Sitio no tiene formularios. Puedes agendar una llamada a través de Lemcal, un servicio de terceros con sus propios términos y su propia política de privacidad, o escribirnos a [{email}](mail).',
          },
          {
            p: 'Agendar una llamada o enviar un correo no crea por sí solo una relación de cliente ni obligación alguna para ninguna de las partes. El trabajo de un proyecto se acuerda por separado.',
          },
        ],
      },
      {
        id: 'audit',
        title: 'La auditoría UX gratis',
        blocks: [
          {
            p: 'La [auditoría UX gratis](audit) se ofrece a nuestra discreción y en cantidades limitadas por semana. Es una recomendación basada en la información que compartes y en lo que podemos ver de tu producto. Podemos rechazar solicitudes que no encajen con nuestra capacidad actual, y la auditoría no garantiza ningún resultado.',
          },
        ],
      },
      {
        id: 'journal',
        title: 'Blog y contenido',
        blocks: [
          {
            p: 'Los artículos del [blog](journal), publicados en español y en inglés, son información general sobre diseño y trabajo de producto. No constituyen asesoría profesional, legal ni financiera, y no debes basarte en ellos como tal.',
          },
        ],
      },
      {
        id: 'links',
        title: 'Enlaces de terceros',
        blocks: [
          {
            p: 'El Sitio enlaza a servicios que no son nuestros ni controlamos, entre ellos Lemcal para las reservas, [Dribbble](dribbble) para el Playground y nuestros perfiles en LinkedIn, Instagram y Clutch. No somos responsables de su contenido, sus políticas ni sus prácticas. Tu uso de esos servicios se rige por sus propios términos y políticas de privacidad.',
          },
        ],
      },
      {
        id: 'warranty',
        title: 'Exención de garantías',
        blocks: [
          {
            p: 'El Sitio se ofrece “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas ni implícitas. No hacemos declaraciones sobre la exactitud, la integridad, la confiabilidad ni la idoneidad del contenido del Sitio.',
          },
        ],
      },
      {
        id: 'liability',
        title: 'Limitación de responsabilidad',
        blocks: [
          {
            p: 'En la medida en que la ley lo permita, {brand} y sus directivos, empleados, agentes o afiliados no serán responsables en ningún caso de daños indirectos, incidentales, especiales, consecuentes o punitivos que surjan de tu uso del Sitio o de estos Términos, o que estén relacionados con ellos.',
          },
        ],
      },
      {
        id: 'law',
        title: 'Ley aplicable',
        blocks: [
          {
            p: 'Estos Términos se rigen e interpretan de acuerdo con las leyes de Uruguay, sin tener en cuenta sus normas sobre conflicto de leyes.',
          },
        ],
      },
      {
        id: 'changes',
        title: 'Cambios',
        blocks: [
          {
            p: 'Podemos modificar estos Términos en cualquier momento. Los cambios entran en vigor cuando los Términos revisados se publican en el Sitio, y si sigues usando el Sitio después, entendemos que los aceptas. La fecha al inicio de esta página indica la última actualización.',
          },
        ],
      },
      {
        id: 'contact',
        title: 'Contacto',
        blocks: [
          {
            p: 'Si tienes preguntas sobre estos Términos, escribe a [{email}](mail). Consulta también nuestra [política de privacidad](privacy).',
          },
        ],
      },
    ],
  },
};
