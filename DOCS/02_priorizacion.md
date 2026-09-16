# Reporte de Priorización MoSCoW, Valor de Negocio y Estimación Empírica - Proyecto TicketPass

## 1. Matriz de Priorización y Análisis de Valor

| ID Issue | Historia de Usuario | Categoría MoSCoW | Criterio de Impacto (Valor de Negocio) | Justificación Estratégica | Estimación Empírica (Cualitativa) |
| :-: | :--- | :-: | :--- | :--- | :--- |
| **#1** | HU01 - Fila Virtual para Compra de Boletas | **Must Have** | Impacto Operativo | Garantiza la disponibilidad del servicio ante picos de tráfico extremo, evitando pérdidas financieras por caídas de servidor. | Complejidad Alta (Riesgo de infraestructura y concurrencia). |
| **#2** | HU02 - Generación de Código QR Dinámico para Entradas | **Must Have** | Impacto Financiero y Seguridad | Mitiga el fraude por falsificación o reventa no autorizada, protegiendo la autenticidad del boleto. | Complejidad Media (Cifrado dinámico y lógica de tiempo). |
| **#3** | HU03 - Parametrización de Zonas y Precios de Boletería | **Must Have** | Impacto Financiero | Permite la configuración comercial previa del evento. Sin esta función no existen productos a la venta. | Complejidad Baja (Gestión de formularios y tablas). |
| **#4** | HU04 - Selección de Boletas mediante Mapa Interactivo | **Should Have** | Impacto UX | Ofrece una mejor experiencia visual e intuitiva al usuario, pero no detiene la venta si se reemplaza por una lista simple. | Complejidad Media-Alta (Lógica gráfica interactiva y reserva de sillas). |
| **#5** | HU05 - Validación de Boletas en Punto de Acceso | **Must Have** | Impacto Operativo | Cierra el ciclo de la venta permitiendo el control de ingreso ágil en el recinto mediante dispositivos móviles. | Complejidad Baja-Media (Lectura QR y consumo de API). |

---

## 2. Alcance del Producto Mínimo Viable (MVP)

El **Producto Mínimo Viable (MVP)** para el lanzamiento de **TicketPass** se compondrá únicamente de las historias clasificadas como **Must Have** (`#1`, `#2`, `#3` y `#5`).

* **Justificación de Selección:** Se cubren las tres dimensiones críticas del negocio (estabilidad operativa, recaudo financiero y validación en puerta).
* **Funcionalidades Postergadas:** La historia `#4` (**Mapa Interactivo**) se pospone para el siguiente ciclo de desarrollo, sustituyéndola temporalmente por una selección de zona mediante menú desplegable.
