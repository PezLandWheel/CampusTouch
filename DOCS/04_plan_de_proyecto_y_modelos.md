# Plan de Proyecto y Modelos de Proceso - Proyecto CampusTouch

## 1. Selección y Justificación del Modelo de Proceso

Para el desarrollo y despliegue de la plataforma **CampusTouch** se ha seleccionado el modelo de proceso **Scrum (Marco Ágil)**. La elección se fundamenta en la necesidad de desarrollar el sistema de manera iterativa e incremental, permitiendo entregar primero un **MVP funcional** y posteriormente completar el producto con las funcionalidades privadas e integraciones externas.

CampusTouch combina una interfaz pública para pantalla táctil, gestión dinámica de contenidos, administración académica, autenticación y protección de información privada, administración de usuarios y roles y conexión con servicios institucionales externos. Esta combinación requiere validación progresiva y permite reducir riesgos entregando valor antes de completar todas las dependencias externas.

Scrum facilita además la gestión de incertidumbre asociada a la autenticación estudiantil, las fuentes oficiales de información académica, la integración con la plataforma de permisos y el módulo de horarios de profesores desarrollado por otro grupo.

---

## 2. Parámetros de Planificación

* **Velocidad planificada del equipo ($V$):** 12 SP / Sprint.
* **Duración por Sprint:** 2 Semanas.
* **Factor de Conversión:** 1 SP = 8 Horas.
* **Tarifa Hora:** $45.000 COP/Hora.
* **Total SP del MVP:** 41 SP.
* **Total SP del Proyecto Completo:** 57 SP.
* **Número de Sprints estimados para el MVP:** $\frac{41}{12} = 3,42 \longrightarrow \mathbf{4\ Sprints}$.
* **Número de Sprints estimados para el Proyecto Completo:** $\frac{57}{12} = 4,75 \longrightarrow \mathbf{6\ Sprints}$ cuando el proyecto se ejecuta como entrega escalonada de MVP y segunda fase.
* **Duración Planificada del MVP:** 8 Semanas.
* **Duración Planificada del Proyecto Completo:** 12 Semanas.
* **Esfuerzo Total del MVP:** 328 Horas.
* **Esfuerzo Total del Proyecto Completo:** 456 Horas.
* **Presupuesto MVP:** $14.760.000 COP.
* **Presupuesto Proyecto Completo:** $20.520.000 COP.

La planificación contempla las ocho historias de usuario vigentes. El MVP concentra las funcionalidades públicas y administrativas necesarias para disponer de una primera versión funcional. La segunda fase agrega el acceso privado del estudiante y las integraciones externas.

---

## 3. Planificación Detallada de Sprints

### MVP — Sprint 1 (Semanas 1 y 2) · Capacidad: 12 SP

**Objetivo:** construir la experiencia pública inicial y la gestión de contenidos básicos.

