import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, GraduationCap, KeyRound, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type User = { id: string; displayName: string; email: string; role: string; careerId: string | null; careerName: string | null };

export default function LoginPage() {
  const navigate = useNavigate();
  const [setupRequired, setSetupRequired] = useState(false);
  const [bootstrapEnabled, setBootstrapEnabled] = useState(false);
  const [checking, setChecking] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/setup-status').then((response) => response.json()).then((data: { setupRequired?: boolean; bootstrapEnabled?: boolean }) => { setSetupRequired(Boolean(data.setupRequired)); setBootstrapEnabled(Boolean(data.bootstrapEnabled)); })
      .catch(() => setError('No fue posible conectar con el servicio de acceso. Intenta de nuevo.'))
      .finally(() => setChecking(false));
  }, []);

  function goToRole(user: User) {
    if (user.role === 'SUPER_ADMIN') navigate('/admin', { replace: true });
    else if (user.role === 'USER') navigate('/', { replace: true });
    else navigate('/admin/carrera', { replace: true });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch(setupRequired ? '/api/auth/bootstrap' : '/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(setupRequired ? { token, displayName, email, password } : { email, password, remember })
      });
      const responseText = await response.text();
      let data: { error?: string; user?: User };
      try {
        data = JSON.parse(responseText) as { error?: string; user?: User };
      } catch {
        throw new Error(`El servidor devolvió una respuesta inválida (HTTP ${response.status}). Revisa la conexión con Cloudflare e inténtalo de nuevo.`);
      }
      if (!response.ok) throw new Error(data.error || 'No se pudo iniciar sesión.');
      if (!data.user) throw new Error('El servidor no confirmó la creación de la cuenta. Actualiza la página antes de volver a intentarlo.');
      goToRole(data.user);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo conectar. Inténtalo nuevamente.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-story">
        <div className="login-photo" />
        <Link className="login-brand" to="/" aria-label="Volver a CampusTouch">
          <span><GraduationCap size={30} /></span>
          <span><small>Facultad de Ingeniería</small><strong>CampusTouch</strong></span>
        </Link>
        <div className="login-story-copy">
          <span className="login-eyebrow">CAMPUS · INNOVACIÓN · FUTURO</span>
          <h1>El conocimiento<br />conecta nuestro campus.</h1>
          <p>Ingresa para administrar la información y los servicios de la Facultad de Ingeniería.</p>
          <div className="login-trust"><ShieldCheck size={17} /><span>Acceso seguro para cuentas registradas en CampusTouch</span></div>
        </div>
        <span className="login-university">UNIVERSIDAD MARIANA <i /> FACULTAD DE INGENIERÍA</span>
      </section>

      <section className="login-panel-wrap">
        <div className="login-panel">
          <Link className="login-mobile-brand" to="/"><GraduationCap size={24} /> CampusTouch</Link>
          <span className="login-icon"><LockKeyhole size={23} /></span>
          <span className="login-form-eyebrow">{setupRequired ? 'CONFIGURACIÓN INICIAL' : 'PORTAL DE ADMINISTRACIÓN'}</span>
          <h2>{checking ? 'Verificando acceso' : setupRequired ? 'Crear administrador principal' : 'Iniciar sesión'}</h2>
          <p className="login-intro">{setupRequired ? 'Configura la cuenta que administrará toda la plataforma.' : 'Ingresa con tu cuenta registrada en CampusTouch.'}</p>

      {checking ? <div className="login-loading" role="status">Conectando con la base de datos…</div> : setupRequired && !bootstrapEnabled ? <div className="login-pending-setup"><LockKeyhole size={19} /><strong>Falta habilitar la configuración inicial.</strong><span>El Administrador del proyecto debe agregar el secreto BOOTSTRAP_TOKEN en Cloudflare y volver a publicar. Después podrás crear aquí la cuenta principal.</span></div> : <form className="login-form" onSubmit={submit}>
            {setupRequired && <>
              <label>Nombre completo<span className="login-input"><GraduationCap size={17} /><input autoComplete="name" required minLength={2} maxLength={100} value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Tu nombre" /></span></label>
              <label>Código de configuración<span className="login-input"><KeyRound size={17} /><input required autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Código configurado en Cloudflare" /></span></label>
            </>}
            <label>Correo electrónico<span className="login-input"><Mail size={17} /><input autoComplete="username" type="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.com" /></span></label>
            <label>Contraseña<span className="login-input"><LockKeyhole size={17} /><input autoComplete={setupRequired ? 'new-password' : 'current-password'} type={showPassword ? 'text' : 'password'} required minLength={setupRequired ? 12 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={setupRequired ? 'Mínimo 12 caracteres, letras y números' : 'Ingresa tu contraseña'} /><button type="button" className="login-eye" onClick={() => setShowPassword((show) => !show)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            {!setupRequired && <div className="login-options"><label className="login-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />Mantener sesión</label><span>¿Olvidaste tu contraseña? Contacta al Administrador Principal.</span></div>}
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="login-submit" disabled={busy} type="submit">{busy ? 'Procesando…' : setupRequired ? 'Crear cuenta principal' : 'Iniciar sesión'}<ArrowRight size={18} /></button>
            {setupRequired && <p className="login-setup-note">Esta configuración sólo estará disponible hasta que se cree la primera cuenta principal.</p>}
          </form>}
          {!setupRequired && !checking && <p className="login-account-note">Solo pueden ingresar cuentas creadas en la base de datos de CampusTouch.</p>}
          <Link className="login-back" to="/">Volver al inicio</Link>
        </div>
        <span className="login-panel-footer">© 2026 CampusTouch · Facultad de Ingeniería</span>
      </section>
    </main>
  );
}
