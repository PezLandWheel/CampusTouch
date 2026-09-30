# DOCS/03_estimacion_y_costos.md: Estimación Formal y Presupuesto

## 1. Integrantes y Asignación de Roles

* **Product Owner:** Jose Luis Alberto Chamorro
* **Líder Técnico:** David Sebastian Yepez
* **Desarrollador(a) 1:** Brayan Andres Solarte
* **Desarrollador(a) 2:** Johan Stiven Carvajal

## 2. Parámetros Base de Estimación

* **Historia Pivote Seleccionada:** HU01 — Consultar carreras e información académica (#1)
* **Puntaje Pivote Asignado:** 2 SP
* **Factor de Conversión ($F_c$):** 1 SP = 8 Horas
* **Tarifa Hora ($T_h$):** $45.000 COP/Hora

La historia HU01 se selecciona como historia pivote debido a que representa una funcionalidad base de consulta para los usuarios del sistema. Su alcance comprende la visualización del listado de carreras, la consulta de información específica de una carrera y la presentación de información registrada y actualizada en el sistema.

A partir de esta historia se realiza la estimación relativa del resto de historias mediante juicio de expertos, considerando principalmente el alcance funcional, número de operaciones, dependencias, validaciones y riesgos técnicos.

## 3. Matriz Detallada de Estimación Formal y Presupuesto

| ID Issue | Historia de Usuario | Story Points ($SP$) | Factor ($F_c$) | Esfuerzo ($E_i = SP \times F_c$) | Tarifa ($T_h$) | Costo Total ($C_i = E_i \times T_h$) | Justificación Técnica Juicio de Expertos |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :--- |
| **#1** | **HU01 — Consultar carreras e información académica** | **2 SP** | 8 hrs/SP | **16 hrs** | $45.000 | **$720.000 COP** | Se toma como historia pivote. Es una funcionalidad principalmente de consulta: listado de carreras, selección y visualización de información registrada. Presenta complejidad baja y pocas operaciones sobre los datos. |
| **#2** | **HU02 — Consultar horarios académicos** | **2 SP** | 8 hrs/SP | **16 hrs** | $45.000 | **$720.000 COP** | Tiene una complejidad similar a HU01. Requiere consultar horarios de cursos y profesores y presentarlos de forma organizada, pero no contempla operaciones administrativas de modificación de datos. |
| **#5** | **HU05 — Iniciar sesión como administrador** | **3 SP** | 8 hrs/SP | **24 hrs** | $45.000 | **$1.080.000 COP** | Requiere autenticación mediante usuario y contraseña, validación de credenciales y control de acceso a funciones administrativas. La seguridad y gestión de sesiones incrementan la complejidad respecto a las historias de consulta. |
| **#6** | **HU06 — Gestionar información del sistema** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye operaciones CRUD: consultar, agregar, modificar y eliminar información. Además, los cambios deben reflejarse correctamente en la información publicada, generando mayor complejidad de persistencia, validación y consistencia de datos. |
| **#9** | **HU09 — Gestionar horarios académicos** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Requiere registrar, modificar y eliminar horarios tanto de cursos como de profesores. Existe una mayor cantidad de reglas y relaciones de datos que en una consulta simple, además de garantizar que los horarios actualizados estén disponibles para los usuarios. |
| **#10** | **HU10 — Gestionar carreras** | **5 SP** | 8 hrs/SP | **40 hrs** | $45.000 | **$1.800.000 COP** | Incluye registro, modificación, eliminación/desactivación y actualización de información académica asociada a las carreras. También requiere que los cambios administrativos se reflejen correctamente en la información visible para los usuarios. |

## 4. Consolidado Total del Proyecto

* **Total Story Points ($SP_{\text{total}}$):** **22 SP**
* **Esfuerzo Total ($E_{\text{total}}$):** **176 Horas**
* **Presupuesto Comercial Total ($C_{\text{total}}$):** **$7.920.000 COP**

### Cálculo del presupuesto

$$
SP_{\text{total}} = 2 + 2 + 3 + 5 + 5 + 5 = 22\ SP
$$

$$
E_{\text{total}} = 22\ SP \times 8\ \frac{horas}{SP} = 176\ horas
$$

$$
C_{\text{total}} = 176\ horas \times \$45.000 = \$7.920.000\ COP
$$

### Consideración de alcance

La presente estimación contempla únicamente las historias clasificadas como **Must-Have** en el backlog actual de CampusTouch: **HU01 (#1), HU02 (#2), HU05 (#5), HU06 (#6), HU09 (#9) y HU10 (#10)**. Las historias clasificadas como **Should-Have** y **Could-Have** no se incluyen en el presupuesto del alcance base.

La estimación se considera una aproximación inicial basada en Story Points y juicio de expertos. El esfuerzo real podrá ajustarse durante las iteraciones de desarrollo a medida que se obtenga mayor información técnica y se reduzca la incertidumbre del proyecto.
