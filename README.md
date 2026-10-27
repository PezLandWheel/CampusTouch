# CampusTouch

CampusTouch es un portal web táctil para la Facultad de Ingeniería. Incluye una portada, selección de carrera, páginas informativas y un panel de administración. La interfaz está hecha con React y Vite; la autenticación y los datos administrables usan Cloudflare Pages Functions y una base de datos D1.

## Ejecutar en tu computadora

### Requisitos

- [Node.js 20 o superior](https://nodejs.org/) (incluye npm). La versión usada para compilar está indicada en `.nvmrc`.
- [Git](https://git-scm.com/) si vas a clonar el repositorio.

### Descargar el proyecto

Si tienes Git instalado, clona el repositorio y entra a la carpeta descargada. Reemplaza la dirección por la URL del repositorio:

```sh
git clone URL_DEL_REPOSITORIO
cd campus-touch
```

También puedes descargar el proyecto como ZIP desde el servicio donde esté alojado y extraerlo. Abre una terminal dentro de la carpeta que contiene `package.json`.

### Instalar y arrancar

```sh
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173/`. Ábrela en el navegador. Deja esa terminal abierta mientras usas la aplicación; para detener el servidor, pulsa `Ctrl+C`.

En Windows, si PowerShell no reconoce `npm`, prueba los mismos comandos con `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

### Qué funciona en el modo local

El servidor de Vite permite explorar la interfaz y sus rutas. La aplicación también tiene endpoints `/api` ejecutados por Cloudflare Pages Functions, conectados a D1. Esos endpoints no los sirve `npm run dev`; por eso el inicio de sesión, la administración y el contenido que viene de la base de datos requieren el entorno de Cloudflare configurado. La interfaz usa contenido de muestra o estados vacíos cuando esos datos no están disponibles.

Para compilar el sitio y revisar la versión estática:

```sh
npm run build
npm run preview
```

El build queda en `dist/`. `npm run preview` muestra esa compilación localmente, pero tampoco habilita por sí mismo las Functions ni D1.

## Publicar en Cloudflare Pages

La configuración del proyecto usa Vite: comando `npm run build` y carpeta de salida `dist`. Pages Functions están en `functions/`, las migraciones de D1 en `migrations/`, y los bindings `DB` (D1) y `NEWS_IMAGES` (R2) están declarados en `wrangler.jsonc`. Para configurar los recursos y publicar, sigue estas guías del repositorio:

- [Guía para publicar en Cloudflare Pages](GUIA_PUBLICAR_CLOUDFLARE.md)
- [Guía de autenticación y cuentas](GUIA_AUTENTICACION_CLOUDFLARE.md)

El bucket privado `campustouch-news-images` guarda las imágenes que se suben desde Administración → Noticias. Antes del primer despliegue que incluya el binding R2, créalo en la cuenta de Cloudflare con `npx wrangler r2 bucket create campustouch-news-images`. La aplicación sirve las imágenes públicas mediante Pages Functions, por lo que no se habilita el acceso público directo al bucket. Admite JPG, PNG y WebP de hasta 8 MB.

Al configurar un proyecto Pages conectado a Git, usa la raíz del repositorio como directorio raíz, `npm run build` como comando de build y `dist` como directorio de salida. Configura el binding D1 `DB` con la base correcta, crea el bucket R2 indicado y aplica las migraciones antes de usar autenticación o administración. La regla `public/_redirects` permite abrir o recargar directamente las rutas de React Router.

## Rutas principales

- `/` — bienvenida
- `/carreras/sistemas` — selección de Ingeniería de Sistemas
- `/carreras/sistemas/inicio` — inicio de la carrera
- `/carreras/sistemas/noticias`, `/horarios`, `/profesores`, `/permisos` y `/estudiantes` — secciones informativas
- `/login` — inicio de sesión cuando el backend de Cloudflare está configurado

Algunas secciones aún muestran contenido de ejemplo o están en desarrollo.
