# 🖥️ Sistema Interactivo — Facultad de Ingeniería en Sistemas

Sistema interactivo de consulta de información académica y administrativa mediante una **pantalla táctil de acceso público**, acompañado de una **plataforma administrativa para docentes autorizados**.

El proyecto busca centralizar y facilitar el acceso a información relevante de la carrera de **Ingeniería de Sistemas**, permitiendo a los estudiantes realizar consultas de manera intuitiva y proporcionando a los docentes una herramienta sencilla para mantener actualizados los contenidos publicados.

---

## 📌 Problemática

La información académica y administrativa que requieren los estudiantes puede encontrarse distribuida en diferentes medios, dificultando su consulta rápida y centralizada.

Entre la información que se requiere consultar se encuentran:

*  Eventos académicos y sociales.
*  Horarios de atención de docentes.
*  Horarios de cursos vigentes.
*  Información relacionada con el sistema de permisos institucional.

Además, mantener esta información actualizada puede resultar poco práctico si se requiere intervención técnica para modificar los contenidos.

Por esta razón, se plantea el desarrollo de un sistema que permita **centralizar la consulta de información mediante una interfaz táctil** y facilitar su administración mediante una plataforma independiente para docentes autorizados.

---

##  Objetivo

Desarrollar un sistema interactivo que facilite el acceso público a información académica y administrativa de la carrera de Ingeniería de Sistemas, incorporando una interfaz táctil para los estudiantes y una plataforma administrativa que permita a los docentes autorizados gestionar y actualizar los contenidos.

---

##  Funcionalidades

### 👨‍🎓 Perfil Usuario

Los estudiantes podrán acceder desde la pantalla táctil a:

*  Selección de carrera.
*  Consulta de eventos.
*  Consulta de horarios de profesores.
*  Consulta de horarios de cursos.
*  Acceso mediante código QR al sistema institucional de permisos.

Los módulos de eventos, horarios de profesores y horarios de cursos son de carácter **informativo y de consulta pública**.

---

### 👨‍🏫 Perfil Administrador

Los docentes autorizados dispondrán de una plataforma administrativa independiente que permitirá:

*  Iniciar sesión.
*  Crear información.
*  Modificar información.
*  Eliminar información.
*  Administrar imágenes.
*  Gestionar eventos.
*  Gestionar horarios de profesores.
*  Gestionar horarios de cursos.
*  Administrar la información relacionada con permisos.
*  Administrar el código QR o recurso correspondiente.
*  Reflejar las modificaciones realizadas en la pantalla táctil.

---

## Estructura general

El sistema está compuesto por dos interfaces principales:

```text
                    ┌─────────────────────────┐
                    │        SISTEMA          │
                    │       INTERACTIVO       │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
                ▼                                 ▼
     ┌─────────────────────┐          ┌─────────────────────┐
     │  INTERFAZ PÚBLICA   │          │ INTERFAZ ADMINISTR. │
     │   PANTALLA TÁCTIL   │          │      DOCENTES       │
     └──────────┬──────────┘          └──────────┬──────────┘
                │                                │
                ▼                                ▼
     ┌─────────────────────┐          ┌─────────────────────┐
     │ • Eventos           │          │ • Autenticación     │
     │ • Profesores        │          │ • Eventos           │
     │ • Cursos            │          │ • Profesores        │
     │ • Permisos          │          │ • Cursos            │
     └─────────────────────┘          │ • Imágenes          │
                                      │ • Contenido         │
                                      └──────────┬──────────┘
                                                 │
                                                 ▼
                                      Información actualizada
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │    PANTALLA TÁCTIL  │
                                      └─────────────────────┘
```

---

## 📋 Requerimientos principales

### Requerimientos funcionales

El sistema contempla, entre otros:

| ID    | Descripción                                                      |
| ----- | ---------------------------------------------------------------- |
| RF-01 | Mostrar el menú principal con las carreras disponibles.          |
| RF-02 | Permitir seleccionar Ingeniería de Sistemas.                     |
| RF-03 | Mostrar el menú de información de la carrera.                    |
| RF-04 | Consultar eventos.                                               |
| RF-05 | Mostrar información detallada de los eventos.                    |
| RF-06 | Consultar horarios de profesores.                                |
| RF-07 | Consultar horarios de cursos.                                    |
| RF-08 | Mostrar información sobre permisos.                              |
| RF-09 | Mostrar código QR para acceder al sistema de permisos existente. |
| RF-10 | Contar con una interfaz administrativa independiente.            |
| RF-11 | Autenticar profesores autorizados.                               |
| RF-12 | Crear, modificar y eliminar información.                         |
| RF-13 | Administrar imágenes.                                            |
| RF-14 | Administrar eventos.                                             |
| RF-15 | Administrar horarios de profesores.                              |
| RF-16 | Administrar horarios de cursos.                                  |
| RF-17 | Administrar información de permisos.                             |
| RF-18 | Reflejar los cambios en la pantalla táctil.                      |
| RF-19 | Permitir incorporar nuevas carreras posteriormente.              |

