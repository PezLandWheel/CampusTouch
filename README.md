# CampusTouch

Prototipo de kiosco táctil para la Facultad de Ingeniería. Incluye bienvenida, selección de Ingeniería de Sistemas y su pantalla inicial. El contenido es local y tipado; algunas opciones del menú todavía muestran páginas placeholder.

## Requisitos

- Node.js 20 o superior
- npm

La versión de Node.js para los builds está fijada en `.nvmrc`.

## Desarrollo local

```sh
npm install
npm run dev
```

## Build de producción

```sh
npm run build
npm run preview
```

Vite genera el sitio estático en `dist/`. La carpeta no se incluye en Git; Cloudflare Pages la crea al ejecutar el build.

## Desplegar en Cloudflare Pages

1. Sube este proyecto a un repositorio Git (GitHub o GitLab).
2. En Cloudflare, abre **Workers & Pages** y crea una aplicación Pages conectando ese repositorio.
3. Configura el proyecto con estos valores:

   - **Framework preset:** React (Vite)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (raíz del repositorio)
   - **Production branch:** `main` (o la rama de producción elegida)

4. Inicia el primer despliegue. Los despliegues posteriores se ejecutarán automáticamente al actualizar la rama conectada.

`public/_redirects` conserva las rutas de React Router, de modo que URLs como `/carreras/sistemas/inicio` también carguen al abrirse directamente o recargarse.

## Rutas actuales

- `/` — bienvenida
- `/carreras/sistemas` — selección de Ingeniería de Sistemas
- `/carreras/sistemas/inicio` — página principal de la carrera
- `/carreras/sistemas/noticias`, `/horarios`, `/profesores`, `/permisos` y `/estudiantes` — placeholders

Los datos mock pueden sustituirse por un cliente API en una siguiente etapa.
