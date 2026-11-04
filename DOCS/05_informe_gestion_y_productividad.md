# Informe de Gestión y Productividad - Sprint 1

**Fecha de corte:** 4 de noviembre de 2026
**Fuente de seguimiento:** proyecto GitHub `PezLandWheel/CampusTouch_Presupuesto`, vista Sprint 1, y export local de historias, tarjetas y campos.

## 1. Resumen de la Iteración

* **Sprint Activo:** Sprint 1 (4 al 17 de noviembre de 2026, duración configurada: 14 días).
* **Velocidad Planeada:** 15 SP (HU-01: 2 SP, HU-02: 8 SP, HU-03: 5 SP).
* **Velocidad Lograda (Real):** 0 SP en la columna **Done** al corte.
* **Porcentaje de Cumplimiento:** 0% según el estado del proyecto (`0 / 15 SP`).

> **Discrepancia de estado:** el issue #1 (HU-01) figura cerrado en GitHub Issues, pero su tarjeta todavía tiene `Status: Backlog` en el Project. Por eso no se cuenta como Done en las métricas de esta vista. Debe reconciliarse el campo Status con la evidencia de aceptación antes del cierre del informe.

El ejemplo de la guía menciona 12 SP planeados, 2 SP logrados y una HU-03 de 2 SP. Esos valores e historias no coinciden con el tablero de CampusTouch; este informe usa los datos reales del proyecto, donde HU-03 tiene 5 SP.

## 2. Métricas y Seguimiento del Avance

* **Gráfico Burn-up:** pendiente de insertar la captura de GitHub Insights. El repositorio no contiene una captura ni una serie histórica diaria; con el corte disponible solo se puede documentar el alcance actual de 15 SP y 0 SP en Done, no reconstruir la curva histórica.
* **Alcance al corte:** 3 historias, 15 SP comprometidos; 3 tarjetas en Backlog, 0 en Done.
* **Análisis de Desviaciones:** el principal bloqueo de seguimiento es la diferencia entre el estado del issue #1 y el campo Status de su tarjeta. Además, HU-02 (8 SP) requiere autenticación estudiantil y consulta privada de registros, mientras que el proyecto actual implementa autenticación para administración y no el flujo de estudiantes. HU-03 (5 SP) dispone de gestión de noticias e imágenes para Ingeniería de Sistemas, pero su criterio de separar noticias de Facultad y de carrera aún no está cubierto. No hay PR o commit de cierre asociado a las tarjetas en el export del proyecto, por lo que no se puede atribuir evidencia de cierre a una entrega concreta.

## 3. Incremento Entregado (Definition of Done)

| Issue ID | Historia de Usuario | Story Points | Estado Final al corte | Commit / PR de Cierre |
| :--- | :--- | :---: | :--- | :--- |
| #1 | HU-01 — Consulta de información pública | 2 SP | Issue cerrado; tarjeta en Backlog (pendiente reconciliar) | Sin PR/commit de cierre vinculado en el tablero |
| #2 | HU-02 — Acceso del estudiante a información privada | 8 SP | Backlog / Issue abierto | Sin PR/commit de cierre vinculado en el tablero |
| #3 | HU-03 — Gestión de noticias e imágenes | 5 SP | Backlog / Issue abierto | Sin PR/commit de cierre vinculado en el tablero |

Para declarar una historia Done, mover la tarjeta a esa columna después de comprobar sus criterios de aceptación y enlazar el PR o commit correspondiente. El cierre del issue #1 por sí solo no actualizó el campo Status del Project.

## 4. Mantenibilidad del Código Fuente

* **Arquitectura:** aplicación de página única en React y TypeScript, compilada con Vite y publicada en Cloudflare Pages. Las funciones de servidor se encuentran en `functions/api`; los datos persistentes usan Cloudflare D1 y las imágenes de noticias usan R2.
* **Organización:** vistas de interfaz en `src/pages`, componentes compartidos en `src/components`, funciones HTTP por ruta en `functions/api` y utilidades compartidas de autenticación y manejo de imágenes en `functions/_shared`. Las migraciones de base de datos se guardan en `migrations`.
* **Patrones usados:** endpoints HTTP orientados a recursos; autorización por rol mediante utilidades compartidas; validación y limpieza de entradas en las funciones de servidor; consultas parametrizadas a D1; carga de imágenes con validación de tipo y tamaño.
* **Buenas prácticas observadas:** TypeScript en la interfaz, módulos JavaScript ES (`import`/`export`), protección de rutas API, contraseñas con hash y secretos de sesión, y separación de recursos persistentes entre D1 y R2.
* **Diferencia con el ejemplo de la guía:** este proyecto no usa la estructura `/models`, `/dao`, `/controllers`, ni CommonJS. El informe describe la arquitectura implementada y no atribuye patrones o tecnologías ajenos al repositorio.

## 5. Reajustes para el Sprint 2

* Al iniciar Sprint 2, reconciliar HU-01: verificar los criterios de aceptación y cambiar el Status de su tarjeta a Done si la evidencia confirma el cierre; de lo contrario, reabrirla o registrar las tareas pendientes.
* Mantener HU-02 y HU-03 abiertas hasta cubrir los criterios restantes. Dividir HU-02 en autenticación, autorización de datos propios, cierre y expiración de sesión; separar HU-03 en CRUD, gestión de imágenes y diferenciación de noticias de Facultad/carrera.
* **Reajuste de velocidad estimada:** todavía no existe una velocidad real fiable porque Sprint 1 está en su fecha de inicio y el tablero registra 0 SP en Done. Como propuesta inicial, planear Sprint 2 con un máximo de **8 SP**, revisándolo en la retrospectiva de Sprint 1 con base en trabajo aceptado y evidencia enlazada. Este límite es una recomendación provisional, no una métrica observada.
* Reducir bloqueos de seguimiento enlazando PR/commits a cada historia y actualizando el campo Status como parte del cierre. Guardar la captura de Burn-up desde GitHub Insights junto con el informe cuando esté disponible.
