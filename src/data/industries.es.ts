import type { IndustryText } from './industries';

/**
 * Spanish copy for each industry. The problems line up by position with the English ones: the journal post each one
 * links to, the case studies and the keywords stay in industries.ts.
 */
export const industriesEs: Record<string, IndustryText> = {
  cloud: {
    seoDescription:
      'Diseño UX para infraestructura cloud: consolas, vistas de recursos, dashboards y onboarding. Con CloudGuardia, la satisfacción de usuarios subió 42%.',
    name: 'Nube',
    title: 'Diseño UX para productos de infraestructura en la nube',
    summary: 'Interfaces para plataformas cloud, herramientas de costos y consolas de infraestructura.',
    answer:
      'delbueno™ Studio diseña productos de infraestructura en la nube para equipos de software B2B: consolas, vistas de recursos, dashboards, flujos de onboarding y herramientas de administración. Convertimos plataformas complejas en interfaces que simplifican la operación y aceleran la adopción. Nuestro trabajo de seguridad cloud para CloudGuardia subió la satisfacción de los usuarios 42%.',
    problems: [
      {
        title: 'Inventarios que nadie puede recorrer',
        text: 'Miles de recursos repartidos entre cuentas y regiones necesitan filtros, agrupación y acciones masivas seguras, no otra tabla interminable.',
      },
      {
        title: 'Dashboards que muestran datos pero no la próxima decisión',
        text: 'El monitoreo, los costos y la salud del sistema solo sirven cuando la pantalla deja claro el siguiente paso a quien la mira.',
      },
      {
        title: 'Configuraciones que se frenan antes del primer valor',
        text: 'Conectar cuentas y otorgar permisos es donde los usuarios nuevos se rinden. El onboarding tiene que demostrar valor en la primera sesión.',
      },
      {
        title: 'Permisos que nadie puede razonar',
        text: 'Roles, alcances y accesos heredados confunden a los administradores que dependen de ellos, y cada pantalla confusa es un riesgo de seguridad.',
      },
    ],
    designs: [
      'Exploradores de recursos',
      'Dashboards de costos y uso',
      'Asistentes de onboarding y configuración',
      'Consolas de administración, facturación y permisos',
    ],
    casesNote:
      'CloudGuardia es nuestra plataforma de seguridad cloud. Uleadz es el trabajo SaaS más cercano: dashboards, una app móvil y un solo sistema de diseño.',
    cta: 'Diseñemos infraestructura que crezca con tu negocio.',
    faqs: [
      {
        q: '¿Diseñan para productos multi-cloud?',
        a: 'Sí. Diseñamos patrones neutrales respecto al proveedor para inventario, accesos y costos, de modo que el producto se lea igual en todas las nubes.',
      },
      {
        q: '¿Cómo atienden a usuarios nuevos y expertos a la vez?',
        a: 'Con una ruta guiada para la primera configuración y vistas densas y filtrables para quienes operan a diario. Probamos con ambos grupos en tareas reales antes de pasar nada a ingeniería.',
      },
      {
        q: '¿Han diseñado una plataforma cloud antes?',
        a: 'Sí. Para CloudGuardia, una plataforma de seguridad cloud, hicimos investigación y personas, diseñamos el producto y un kit de diseño, y dibujamos 40 íconos e ilustraciones a medida. La satisfacción de los usuarios subió 42%.',
      },
    ],
  },
  cybersecurity: {
    seoDescription:
      'Diseño UX para ciberseguridad: colas de alertas, vistas de investigación y editores de políticas que reducen la fatiga de alertas y aclaran los datos.',
    name: 'Ciberseguridad',
    title: 'Diseño UX para productos de ciberseguridad',
    summary: 'Interfaces para operaciones de seguridad, gestión de postura y respuesta a amenazas.',
    answer:
      'delbueno™ Studio diseña productos de ciberseguridad donde los analistas trabajan bajo presión: colas de alertas, vistas de investigación, dashboards de postura y editores de políticas. Reducimos la fatiga de alertas, destacamos la siguiente acción y mantenemos legibles los datos densos, para que los equipos de seguridad respondan más rápido y cometan menos errores.',
    problems: [
      {
        title: 'La fatiga de alertas entierra la amenaza real',
        text: 'Cuando un certificado que vence en 60 días se ve igual que una base de datos que rechaza conexiones, los analistas aprenden a dejar de mirar. La severidad y la urgencia hay que diseñarlas.',
      },
      {
        title: 'Una severidad que no coincide con la realidad',
        text: 'Las herramientas llenas de funciones pueden seguir sintiéndose ineficaces cuando todo está en rojo. Una severidad clara y evidencia visible bajan la carga cognitiva sin ocultar el detalle.',
      },
      {
        title: 'Investigaciones que necesitan contexto de muchas fuentes',
        text: 'Los analistas arman la evidencia entre varias pestañas. Una buena vista de investigación pone la línea de tiempo, la evidencia y la siguiente acción lado a lado.',
      },
      {
        title: 'Reglas de acceso difíciles de explicar',
        text: 'Los permisos basados en roles son un control de seguridad y también un problema de usabilidad. Los administradores necesitan ver quién puede hacer qué, y por qué.',
      },
    ],
    designs: [
      'Colas de triaje de alertas',
      'Líneas de tiempo de investigación',
      'Dashboards de postura y riesgo',
      'Editores de políticas y permisos',
    ],
    casesNote:
      'CloudGuardia es una plataforma de seguridad cloud, con un puntaje de riesgo, un banner de alertas y un gestor de repositorios. La satisfacción de los usuarios subió 42%.',
    cta: 'Construyamos productos digitales seguros.',
    faqs: [
      {
        q: '¿Cómo reducen la fatiga de alertas en la interfaz?',
        a: 'Separamos las alertas que necesitan a una persona de las notificaciones, agrupamos las alertas relacionadas, las ordenamos por impacto en el usuario y mostramos la evidencia junto a la decisión, con la siguiente acción a un clic.',
      },
      {
        q: '¿Pueden diseñar para analistas y para ejecutivos en el mismo producto?',
        a: 'Sí. Diseñamos vistas por rol: los analistas tienen detalle denso y filtrable, y la dirección ve la postura y el riesgo de un vistazo, todo sobre un mismo sistema de diseño.',
      },
      {
        q: '¿Trabajan con productos que todavía están en stealth?',
        a: 'Sí. Firmamos un NDA si lo pides, y la auditoría UX gratis también cubre productos en beta y en stealth.',
      },
    ],
  },
  devops: {
    seoDescription:
      'Diseño UX para herramientas DevOps: vistas de pipelines, dashboards de despliegue, monitoreo e incidentes rápidos, amigables con el teclado y honestos.',
    name: 'DevOps',
    title: 'Diseño UX para herramientas DevOps',
    summary: 'Interfaces para pipelines, observabilidad y plataformas para desarrolladores.',
    answer:
      'delbueno™ Studio diseña herramientas DevOps para equipos de ingeniería: vistas de pipelines, dashboards de despliegue, monitoreo en tiempo real, vistas de incidentes y portales para desarrolladores. Diseñamos para quienes viven en la terminal, así que las interfaces se mantienen rápidas, amigables con el teclado y honestas sobre lo que pasa en producción.',
    problems: [
      {
        title: 'Un estado en el que no se puede confiar a las 3 a. m.',
        text: 'Durante un incidente, la pantalla tiene que decir qué está roto, quién es responsable y qué hacer después. Todo lo demás es ruido.',
      },
      {
        title: 'Pipelines y logs con demasiado detalle',
        text: 'Los entornos, las etapas y los logs se acumulan rápido. La arquitectura de la información decide si un ingeniero encuentra el paso que falla o se rinde.',
      },
      {
        title: 'Un onboarding que nunca demuestra valor',
        text: 'Una herramienta para desarrolladores gana confianza en la primera sesión o no la gana nunca. La primera ejecución tiene que mostrar un resultado real rápido.',
      },
      {
        title: 'Usuarios que prefieren la línea de comandos',
        text: 'La interfaz debería reforzar la CLI, no pelear con ella: nombres consistentes, atajos de teclado y enlaces que van y vienen entre las dos.',
      },
    ],
    designs: [
      'Vistas de pipelines y despliegues',
      'Dashboards de incidentes y guardias',
      'Exploradores de logs y trazas',
      'Portales para desarrolladores',
    ],
    casesNote:
      'Todavía no publicamos un caso de estudio específico de DevOps. CloudGuardia es el más cercano: un gestor de repositorios, alertas, gráficos de rendimiento y un registro de actividad.',
    cta: 'Agilicemos tu flujo de desarrollo.',
    faqs: [
      {
        q: '¿Diseñan para desarrolladores que prefieren la CLI?',
        a: 'Sí. Mantenemos la interfaz amigable con el teclado y coherente con la línea de comandos, para que las dos se refuercen entre sí.',
      },
      {
        q: '¿Qué diseñan para los equipos DevOps?',
        a: 'Dashboards de monitoreo en tiempo real, vistas de despliegue, seguimiento de costos y salud del sistema, con el objetivo de reducir la carga cognitiva y aumentar la velocidad del equipo.',
      },
      {
        q: '¿Pueden probar con ingenieros?',
        a: 'Sí. Reclutamos testers con el rol objetivo, como tech leads, administradores cloud y desarrolladores, y hacemos sesiones rápidas que sacan a la luz la fricción en minutos.',
      },
    ],
  },
  ai: {
    seoDescription:
      'Diseño UX para productos de IA y agentes: flujos, copilotos y resultados explicables, con control humano, señales de confianza y rutas de recuperación.',
    name: 'IA',
    title: 'Diseño UX para productos de IA y agentes',
    summary: 'Interfaces para agentes de IA, copilotos y aprendizaje automático explicable.',
    answer:
      'delbueno™ Studio diseña productos nativos de IA: flujos de agentes, copilotos y resultados de modelos explicables. Nos enfocamos en la confianza, con control humano en el circuito, señales de confianza y rutas de recuperación, para que los usuarios sepan qué hizo el sistema, por qué lo hizo y cómo corregirlo. Buzz Bunny, 1to1000 y Shay son nuestro trabajo en IA.',
    problems: [
      {
        title: 'Resultados que los usuarios no pueden inspeccionar',
        text: 'Nadie confía en un resultado que no puede cuestionar. La explicabilidad hay que diseñarla para cada audiencia, desde el usuario final hasta el auditor.',
      },
      {
        title: 'Acciones de agentes que corren sin revisión',
        text: 'La pregunta es dónde debe estar una persona en el circuito. Ordenamos las acciones por reversibilidad y radio de impacto, y diseñamos las aprobaciones a partir de eso.',
      },
      {
        title: 'Una incertidumbre difícil de comunicar',
        text: 'El software inteligente a veces se equivoca. Las señales de confianza, las vistas previas y las rutas de recuperación mantienen esa honestidad sin frenar al usuario.',
      },
      {
        title: 'Modelos y flujos que nadie sabe leer',
        text: 'Los dashboards de IA para modelos, pipelines y resultados necesitan la misma claridad que cualquier pantalla SaaS compleja, o el equipo no puede actuar sobre lo que muestra el sistema.',
      },
    ],
    designs: [
      'Espacios de trabajo de agentes y flujos de aprobación',
      'Paneles de explicabilidad',
      'Interfaces de chat y copilotos',
      'Dashboards de modelos y flujos de trabajo',
    ],
    cta: 'Construyamos productos inteligentes impulsados por IA.',
    faqs: [
      {
        q: '¿Cómo diseñan experiencias con una persona en el circuito?',
        a: 'Definimos qué acciones necesitan aprobación, mostramos el plan del agente antes de que se ejecute y hacemos que cada paso sea revisable y reversible.',
      },
      {
        q: '¿Han lanzado productos de IA?',
        a: 'Sí. Buzz Bunny es una app de recomendación de acciones con IA, construida en Flutter, donde la finalización del onboarding subió de 62% a 91%. 1to1000 es una app de emparejamiento inmobiliario con IA que pasó del concepto al MVP en 45 días. Shay combina una app de lealtad con un CRM impulsado por IA.',
      },
      {
        q: '¿Pueden prototipar funciones de IA rápidamente?',
        a: 'Sí. Usamos prototipado asistido por IA para poner una versión funcional frente a los usuarios desde temprano, como hicimos con el asistente de diagnóstico de la tienda Vzari.',
      },
    ],
  },
  fintech: {
    seoDescription:
      'Diseño UX para productos fintech: flujos de pago, dashboards de cuentas, onboarding y pasos de cumplimiento que mantienen claro cada movimiento de dinero.',
    name: 'Fintech',
    title: 'Diseño UX para productos fintech',
    summary: 'Interfaces para pagos, banca, inversión y operaciones financieras.',
    answer:
      'delbueno™ Studio diseña productos fintech para equipos B2B y sus clientes: flujos de pago, dashboards de cuentas, onboarding y pasos de cumplimiento. Hacemos que los procesos regulados se sientan simples y que cada movimiento de dinero sea inequívoco. Para Buzz Bunny, una app de acciones con IA, la finalización del onboarding subió de 62% a 91%.',
    problems: [
      {
        title: 'Movimientos de dinero que no se pueden deshacer',
        text: 'Un toque equivocado mueve dinero real. Las confirmaciones tienen que significar algo, y el deshacer hay que diseñarlo incluso cuando el sistema dice que no existe.',
      },
      {
        title: 'Pasos de cumplimiento que provocan abandono',
        text: 'La verificación y el onboarding son donde los usuarios se van. Una secuencia clara y un progreso visible evitan que los pasos regulados se sientan como muros.',
      },
      {
        title: 'Tablas y reportes densos para equipos de finanzas',
        text: 'Las pantallas de conciliación y reportes se leen durante horas. La jerarquía, la alineación y el filtrado deciden si son usables o agotadoras.',
      },
      {
        title: 'Recomendaciones que la gente necesita entender',
        text: 'Cuando el software sugiere una operación o una transferencia, los usuarios quieren saber por qué. Explicar la recomendación es parte de ganarse la confianza.',
      },
    ],
    designs: [
      'Flujos de onboarding y verificación',
      'Flujos de pagos y transferencias',
      'Dashboards de cuentas y portafolios',
      'Tablas de reportes y conciliación',
    ],
    casesNote:
      'Buzz Bunny es nuestro caso de estudio fintech: una app de recomendación de acciones con IA para inversionistas comunes.',
    cta: 'Construyamos productos fintech en los que la gente pueda confiar.',
    faqs: [
      {
        q: '¿Pueden trabajar dentro de restricciones regulatorias?',
        a: 'Sí. Diseñamos desde el inicio con tus requisitos de cumplimiento y documentamos el razonamiento detrás de cada paso.',
      },
      {
        q: '¿Cómo diseñan acciones que los usuarios no pueden deshacer?',
        a: 'Evitamos los errores antes de que ocurran, hacemos que las confirmaciones muestren el monto y la consecuencia, y diseñamos una ruta de recuperación para los momentos en que el sistema dice que no hay forma de deshacer.',
      },
      {
        q: '¿Han diseñado un producto fintech?',
        a: 'Sí. Buzz Bunny es una app de recomendación de acciones con IA para iOS y Android. La finalización del onboarding subió de 62% a 91%, y la beta cerrada llegó a más de 1000 usuarios tempranos.',
      },
    ],
  },
};
