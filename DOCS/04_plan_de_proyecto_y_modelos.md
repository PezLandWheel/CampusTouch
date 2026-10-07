# Plan de Proyecto y Modelos de Proceso - Proyecto CampusTouch

## 1. Selección y Justificación del Modelo de Proceso

Para el desarrollo y despliegue de la plataforma **CampusTouch** se ha seleccionado el modelo de proceso **Scrum (Marco Ágil)**. La elección se fundamenta en la necesidad de desarrollar el sistema de manera iterativa e incremental, validando progresivamente las funcionalidades de consulta pública, acceso privado de estudiantes, administración de contenidos, gestión académica e integraciones externas.

CampusTouch presenta un alcance que combina funcionalidades de distinta complejidad: una interfaz pública para pantalla táctil, autenticación y protección de información académica privada, operaciones CRUD sobre contenidos y datos académicos, administración de usuarios y roles y conexión con servicios institucionales externos. Scrum permite dividir este alcance en incrementos funcionales, priorizar el trabajo, recibir retroalimentación temprana y ajustar las implementaciones a medida que se reduzca la incertidumbre técnica.

El modelo también facilita la gestión de dependencias externas, especialmente la integración con la plataforma oficial de permisos de la Universidad y con el módulo de horarios de profesores desarrollado por otro grupo.

---

## 2. Parámetros de Planificación

* **Velocidad planificada del equipo ($V$):** 12 SP / Sprint.
* **Duración por Sprint:** 2 Semanas.
* **Factor de Conversión:** 1 SP = 8 Horas.
* **Tarifa Hora:** $45.000 COP/Hora.
* **Total SP del alcance actual:** 45 SP.
* **Número de Sprints Calculados:** $N_{Sprints} = \frac{45}{12} = 3,75 \longrightarrow \mathbf{4\ Sprints}$.
* **Duración Planificada:** 8 Semanas.
* **Esfuerzo Total Estimado:** 360 Horas.
* **Presupuesto Total Estimado:** $16.200.000 COP.

