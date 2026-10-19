---
title: "UX para agentes de IA: cómo diseñar controles human-in-the-loop"
seoTitle: "Agentes de IA human-in-the-loop: UX para aprobaciones"
description: "Cómo diseñar aprobaciones human-in-the-loop para agentes de IA: vista previa antes, posibilidad de interrumpir durante, y auditoría y deshacer después."
pubDate: 2026-06-29
updatedDate: 2026-07-22
author: "Dani Bottaro"
category: "IA y UX"
heroImage: "../../assets/journal/ai-agent-ux-human-in-the-loop/pexels-photo-32845700.jpeg"
heroAlt: "Ingeniero que monitorea varias pantallas en una sala de control, una metáfora del UX de agentes de IA human-in-the-loop"
translationOf: "ai-agent-ux-human-in-the-loop"
---

Una herramienta de facturación B2B lanzó un agente de IA y una tarde reembolsó a 240 clientes en unos cuatro minutos. Había leído una macro de soporte como si fuera una orden, decidió que la forma más rápida de “resolver los tickets abiertos” era reembolsar cada uno de ellos, y siguió adelante. Nadie lo aprobó. Nadie estaba mirando. Finanzas lo fue armando a la mañana siguiente.

Culpar al modelo no tiene sentido. El modelo hizo lo que hacen los agentes: le das un objetivo y elige su propio camino. La falla estuvo en el producto. Le dio a un sistema autónomo las llaves para mover dinero y no dejó ningún lugar donde una persona pudiera intervenir entre la intención y el daño. Gran parte del trabajo en el **UX de agentes de IA** consiste en devolver a esa persona al lugar donde importa, sin estrangular la velocidad que hacía valioso construir el agente en primer lugar.

## Por qué el UX de agentes rompe las reglas con las que ya diseñabas

Durante dos décadas, el UX del software funcionó con una promesa silenciosa: haces clic en un control y el sistema hace exactamente lo que dice la etiqueta. Botones son acciones. La gracia era que nada te sorprendiera.

Los agentes rompen eso. Ahora el usuario pide un resultado: “limpia estas cuentas duplicadas”, “redacta respuestas para todos los de esta carpeta”, “escala el clúster si sube el tráfico”, y el sistema resuelve los pasos por su cuenta. La pantalla deja de ser un menú fijo de acciones y se convierte en una delegación de criterio, que es el cambio de fondo en el [diseño de producto para herramientas de IA](/es/industrias/ia/). Una vez que lo ves así, el diseño human-in-the-loop deja de ser un complemento de seguridad y pasa a ser el núcleo del producto.

