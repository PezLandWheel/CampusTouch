# DOCS/03_estimacion_y_costos.md: Estimación Formal y Presupuesto

## 1. Integrantes y Asignación de Roles

* **Product Owner:** Jose Luis Alberto Chamorro
* **Líder Técnico:** David Sebastian Yepez
* **Desarrollador(a) 1:** Brayan Andres Solarte
* **Desarrollador(a) 2:** Johan Stiven Carvajal

## 2. Parámetros Base de Estimación

* **Historia Pivote Seleccionada:** HU-01 — Consulta de información pública (#1)
* **Puntaje Pivote Asignado:** 3 SP
* **Factor de Conversión ($F_c$):** 1 SP = 8 Horas
* **Tarifa Hora ($T_h$):** $45.000 COP/Hora

La historia HU-01 se selecciona como historia pivote porque representa la funcionalidad base de consulta de CampusTouch y concentra el flujo principal de la pantalla táctil pública: visualización de contenidos institucionales, selección de carreras y navegación hacia información académica.

A partir de esta historia se realiza la estimación relativa de las demás historias mediante juicio de expertos, considerando alcance funcional, cantidad de operaciones, validaciones, seguridad, relaciones entre datos, dependencias externas y riesgo técnico.

La escala utilizada corresponde a Story Points relativos, siguiendo una progresión de complejidad basada en 3, 5 y 8 SP.

## 3. Matriz Detallada de Estimación Formal y Presupuesto

| ID Issue | Historia de Usuario | Story Points ($SP$) | Factor ($F_c$) | Esfuerzo ($E_i = SP \times F_c$) | Tarifa ($T_h$) | Costo Total ($C_i = E_i \times T_h$) | Justificación Técnica Juicio de Expertos |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :--- |
| **#1** | **HU-01 — Consulta de información pública** | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Historia pivote. Comprende la pantalla de bienvenida, noticias y contenidos destacados, selección de carreras, navegación pública y consulta de información académica general. Su complejidad es media-baja al estar centrada principalmente en operaciones de consulta y navegación. |
| **#2** | **HU-02 — Acceso del estudiante a información privada** | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Requiere autenticación, validación de credenciales, sesiones, control de acceso, protección de datos académicos, aislamiento de la información de cada estudiante y cierre/invalidez de sesión por inactividad. Presenta alta complejidad y sensibilidad por seguridad y privacidad. |
| **#3** | **HU-03 — Gestión de noticias e imágenes** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye operaciones CRUD para noticias e imágenes, asociación entre contenido y recursos visuales, diferenciación entre noticias de Facultad y carrera y actualización dinámica del contenido publicado. Requiere persistencia, validaciones y manejo de archivos/imágenes. |
| **#4** | **HU-04 — Gestión académica** | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Agrupa la administración de carreras, semestres, horarios y profesores. Implica múltiples entidades, relaciones entre datos, operaciones CRUD, consistencia referencial y actualización de la información que posteriormente se consulta desde la interfaz pública. |
| **#5** | **HU-05 — Gestión de enlaces institucionales** | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Requiere CRUD de enlaces, validación de nombre y dirección, publicación dinámica y configuración de accesos a servicios oficiales sin necesidad de cambiar el código fuente. La complejidad es baja-media. |
| **#6** | **HU-06 — Administración de usuarios y roles** | **8 SP** | 8 hrs/SP | **64 hrs** | $45.000 | **$2.880.000 COP** | Comprende gestión de usuarios administrativos, creación y modificación de roles, asignación de permisos y restricción de operaciones según autorización. Es una funcionalidad crítica de seguridad y control de acceso, por lo que se estima con alta complejidad. |
| **#7** | **HU-07 — Acceso al panel administrativo** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Requiere una interfaz administrativa autenticada, acceso condicionado por permisos, navegación por los módulos de gestión y persistencia de los cambios. Su complejidad es media por combinar seguridad, interfaz y conexión con los módulos CRUD. |
| **#8** | **HU-08 — Integración con servicios externos** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Considera la configuración y acceso a servicios institucionales externos, incluyendo la plataforma oficial de permisos y el módulo de horarios de profesores desarrollado por otro grupo. La incertidumbre de integración y las dependencias externas justifican una estimación media. |

## 4. Definición del Producto Mínimo Viable (MVP)

En CampusTouch, el **MVP** se entiende como la primera versión que puede ser instalada y utilizada en la pantalla táctil para resolver el objetivo principal del producto: **centralizar y mostrar información pública de la Facultad y permitir que el personal autorizado mantenga dicha información actualizada desde un panel administrativo**.

Por lo tanto, el MVP no necesita contener desde el primer momento todas las funcionalidades del proyecto completo. Debe ser una versión funcional, demostrable y útil por sí misma.

### Historias incluidas en el MVP

El MVP estará compuesto por:

* **HU-01 (#1):** Consulta de información pública — **3 SP**.
* **HU-03 (#3):** Gestión de noticias e imágenes — **5 SP**.
* **HU-04 (#4):** Gestión académica — **8 SP**.
* **HU-05 (#5):** Gestión de enlaces institucionales — **3 SP**.
* **HU-06 (#6):** Administración de usuarios y roles — **8 SP**.
* **HU-07 (#7):** Acceso al panel administrativo — **5 SP**.

Estas historias permiten entregar un producto completo en el siguiente sentido:

**Pantalla táctil pública → consulta de información → administración segura del contenido → actualización de la información publicada.**

### Funcionalidades que quedarán para la segunda fase

* **HU-02 (#2):** Acceso del estudiante a información privada — **8 SP**.
* **HU-08 (#8):** Integración con servicios externos — **5 SP**.

Estas funciones amplían el sistema después de haber entregado el núcleo operativo. HU-02 incorpora la capa de información académica privada y seguridad asociada al estudiante. HU-08 incorpora las dependencias con servicios externos y el módulo de horarios de profesores desarrollado por otro grupo.

## 5. Resumen Comercial de la Propuesta

### 5.1. Entrega del MVP

* **Historias incluidas:** HU-01, HU-03, HU-04, HU-05, HU-06 y HU-07.
* **Story Points del MVP:** **32 SP**.
* **Velocidad planificada:** 12 SP/Sprint.
* **Número de Sprints:** $\frac{32}{12} = 2,67 \longrightarrow \mathbf{3\ Sprints}$.
* **Tiempo de Entrega del MVP:** **6 Semanas**.
* **Esfuerzo Total del MVP:** **256 Horas/Hombre**.
* **Inversión Financiera MVP:** **$11.520.000 COP**.

### 5.2. Entrega del Proyecto Completo

El proyecto completo incorpora las ocho historias de usuario aprobadas.

* **Historias incluidas:** HU-01 a HU-08.
* **Story Points del Proyecto Completo:** **45 SP**.
* **Número de Sprints:** $\frac{45}{12} = 3,75 \longrightarrow \mathbf{4\ Sprints}$.
* **Tiempo de Entrega del Proyecto Completo:** **8 Semanas**.
* **Esfuerzo Total del Proyecto Completo:** **360 Horas/Hombre**.
* **Inversión Financiera Proyecto Completo:** **$16.200.000 COP**.

### 5.3. Segunda fase: completar el MVP

Una vez entregado el MVP, la segunda fase requiere:

* **Story Points adicionales:** **13 SP**.
* **Esfuerzo adicional:** **104 Horas**.
* **Inversión adicional:** **$4.680.000 COP**.
* **Capacidad aproximada:** **1 Sprint completo de 12 SP + 1 SP restante**.

El proyecto completo, por tanto, no representa un segundo proyecto independiente: es la evolución del MVP hasta cubrir el alcance total aprobado.

## 6. Cálculos de la Línea Base

### MVP

$$
SP_{MVP} = 3 + 5 + 8 + 3 + 8 + 5 = 32\ SP
$$

$$
E_{MVP} = 32\ SP \times 8\ \frac{horas}{SP} = 256\ horas
$$

$$
C_{MVP} = 256\ horas \times \$45.000 = \$11.520.000\ COP
$$

### Proyecto completo

$$
SP_{total} = 3 + 8 + 5 + 8 + 3 + 8 + 5 + 5 = 45\ SP
$$

$$
E_{total} = 45\ SP \times 8\ \frac{horas}{SP} = 360\ horas
$$

$$
C_{total} = 360\ horas \times \$45.000 = \$16.200.000\ COP
$$

### Incremento posterior al MVP

$$
SP_{fase2} = 45 - 32 = 13\ SP
$$

$$
E_{fase2} = 13\ SP \times 8\ \frac{horas}{SP} = 104\ horas
$$

$$
C_{fase2} = 104\ horas \times \$45.000 = \$4.680.000\ COP
$$

## 7. Distribución del Esfuerzo por Fase

| Fase | Historias | Story Points | Horas | Costo |
| :--- | :--- | :-: | :-: | :-: |
| **MVP** | HU-01, HU-03, HU-04, HU-05, HU-06, HU-07 | **32 SP** | **256 hrs** | **$11.520.000 COP** |
| **Fase 2** | HU-02, HU-08 | **13 SP** | **104 hrs** | **$4.680.000 COP** |
| **Proyecto completo** | HU-01 a HU-08 | **45 SP** | **360 hrs** | **$16.200.000 COP** |

## 8. Consideraciones de la Estimación

La presente estimación distingue explícitamente entre una **entrega MVP** y la **entrega del proyecto completo**.

El MVP prioriza el núcleo que hace útil a CampusTouch desde el primer despliegue: consulta pública en pantalla táctil y administración dinámica de los contenidos, carreras, semestres, horarios, profesores y enlaces mediante usuarios autorizados.

La segunda fase incorpora las funcionalidades que aumentan el alcance del sistema sin ser necesarias para demostrar y operar el núcleo público inicial: acceso del estudiante a información privada y conexiones con servicios externos.

La selección del MVP también reduce el riesgo inicial de depender de servicios institucionales externos para poder realizar la primera entrega. La integración de estos servicios puede realizarse después de disponer de una versión estable del sistema.

Los Story Points representan una estimación relativa y no equivalen directamente a horas de trabajo; en este documento se utiliza el factor establecido de **1 SP = 8 horas** únicamente para convertir la estimación relativa en esfuerzo presupuestable.

El esfuerzo y el calendario reales podrán ajustarse durante las iteraciones de desarrollo con base en la velocidad efectiva del equipo, la disponibilidad de servicios institucionales y la resolución de las dependencias externas.
