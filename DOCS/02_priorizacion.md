
## 2.1. Matriz de Priorización y Estimación Empírica

La priorización se actualiza a partir del alcance funcional vigente de **CampusTouch**, considerando que la primera versión será una aplicación funcional completa compuesta por interfaz táctil pública, acceso privado para estudiantes, backend, base de datos, autenticación, panel administrativo e integraciones con servicios institucionales.

| ID Issue | Historia de Usuario | Categoría MoSCoW | Criterio de Impacto (Valor de Negocio) | Justificación Estratégica | Estimación Empírica (Cualitativa) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **#1** | **HU-01 — Consulta de información pública** | **Must Have** | Impacto Operativo y de Servicio | Constituye el flujo principal de CampusTouch. Permite que visitantes, estudiantes y profesores consulten la información pública desde la pantalla táctil y puedan navegar hacia las carreras y sus contenidos. | Complejidad Media-Baja (Navegación táctil, consultas y presentación de contenidos). |
| **#2** | **HU-02 — Acceso del estudiante a información privada** | **Must Have** | Impacto en Seguridad y Servicio | Es indispensable para proporcionar acceso a notas, registros académicos y demás información privada. La autenticación y la separación entre información pública y privada son requisitos fundamentales del sistema. | Complejidad Alta (Autenticación, sesiones, autorización, privacidad y protección de datos). |
| **#3** | **HU-03 — Gestión de noticias e imágenes** | **Must Have** | Impacto en Comunicación y Experiencia de Usuario (UX) | Permite mantener actualizados los contenidos informativos y visuales que alimentan la pantalla de bienvenida y las secciones de las carreras. Sin esta gestión, la información pública no podría mantenerse vigente de forma eficiente. | Complejidad Media (CRUD, asociaciones de contenido y gestión de imágenes). |
| **#4** | **HU-04 — Gestión académica** | **Must Have** | Impacto Operativo | Centraliza la administración de carreras, semestres, horarios y profesores. Es necesaria para garantizar que la información académica consultada por los usuarios sea actualizable y consistente. | Complejidad Alta (Múltiples entidades, relaciones, CRUD y consistencia de datos). |
| **#5** | **HU-05 — Gestión de enlaces institucionales** | **Must Have** | Impacto Operativo y de Integración | Permite mantener los accesos a plataformas oficiales, especialmente el servicio institucional para solicitudes de permisos. Su administración dinámica evita cambios de código cuando una dirección institucional sea actualizada. | Complejidad Media-Baja (CRUD y validación de enlaces externos). |
| **#6** | **HU-06 — Administración de usuarios y roles** | **Must Have** | Impacto en Seguridad y Control | Es necesaria para definir quién puede acceder al área administrativa y qué operaciones puede ejecutar. Permite aplicar el principio de mínimo privilegio y controlar las funciones sensibles del sistema. | Complejidad Alta (Usuarios, roles, permisos y autorización). |
| **#7** | **HU-07 — Acceso al panel administrativo** | **Must Have** | Impacto Operativo | El panel administrativo es el punto central para gestionar el contenido y la configuración de CampusTouch. Es necesario para que administradores autorizados puedan operar el sistema sin modificar directamente el código. | Complejidad Media (Interfaz administrativa, autenticación, autorización e integración con módulos CRUD). |
| **#8** | **HU-08 — Integración con servicios externos** | **Must Have** | Impacto en Interoperabilidad y Servicio | Permite conectar CampusTouch con servicios que ya existen fuera de la aplicación, como la plataforma de permisos y el módulo de horarios de profesores desarrollado por otro grupo. Reduce la duplicación de funcionalidades y mantiene el sistema alineado con los servicios institucionales. | Complejidad Media-Alta (Dependencias externas, configuración e incertidumbre de integración). |

### 2.2. Priorización MoSCoW del Alcance

La priorización se establece de la siguiente manera:

**Should-Have**

- HU-03 (#3): Gestión de noticias e imágenes.
- HU-04 (#4): Gestión académica.
- HU-08 (#8): Integración con servicios externos.

**Must-Have:** 

- HU-01 (#1): Consulta de información pública.
- HU-02 (#2): Acceso del estudiante a información privada.
- HU-05 (#5): Gestión de enlaces institucionales.
- HU-06 (#6): Administración de usuarios y roles.

**Could Have:**

- HU-07 (#7): Acceso al panel administrativo.

### 2.3. Criterios utilizados para la priorización

La prioridad se determinó considerando:

1. **Valor para el usuario:** capacidad de resolver las necesidades principales de consulta y acceso a información.
2. **Impacto operativo:** contribución al funcionamiento diario y a la actualización de la información.
3. **Seguridad y privacidad:** criticidad de proteger datos académicos y controlar los accesos.
4. **Dependencias:** necesidad de determinadas funcionalidades para que otras puedan operar correctamente.
5. **Interoperabilidad:** importancia de conectarse con servicios institucionales y módulos externos.
6. **Riesgo técnico:** complejidad, incertidumbre e impacto de errores durante la implementación.

### 2.4. Relación entre prioridad y estimación

La priorización no depende únicamente del esfuerzo estimado. Una historia puede presentar alta complejidad y mantenerse como **Must Have** cuando su ausencia impediría cumplir el objetivo principal del producto.

En particular, **HU-02** y **HU-06** presentan una estimación elevada por los requisitos de autenticación, autorización, sesiones y protección de información privada. **HU-04** también requiere una inversión importante debido a la cantidad de entidades académicas que debe administrar.

La estimación y priorización se mantienen alineadas con la línea base definida en DOCS/03_estimacion_y_costos.md:

| Historia | Prioridad | SP |
| :--- | :---: | :-: |
| HU-01 — Consulta de información pública | Must Have | 3 SP |
| HU-02 — Acceso del estudiante a información privada | Must Have | 8 SP |
| HU-03 — Gestión de noticias e imágenes | Must Have | 5 SP |
| HU-04 — Gestión académica | Must Have | 8 SP |
| HU-05 — Gestión de enlaces institucionales | Must Have | 3 SP |
| HU-06 — Administración de usuarios y roles | Must Have | 8 SP |
| HU-07 — Acceso al panel administrativo | Must Have | 5 SP |
| HU-08 — Integración con servicios externos | Must Have | 5 SP |
| **Total** | | **45 SP** |

### Alcance del Producto Mínimo Viable (MVP)

El **Producto Mínimo Viable (MVP)** estará compuesto por las ocho historias clasificadas como **Must Have**: **HU-01, HU-02, HU-03, HU-04, HU-05, HU-06, HU-07 y HU-08**.

Estas historias cubren de extremo a extremo el alcance establecido para CampusTouch:

- Consulta pública mediante pantalla táctil.
- Consulta de noticias, imágenes e información académica.
- Consulta de horarios.
- Acceso seguro del estudiante a información privada.
- Gestión administrativa del contenido.
- Administración de usuarios, roles y permisos.
- Acceso al panel administrativo.
- Integración con servicios institucionales externos.

El MVP contempla **45 Story Points**, **360 horas** y un presupuesto estimado de **$16.200.000 COP**, de acuerdo con la estimación formal del proyecto.

La priorización podrá revisarse durante el refinamiento del backlog y al finalizar cada Sprint. Cualquier nuevo requerimiento deberá evaluarse por valor, riesgo, dependencia y esfuerzo antes de incorporarse a la línea base.
