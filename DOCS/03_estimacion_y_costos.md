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

La historia HU-01 se selecciona como historia pivote porque representa la funcionalidad base de CampusTouch: pantalla de bienvenida, navegación táctil, selección de carreras y consulta de información pública.

A partir de esta historia se realiza la estimación relativa del resto de historias mediante juicio de expertos, considerando complejidad funcional, operaciones requeridas, validaciones, seguridad, relaciones entre datos, dependencias e incertidumbre técnica.

## 3. Matriz Detallada de Estimación Formal y Presupuesto

| ID Issue | Historia de Usuario | Story Points ($SP$) | Factor ($F_c$) | Esfuerzo ($E_i = SP \times F_c$) | Tarifa ($T_h$) | Costo Total ($C_i = E_i \times T_h$) | Justificación Técnica Juicio de Expertos |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :--- |
| **#1** | HU-01 — Consulta de información pública | **2 SP** | 8 hrs/SP | **16 hrs** | $45.000 | **$720.000 COP** | Historia pivote. Incluye la pantalla de bienvenida, navegación táctil, selección de carreras y consulta de información pública. Su complejidad es baja y se concentra en consultas y presentación. |
| **#2** | HU-02 — Acceso del estudiante a información privada | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Requiere autenticación, sesiones, autorización, protección de datos, aislamiento de la información por estudiante y control de cierre por inactividad. Presenta alta complejidad por seguridad y privacidad. |
| **#3** | HU-03 — Gestión de noticias e imágenes | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Comprende creación, consulta, modificación y eliminación de noticias e imágenes, asociaciones de contenido, validaciones y actualización dinámica de la información publicada. |
| **#4** | HU-04 — Gestión académica | **13 SP** | 8 hrs/SP | **104 hrs** | $45.000 | **$4.680.000 COP** | Agrupa la gestión de carreras, semestres, horarios y profesores. Implica múltiples entidades relacionadas, operaciones CRUD, reglas de consistencia y validaciones. Su alcance justifica una estimación alta. |
| **#5** | HU-05 — Gestión de enlaces institucionales | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Requiere CRUD de enlaces, validación de direcciones y publicación dinámica. Presenta complejidad baja-media y dependencia con servicios externos. |
| **#6** | HU-06 — Administración de usuarios y roles | **13 SP** | 8 hrs/SP | **104 hrs** | $45.000 | **$4.680.000 COP** | Comprende gestión de usuarios administrativos, roles, permisos y restricciones por autorización. Es una funcionalidad crítica de seguridad con múltiples reglas de acceso. |
| **#7** | HU-07 — Acceso al panel administrativo | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye interfaz administrativa protegida, autenticación, autorización, navegación por módulos y conexión con las operaciones de gestión del sistema. |
| **#8** | HU-08 — Integración con servicios externos | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Considera integración o redirección hacia la plataforma de permisos y el módulo de horarios de profesores. Las dependencias externas, interfaces y pruebas de integración elevan la incertidumbre técnica. |

## 4. Consolidado Total del Proyecto
* **Total Story Points ($SP_{\text{total}}$):** **57 SP**.
* **Esfuerzo Total ($E_{\text{total}}$):** **456 Horas**.
* **Presupuesto Comercial Total ($C_{\text{total}}$):** **$20.520.000 COP**.

### Entrega del MVP

El **MVP (Producto Mínimo Viable)** corresponde a la primera entrega funcional y utilizable de CampusTouch. Incluye el núcleo público y administrativo necesario para consultar y mantener actualizada la información de la Facultad.

* **Historias del MVP:** HU-01, HU-03, HU-04, HU-05, HU-06 y HU-07.
* **Story Points del MVP:** **41 SP**.
* **Esfuerzo del MVP:** **328 Horas**.
* **Presupuesto del MVP:** **$14.760.000 COP**.

### Entrega del Proyecto Completo

El proyecto completo incluye el MVP más las funcionalidades de acceso privado para estudiantes e integración con servicios externos.

* **Historias adicionales:** HU-02 y HU-08.
* **Story Points adicionales:** **16 SP**.
* **Esfuerzo adicional:** **128 Horas**.
* **Inversión adicional:** **$5.760.000 COP**.
* **Story Points del Proyecto Completo:** **57 SP**.
* **Esfuerzo Total del Proyecto Completo:** **456 Horas**.
* **Inversión Financiera del Proyecto Completo:** **$20.520.000 COP**.

### Cálculos

$$
SP_{\text{total}} = 2 + 8 + 5 + 13 + 3 + 13 + 5 + 8 = 57\ SP
$$

$$
E_{\text{total}} = 57\ SP \times 8\ \frac{horas}{SP} = 456\ horas
$$

$$
C_{\text{total}} = 456\ horas \times \$45.000 = \$20.520.000\ COP
$$

$$
SP_{\text{MVP}} = 2 + 5 + 13 + 3 + 13 + 5 = 41\ SP
$$

$$
E_{\text{MVP}} = 41\ SP \times 8\ \frac{horas}{SP} = 328\ horas
$$

$$
C_{\text{MVP}} = 328\ horas \times \$45.000 = \$14.760.000\ COP
$$

La estructura permite entregar primero el MVP y posteriormente evolucionarlo hasta el proyecto completo, manteniendo una única línea base de estimación y un incremento claramente identificable entre ambas entregas.