# Reporte de Priorización MoSCoW, Valor de Negocio y Estimación Empírica - Proyecto TicketPass

## 2.1. Matriz de Priorización y Estimación Empírica

| ID Issue | Historia de Usuario | Categoría MoSCoW | Criterio de Impacto (Valor de Negocio) | Justificación Estratégica | Estimación Empírica (Cualitativa) |
| :-: | :--- | :-: | :--- | :--- | :--- |
| **#1** | HU01 - Consultar carreras e información académica | **Must Have** | Impacto Informativo | Permite al estudiante acceder de manera centralizada a la información académica de la carrera desde la pantalla interactiva. | Complejidad Baja (Consulta y organización de información). |
| **#2** | HU02 - Consultar horarios académicos | **Must Have** | Impacto Académico | Facilita el acceso de los estudiantes a los horarios de los cursos, reduciendo la dificultad para encontrar esta información. | Complejidad Media (Consulta y organización de horarios). |
| **#3** | HU03 - Consultar eventos institucionales | **Should Have** | Impacto Informativo | Permite mantener informados a los estudiantes sobre actividades y eventos relacionados con la institución y la carrera. | Complejidad Baja (Consulta y visualización de eventos). |
| **#4** | HU04 - Consultar y gestionar información de permisos | **Should Have** | Impacto Operativo | Facilita el acceso de los estudiantes al sistema institucional de permisos mediante la información disponible en el sistema interactivo. | Complejidad Media (Integración mediante código QR y acceso a sistema externo). |
| **#5** | HU05 - Iniciar sesión como administrador | **Must Have** | Impacto en Seguridad | Controla el acceso a la plataforma administrativa y evita que usuarios no autorizados gestionen la información publicada. | Complejidad Media (Autenticación y control de acceso). |
| **#6** | HU06 - Gestionar información del sistema | **Must Have** | Impacto Operativo | Permite a los docentes autorizados mantener actualizada la información que será consultada por los estudiantes. | Complejidad Media (Operaciones de creación, modificación y eliminación). |
| **#7** | HU07 - Gestionar imágenes | **Won't Have** | Impacto Visual | Permite complementar la información publicada mediante imágenes, pero puede ser postergado sin impedir las funciones principales del sistema. | Complejidad Media (Carga, almacenamiento y gestión de archivos). |
| **#8** | HU08 - Gestionar eventos | **Should Have** | Impacto Informativo y Operativo | Permite a los administradores crear, modificar y eliminar eventos para mantener actualizada la información disponible para los estudiantes. | Complejidad Media (Formularios y operaciones CRUD). |
| **#9** | HU09 - Gestionar horarios académicos | **Must Have** | Impacto Académico y Operativo | Permite mantener actualizados los horarios académicos publicados y garantiza que los estudiantes consulten información vigente. | Complejidad Media-Alta (Gestión de horarios y organización de información académica). |
| **#10** | HU10 - Gestionar carreras | **Must Have** | Impacto Académico y Administrativo | Permite administrar las carreras disponibles en el sistema y mantener organizada la información académica que se presenta a los usuarios. | Complejidad Media (Gestión de registros y asociación de información). |

## 2. Alcance del Producto Mínimo Viable (MVP)

El **Producto Mínimo Viable (MVP)** para el lanzamiento de **TicketPass** se compondrá únicamente de las historias clasificadas como **Must Have** (`#1`, `#2`, `#3` y `#5`).

* **Justificación de Selección:** Se cubren las tres dimensiones críticas del negocio (estabilidad operativa, recaudo financiero y validación en puerta).
* **Funcionalidades Postergadas:** La historia `#4` (**Mapa Interactivo**) se pospone para el siguiente ciclo de desarrollo, sustituyéndola temporalmente por una selección de zona mediante menú desplegable.
