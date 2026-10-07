# DOCS/01_Requisitos.md — Especificación de Requisitos de CampusTouch

## 1. Del Problema al Requisito

En la Ingeniería de Requisitos, el desarrollo de **CampusTouch** parte de la necesidad de centralizar y facilitar el acceso a la información de la Facultad de Ingeniería mediante una pantalla táctil pública.

### Problema

La información de la Facultad y de sus carreras puede encontrarse distribuida entre diferentes medios y sistemas institucionales. Esto dificulta que estudiantes, profesores y visitantes encuentren rápidamente información como noticias, horarios, información de carreras, accesos a servicios institucionales y otros contenidos de interés.

Además, la información publicada necesita ser actualizada de forma dinámica por usuarios autorizados, sin depender de modificaciones directas al código de la aplicación.

Por otra parte, determinada información académica y personal de los estudiantes es de carácter privado y no debe quedar disponible para cualquier persona que utilice la pantalla pública.

### Necesidad

Se requiere una plataforma interactiva que:

1. Permita consultar información pública de la Facultad desde una pantalla táctil de uso general.
2. Permita seleccionar una carrera y consultar su información específica.
3. Proporcione acceso autenticado a la información académica privada del estudiante.
4. Permita a administradores autorizados gestionar dinámicamente el contenido del sistema.
5. Controle el acceso mediante usuarios, roles y permisos.
6. Permita enlazar o integrar servicios institucionales externos sin duplicar sus funcionalidades.

### Requisito general del sistema

**CampusTouch deberá proporcionar una aplicación funcional completa compuesta por una interfaz táctil pública, backend, base de datos, autenticación y panel administrativo, permitiendo consultar información pública de la Facultad y sus carreras, acceder de forma segura a información privada de estudiantes autenticados y administrar dinámicamente el contenido del sistema.**

---

## 2. Objetivo del Sistema

El objetivo de CampusTouch es proporcionar un **punto centralizado de información para la Facultad de Ingeniería**, optimizado para interacción táctil, que reduzca el tiempo necesario para encontrar información pública y que, al mismo tiempo, mantenga protegidos los datos académicos y personales que requieren autenticación.

La primera versión tendrá como principal referencia la carrera de **Ingeniería de Sistemas**, pero la estructura del sistema deberá permitir incorporar otras carreras posteriormente.

---

## 3. Actores Principales

### 3.1. Visitante

Persona que utiliza la pantalla táctil sin autenticarse.

Puede consultar únicamente la información definida como pública, por ejemplo:

- Información de la Facultad.
- Carreras disponibles.
- Noticias públicas.
- Imágenes.
- Horarios académicos generales.
- Información pública de profesores.
- Enlaces institucionales.

### 3.2. Estudiante

Usuario que, además de consultar la información pública, puede autenticarse para acceder a información privada asociada exclusivamente a su cuenta.

Puede consultar, según los permisos y servicios disponibles:

- Notas.
- Registro académico.
- Información personal autorizada.
- Otra información académica individual.

### 3.3. Profesor

Usuario que puede consultar la información pública del sistema.

El acceso a funcionalidades adicionales para profesores dependerá de los permisos que la Universidad defina.

### 3.4. Administrador

Usuario autorizado para administrar el contenido y configuración del sistema.

Podrá gestionar:

- Noticias.
- Imágenes.
- Carreras.
- Semestres.
- Horarios.
- Profesores.
- Enlaces.
- Usuarios.
- Roles y permisos.

### 3.5. Sistemas externos

Servicios institucionales o módulos desarrollados fuera de CampusTouch con los que el sistema deberá comunicarse o a los cuales deberá redirigir al usuario.

Ejemplos:

- Plataforma oficial de solicitud de permisos.
- Módulo de horarios de profesores desarrollado por otro grupo.
- Servicios institucionales de autenticación o información académica, cuando estén disponibles y autorizados.

---

## 4. Clasificación de la Información

La separación entre información pública y privada es un requisito fundamental del sistema.

