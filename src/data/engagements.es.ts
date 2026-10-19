import type { EngagementText, EngagementsCopy } from './engagements';

/** Spanish copy for each engagement model. The names are product names and stay in English. */
export const engagementsEs: Record<string, EngagementText> = {
  'launch-sprint': {
    summary:
      'Alcance fijo, tarifa fija, de 2 a 4 semanas. Para MVPs, rediseños y módulos nuevos con presupuesto y plazo garantizados.',
    chips: ['Alcance fijo', 'Tarifa fija', 'De 2 a 4 semanas'],
    bestFor: 'MVPs, rediseños y módulos nuevos que necesitan presupuesto y plazo garantizados.',
    description:
      'El alcance se fija al inicio y se cotiza como una tarifa fija, así que sabes qué se entrega, cuánto cuesta y cuándo llega. Los proyectos duran de 2 a 4 semanas.',
    includes: ['Alcance fijo', 'Tarifa fija', 'De 2 a 4 semanas', 'Presupuesto y plazo garantizados'],
    idealFor: [
      'Un MVP con un conjunto de funciones bien definido',
      'El rediseño de un módulo o de un flujo',
      'Un presupuesto y una fecha que necesitas garantizar',
    ],
  },
  'design-partner': {
    summary:
      'Una suscripción mensual. Solicitudes ilimitadas, de una en una, cada una entregada en 24 a 48 h. Para roadmaps que cambian cada semana.',
    chips: ['Mensual', 'Solicitudes ilimitadas', '24 a 48 h cada una'],
    bestFor: 'Roadmaps que cambian cada semana.',
    description:
      'Envía solicitudes cuando surjan. Las tomamos de una en una y entregamos cada una en 24 a 48 horas, por una suscripción mensual fija.',
    includes: [
      'Suscripción mensual',
      'Solicitudes ilimitadas',
      'Una solicitud a la vez',
      'Cada una entregada en 24 a 48 h',
    ],
    idealFor: [
      'Un roadmap fluido donde aparecen tickets nuevos cada semana',
      'Equipos que prefieren dejar el trabajo en una cola antes que renegociar un alcance fijo',
      'Productos que lanzaron un MVP y ahora iteran',
    ],
  },
  'designer-on-demand': {
    summary:
      'Un diseñador dedicado de delbueno dentro de tu Slack y tu Figma, medio tiempo o tiempo completo. Pausa cuando quieras.',
    chips: ['En tu Slack y tu Figma', 'Medio tiempo o tiempo completo', 'Pausa cuando quieras'],
    bestFor: 'Equipos que quieren un diseñador dedicado trabajando dentro de sus propias herramientas.',
    description:
      'Un diseñador dedicado de delbueno se une a tu Slack y a tu Figma, a medio tiempo o a tiempo completo. Puedes pausar cuando quieras.',
    includes: [
      'Diseñador dedicado de delbueno',
      'En tu Slack y tu Figma',
      'Medio tiempo o tiempo completo',
      'Pausa cuando quieras',
    ],
    idealFor: [
      'Un diseñador que se une a tu Slack, tus standups, tus sprints en Jira y tu Figma',
      'Capacidad sin un proceso largo de contratación: inicio en 48 horas',
      'Un flujo constante de tarjetas de dashboard, microinteracciones, actualizaciones del sistema de diseño y presentaciones',
    ],
  },
};

/** Labels and cells of the comparison table, in the same order as the English rows. */
export const compareRowsEs: EngagementsCopy['compareRows'] = [
  {
    label: 'Ideal para',
    values: [
      'MVPs, rediseños y módulos nuevos',
      'Roadmaps que cambian cada semana',
      'Equipos que quieren un diseñador dentro de sus propias herramientas',
    ],
  },
  {
    label: 'Alcance',
    values: [
      'Fijo desde el inicio',
      'Un backlog abierto que reordenas cuando quieras',
      'Lo que tu equipo necesite después',
    ],
  },
  {
    label: 'Tiempo',
    values: ['De 2 a 4 semanas', 'Cada solicitud en 24 a 48 h', 'Medio tiempo o tiempo completo'],
  },
  {
    label: 'Facturación',
    values: ['Tarifa fija', 'Suscripción mensual', 'Tarifa mensual fija'],
  },
  {
    label: 'Con quién trabajas',
    values: ['El equipo de delbueno', 'El equipo de delbueno', 'Un diseñador dedicado de delbueno'],
  },
  {
    label: 'Dónde se trabaja',
    values: [
      'Un espacio compartido en Notion y un canal de Slack',
      'Un tablero compartido estilo Trello',
      'Tu Slack y tu Figma',
    ],
  },
  {
    label: 'Flexibilidad',
    values: [
      'Presupuesto, plazo y entregables garantizados',
      'Puedes pasar desde un Sprint, y el alcance que se superpone se acredita',
      'Pausa cuando quieras',
    ],
  },
];

