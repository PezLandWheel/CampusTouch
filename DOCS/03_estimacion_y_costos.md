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

## 4. Consolidado Total del Proyecto

* **Total Story Points ($SP_{\text{total}}$):** **45 SP**
* **Esfuerzo Total ($E_{\text{total}}$):** **360 Horas**
* **Presupuesto Comercial Total ($C_{\text{total}}$):** **$16.200.000 COP**

### Cálculo del presupuesto

$$
SP_{\text{total}} = 3 + 8 + 5 + 8 + 3 + 8 + 5 + 5 = 45\ SP
$$

$$
E_{\text{total}} = 45\ SP \times 8\ \frac{horas}{SP} = 360\ horas
$$

$$
C_{\text{total}} = 360\ horas \times \$45.000 = \$16.200.000\ COP
$$

## 5. Distribución del Esfuerzo por Área

| Área funcional | Historias involucradas | Story Points | Horas | Costo |
| :--- | :--- | :-: | :-: | :-: |
| **Información pública** | HU-01 | 3 SP | 24 hrs | $1.080.000 COP |
| **Acceso e información privada** | HU-02 | 8 SP | 64 hrs | $2.880.000 COP |
| **Contenido multimedia** | HU-03 | 5 SP | 40 hrs | $1.800.000 COP |
| **Gestión académica** | HU-04 | 8 SP | 64 hrs | $2.880.000 COP |
| **Enlaces institucionales** | HU-05 | 3 SP | 24 hrs | $1.080.000 COP |
| **Usuarios y roles** | HU-06 | 8 SP | 64 hrs | $2.880.000 COP |
| **Panel administrativo** | HU-07 | 5 SP | 40 hrs | $1.800.000 COP |
| **Integraciones externas** | HU-08 | 5 SP | 40 hrs | $1.800.000 COP |
| **Total** | **HU-01 a HU-08** | **45 SP** | **360 hrs** | **$16.200.000 COP** |

## 6. Consideraciones de la Estimación

La presente estimación corresponde al alcance funcional vigente de CampusTouch y contempla las ocho historias de usuario aprobadas en el backlog actual:

* **HU-01 (#1):** Consulta de información pública.
* **HU-02 (#2):** Acceso del estudiante a información privada.
* **HU-03 (#3):** Gestión de noticias e imágenes.
* **HU-04 (#4):** Gestión académica.
* **HU-05 (#5):** Gestión de enlaces institucionales.
* **HU-06 (#6):** Administración de usuarios y roles.
* **HU-07 (#7):** Acceso al panel administrativo.
* **HU-08 (#8):** Integración con servicios externos.

El presupuesto incorpora el desarrollo de una **aplicación funcional completa**, incluyendo frontend, backend, base de datos, autenticación y panel administrativo, de acuerdo con el alcance definido.

La estimación de HU-02 y HU-06 es mayor debido a que las funciones de autenticación, autorización, sesiones, roles y protección de información privada introducen riesgos técnicos y requisitos de seguridad superiores a los módulos de consulta pública.

HU-04 también presenta una estimación alta porque concentra varias entidades relacionadas —carreras, semestres, horarios y profesores— y requiere mantener consistencia entre ellas.

HU-08 considera dependencias externas: la plataforma oficial de permisos de la Universidad y el módulo de horarios de profesores desarrollado por otro grupo. La implementación concreta puede variar según las interfaces y mecanismos de integración que la Universidad o el otro equipo dispongan.

Los Story Points representan una estimación relativa y no equivalen directamente a horas de trabajo; en este documento se utiliza el factor establecido de **1 SP = 8 horas** únicamente para convertir la estimación relativa en esfuerzo presupuestable.

El esfuerzo real podrá ajustarse durante las iteraciones de desarrollo cuando se reduzca la incertidumbre técnica, se definan las interfaces de integración y se conozcan con precisión las fuentes oficiales de información académica.
