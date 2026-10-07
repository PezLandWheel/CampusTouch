# Estimación del Plan de Proyecto y Modelos de Proceso - Proyecto CampusTouch

## 1. Selección y Justificación del Modelo de Proceso
Para el desarrollo y despliegue de la plataforma **CampusTouch** se ha seleccionado el modelo de proceso **Scrum (Marco Ágil)**. La justificación técnica y comercial de esta elección radica en la necesidad de entregar rápidamente una primera versión funcional de la pantalla táctil de la Facultad de Ingeniería y, posteriormente, ampliar el sistema con funcionalidades privadas e integraciones externas.

CampusTouch requiere validar de manera prioritaria su núcleo de negocio: la consulta pública de información desde la pantalla táctil, la gestión dinámica de noticias e imágenes, la administración de carreras, semestres, horarios y profesores, y el control administrativo mediante usuarios y roles.

El enfoque iterativo e incremental de Scrum permite entregar un **Producto Mínimo Viable (MVP)** funcional al cabo de 8 semanas (4 Sprints), lo que posibilita poner en operación la solución base y recibir retroalimentación antes de invertir recursos en funcionalidades complementarias pero importantes, como el acceso del estudiante a información académica privada y la integración con servicios institucionales externos.

Además, la flexibilidad de Scrum permite gestionar de manera progresiva la complejidad asociada a la autenticación, protección de información académica, administración de permisos y dependencias externas sin detener la entrega de funcionalidades ya terminadas.

---

## 2. Parámetros de Planificación
* **Velocidad del Equipo ($V$):** 12 SP / Sprint (para un equipo de desarrollo con capacidad de 2 semanas por iteración).
* **Duración por Sprint:** 2 Semanas (80 horas hábiles por desarrollador).
* **Total SP del MVP (Historias Must Have):** 41 SP (`HU-01`: 2 SP, `HU-03`: 5 SP, `HU-04`: 13 SP, `HU-05`: 3 SP, `HU-06`: 13 SP, `HU-07`: 5 SP).
* **Número de Sprints Calculados para el MVP:** $N_{\text{Sprints}} = \frac{41}{12} = 3.42 \longrightarrow \mathbf{4\text{ Sprints}}$.
* **Duración Total del MVP en Semanas:** 8 Semanas.
* **Total SP del Proyecto Completo:** 57 SP.
* **Número de Sprints Calculados para el Proyecto Completo:** $N_{\text{Sprints}} = \frac{57}{12} = 4.75 \longrightarrow \mathbf{6\text{ Sprints}}$ mediante una entrega escalonada del MVP y una extensión de 2 Sprints.
* **Duración Total del Proyecto Completo en Semanas:** 12 Semanas.

---

## 3. Planificación Detallada de Sprints

### Sprint 1 (Semanas 1 y 2) · Capacidad: 12 SP
* **[#1]:** `HU-01 - Consulta de información pública` (2 SP - $720.000 COP)
* **[#3]:** `HU-03 - Gestión de noticias e imágenes` (5 SP - $1.800.000 COP)
* **[#5]:** `HU-05 - Gestión de enlaces institucionales` (3 SP - $1.080.000 COP)
* **Reserva técnica:** 2 SP para ajustes, pruebas y correcciones.
* **Carga Total del Sprint 1:** 10 SP | **Esfuerzo de Historias:** 80 Horas | **Costo de Historias Sprint 1:** $3.600.000 COP

### Sprint 2 (Semanas 3 y 4) · Capacidad: 12 SP
* **[#4]:** `HU-04 - Gestión académica (Parte 1: Carreras y Semestres)` (7 SP de los 13 SP totales - $2.520.000 COP)
* **[#7]:** `HU-07 - Acceso al panel administrativo` (5 SP - $1.800.000 COP)
* **Carga Total del Sprint 2:** 12 SP | **Esfuerzo:** 96 Horas | **Costo Sprint 2:** $4.320.000 COP

### Sprint 3 (Semanas 5 y 6) · Capacidad: 12 SP
* **[#4]:** `HU-04 - Gestión académica (Parte 2: Horarios y Profesores)` (6 SP restantes para completar los 13 SP - $2.160.000 COP)
* **[#6]:** `HU-06 - Administración de usuarios y roles (Parte 1)` (6 SP de los 13 SP totales - $2.160.000 COP)
* **Carga Total del Sprint 3:** 12 SP | **Esfuerzo:** 96 Horas | **Costo Sprint 3:** $4.320.000 COP

### Sprint 4 (Semanas 7 y 8 - Entrega del MVP) · Capacidad: 12 SP
* **[#6]:** `HU-06 - Administración de usuarios y roles (Parte 2)` (7 SP restantes para completar los 13 SP - $2.520.000 COP)
* **Reserva de estabilización del MVP:** 5 SP para pruebas funcionales, seguridad y correcciones.
* **Carga Total del Sprint 4:** 7 SP | **Esfuerzo de Historias:** 56 Horas | **Costo de Historias Sprint 4:** $2.520.000 COP

### Sprint 5 (Semanas 9 y 10 - Extensión Proyecto Completo) · Capacidad: 12 SP
* **[#2]:** `HU-02 - Acceso del estudiante a información privada` (8 SP - $2.880.000 COP)
* **Reserva para pruebas de seguridad e integración:** 4 SP.
* **Carga Total del Sprint 5:** 8 SP | **Esfuerzo:** 64 Horas | **Costo de Historias Sprint 5:** $2.880.000 COP

### Sprint 6 (Semanas 11 y 12 - Extensión Proyecto Completo) · Capacidad: 12 SP
* **[#8]:** `HU-08 - Integración con servicios externos` (8 SP - $2.880.000 COP)
* **Reserva final para integración y correcciones:** 4 SP.
* **Carga Total del Sprint 6:** 8 SP | **Esfuerzo:** 64 Horas | **Costo de Historias Sprint 6:** $2.880.000 COP

---

## 4. Resumen Comercial de la Propuesta (Línea Base Final)
* **Tiempo de Entrega del MVP:** 8 Semanas (4 Sprints).
* **Esfuerzo Total del MVP:** 328 Horas/Hombre.
* **Inversión Financiera MVP:** $14.760.000 COP.
* **Tiempo de Entrega Proyecto Completo:** 12 Semanas (6 Sprints).
* **Esfuerzo Total Proyecto Completo:** 456 Horas/Hombre.
* **Inversión Financiera Proyecto Completo:** $20.520.000 COP.