* **[#1]:** HU-01 - Consulta de información pública (**2 SP - $720.000 COP**).
* **[#3]:** HU-03 - Gestión de noticias e imágenes (**5 SP - $1.800.000 COP**).
* **[#5]:** HU-05 - Gestión de enlaces institucionales (**3 SP - $1.080.000 COP**).
* **Reserva técnica:** **2 SP**.

**Carga de historias:** 10 SP | **Esfuerzo:** 80 Horas | **Costo:** $3.600.000 COP.

El Sprint 1 establece la navegación de la pantalla táctil, el contenido de bienvenida, noticias, imágenes y enlaces. La reserva se utilizará para ajustes iniciales, pruebas de interacción táctil y correcciones.

### MVP — Sprint 2 (Semanas 3 y 4) · Capacidad: 12 SP

**Objetivo:** avanzar en la gestión académica y establecer el acceso al panel administrativo.

* **[#4]:** HU-04 - Gestión académica (**7 SP de 13 SP - primer incremento**).
* **[#7]:** HU-07 - Acceso al panel administrativo (**5 SP - $1.800.000 COP**).

**Carga total:** 12 SP | **Esfuerzo:** 96 Horas | **Costo:** $4.320.000 COP.

El Sprint 2 implementa el núcleo inicial de carreras, semestres, horarios y profesores y habilita la estructura del panel administrativo.

### MVP — Sprint 3 (Semanas 5 y 6) · Capacidad: 12 SP

**Objetivo:** completar la gestión académica e implementar la administración de usuarios y roles.

* **[#4]:** HU-04 - Gestión académica (**6 SP restantes de 13 SP - segundo incremento**).
* **[#6]:** HU-06 - Administración de usuarios y roles (**6 SP de 13 SP - primer incremento**).

**Carga total:** 12 SP | **Esfuerzo:** 96 Horas | **Costo:** $4.320.000 COP.

El Sprint 3 completa la mayor parte de la gestión académica y desarrolla la primera parte de usuarios, roles y permisos administrativos.

### MVP — Sprint 4 (Semanas 7 y 8) · Capacidad: 12 SP

**Objetivo:** completar el control administrativo, estabilizar el MVP y dejarlo listo para demostración y uso.

* **[#6]:** HU-06 - Administración de usuarios y roles (**7 SP restantes de 13 SP - finalización**).
* **Reserva para pruebas, correcciones y estabilización:** **5 SP**.

**Carga de historias:** 7 SP | **Esfuerzo de historia:** 56 Horas | **Costo de historia:** $2.520.000 COP.

**Capacidad de reserva:** 5 SP | **40 Horas**.

Al finalizar el Sprint 4 se entrega el **MVP funcional**: una pantalla táctil pública, contenido dinámico, gestión académica, enlaces y un panel administrativo protegido con usuarios, roles y permisos.

### Segunda fase — Sprint 5 (Semanas 9 y 10) · Capacidad: 12 SP

**Objetivo:** implementar el acceso privado del estudiante.

* **[#2]:** HU-02 - Acceso del estudiante a información privada (**8 SP - $2.880.000 COP**).
* **Reserva para pruebas de seguridad e integración:** **4 SP**.

**Carga de historias:** 8 SP | **Esfuerzo de historia:** 64 Horas | **Costo de historia:** $2.880.000 COP.

La prioridad es proteger la información académica individual, controlar las sesiones y garantizar que cada estudiante solo pueda consultar sus propios datos autorizados.

### Segunda fase — Sprint 6 (Semanas 11 y 12) · Capacidad: 12 SP

**Objetivo:** completar las integraciones externas y cerrar el proyecto completo.

* **[#8]:** HU-08 - Integración con servicios externos (**8 SP - $2.880.000 COP**).
* **Reserva final:** **4 SP** para pruebas de integración, correcciones y preparación de entrega.

**Carga de historias:** 8 SP | **Esfuerzo de historia:** 64 Horas | **Costo de historia:** $2.880.000 COP.

Se completa la conexión con la plataforma oficial de permisos y con el módulo de horarios de profesores desarrollado por otro grupo, siempre sujeto a las interfaces y mecanismos de acceso disponibles.

---

## 4. Resumen Comercial de la Propuesta

### 4.1. Entrega del MVP

* **Historias incluidas:** HU-01, HU-03, HU-04, HU-05, HU-06 y HU-07.
* **Total Story Points del MVP:** **41 SP**.
* **Velocidad planificada:** 12 SP/Sprint.
* **Tiempo de Entrega del MVP:** **8 Semanas (4 Sprints)**.
* **Esfuerzo Total del MVP:** **328 Horas/Hombre**.
* **Inversión Financiera MVP:** **$14.760.000 COP**.

### 4.2. Entrega del Proyecto Completo

* **Historias incluidas:** HU-01 a HU-08.
* **Total Story Points del Proyecto Completo:** **57 SP**.
* **Tiempo de Entrega del Proyecto Completo:** **12 Semanas (6 Sprints)**.
* **Esfuerzo Total del Proyecto Completo:** **456 Horas/Hombre**.
* **Inversión Financiera Proyecto Completo:** **$20.520.000 COP**.

### 4.3. Incremento posterior al MVP

* **Historias adicionales:** HU-02 y HU-08.
* **Story Points adicionales:** **16 SP**.
* **Esfuerzo adicional:** **128 Horas/Hombre**.
* **Inversión adicional:** **$5.760.000 COP**.
* **Tiempo planificado adicional:** **4 Semanas (2 Sprints)**.

El proyecto completo se plantea como la evolución del MVP y no como un proyecto independiente. De esta forma se puede entregar primero una versión funcional y posteriormente incorporar las capacidades privadas e integraciones externas.

### 4.4. Cálculos de la línea base

#### MVP

$$
SP_{MVP} = 2 + 5 + 13 + 3 + 13 + 5 = 41\ SP
$$

$$
E_{MVP} = 41\ SP \times 8\ \frac{horas}{SP} = 328\ horas
$$

$$
C_{MVP} = 328\ horas \times \$45.000 = \$14.760.000\ COP
$$

#### Proyecto completo

$$
SP_{total} = 2 + 8 + 5 + 13 + 3 + 13 + 5 + 8 = 57\ SP
$$

$$
E_{total} = 57\ SP \times 8\ \frac{horas}{SP} = 456\ horas
$$

$$
C_{total} = 456\ horas \times \$45.000 = \$20.520.000\ COP
$$

#### Incremento posterior al MVP

$$
SP_{fase2} = 57 - 41 = 16\ SP
$$

$$
E_{fase2} = 16\ SP \times 8\ \frac{horas}{SP} = 128\ horas
$$

$$
C_{fase2} = 128\ horas \times \$45.000 = \$5.760.000\ COP
$$

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

### 5.4. Criterio de aceptación del MVP

El MVP se considerará entregable cuando:

- [ ] La pantalla táctil permita consultar información pública.
- [ ] Se puedan gestionar noticias e imágenes.
- [ ] Se puedan gestionar carreras, semestres, horarios y profesores.
- [ ] Se puedan gestionar enlaces institucionales.
- [ ] Exista un panel administrativo funcional.
- [ ] Existan usuarios, roles y permisos administrativos.
- [ ] La información administrada se persista correctamente.
- [ ] Se hayan ejecutado pruebas funcionales sobre los módulos incluidos.

### 5.5. Criterio de aceptación del Proyecto Completo

El proyecto completo se considerará entregable cuando, además del MVP:

- [ ] Los estudiantes puedan autenticarse mediante el mecanismo autorizado por la Universidad.
- [ ] La información privada esté protegida y aislada por estudiante.
- [ ] La sesión se cierre manualmente o por inactividad.
- [ ] Las integraciones externas funcionen mediante los mecanismos acordados.
- [ ] Se hayan realizado pruebas de integración y seguridad correspondientes.

---

## 6. Riesgos y Dependencias de Planificación

* **Autenticación estudiantil:** la implementación definitiva dependerá del mecanismo de autenticación que la Universidad autorice y proporcione. El acceso mediante cédula es el mecanismo inicial definido, pero puede requerir un servicio institucional de validación.
* **Información académica privada:** las notas, registros y demás datos individuales deben mantenerse protegidos y únicamente disponibles para el estudiante autenticado correspondiente.
* **Horarios de profesores:** existe una dependencia con el módulo desarrollado por otro grupo. La integración requiere definir previamente la interfaz, URL, API o mecanismo de comunicación disponible.
* **Permisos institucionales:** CampusTouch dependerá de un enlace o servicio oficial de la Universidad para acceder a la plataforma de solicitud de permisos.
* **Pantalla táctil:** la interfaz debe validarse en el dispositivo físico disponible, considerando resolución, tamaño de controles, legibilidad y tiempos de respuesta.
* **Gestión administrativa:** las operaciones CRUD y la administración de roles deben validar permisos para evitar modificaciones no autorizadas.
* **División MVP/Fase 2:** la segunda fase debe construirse sobre el MVP sin alterar la funcionalidad pública ya entregada.

La planificación deberá revisarse al finalizar cada Sprint. Los Story Points son una estimación relativa y la velocidad real obtenida por el equipo podrá utilizarse para ajustar la previsión de los Sprints siguientes.