export const requestFlowEs: EngagementsCopy['requestFlow'] = {
  intro:
    'Mantienes un backlog estilo Trello en un tablero compartido. Una solicitud es cualquier tarea que se pueda completar en unas 4 horas de diseño enfocado: un conjunto de tarjetas de dashboard, un flujo de modal, una especificación de motion o tres banners para redes.',
  steps: [
    {
      title: 'Súmala al backlog',
      text: 'Deja las solicitudes en el tablero compartido cuando surjan y reordénalas a medida que cambian las prioridades.',
    },
    {
      title: 'Tomamos el ticket de arriba',
      text: 'Una solicitud a la vez, para que cada ticket reciba toda la atención.',
    },
    {
      title: 'Entregado en 24 a 48 h',
      text: 'Recibes el resultado en uno o dos días, no al final del mes.',
    },
    {
      title: 'Feedback y luego el siguiente',
      text: 'Lo revisas, iteramos si hace falta y pasamos al siguiente ticket.',
    },
  ],
  outro:
    'Las épicas más grandes se dividen en tickets pequeños, para que veas resultados cada dos días en lugar de esperar semanas por una gran entrega.',
};

export const pathEs: EngagementsCopy['path'] = {
  heading: 'Empieza con un Sprint, pasa a Design Partner.',
  text: 'Muchos clientes lanzan un MVP en un Launch Sprint y después pasan directo a Design Partner para iterar de forma continua. El cambio también funciona al revés, y acreditamos el alcance que se superpone para que nunca pagues dos veces por el mismo trabajo.',
  steps: [
    { name: 'Launch Sprint', note: 'Lanza el MVP en 2 a 4 semanas' },
    { name: 'Design Partner', note: 'Itera cada semana, 24 a 48 h por solicitud' },
  ],
};

export const engagementFaqsEs: EngagementsCopy['faqs'] = [
  {
    q: '¿Cómo elijo entre los tres modelos?',
    a: 'Elige un Launch Sprint cuando tienes un conjunto de funciones bien definido, como un MVP o el rediseño de un módulo, y quieres presupuesto, plazo y entregables garantizados. Elige Design Partner cuando tu roadmap es fluido y aparecen tickets nuevos cada semana. Elige Designer on Demand cuando quieres un diseñador dedicado trabajando dentro de tu propio Slack y tu Figma. Con una llamada de 15 minutos alcanza para decidir.',
  },
  {
    q: '¿Cómo funcionan en la práctica las “solicitudes ilimitadas, de una en una”?',
    a: 'Mantienes un backlog estilo Trello en nuestro tablero compartido. Una solicitud es cualquier tarea que se pueda completar en unas 4 horas de diseño enfocado, como un conjunto de tarjetas de dashboard, un flujo de modal, una especificación de motion o tres banners para redes. Tomamos el ticket de arriba, entregamos en 24 a 48 horas, recibimos tu feedback, iteramos si hace falta y pasamos al siguiente. Las épicas más grandes se dividen en tickets pequeños para que veas resultados cada dos días.',
  },
  {
    q: '¿Podemos pasar de un Launch Sprint a Design Partner más adelante?',
    a: 'Sí. Muchos clientes empiezan con un Launch Sprint para lanzar un MVP y después pasan directo a Design Partner para iterar de forma continua. Acreditamos el alcance que se superpone, así que nunca pagas dos veces por el mismo trabajo.',
  },
  {
    q: '¿Qué tan rápido podemos empezar?',
    a: 'Empezamos el mismo día en que acordamos el alcance, y ves los primeros conceptos en 48 horas.',
  },
  {
    q: '¿Cómo se factura?',
    a: 'Un Launch Sprint es una tarifa fija que se acuerda después de definir el alcance. Design Partner es una suscripción mensual y Designer on Demand es una tarifa mensual fija. Agenda una llamada de 15 minutos y te explicamos los detalles para tu proyecto.',
  },
  {
    q: '¿Qué husos horarios cubren?',
    a: 'Estamos en Punta del Este, Uruguay, y trabajamos en remoto en horario de EE. UU., así que las reuniones caen dentro de tu jornada.',
  },
];