---

## ⚙️ Requerimientos no funcionales

El sistema deberá considerar:

* Interfaz intuitiva y fácil de utilizar.
* Diseño optimizado para interacción táctil.
* Información clara, organizada y legible.
* Tiempos de respuesta adecuados.
* Autenticación para el área administrativa.
* Protección de credenciales.
* Control de permisos para modificar información.
* Integridad de los contenidos.
* Administración sencilla para los docentes.
* Posibilidad de incorporar nuevas carreras.
* Compatibilidad con el hardware destinado a la pantalla táctil.
* Actualización de textos e imágenes sin modificar el código fuente.
* Presentación visual consistente.
* Arquitectura mantenible.
* Preparación para futuras funcionalidades.
* Actualización de la información mostrada en la interfaz pública.

---

## Seguridad

El sistema contempla diferentes niveles de acceso:

### Usuario

Acceso público a la información disponible en la pantalla táctil.

### Administrador

Acceso restringido a docentes autorizados mediante autenticación.

Los usuarios administradores serán los únicos autorizados para modificar la información publicada.

---

## 📱 Sistema de permisos

El sistema **no desarrolla ni modifica la plataforma institucional de permisos**.

Su función consiste únicamente en proporcionar información y facilitar el acceso al sistema existente mediante un **código QR o mecanismo de integración definido para el proyecto**.

---

## 🎓 Alcance del proyecto

### Incluido

* Interfaz táctil de consulta.
* Menú de carreras.
* Información de eventos.
* Horarios de profesores.
* Horarios de cursos.
* Información sobre permisos.
* Código QR o mecanismo de acceso al sistema existente.
* Interfaz administrativa.
* Autenticación de profesores.
* Administración de textos e imágenes.
* Gestión de la información publicada.

### Fuera del alcance

* Desarrollo del sistema de permisos institucional.
* Modificación del sistema de permisos existente.
* Desarrollo de las demás carreras en la primera versión.
* Definición de tecnologías hasta que sean determinadas por el equipo.

---

## 🛠️ Tecnologías

> **Nota:** Las tecnologías y lenguaje de programación serán definidos por el equipo de desarrollo. Esta sección deberá actualizarse una vez se establezca el stack tecnológico definitivo.

```text
Frontend:
Pendiente de definición

Backend:
Pendiente de definición

Base de datos:
Pendiente de definición

Herramientas:
Pendiente de definición
```

---

## 📂 Estructura del proyecto

La estructura definitiva dependerá del stack tecnológico seleccionado. Se recomienda organizar el proyecto separando la interfaz pública, administración y componentes relacionados con la gestión de información.

```text
/
├── frontend/
│   └── ...
│
├── backend/
│   └── ...
│
├── database/
│   └── ...
│
├── documentation/
│   └── ...
│
└── README.md
```

---

## ▶️ Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Acceder al proyecto

```bash
cd NOMBRE_DEL_PROYECTO
```

### 3. Instalar dependencias

> Este procedimiento se actualizará una vez definido el lenguaje y las tecnologías utilizadas.

### 4. Configurar la aplicación

Configurar las variables y parámetros necesarios para la conexión con los servicios requeridos por el sistema.

### 5. Ejecutar

Iniciar el proyecto utilizando el procedimiento correspondiente al stack tecnológico seleccionado.

---

## 👥 Equipo de desarrollo

**Facultad de Ingeniería en Sistemas**

| Integrante                        |
| --------------------------------- |
| Jose Luis Alberto Chamorro Ruales |
| Brayan Andrés Solarte Solarte     |
| David Sebastián Yépez Guerrero    |
| Johan Stiven Carvajal Chicaiza    |

---

## 📚 Documentación

La documentación del proyecto incluye:

* Formulación del problema.
* Alcance del sistema.
* Requerimientos funcionales.
* Requerimientos no funcionales.
* Diseño del sistema.
* Desarrollo de la solución.
* Validación del sistema.
* Documentación técnica.

---

## 🔄 Estado del proyecto

**Estado:** 🚧 En desarrollo

### Próximas etapas

* [ ] Definición del stack tecnológico.
* [ ] Diseño de prototipo.
* [ ] Desarrollo de interfaz táctil.
* [ ] Desarrollo del panel administrativo.
* [ ] Implementación de autenticación.
* [ ] Implementación de gestión de contenidos.
* [ ] Integración del acceso al sistema de permisos.
* [ ] Pruebas funcionales.
* [ ] Pruebas de usabilidad.
* [ ] Implementación en el hardware destinado.

---

## 📄 Licencia

Este proyecto ha sido desarrollado con fines académicos para la **Facultad de Ingeniería en Sistemas**.

---

## 💡 Descripción corta

> **Sistema interactivo de consulta académica y administrativa para la Facultad de Ingeniería en Sistemas, compuesto por una pantalla táctil de acceso público y una plataforma administrativa para docentes autorizados.**
