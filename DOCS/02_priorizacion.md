# Reporte de Priorización MoSCoW, Valor de Negocio y Estimación Empírica - Proyecto CampusTouch

## 1. Matriz de Priorización y Análisis de Valor

| ID Issue | Historia de Usuario | Categoría MoSCoW | Criterio de Impacto (Valor de Negocio) | Justificación Estratégica | Estimación Empírica (Cualitativa) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **#1** | HU-01 - Consulta de información pública | **Must Have** | Impacto Operativo y de Servicio | Constituye la función principal de CampusTouch, permitiendo a estudiantes, profesores y visitantes consultar información de la Facultad desde la pantalla táctil. Sin esta función no existe el núcleo de consulta del sistema. | Complejidad Baja (Navegación táctil, consultas y presentación de información). |
| **#2** | HU-02 - Acceso del estudiante a información privada | **Should Have** | Impacto en Seguridad y Servicio | Amplía el sistema con acceso a notas, registros académicos e información personal del estudiante. Es importante para completar la solución, pero puede incorporarse después de entregar un MVP público y administrativo funcional. | Complejidad Alta (Autenticación, sesiones, autorización, privacidad y protección de datos). |
| **#3** | HU-03 - Gestión de noticias e imágenes | **Must Have** | Impacto en Comunicación y Experiencia de Usuario | Permite mantener actualizados los contenidos informativos y visuales que se presentan en la pantalla. Sin esta función el sistema dependería de modificaciones directas al código para actualizar la información publicada. | Complejidad Media (Operaciones CRUD, asociaciones y gestión de imágenes). |
| **#4** | HU-04 - Gestión académica | **Must Have** | Impacto Operativo | Permite administrar carreras, semestres, horarios y profesores, garantizando que la información académica publicada pueda mantenerse actualizada y consistente. | Complejidad Alta (Múltiples entidades, relaciones, CRUD y validaciones de consistencia). |
| **#5** | HU-05 - Gestión de enlaces institucionales | **Must Have** | Impacto Operativo y de Integración | Permite mantener actualizados los accesos a servicios oficiales de la Universidad, especialmente el acceso al sistema de permisos. Su administración dinámica evita depender de cambios en el código. | Complejidad Baja (Gestión CRUD y validación de enlaces). |
| **#6** | HU-06 - Administración de usuarios y roles | **Must Have** | Impacto en Seguridad y Control | Garantiza que las funciones administrativas solo puedan ser utilizadas por usuarios autorizados y permite definir permisos según el rol. Es fundamental para operar de forma segura la administración del sistema. | Complejidad Alta (Usuarios, roles, permisos y autorización). |
| **#7** | HU-07 - Acceso al panel administrativo | **Must Have** | Impacto Operativo | Proporciona el punto central desde el cual los administradores gestionan el contenido y configuración de CampusTouch. Es necesario para administrar la plataforma sin modificar directamente el código fuente. | Complejidad Media (Interfaz administrativa, autenticación, autorización y conexión con módulos CRUD). |
| **#8** | HU-08 - Integración con servicios externos | **Should Have** | Impacto en Interoperabilidad y Servicio | Permite complementar CampusTouch mediante la plataforma oficial de permisos y el módulo de horarios de profesores desarrollado por otro grupo. Aporta valor al producto completo, pero depende de interfaces y servicios externos. | Complejidad Media-Alta (Dependencias externas, configuración, integración y pruebas). |

---

## 2. Alcance del Producto Mínimo Viable (MVP)

El **Producto Mínimo Viable (MVP)** para el lanzamiento de **CampusTouch** se compondrá únicamente de las historias clasificadas como **Must Have** (#1, #3, #4, #5, #6 y #7).

* **Justificación de Selección:** Se cubren las capacidades esenciales del producto: consulta pública mediante pantalla táctil, gestión dinámica de contenidos e información académica, administración segura mediante usuarios y roles y acceso a enlaces institucionales. Con estas funciones CampusTouch puede ser puesto en operación y utilizado sin depender de las funcionalidades de la segunda fase.
* **Funcionalidades Postergadas:** La historia #2 (**Acceso del estudiante a información privada**) y la historia #8 (**Integración con servicios externos**) se posponen para la segunda fase. Estas funcionalidades amplían el producto con acceso académico privado e interoperabilidad con servicios externos, pero no impiden la entrega de un MVP funcional.
* **Estimación del MVP:** **41 SP**, equivalente a **328 Horas** y un presupuesto de **$14.760.000 COP**.
* **Proyecto Completo:** Al incorporar las historias #2 y #8, el alcance total asciende a **57 SP**, equivalente a **456 Horas** y una inversión de **$20.520.000 COP**.