Aquí está la trampa. Las dos formas de equivocarse tiran en direcciones opuestas. Con muy poca supervisión, el agente avanza con una mala lectura, como en el desastre de los reembolsos, y destruye la confianza de un solo golpe. Con demasiada, reconstruyes la herramienta manual con clics de confirmación extra, y el usuario empieza a preguntarse por qué está haciendo de niñera de algo que debía ahorrarle tiempo. El trabajo real es acotado: gasta la atención del usuario solo donde lo que está en juego lo justifica. La [People + AI Guidebook](https://pair.withgoogle.com/chapter/feedback-controls/) de Google llama a esto equilibrar control y automatización, y en los productos con agentes es la tensión de la que cuelga todo lo demás.

## Los tres momentos en que una persona debe estar en el circuito

Los equipos suelen imaginar el “human-in-the-loop” como un único popup de aprobación. En realidad son tres momentos, y no piden el mismo diseño.

### Antes de la acción: vista previa y aprobación

La intervención más barata también es la más útil: mostrar a las personas lo que el agente planea hacer antes de que lo haga. No un “yo me encargo” difuso, sino la acción concreta: “Voy a reembolsar estos 240 pedidos, $18,400 en total, desde esta cuenta.” Una vista previa convierte, sin hacer ruido, una sorpresa irreversible en una decisión que alguien puede tomar. El truco está en calibrar lo que muestras. Lo suficiente para juzgar la acción, no tanto como para que la gente pase por encima un muro de texto y apruebe por reflejo. Empieza por el radio de impacto (cuántos registros, cuánto dinero, qué sistemas) y deja que abran el detalle si quieren.

### Durante la acción: poder interrumpir

Todo lo que tarda en ejecutarse necesita un botón de detener que se vea de verdad. Si el agente está procesando 500 elementos, el usuario tiene que poder frenarlo en el 12 en cuanto note que algo anda mal, y ver con claridad lo que ya se hizo. Un agente que puedes mirar pero no interrumpir no es una herramienta, es un proceso descontrolado con barra de progreso. Haz que pausar y detener sean controles de primer nivel que se mantengan al alcance, y mantén honesto el estado de ejecución: hecho, en curso, todavía en cola.

### Después de la acción: auditoría y deshacer

Cuando la acción ya ocurrió, el trabajo de la persona pasa a ser revisar y reparar. Cada movimiento del agente necesita un rastro que alguien pueda leer de verdad (qué hizo, cuándo, por qué, con qué entrada), escrito para una persona estresada que lo escanea rápido, no enterrado en una pestaña de logs que nadie abre. Si se puede deshacer, dales un deshacer de verdad. Si no se puede, esa es la señal de que debió preguntar primero.

## Un marco: clasifica las acciones por reversibilidad y radio de impacto

No puedes poner a una persona delante de cada paso sin destruir el producto. Así que la decisión que tienes que tomar, a propósito, es qué acciones merecen fricción y cuáles no. Dos preguntas cargan con casi todo el peso.

**Reversibilidad.** ¿Se puede deshacer de forma limpia? Editar un borrador, sí. Enviar el correo, borrar el registro de un cliente, mover dinero, no.

**Radio de impacto.** ¿A cuántas personas, registros o dólares afecta una sola acción? Renombrar un archivo no es nada. Reetiquetar 10,000 contactos sí lo es.

Si ubicas las acciones del agente según esos dos ejes, el diseño casi se escribe solo:

-   **Reversible y pequeña** (reordenar una lista, redactar un texto): deja que el agente actúe. Aquí la fricción solo molesta.
-   **Reversible pero grande** (editar en bloque 10,000 registros): adelante, pero muestra un resumen claro y un deshacer de un clic.
-   **Irreversible pero pequeña** (enviar un mensaje): una confirmación ligera basta.
-   **Irreversible y grande** (emitir 240 reembolsos, borrar una base de datos de producción): freno total. Pide una aprobación explícita y específica, con los números a la vista del usuario, cada vez.

El fiasco de los reembolsos estaba de lleno en esa última casilla y se diseñó como si perteneciera a la primera. Ese desajuste es el error más común, y el más caro, en los productos con agentes hoy.

## Patrones que generan confianza sin frenar al agente

La fricción no es tu única palanca. Unos cuantos patrones mantienen a las personas tranquilas mientras el agente sigue avanzando.

**Muestra el razonamiento, en pocas palabras.** Un “por qué” de una línea junto a cada paso, como “marcado como duplicado: coinciden el correo y el teléfono”, permite confiar en lo rápido y detectar a tiempo lo malo. Aquí es donde el [UX de IA explicable](/explainable-ai-ux/) demuestra su valor, no como una casilla de cumplimiento, sino como lo que permite aprobar en dos segundos en lugar de en veinte.

**Acota la autorización.** Deja que las personas cedan autoridad en cantidades medidas. “Reembolsa hasta $500 por tu cuenta; por encima de eso, consúltame.” El permiso pasa a ser un dial que fija el usuario, no un único sí o no en la puerta de entrada.

**Usa el borrador por defecto.** Cuando no estés seguro, haz que el agente deje el resultado preparado para que una persona lo libere, en lugar de publicarlo directamente. Una carpeta de respuestas redactadas que envías con un clic se siente como una palanca. Cuarenta respuestas que ya salieron se sienten como un secuestro.

**Mantén el estado visible.** La gente tolera la autonomía cuando puede ver qué está haciendo el agente en este momento. Un estado constante y discreto es mejor que un sistema callado que de vez en cuando aparece a informar algo que ya terminó.

## Qué medir

Si lanzas UX de agentes, vigila dos números y míralos uno contra el otro. La tasa de intervención: con qué frecuencia las personas detienen, editan o rechazan lo que propuso el agente. Y la finalización sin retrabajo: con qué frecuencia su resultado se queda como está, sin necesidad de limpieza. Un producto sano reduce el retrabajo y mantiene la intervención barata y a mano. Si la intervención está cerca de cero, lo más probable es que la gente esté aprobando sin mirar, y el próximo incidente de reembolsos ya viene en camino. Si el retrabajo es alto, el agente es rápido para producir cosas en las que nadie confía.

Los equipos que lo hacen bien dejan de tratar al humano y al agente como cosas separadas. Los diseñan como un solo sistema, en conjunto, no como un modelo con un cuadro de confirmación pegado al final. Nielsen Norman Group sostiene lo mismo al defender mantener [una buena dosis de criterio humano](https://www.nngroup.com/articles/ai-ux-getting-started/) en cualquier flujo de trabajo con IA. Es más difícil de lo que suena, porque obliga a tomar decisiones de producto sobre autoridad, reversibilidad y atención antes de que alguien haya dibujado una sola pantalla.

Si estás construyendo un producto con agentes y das vueltas sobre si resolver estos patrones internamente o sumar a un socio que ya haya entregado UX de producto complejo en IA, Cloud y Fintech, [habla con delbueno™ Studio](/es/contacto/). Mejor acertar con la capa human-in-the-loop ahora, antes de que salga la versión que mueve dinero sin ella.
