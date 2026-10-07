# DOCS/03_estimacion_y_costos.md: Estimación Formal y Presupuesto

## 1. Integrantes y Asignación de Roles
* **Product Owner:** Jose Luis Alberto Chamorro
* **Líder Técnico:** David Sebastian Yepez
* **Desarrollador(a) 1:** Brayan Andres Solarte
* **Desarrollador(a) 2:** Johan Stiven Carvajal

## 2. Parámetros Base de Estimación
* **Historia Pivote Seleccionada:** HU-01 — Consulta de información pública (#1)
* **Puntaje Pivote Asignado:** 2 SP
* **Factor de Conversión ($F_c$):** 1 SP = 8 Horas.
* **Tarifa Hora ($T_h$):** $45.000 COP/Hora.

La historia HU-01 se selecciona como historia pivote porque representa la funcionalidad base de CampusTouch: consulta de información pública, navegación de la pantalla táctil y acceso a la información general de las carreras.

A partir de esta historia se estima el resto del alcance mediante juicio de expertos, considerando complejidad funcional, cantidad de operaciones, validaciones, seguridad, relaciones entre datos, dependencias e incertidumbre técnica.

## 3. Matriz Detallada de Estimación Formal y Presupuesto

| ID Issue | Historia de Usuario | Story Points ($SP$) | Factor ($F_c$) | Esfuerzo ($E_i = SP \times F_c$) | Tarifa ($T_h$) | Costo Total ($C_i = E_i \times T_h$) | Justificación Técnica Juicio de Expertos |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :--- |
| **#1** | HU-01 — Consulta de información pública | **2 SP** | 8 hrs/SP | **16 hrs** | $45.000 | **$720.000 COP** | Historia pivote. Incluye pantalla de bienvenida, navegación táctil, selección de carreras y consulta de información pública. Presenta complejidad baja y principalmente operaciones de consulta. |
| **#2** | HU-02 — Acceso del estudiante a información privada | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Requiere autenticación, sesiones, autorización, protección de datos, aislamiento de la información de cada estudiante y control de cierre por inactividad. La seguridad y privacidad elevan considerablemente el riesgo técnico. |
| **#3** | HU-03 — Gestión de noticias e imágenes | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Comprende operaciones CRUD para noticias e imágenes, asociaciones entre contenido y recursos visuales y actualización dinámica de la información publicada. Incluye persistencia y validaciones. |
| **#4** | HU-04 — Gestión académica | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Incluye gestión de carreras, semestres, horarios y profesores. Implica múltiples entidades y relaciones, operaciones CRUD y validaciones para conservar consistencia de los datos. |
| **#5** | HU-05 — Gestión de enlaces institucionales | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Requiere CRUD de enlaces, validación de direcciones y publicación dinámica. Su complejidad es baja-media porque depende de servicios externos pero no necesita desarrollar esos servicios. |
| **#6** | HU-06 — Administración de usuarios y roles | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Comprende usuarios administrativos, roles, permisos y restricciones por autorización. Es una funcionalidad crítica de seguridad y control de acceso. |
| **#7** | HU-07 — Acceso al panel administrativo | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye interfaz administrativa protegida, navegación por módulos, acceso condicionado por permisos y conexión con las operaciones de gestión del sistema. |
| **#8** | HU-08 — Integración con servicios externos | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Considera la integración o redirección hacia servicios externos, principalmente permisos institucionales y el módulo de horarios de profesores. Presenta incertidumbre por dependencias externas. |

## 4. Consolidado Total del Proyecto

### 4.1. Entrega del MVP

El **MVP (Producto Mínimo Viable)** corresponde a la primera versión funcional que puede ser utilizada y demostrada por sí misma. Para CampusTouch, el MVP cubre el núcleo público y administrativo necesario para publicar y mantener actualizada la información de la Facultad.

**Historias incluidas en el MVP:**
* **HU-01 (#1):** Consulta de información pública.
* **HU-03 (#3):** Gestión de noticias e imágenes.
* **HU-04 (#4):** Gestión académica.
* **HU-05 (#5):** Gestión de enlaces institucionales.
* **HU-06 (#6):** Administración de usuarios y roles.
* **HU-07 (#7):** Acceso al panel administrativo.

* **Total Story Points del MVP:** **31 SP.**
* **Esfuerzo Total del MVP:** **248 Horas.**
* **Inversión Financiera MVP:** **$11.160.000 COP.**

### 4.2. Entrega del Proyecto Completo

El **proyecto completo** corresponde al MVP más las funcionalidades adicionales que amplían el sistema con acceso privado para estudiantes e integración con servicios externos.

**Historias adicionales después del MVP:**
* **HU-02 (#2):** Acceso del estudiante a información privada.
* **HU-08 (#8):** Integración con servicios externos.

* **Total Story Points del Proyecto Completo:** **44 SP.**
* **Esfuerzo Total del Proyecto Completo:** **352 Horas.**
* **Inversión Financiera Proyecto Completo:** **$15.840.000 COP.**

### 4.3. Incremento posterior al MVP

* **Story Points adicionales después del MVP:** **13 SP.**
* **Esfuerzo adicional:** **104 Horas.**
* **Inversión adicional:** **$4.680.000 COP.**

### Cálculo del MVP

$$
SP_{MVP} = 2 + 5 + 8 + 3 + 8 + 5 = 31\ SP
$$

$$
E_{MVP} = 31\ SP \times 8\ \frac{horas}{SP} = 248\ horas
$$

$$
C_{MVP} = 248\ horas \times \$45.000 = \$11.160.000\ COP
$$

### Cálculo del Proyecto Completo

$$
SP_{total} = 2 + 8 + 5 + 8 + 3 + 8 + 5 + 5 = 44\ SP
$$

$$
E_{total} = 44\ SP \times 8\ \frac{horas}{SP} = 352\ horas
$$

$$
C_{total} = 352\ horas \times \$45.000 = \$15.840.000\ COP
$$

### Cálculo del incremento posterior al MVP

$$
SP_{fase2} = 44 - 31 = 13\ SP
$$

$$
E_{fase2} = 13\ SP \times 8\ \frac{horas}{SP} = 104\ horas
$$

$$
C_{fase2} = 104\ horas \times \$45.000 = \$4.680.000\ COP
$$

La estrategia de entrega permite presentar primero un producto funcional y utilizable, y posteriormente evolucionarlo hasta cubrir el alcance completo sin reiniciar el proyecto.