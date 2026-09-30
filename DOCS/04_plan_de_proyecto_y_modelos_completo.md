# Estimación del Plan de Proyecto y Modelos de Proceso - Proyecto CampusTouch

## 1. Selección y Justificación del Modelo de Proceso

Para el desarrollo y despliegue de la plataforma **CampusTouch** se ha seleccionado el modelo de proceso **Scrum (Marco Ágil)**. La justificación técnica de esta elección se fundamenta en la necesidad de desarrollar el sistema de manera iterativa, permitiendo validar progresivamente las funcionalidades de consulta y administración de información académica.

CampusTouch requiere implementar un núcleo funcional compuesto por consultas de carreras e información académica, consulta de horarios, autenticación de administradores y gestión de la información del sistema. El enfoque iterativo e incremental de Scrum permite priorizar las historias clasificadas como **Must-Have**, obtener entregas funcionales al finalizar cada Sprint y recibir retroalimentación temprana antes de incorporar funcionalidades de menor prioridad.

Además, Scrum permite gestionar de manera flexible la complejidad asociada a la autenticación, persistencia de información, operaciones de creación, modificación y eliminación de datos y actualización de la información académica visible para los usuarios.

---

## 2. Parámetros de Planificación

* **Velocidad del Equipo ($V$):** 12 SP / Sprint.
* **Duración por Sprint:** 2 Semanas.
* **Factor de Conversión:** 1 SP = 8 Horas.
* **Tarifa Hora:** $45.000 COP/Hora.
* **Total SP del MVP (Historias Must-Have):** 22 SP (`HU01`: 2 SP, `HU02`: 2 SP, `HU05`: 3 SP, `HU06`: 5 SP, `HU09`: 5 SP, `HU10`: 5 SP).
* **Número de Sprints Calculados para el MVP:** $N_{Sprints} = \frac{22}{12} = 1,83 \longrightarrow \mathbf{2\ Sprints}$.
* **Duración Total del MVP:** 4 Semanas.
* **Esfuerzo Total del MVP:** 176 Horas.
* **Presupuesto Total del MVP:** $7.920.000 COP.

La planificación considera únicamente las historias clasificadas como **Must-Have**. Las historias con prioridades inferiores quedan fuera del alcance de esta línea base.

---

## 3. Planificación Detallada de Sprints

### Sprint 1 (Semanas 1 y 2) · Capacidad: 12 SP

* **[#1]:** `HU01 - Consultar carreras e información académica` (2 SP - $720.000 COP)
* **[#2]:** `HU02 - Consultar horarios académicos` (2 SP - $720.000 COP)
* **[#5]:** `HU05 - Iniciar sesión como administrador` (3 SP - $1.080.000 COP)
* **[#6]:** `HU06 - Gestionar información del sistema` (5 SP - $1.800.000 COP)
* **Carga Total del Sprint 1:** 12 SP | **Esfuerzo:** 96 Horas | **Costo Sprint 1:** $4.320.000 COP

El primer Sprint concentra las funcionalidades de consulta y el acceso administrativo, además de la gestión general de información del sistema. Con ello se establece una base funcional sobre la cual pueden construirse las funcionalidades específicas de administración académica.

### Sprint 2 (Semanas 3 y 4) · Capacidad: 12 SP

* **[#9]:** `HU09 - Gestionar horarios académicos` (5 SP - $1.800.000 COP)
* **[#10]:** `HU10 - Gestionar carreras` (5 SP - $1.800.000 COP)
* **Reserva de capacidad:** 2 SP para correcciones, integración, pruebas funcionales y ajustes derivados del Sprint 1.
* **Carga de Historias del Sprint 2:** 10 SP | **Esfuerzo de Historias:** 80 Horas | **Costo de Historias:** $3.600.000 COP
* **Capacidad restante:** 2 SP | **16 Horas**.

La reserva de capacidad permite realizar integración entre módulos, pruebas, corrección de defectos y ajustes de las funcionalidades desarrolladas sin superar la capacidad planificada del Sprint.

---

## 4. Resumen Comercial de la Propuesta (Línea Base Final)

* **Tiempo de Entrega del MVP:** 4 Semanas (2 Sprints).
* **Velocidad Planificada:** 12 SP/Sprint.
* **Total Story Points del MVP:** 22 SP.
* **Esfuerzo Total del MVP:** 176 Horas/Hombre.
* **Inversión Financiera MVP:** $7.920.000 COP.
* **Historias incluidas:** #1, #2, #5, #6, #9 y #10.
* **Historias fuera del alcance:** Historias clasificadas como Should-Have y Could-Have.

### Cálculo de la línea base

$$
SP_{total} = 2 + 2 + 3 + 5 + 5 + 5 = 22\ SP
$$

$$
E_{total} = 22\ SP \times 8\ horas/SP = 176\ horas
$$

$$
C_{total} = 176\ horas \times \$45.000 = \$7.920.000\ COP
$$

La propuesta establece un MVP de cuatro semanas dividido en dos Sprints. El primer Sprint utiliza su capacidad completa de 12 SP, mientras que el segundo Sprint contempla 10 SP de historias y reserva 2 SP para integración, pruebas y correcciones. Esta distribución mantiene la planificación dentro de la velocidad establecida y permite reducir el riesgo de sobrecarga durante la etapa final del MVP.
