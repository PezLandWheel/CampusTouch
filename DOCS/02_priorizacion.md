# Reporte de Priorización MoSCoW, Valor de Negocio y Estimación Empírica - Proyecto CampusTouch

## 2.1. Matriz de Priorización y Estimación Empírica

La priorización se actualiza a partir del alcance funcional vigente de **CampusTouch**, diferenciando las funcionalidades necesarias para entregar un MVP operativo de aquellas que completan el proyecto.

| ID Issue | Historia de Usuario | Categoría MoSCoW | Criterio de Impacto (Valor de Negocio) | Justificación Estratégica | Estimación Empírica (Cualitativa) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **#1** | **HU-01 — Consulta de información pública** | **Must Have** | Impacto Operativo y de Servicio | Constituye el flujo principal de CampusTouch. Permite que visitantes, estudiantes y profesores consulten la información pública desde la pantalla táctil y naveguen hacia las carreras y sus contenidos. | Complejidad Baja (Navegación táctil, consultas y presentación de contenidos). |
| **#2** | **HU-02 — Acceso del estudiante a información privada** | **Should Have** | Impacto en Seguridad y Servicio | Amplía el sistema con acceso a notas, registros académicos e información personal. Es importante para el producto completo, pero puede entregarse después de disponer de un MVP público y administrativo funcional. | Complejidad Alta (Autenticación, sesiones, autorización, privacidad y protección de datos). |
| **#3** | **HU-03 — Gestión de noticias e imágenes** | **Must Have** | Impacto en Comunicación y Experiencia de Usuario | Permite mantener actualizados los contenidos informativos y visuales de la pantalla y de las carreras. Es indispensable para que el sistema pueda operar con contenido dinámico. | Complejidad Media (CRUD, asociaciones de contenido y gestión de imágenes). |
| **#4** | **HU-04 — Gestión académica** | **Must Have** | Impacto Operativo | Centraliza la administración de carreras, semestres, horarios y profesores. Es necesaria para garantizar que la información académica publicada pueda mantenerse correcta y actualizada. | Complejidad Alta (Múltiples entidades, relaciones, CRUD y consistencia de datos). |
| **#5** | **HU-05 — Gestión de enlaces institucionales** | **Must Have** | Impacto Operativo y de Integración | Mantiene disponibles y configurables los accesos a plataformas oficiales. Es un componente sencillo pero necesario para completar el flujo informativo del MVP. | Complejidad Baja (CRUD y validación de enlaces). |
| **#6** | **HU-06 — Administración de usuarios y roles** | **Must Have** | Impacto en Seguridad y Control | Permite controlar quién administra el contenido y qué acciones puede realizar. Es fundamental para que el panel administrativo sea seguro y operable. | Complejidad Alta (Usuarios, roles, permisos y autorización). |
| **#7** | **HU-07 — Acceso al panel administrativo** | **Must Have** | Impacto Operativo | Es el punto central desde el cual los administradores autorizados gestionarán el contenido del sistema. Sin este módulo, la información no podría mantenerse dinámicamente sin intervenir el código. | Complejidad Media (Interfaz, autenticación, autorización e integración con módulos CRUD). |
| **#8** | **HU-08 — Integración con servicios externos** | **Should Have** | Impacto en Interoperabilidad y Servicio | Completa la conexión con la plataforma de permisos y el módulo de horarios de profesores. Aporta valor al producto final, pero depende de interfaces y servicios externos que pueden incorporarse después del MVP. | Complejidad Media-Alta (Dependencias externas, configuración, integración y pruebas). |

### 2.2. Priorización MoSCoW del Alcance

La línea base se divide entre un **MVP funcional** y una segunda fase que completa el producto.

**Must-Have — Incluido en el MVP**

- HU-01 (#1): Consulta de información pública.
- HU-03 (#3): Gestión de noticias e imágenes.
- HU-04 (#4): Gestión académica.
- HU-05 (#5): Gestión de enlaces institucionales.
- HU-06 (#6): Administración de usuarios y roles.
- HU-07 (#7): Acceso al panel administrativo.

**Should-Have — Segunda fase**

- HU-02 (#2): Acceso del estudiante a información privada.
- HU-08 (#8): Integración con servicios externos.

**Could Have:** No se incluyen historias nuevas en la línea base actual.

**Won't Have:** No se incluye la sustitución de sistemas oficiales de la Universidad ni la reimplementación independiente de funcionalidades que ya pertenecen a sistemas o módulos externos.

### 2.3. Criterios utilizados para la priorización

La prioridad se determinó considerando:

1. **Valor para el usuario:** capacidad de resolver las necesidades principales de consulta y administración.
2. **Impacto operativo:** contribución al funcionamiento diario y actualización de información.
3. **Seguridad y privacidad:** criticidad de proteger datos académicos y controlar accesos.
4. **Dependencias:** necesidad de una funcionalidad para que otras puedan operar correctamente.
5. **Interoperabilidad:** importancia de integrarse con servicios institucionales.
6. **Riesgo técnico:** complejidad, incertidumbre e impacto de errores durante la implementación.
7. **Valor del MVP:** posibilidad de entregar una primera versión útil sin depender de todas las integraciones externas.

### 2.4. Relación entre prioridad y estimación

La priorización no depende únicamente del esfuerzo estimado. Una historia puede ser compleja y continuar siendo Must-Have cuando resulta necesaria para entregar un MVP funcional.

En particular, **HU-04** y **HU-06** presentan estimaciones altas porque concentran relaciones de datos y controles administrativos. **HU-02** presenta alta complejidad por la protección de información académica privada. **HU-08** presenta complejidad media-alta debido a dependencias con sistemas externos.

La estimación se mantiene alineada con la línea base de DOCS/03_estimacion_y_costos.md:

| Historia | Prioridad | SP |
| :--- | :---: | :-: |
| HU-01 — Consulta de información pública | Must-Have | 2 SP |
| HU-02 — Acceso del estudiante a información privada | Should-Have | 8 SP |
| HU-03 — Gestión de noticias e imágenes | Must-Have | 5 SP |
| HU-04 — Gestión académica | Must-Have | 13 SP |
| HU-05 — Gestión de enlaces institucionales | Must-Have | 3 SP |
| HU-06 — Administración de usuarios y roles | Must-Have | 13 SP |
| HU-07 — Acceso al panel administrativo | Must-Have | 5 SP |
| HU-08 — Integración con servicios externos | Should-Have | 8 SP |
| **Total** | | **57 SP** |

### Alcance del Producto Mínimo Viable (MVP)

El **MVP** estará compuesto por las historias **HU-01, HU-03, HU-04, HU-05, HU-06 y HU-07**, con un total de **41 SP**.

Estas historias permiten poner en funcionamiento la pantalla táctil pública, mantener actualizados sus contenidos y administrar de forma segura la información del sistema.

El MVP contempla:

- Consulta pública mediante pantalla táctil.
- Noticias e imágenes.
- Carreras, semestres, horarios y profesores.
- Enlaces institucionales.
- Usuarios, roles y permisos administrativos.
- Panel administrativo.

### Proyecto Completo

El proyecto completo incorpora las historias restantes:

- HU-02: acceso del estudiante a información privada.
- HU-08: integración con servicios externos.

Con estas historias se completa el alcance de CampusTouch y se incorporan las capacidades de información privada e interoperabilidad.

El proyecto completo contempla **57 Story Points**, **456 horas** y una inversión estimada de **$20.520.000 COP**.

La línea base podrá revisarse durante el refinamiento del backlog, pero cualquier modificación deberá conservar la trazabilidad entre prioridad, estimación, alcance y presupuesto.