La planificación contempla las ocho historias de usuario actualmente aprobadas en el backlog: **HU-01 (#1), HU-02 (#2), HU-03 (#3), HU-04 (#4), HU-05 (#5), HU-06 (#6), HU-07 (#7) y HU-08 (#8)**.

La capacidad teórica de cuatro Sprints es de **48 SP**, de los cuales **45 SP corresponden a historias** y **3 SP constituyen una reserva de capacidad** para integración, pruebas, correcciones y ajustes durante el desarrollo. Esta reserva permite mantener la planificación dentro de la velocidad establecida sin inflar artificialmente el alcance.

---

## 3. Planificación Detallada de Sprints

### Sprint 1 (Semanas 1 y 2) · Capacidad: 12 SP

**Objetivo:** construir la experiencia pública inicial de CampusTouch y dejar disponible el flujo principal de consulta.

* **[#1]:** HU-01 - Consulta de información pública (**3 SP - $1.080.000 COP**).
* **[#3]:** HU-03 - Gestión de noticias e imágenes (**5 SP - $1.800.000 COP**).
* **[#5]:** HU-05 - Gestión de enlaces institucionales (**3 SP - $1.080.000 COP**).
* **Reserva técnica:** **1 SP**.
* **Carga de Historias:** **11 SP**.
* **Esfuerzo de Historias:** **88 Horas**.
* **Costo de Historias:** **$3.960.000 COP**.
* **Reserva:** **1 SP | 8 Horas | $360.000 COP**.

El Sprint 1 establece el flujo de bienvenida, navegación pública, noticias, imágenes y enlaces institucionales. También prepara la estructura necesaria para que el contenido pueda mantenerse de forma dinámica desde el sistema administrativo.

### Sprint 2 (Semanas 3 y 4) · Capacidad: 12 SP

**Objetivo:** implementar la seguridad de acceso estudiantil y avanzar en el núcleo de administración académica.

* **[#2]:** HU-02 - Acceso del estudiante a información privada (**8 SP - $2.880.000 COP**).
* **[#4]:** HU-04 - Gestión académica (**4 SP de 8 SP - avance parcial**).
* **Carga planificada:** **12 SP**.
* **Esfuerzo planificado:** **96 Horas**.
* **Costo planificado:** **$4.320.000 COP**.

La prioridad del Sprint 2 es la separación entre información pública y privada. Se implementan autenticación, manejo de sesión y controles de acceso para proteger la información individual de los estudiantes. En paralelo se inicia la gestión académica, dejando desarrollada la primera parte de carreras, semestres, horarios y profesores.

### Sprint 3 (Semanas 5 y 6) · Capacidad: 12 SP

**Objetivo:** completar la gestión académica y construir el control de acceso administrativo.

* **[#4]:** HU-04 - Gestión académica (**4 SP restantes de 8 SP - finalización**).
* **[#6]:** HU-06 - Administración de usuarios y roles (**8 SP - $2.880.000 COP**).
* **Carga total:** **12 SP**.
* **Esfuerzo:** **96 Horas**.
* **Costo:** **$4.320.000 COP**.

Este Sprint completa las operaciones de gestión sobre carreras, semestres, horarios y profesores y desarrolla la administración de usuarios, roles y permisos. Con ello se establece el mecanismo de autorización necesario para proteger el panel administrativo y las funciones sensibles del sistema.

### Sprint 4 (Semanas 7 y 8) · Capacidad: 12 SP

**Objetivo:** completar el panel administrativo, integrar servicios externos y realizar la estabilización del sistema.

* **[#7]:** HU-07 - Acceso al panel administrativo (**5 SP - $1.800.000 COP**).
* **[#8]:** HU-08 - Integración con servicios externos (**5 SP - $1.800.000 COP**).
* **Reserva para integración, pruebas y correcciones:** **2 SP | 16 Horas**.
* **Carga de Historias:** **10 SP**.
* **Esfuerzo de Historias:** **80 Horas**.
* **Costo de Historias:** **$3.600.000 COP**.
* **Capacidad restante:** **2 SP | 16 Horas**.

La reserva final se destina a pruebas funcionales de extremo a extremo, corrección de defectos, validación de seguridad, ajustes de experiencia táctil y resolución de dependencias de integración. La integración con el sistema de permisos y con el módulo de horarios de profesores dependerá de las interfaces y mecanismos de acceso proporcionados por las partes externas.

---

## 4. Resumen Comercial de la Propuesta (Línea Base Actualizada)

* **Tiempo de Entrega Estimado:** 8 Semanas (4 Sprints).
* **Velocidad Planificada:** 12 SP/Sprint.
* **Total Story Points del alcance:** 45 SP.
* **Capacidad Total Planificada:** 48 SP.
* **Reserva de Capacidad:** 3 SP.
* **Esfuerzo Total Estimado:** 360 Horas.
* **Inversión Financiera Estimada:** $16.200.000 COP.
* **Historias incluidas:** #1, #2, #3, #4, #5, #6, #7 y #8.

### Cálculo de la línea base

$$
SP_{historias} = 3 + 8 + 5 + 8 + 3 + 8 + 5 + 5 = 45\ SP
$$

$$
SP_{capacidad} = 4\ Sprints \times 12\ SP = 48\ SP
$$

$$
SP_{reserva} = 48 - 45 = 3\ SP
$$

$$
E_{total} = 45\ SP \times 8\ horas/SP = 360\ horas
$$

$$
C_{total} = 360\ horas \times \$45.000 = \$16.200.000\ COP
$$

La propuesta establece una línea base de **cuatro Sprints de dos semanas**, con tres Sprints orientados principalmente al desarrollo de funcionalidades y un Sprint final que completa el panel administrativo y las integraciones externas, además de reservar capacidad para pruebas y estabilización.

La distribución se ha actualizado para reflejar el alcance vigente de CampusTouch: consulta pública, información privada del estudiante, gestión de noticias e imágenes, gestión académica, enlaces institucionales, administración de usuarios y roles, panel administrativo e integraciones externas.

---

## 5. Modelos de Proceso y Gestión del Desarrollo

### 5.1. Roles Scrum

* **Product Owner:** Jose Luis Alberto Chamorro.
* **Líder Técnico:** David Sebastian Yepez.
* **Equipo de Desarrollo:** Brayan Andres Solarte y Johan Stiven Carvajal.

### 5.2. Eventos principales

* **Sprint Planning:** definición del objetivo y selección de historias según prioridad y capacidad.
* **Daily Scrum:** seguimiento breve del avance, impedimentos y coordinación del equipo.
* **Sprint Review:** demostración del incremento funcional y validación de resultados.
* **Sprint Retrospective:** identificación de mejoras para el siguiente Sprint.
* **Refinamiento del Backlog:** revisión de historias, criterios de aceptación, dependencias y estimaciones.

### 5.3. Criterio de finalización

Una historia se considerará terminada cuando:

- [ ] Todos sus criterios de aceptación estén cumplidos.
- [ ] La funcionalidad haya sido integrada con el sistema correspondiente.
- [ ] Se hayan realizado las pruebas funcionales necesarias.
- [ ] No existan defectos críticos pendientes relacionados con la historia.
- [ ] La implementación haya sido validada por el equipo y esté disponible en el incremento del Sprint.

---

## 6. Riesgos y Dependencias de Planificación

* **Autenticación estudiantil:** la implementación definitiva dependerá del mecanismo de autenticación que la Universidad autorice y proporcione. La estimación contempla una solución integrada, pero la complejidad podría variar según la disponibilidad de servicios institucionales.
* **Información académica privada:** las notas, registros y demás datos individuales deben mantenerse protegidos y únicamente disponibles para el estudiante autenticado correspondiente.
* **Horarios de profesores:** existe una dependencia directa con el módulo desarrollado por otro grupo. La integración requiere definir previamente la interfaz, URL, API o mecanismo de comunicación disponible.
* **Permisos institucionales:** CampusTouch dependerá de un enlace o servicio oficial de la Universidad para redirigir a la plataforma de solicitud de permisos.
* **Pantalla táctil:** la interfaz debe validarse en el dispositivo físico disponible, considerando resolución, tamaño de controles, legibilidad y tiempos de respuesta.
* **Carga administrativa:** las operaciones CRUD y la administración de roles requieren validar permisos para evitar modificaciones no autorizadas.

La planificación deberá revisarse al finalizar cada Sprint. Los Story Points son una estimación relativa y el avance real podrá utilizar la velocidad obtenida por el equipo para ajustar la previsión de los Sprints siguientes.
