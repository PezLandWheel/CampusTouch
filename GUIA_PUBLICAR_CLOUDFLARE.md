# Guía detallada: publicar CampusTouch en Cloudflare Pages

Esta guía explica dos formas de publicar CampusTouch. Ambas publican el sitio en una dirección `*.pages.dev` y se configuran desde Cloudflare Pages:

- **Carga directa (Drag and drop):** compilas el sitio en tu computadora y subes la carpeta `dist`. Es la forma más rápida para publicar una versión manualmente.
- **Integración con GitHub o GitLab:** conectas un repositorio y Cloudflare compila y publica cada cambio automáticamente. Es la opción más cómoda para actualizar el sitio con frecuencia.

## Antes de comenzar

Necesitas una cuenta de Cloudflare. Para la integración automática, necesitas además una cuenta y un repositorio en GitHub o GitLab. La carga directa no necesita un repositorio.

CampusTouch ya está configurado para Pages:

| Configuración | Valor |
| --- | --- |
| Framework | React (Vite) |
| Comando de compilación | `npm run build` |
| Carpeta que se publica | `dist` |
| Versión de Node.js | 20, definida en `.nvmrc` |
| Rutas de la aplicación | Regla `public/_redirects`, incluida en `dist` durante la compilación |

Las rutas internas incluyen `/carreras/sistemas` y `/carreras/sistemas/inicio`. La regla de `_redirects` permite que Cloudflare sirva la aplicación también al entrar directamente a estas direcciones o al recargar la página.

## 1. Preparar una compilación

Abre PowerShell en la carpeta del proyecto. En este equipo, la ruta es `D:\Proyectos\CampusTouch`:

```powershell
cd D:\Proyectos\CampusTouch
npm install
npm run build
```

Si PowerShell bloquea `npm.ps1` por la política de ejecución, usa el ejecutable `.cmd`:

```powershell
npm.cmd install
npm.cmd run build
```

Cuando la compilación termine, debe existir la carpeta `dist` con `index.html`, `assets`, `images` y `_redirects`. No subas `src` ni `node_modules` como si fueran el sitio publicado: Pages necesita los archivos generados de `dist`.

Para comprobar la versión local antes de subirla:

```powershell
npm run preview
```

Abre en el navegador la dirección local que indique Vite. Comprueba la pantalla de bienvenida y la ruta `/carreras/sistemas/inicio`.

## 2. Opción A — Carga directa desde el panel de Cloudflare

Esta opción publica la compilación local. Cada actualización requiere repetir la compilación y cargar `dist` otra vez.

