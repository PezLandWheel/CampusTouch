### 2. Caso de Estudio Modelo: CampusTouch
Descripción del Dominio

El Sistema Interactivo de la Facultad de Ingeniería en Sistemas es una solución orientada a facilitar la consulta y gestión de información académica y administrativa dentro de la institución.

El sistema busca centralizar información como eventos, horarios de atención de profesores, horarios de cursos e información relacionada con el sistema institucional de permisos.

La solución está compuesta por una interfaz pública de consulta mediante pantalla táctil, dirigida principalmente a estudiantes, y una interfaz administrativa independiente, destinada a docentes autorizados para gestionar y actualizar los contenidos publicados.

### Actores del Sistema

-Estudiante / Usuario: Consulta desde la pantalla táctil la información disponible de la carrera, incluyendo eventos, horarios de profesores, horarios de cursos e información relacionada con permisos.

-Docente / Administrador: Accede a la plataforma administrativa mediante autenticación y gestiona la información que será presentada en la interfaz pública.

-Sistema Universitario de Permisos: Sistema externo al proyecto al cual el estudiante puede acceder mediante el código QR proporcionado desde la interfaz del
sistema interactivo.

### Mapeo de Requisitos (Matriz de Transformación)

| **Problema Identificado** | **Necesidad de Software** | **Requisito Funcional** |
|---|---|---|
| **Dificultad para encontrar información académica y administrativa de la carrera en un único lugar.** | Centralizar la información de la carrera en un punto de consulta accesible. | El sistema debe permitir al usuario seleccionar la carrera de Ingeniería de Sistemas y acceder a su información disponible. |
| **Dificultad para conocer las actividades y eventos de la carrera.** | Facilitar la consulta de eventos académicos y sociales. | El sistema debe permitir consultar los eventos disponibles y visualizar su información detallada. |
| **Dificultad para consultar los horarios de atención de los profesores y los horarios de los cursos vigentes.** | Centralizar y organizar la información de horarios académicos y de atención docente para facilitar su consulta. | El sistema debe permitir consultar los horarios de atención de los profesores y los horarios de los cursos disponibles. |
| **Dificultad para acceder de manera directa al sistema institucional de permisos.** | Facilitar el acceso al sistema existente de permisos. | El sistema debe mostrar un código QR que permita acceder al sistema institucional de permisos. |
| **Dificultad para mantener actualizada y protegida la información publicada para los estudiantes.** | Proporcionar una plataforma administrativa segura para gestionar los contenidos. | El sistema debe autenticar a los docentes autorizados antes de permitir el acceso a la plataforma administrativa, donde podrán crear, modificar y eliminar información, eventos, horarios e imágenes. |
