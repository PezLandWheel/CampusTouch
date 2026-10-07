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
| **#2** | HU-02 — Acceso del estudiante a información privada | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Requiere autenticación, sesiones, autorización, protección de datos, aislamiento de la información de cada estudiante y control de cierre por inactividad. La seguridad y privacidad elevan el riesgo técnico. |
| **#3** | HU-03 — Gestión de noticias e imágenes | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Comprende CRUD para noticias e imágenes, asociaciones entre contenido y recursos visuales, validaciones y actualización dinámica de la información publicada. |
| **#4** | HU-04 — Gestión académica | **13 SP** | 8 hrs/SP | **104 hrs** | $45.000 | **$4.680.000 COP** | Agrupa carreras, semestres, horarios y profesores. Implica varias entidades relacionadas, reglas de consistencia, operaciones CRUD y validaciones. Su alcance justifica una estimación alta y la necesidad de dividir la implementación en incrementos. |
| **#5** | HU-05 — Gestión de enlaces institucionales | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Requiere CRUD de enlaces, validación de direcciones y publicación dinámica. Su complejidad es baja-media. |
| **#6** | HU-06 — Administración de usuarios y roles | **13 SP** | 8 hrs/SP | **104 hrs** | $45.000 | **$4.680.000 COP** | Comprende usuarios administrativos, roles, permisos, autorización y restricciones por operación. Es una funcionalidad crítica de seguridad y requiere múltiples reglas de acceso. |
| **#7** | HU-07 — Acceso al panel administrativo | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye interfaz administrativa protegida, navegación por módulos, control de permisos y conexión con las funciones de gestión. |
| **#8** | HU-08 — Integración con servicios externos | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Considera integración o redirección hacia permisos institucionales y el módulo de horarios de profesores. La dependencia de sistemas externos introduce incertidumbre técnica, validaciones y pruebas de integración. |

## 4. Consolidado Total del Proyecto

### 4.1. Entrega del MVP

El **MVP (Producto Mínimo Viable)** corresponde a la primera versión funcional que puede ponerse en uso y demostrarse de forma independiente. Para CampusTouch, el MVP debe resolver el objetivo principal de la solución: permitir la consulta pública de información y proporcionar los mecanismos administrativos necesarios para mantener esa información actualizada.

**Historias incluidas en el MVP:**
* **HU-01 (#1):** Consulta de información pública.
* **HU-03 (#3):** Gestión de noticias e imágenes.
* **HU-04 (#4):** Gestión académica.
* **HU-05 (#5):** Gestión de enlaces institucionales.
* **HU-06 (#6):** Administración de usuarios y roles.
* **HU-07 (#7):** Acceso al panel administrativo.

* **Total Story Points del MVP:** **41 SP.**
* **Esfuerzo Total del MVP:** **328 Horas/Hombre.**
* **Inversión Financiera MVP:** **$14.760.000 COP.**

### 4.2. Entrega del Proyecto Completo

El **proyecto completo** corresponde al MVP más las funcionalidades que amplían CampusTouch con acceso privado para estudiantes e integraciones externas.

**Historias adicionales después del MVP:**
* **HU-02 (#2):** Acceso del estudiante a información privada.
* **HU-08 (#8):** Integración con servicios externos.

* **Total Story Points del Proyecto Completo:** **57 SP.**
* **Esfuerzo Total del Proyecto Completo:** **456 Horas/Hombre.**
* **Inversión Financiera Proyecto Completo:** **$20.520.000 COP.**

### 4.3. Incremento posterior al MVP

* **Story Points adicionales después del MVP:** **16 SP.**
* **Esfuerzo adicional:** **128 Horas.**
* **Inversión adicional:** **$5.760.000 COP.**

### Cálculo del MVP

$$
SP_{MVP} = 2 + 5 + 13 + 3 + 13 + 5 = 41\ SP
$$

$$
E_{MVP} = 41\ SP \times 8\ \frac{horas}{SP} = 328\ horas
$$

$$
C_{MVP} = 328\ horas \times \$45.000 = \$14.760.000\ COP
$$

### Cálculo del Proyecto Completo

$$
SP_{total} = 2 + 8 + 5 + 13 + 3 + 13 + 5 + 8 = 57\ SP
$$

$$
E_{total} = 57\ SP \times 8\ \frac{horas}{SP} = 456\ horas
$$

$$
C_{total} = 456\ horas \times \$45.000 = \$20.520.000\ COP
$$

### Cálculo del incremento posterior al MVP

$$
SP_{fase2} = 57 - 41 = 16\ SP
$$

$$
E_{fase2} = 16\ SP \times 8\ \frac{horas}{SP} = 128\ horas
$$

$$
C_{fase2} = 128\ horas \times \$45.000 = \$5.760.000\ COP
$$

### 4.4. Distribución del Esfuerzo por Fase

| Fase | Historias | Story Points | Horas | Costo |
| :--- | :--- | :-: | :-: | :-: |
| **MVP** | HU-01, HU-03, HU-04, HU-05, HU-06, HU-07 | **41 SP** | **328 hrs** | **$14.760.000 COP** |
| **Fase 2** | HU-02, HU-08 | **16 SP** | **128 hrs** | **$5.760.000 COP** |
| **Proyecto completo** | HU-01 a HU-08 | **57 SP** | **456 hrs** | **$20.520.000 COP** |

La estrategia permite entregar primero una versión funcional y utilizable y posteriormente evolucionarla hasta cubrir el alcance completo aprobado.