1. Entra al [panel de Cloudflare](https://dash.cloudflare.com/) y selecciona la cuenta donde quieres alojar el sitio.
2. Abre **Workers & Pages**.
3. Selecciona **Create application** y después **Get started** o **Pages** (el texto puede variar según la versión del panel).
4. Elige **Drag and drop your files**.
5. Escribe un nombre para el proyecto, por ejemplo `campus-touch`. Ese nombre forma parte de la dirección `campus-touch.pages.dev`; si ya está ocupado, Cloudflare pedirá otro.
6. Arrastra la carpeta `dist` completa al área de carga. También puedes comprimir el contenido de `dist` en un ZIP y cargarlo. No selecciones la carpeta raíz `CampusTouch`.
7. Selecciona **Deploy site**. Espera a que termine y abre la dirección `*.pages.dev` que muestra Cloudflare.

### Publicar actualizaciones con carga directa

1. Vuelve a compilar: `npm run build`.
2. En el proyecto Pages, elige **Create a new deployment**.
3. Selecciona el entorno de producción.
4. Sube la carpeta `dist` recién generada y selecciona **Save and Deploy**.

La carga directa tiene límites de archivos y tamaño por archivo. La documentación actual indica hasta 1.000 archivos por carga desde el panel y 25 MiB por archivo. CampusTouch genera una cantidad pequeña de archivos; si Cloudflare marca un archivo como demasiado grande, reduce o reemplaza ese recurso antes de volver a cargar el sitio.

> **Decisión importante:** Cloudflare no permite convertir después un proyecto creado con carga directa en uno conectado a Git. Si piensas querer despliegues automáticos pronto, considera la opción B antes de crear el proyecto.

## 3. Opción B — Publicación automática conectando GitHub o GitLab

Cloudflare Pages puede compilar automáticamente cada cambio que subas a la rama de producción y crear vistas previas para otras ramas o solicitudes de cambio.

### 3.1 Subir el proyecto a GitHub

Si el proyecto todavía no está en un repositorio, crea uno vacío en GitHub. No es necesario añadir un README o una licencia allí si ya existen archivos locales. Luego, desde PowerShell, ejecuta estos comandos en la carpeta del proyecto y cambia la URL por la URL HTTPS de tu repositorio:

```powershell
cd D:\Proyectos\CampusTouch
git init
git add .
git commit -m "Preparar CampusTouch para publicación"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Si Git indica que el repositorio ya está inicializado, no repitas `git init`; continúa desde `git add .`. Si ya existe un remoto llamado `origin`, revisa con `git remote -v` antes de agregar otro. El `.gitignore` del proyecto excluye `node_modules`, `dist`, archivos `.env` y configuraciones locales del IDE.

### 3.2 Conectar el repositorio a Pages

1. Abre el [panel de Cloudflare](https://dash.cloudflare.com/) y selecciona **Workers & Pages**.
2. Selecciona **Create application** → **Pages** → **Connect to Git**.
3. Autoriza Cloudflare para conectarse a GitHub o GitLab si el panel lo solicita.
4. Elige el repositorio de CampusTouch y selecciona **Begin setup**.
5. Completa la configuración del build:

   | Campo | Valor |
   | --- | --- |
   | Project name | Por ejemplo, `campus-touch` |
   | Production branch | `main` |
   | Framework preset | `React (Vite)` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` o en blanco, si el proyecto está en la raíz del repositorio |

6. No hace falta añadir variables de entorno para la configuración actual de CampusTouch.
7. Selecciona **Save and Deploy** y espera a que Cloudflare instale dependencias, ejecute el build y publique el sitio.
8. Al terminar, abre la dirección `*.pages.dev` mostrada en el panel.

### Publicar cambios futuros con Git

Después de editar y revisar el proyecto, ejecuta:

```powershell
git add .
git commit -m "Describir el cambio"
git push
```

Cloudflare detectará el cambio en `main`, volverá a ejecutar `npm run build` y actualizará el sitio publicado. Los cambios enviados a otras ramas pueden generar enlaces de vista previa sin reemplazar la producción.

## 4. Comprobar la publicación

En la dirección pública de Cloudflare, revisa lo siguiente:

1. La página `/` carga con estilos, imágenes y fuentes correctos.
2. Puedes navegar desde la bienvenida hasta Ingeniería de Sistemas.
3. Abre directamente `https://NOMBRE.pages.dev/carreras/sistemas/inicio` en una pestaña nueva y recarga la página. Debe mostrarse la aplicación, no un error 404.
4. Abre al menos una opción del menú que todavía sea placeholder y confirma que la navegación funciona.
5. En el panel de Pages, comprueba que el último despliegue figure como **Success**.

Si aparece un 404 al recargar una ruta interna, comprueba que el despliegue incluya `dist/_redirects` con esta regla:

```text
/* /index.html 200
```

## 5. Añadir un dominio propio (opcional)

El dominio `*.pages.dev` funciona sin comprar ni configurar un dominio adicional. Si ya tienes uno y quieres usarlo:

1. Abre tu proyecto Pages en Cloudflare.
2. Ve a **Custom domains** y selecciona **Set up a custom domain**.
3. Escribe el dominio o subdominio que quieras utilizar y sigue las indicaciones de Cloudflare para validar y configurar DNS.
4. Espera a que el estado del dominio aparezca como activo y pruébalo en el navegador.

No cambies los registros DNS manualmente hasta que Pages muestre las instrucciones para el dominio elegido.

## Problemas frecuentes

| Problema | Qué revisar |
| --- | --- |
| El build falla | Abre el log del despliegue. Confirma `npm run build`, Node.js 20 o superior y que `package-lock.json` esté en el repositorio. |
| Se publicó una página vacía o no se encuentra `index.html` | En carga directa, sube el contenido de `dist`; con Git, configura `dist` como carpeta de salida. |
| Las rutas internas muestran 404 | Recompila y confirma que `dist/_redirects` exista y contenga `/* /index.html 200`. |
| Las imágenes no aparecen | Confirma que `public/images` esté en el proyecto y que las imágenes estén copiadas dentro de `dist/images`. |
| El cambio no aparece | Revisa el estado del último despliegue en Pages. Con Git, confirma que hiciste `git push` a la rama configurada como producción. |
| El nombre de `pages.dev` no está disponible | Elige otro nombre de proyecto; cada nombre de subdominio debe estar disponible. |

## Enlaces oficiales

- [Cloudflare Pages: React y Vite](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)
- [Cloudflare Pages: carga directa, Drag and drop y Wrangler](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Cloudflare Pages: conexión a GitHub o GitLab](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages: configuración de builds](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages: reglas de redirección](https://developers.cloudflare.com/pages/configuration/redirects/)