### 4.1. Información pública

No requiere autenticación:

- Noticias de la Facultad.
- Noticias de la carrera.
- Información general de las carreras.
- Imágenes institucionales.
- Horarios generales de semestres.
- Información pública de profesores.
- Enlaces institucionales.
- Información general de la Facultad.

### 4.2. Información privada

Requiere autenticación y autorización:

- Notas.
- Registros académicos.
- Información personal del estudiante.
- Información académica individual.
- Cualquier otro dato definido por la Universidad como restringido.

**Regla de seguridad:** un estudiante autenticado solamente podrá acceder a la información privada correspondiente a su propia cuenta.

---

## 5. Requerimientos Funcionales

### RF-01 — Información pública y navegación

El sistema deberá presentar una pantalla de bienvenida con contenido institucional destacado y un menú de carreras.

El usuario deberá poder seleccionar una carrera y acceder a la información correspondiente.

El sistema deberá permitir navegar entre las diferentes secciones mediante controles adecuados para interacción táctil.

**Historia relacionada:** HU-01 (#1).

### RF-02 — Consulta de noticias e imágenes

El sistema deberá permitir consultar noticias de la Facultad y de las carreras.

Las noticias podrán incluir contenido visual asociado.

El sistema deberá mostrar las imágenes configuradas para las secciones correspondientes.

**Historia relacionada:** HU-01 (#1) y HU-03 (#3).

### RF-03 — Consulta de horarios académicos

El sistema deberá permitir consultar los horarios organizados por semestre y carrera.

La información deberá presentarse de forma comprensible para los usuarios de la pantalla táctil.

**Historia relacionada:** HU-01 (#1) y HU-04 (#4).

### RF-04 — Acceso a información del estudiante

El sistema deberá proporcionar una opción **Estudiantes** desde la cual el usuario pueda iniciar el proceso de autenticación.

El mecanismo inicial definido para la identificación del estudiante será su **número de cédula**, sujeto a las condiciones y mecanismos de autenticación que autorice la Universidad.

Después de una autenticación válida, el sistema deberá permitir consultar la información académica y personal autorizada.

**Historia relacionada:** HU-02 (#2).

### RF-05 — Protección de información privada

El sistema deberá impedir que usuarios no autenticados accedan a notas, registros académicos o información personal restringida.

El sistema deberá validar que la información mostrada corresponda al estudiante autenticado y no a otro usuario.

El sistema deberá permitir cerrar la sesión de forma explícita.

La sesión deberá invalidarse después de un período de inactividad configurable para reducir el riesgo de acceso no autorizado desde la pantalla pública.

**Historia relacionada:** HU-02 (#2).

### RF-06 — Gestión de noticias e imágenes

El administrador deberá poder:

- Crear noticias.
- Consultar noticias.
- Modificar noticias.
- Eliminar noticias.
- Cargar imágenes.
- Consultar imágenes.
- Modificar o reemplazar imágenes.
- Eliminar imágenes.
- Asociar imágenes con noticias o secciones.

Los cambios deberán reflejarse en la interfaz pública sin modificar directamente el código fuente.

**Historia relacionada:** HU-03 (#3).

### RF-07 — Gestión académica

El administrador deberá poder gestionar:

- Carreras.
- Semestres.
- Horarios.
- Información pública de profesores.

El sistema deberá conservar correctamente las relaciones entre carrera, semestre, horario y profesor.

Los cambios realizados deberán quedar disponibles para las consultas correspondientes.

**Historia relacionada:** HU-04 (#4).

### RF-08 — Gestión de enlaces institucionales

El administrador deberá poder crear, consultar, modificar y eliminar enlaces externos.

Cada enlace deberá contar con un nombre identificable y una dirección válida.

El sistema deberá permitir configurar el enlace oficial utilizado para solicitudes de permisos.

**Historia relacionada:** HU-05 (#5).

### RF-09 — Administración de usuarios y roles

El administrador autorizado deberá poder:

- Crear usuarios administrativos.
- Consultar usuarios.
- Modificar usuarios.
- Desactivar usuarios.
- Crear roles.
- Modificar roles.
- Asignar roles a usuarios.
- Definir permisos según el rol.

El sistema deberá impedir que un usuario realice operaciones que no estén autorizadas para su rol.

**Historia relacionada:** HU-06 (#6).

### RF-10 — Panel administrativo

El sistema deberá proporcionar un panel administrativo protegido mediante autenticación.

Desde el panel, los usuarios autorizados deberán acceder únicamente a los módulos y operaciones correspondientes a sus permisos.

La información gestionada desde el panel deberá almacenarse en la base de datos.

**Historia relacionada:** HU-07 (#7).

### RF-11 — Integración con servicios externos

El sistema deberá permitir configurar y utilizar servicios institucionales externos.

Como mínimo deberá contemplar:

- Acceso a la plataforma oficial de permisos.
- Acceso o integración con el módulo de horarios de profesores desarrollado por otro grupo.

La implementación deberá respetar las interfaces y mecanismos de acceso que proporcionen los sistemas externos.

CampusTouch no deberá duplicar ni alterar información que sea responsabilidad exclusiva de un sistema externo, salvo que exista una integración formalmente definida.

**Historia relacionada:** HU-08 (#8).

---

## 6. Requerimientos No Funcionales

### RNF-01 — Usabilidad

La interfaz deberá estar diseñada específicamente para interacción mediante pantalla táctil.

Los controles deberán ser suficientemente grandes y claros para permitir una interacción sencilla por visitantes, estudiantes y profesores.

### RNF-02 — Accesibilidad visual

La información deberá presentarse con tipografía legible, contraste adecuado, jerarquía visual clara y controles identificables.

### RNF-03 — Seguridad

El sistema deberá aplicar autenticación y autorización para proteger las funciones administrativas y la información privada.

Las operaciones administrativas deberán estar restringidas según el rol y los permisos del usuario.

### RNF-04 — Privacidad

Los datos académicos y personales deberán tratarse como información restringida cuando así lo defina la Universidad.

El sistema no deberá exponer información privada en la interfaz pública.

### RNF-05 — Integridad de datos

Las relaciones entre carreras, semestres, horarios, profesores, usuarios y demás entidades deberán mantenerse consistentes.

Las operaciones de modificación deberán validar la información antes de persistirla.

### RNF-06 — Mantenibilidad

El contenido administrable deberá almacenarse en la base de datos y gestionarse desde el panel administrativo.

No deberá ser necesario modificar el código fuente para actualizar noticias, imágenes, carreras, semestres, horarios, profesores o enlaces.

### RNF-07 — Escalabilidad

La estructura de la aplicación deberá permitir incorporar nuevas carreras y nuevos contenidos sin rediseñar completamente el sistema.

### RNF-08 — Disponibilidad

La información pública deberá estar disponible para consulta cuando la pantalla esté operativa y exista conectividad con los servicios requeridos.

### RNF-09 — Rendimiento

La interfaz deberá responder de forma fluida a las interacciones táctiles.

Las consultas frecuentes de información pública deberán diseñarse para minimizar tiempos de espera y evitar bloqueos de la pantalla.

### RNF-10 — Interoperabilidad

El sistema deberá permitir integrarse con servicios institucionales externos mediante enlaces, APIs u otros mecanismos autorizados.

---

## 7. Reglas de Negocio

### RN-01 — Acceso público

Cualquier persona podrá utilizar la pantalla para consultar información clasificada como pública.

### RN-02 — Acceso restringido

La información académica individual y personal no podrá mostrarse a usuarios no autenticados.

### RN-03 — Propiedad de la información académica

Un estudiante autenticado solamente podrá consultar sus propios datos académicos y personales autorizados.

### RN-04 — Administración controlada

Solo los usuarios con permisos administrativos podrán crear, modificar o eliminar información del sistema.

### RN-05 — Contenido dinámico

La información publicada deberá provenir de la base de datos o de servicios externos autorizados; no deberá depender exclusivamente de contenido codificado directamente en el frontend.

### RN-06 — Servicios externos

Cuando una funcionalidad sea responsabilidad de un sistema oficial externo, CampusTouch deberá redirigir o integrarse con dicho servicio en lugar de reemplazarlo.

### RN-07 — Seguridad de sesión en pantalla pública

Una sesión iniciada desde la pantalla deberá cerrarse manualmente o invalidarse automáticamente después del período de inactividad establecido.

---

## 8. Matriz de Trazabilidad Requisito - Historia de Usuario

| Requisito | Historia relacionada | Prioridad |
| :--- | :--- | :---: |
| RF-01 — Información pública y navegación | HU-01 (#1) | Must Have |
| RF-02 — Noticias e imágenes | HU-01 (#1), HU-03 (#3) | Must Have |
| RF-03 — Horarios académicos | HU-01 (#1), HU-04 (#4) | Must Have |
| RF-04 — Acceso del estudiante | HU-02 (#2) | Must Have |
| RF-05 — Protección de información privada | HU-02 (#2) | Must Have |
| RF-06 — Gestión de noticias e imágenes | HU-03 (#3) | Must Have |
| RF-07 — Gestión académica | HU-04 (#4) | Must Have |
| RF-08 — Gestión de enlaces | HU-05 (#5) | Must Have |
| RF-09 — Usuarios y roles | HU-06 (#6) | Must Have |
| RF-10 — Panel administrativo | HU-07 (#7) | Must Have |
| RF-11 — Integraciones externas | HU-08 (#8) | Must Have |

---

## 9. Alcance de la Primera Versión

La primera versión de CampusTouch estará compuesta por las ocho historias de usuario aprobadas:

- **HU-01 (#1):** Consulta de información pública.
- **HU-02 (#2):** Acceso del estudiante a información privada.
- **HU-03 (#3):** Gestión de noticias e imágenes.
- **HU-04 (#4):** Gestión académica.
- **HU-05 (#5):** Gestión de enlaces institucionales.
- **HU-06 (#6):** Administración de usuarios y roles.
- **HU-07 (#7):** Acceso al panel administrativo.
- **HU-08 (#8):** Integración con servicios externos.

Estas historias representan el alcance funcional de la primera versión y están estimadas conjuntamente en **45 Story Points**, equivalentes a **360 horas** bajo el factor de conversión definido en el proyecto.

El sistema deberá mantener una arquitectura que permita incorporar nuevas carreras y funcionalidades mediante futuras iteraciones sin comprometer la información existente ni los controles de seguridad.

---

## 10. Fuera del Alcance

No forma parte de la primera versión:

- Sustituir el sistema académico oficial de la Universidad.
- Gestionar directamente solicitudes de permisos que correspondan a la plataforma institucional.
- Reimplementar el módulo de horarios de profesores desarrollado por otro grupo.
- Exponer información académica privada sin autenticación.
- Desarrollar una aplicación móvil independiente.

Cuando una funcionalidad dependa de un servicio institucional externo, la responsabilidad de CampusTouch será proporcionar la integración o redirección correspondiente de acuerdo con las interfaces autorizadas.

---

## 11. Consideraciones para Validación

Los requisitos deberán validarse durante el desarrollo mediante:

- Pruebas funcionales de cada historia de usuario.
- Verificación de los criterios de aceptación definidos en los Issues.
- Pruebas de autenticación y autorización.
- Pruebas de aislamiento de información entre estudiantes.
- Pruebas de interacción en la pantalla táctil física.
- Pruebas de integración con servicios externos.
- Validación de las operaciones administrativas.
- Revisión de consistencia de los datos almacenados.

Una funcionalidad se considerará aceptada cuando cumpla sus criterios de aceptación, respete las reglas de negocio aplicables y no presente defectos críticos que comprometan la seguridad, privacidad o funcionamiento del sistema.
