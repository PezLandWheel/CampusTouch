# Login y cuentas de CampusTouch

## Qué quedó publicado

- Sitio: <https://campus-touch.pages.dev>
- Inicio de sesión: <https://campus-touch.pages.dev/login>
- Base D1: `campustouch-auth`
- Binding de Pages Functions: `DB`
- Migraciones: `migrations/0001_auth.sql` (cuentas) y `migrations/0002_systems_admin.sql` (contenido de Ingeniería de Sistemas)

La base guarda nombre, correo, rol, carrera asignada, estado, sal de contraseña y hash. No guarda contraseñas legibles. Las sesiones se guardan en D1 como hashes y el navegador recibe una cookie `HttpOnly`, `Secure` y `SameSite=Lax`.

## Crear la primera cuenta

La primera cuenta debe ser el **Administrador Principal**. No hay usuario ni contraseña predeterminados y no se usan credenciales institucionales.

1. Abre PowerShell en la carpeta del proyecto.
2. Ejecuta:

   ```powershell
   npx.cmd --yes wrangler pages secret put BOOTSTRAP_TOKEN --project-name=campus-touch
   ```

3. Wrangler solicitará el valor del secreto. Crea un valor aleatorio largo, guárdalo temporalmente en un gestor de contraseñas y no lo envíes por chat.
4. Vuelve a publicar para que el nuevo secreto quede disponible para Pages Functions:

   ```powershell
   npm.cmd run build
   npx.cmd --yes wrangler pages deploy dist --project-name=campus-touch --branch=main
   ```

5. Abre <https://campus-touch.pages.dev/login>. La pantalla indicará **Crear administrador principal** mientras no exista esa cuenta.
6. Escribe el mismo código secreto, el nombre, el correo y una contraseña de al menos 12 caracteres con letras y números. La contraseña y el código se envían directamente al endpoint HTTPS del sitio.
7. Al terminar, la cuenta recibirá el rol `SUPER_ADMIN` y se abrirá la administración general.
8. El endpoint de configuración no permite crear otro Administrador Principal después de que la primera cuenta exista. Después de configurar la cuenta, puedes eliminar `BOOTSTRAP_TOKEN` con `npx.cmd --yes wrangler pages secret delete BOOTSTRAP_TOKEN --project-name=campus-touch`. No publiques el valor del secreto en el repositorio.

## Crear cuentas adicionales

Desde **Administración general → Crear cuenta**, el Administrador Principal puede crear cuentas para usuarios y administradores, asignarles una carrera y activar o desactivar su acceso. Las contraseñas iniciales deben tener 12 caracteres como mínimo, con letras y números. Compártelas por un canal privado.

Los roles `CAREER_ADMIN`, `CONTENT_EDITOR`, `SCHEDULE_MANAGER`, `TEACHER_MANAGER` y `CONSULTANT` ingresan al espacio de administración de su carrera. Por ahora, Ingeniería de Sistemas tiene el panel activo en `/admin/carrera`; allí se gestionan noticias, galería, datos de la carrera, semestres, horarios, profesores, enlaces y cuentas asociadas a Sistemas. Las cuentas de otras carreras aterrizan en su espacio identificado y quedarán habilitadas cuando se implemente su panel. El rol `USER` vuelve al portal público.

Las imágenes de noticias, galería, profesores y portada se configuran mediante una URL HTTPS o una ruta `/images/` incluida en el sitio. La carga de archivos a un almacenamiento de imágenes todavía no está configurada.

## Actualizar el sitio

Desde la carpeta del proyecto:

```powershell
npm.cmd run build
npx.cmd --yes wrangler pages deploy dist --project-name=campus-touch --branch=main
```

La configuración D1 del binding se encuentra en `wrangler.jsonc`. Las migraciones se aplican con:

```powershell
npx.cmd --yes wrangler d1 migrations apply campustouch-auth --remote
```

No compartas la contraseña de una cuenta, `BOOTSTRAP_TOKEN`, tokens de Cloudflare ni el archivo de secretos en un chat o repositorio.
