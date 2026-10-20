import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, GraduationCap, KeyRound, LogOut, Mail, Save, Settings, UserRound, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type AuthUser = { id: string; displayName: string; email: string; role: string; careerId: string | null; careerName: string | null };

export default function AdminSettingsPage({ user }: { user: AuthUser }) {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setNotice(''); setBusy(true);
    try {
      const response = await fetch('/api/auth/profile', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ displayName, email, currentPassword, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudieron guardar los cambios.');
      setDisplayName(data.user.displayName); setEmail(data.user.email); setCurrentPassword(''); setPassword('');
      setNotice('Los datos de la cuenta principal se actualizaron.');
      if (password) window.setTimeout(() => navigate('/admin', { replace: true }), 900);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setBusy(false); }
  }

  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); window.location.assign('/login'); }

  return <main className="admin-screen">
    <aside className="admin-sidebar"><div className="admin-brand"><span className="admin-brand-seal"><GraduationCap size={27} /></span><span><strong>CampusTouch</strong><small>Administración general</small></span></div>
      <nav className="admin-side-nav"><p className="admin-nav-section">PLATAFORMA</p><Link className="admin-nav-item" to="/admin"><ArrowLeft size={19} /><span>Panel general</span></Link><p className="admin-nav-section">CUENTA</p><div className="admin-nav-item active"><Settings size={19} /><span>Ajustes de cuenta</span></div></nav>
      <div className="admin-sidebar-campus"><div><strong>Facultad de Ingeniería</strong><span>Universidad Mariana</span></div></div>
    </aside>
    <section className="admin-workspace"><header className="admin-topbar"><Link className="admin-menu-button" to="/admin" aria-label="Volver al panel general"><ArrowLeft size={20} /></Link><div className="admin-topbar-brand"><strong>Facultad de Ingeniería</strong><span>Ajustes del Administrador Principal</span></div><span className="admin-settings-top-user"><span className="admin-current-avatar">{displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span><span><strong>{displayName}</strong><small>Administrador Principal</small></span></span><button className="admin-logout" onClick={logout}><LogOut size={16} /><span>Cerrar sesión</span></button></header>
      <div className="admin-scroll-area"><div className="admin-page-heading"><div><h1>Ajustes de cuenta</h1><p>Actualiza los datos de acceso de la cuenta principal antes de entregarla al profesor.</p></div><span className="admin-demo-pill admin-live-pill"><KeyRound size={15} /> Cuenta protegida</span></div>
        <div className="admin-settings-layout"><form className="admin-settings-form" onSubmit={save}><div className="admin-settings-form-heading"><span><UserRound size={20} /></span><div><h2>Información de la cuenta</h2><p>Los cambios se guardan directamente en CampusTouch.</p></div></div>
          <label>Nombre completo<input required minLength={2} maxLength={100} autoComplete="name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label>
          <label>Correo electrónico<span className="admin-settings-input"><Mail size={17} /><input required type="email" maxLength={254} autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></span></label>
          <div className="admin-settings-divider"><span>Cambiar contraseña</span><small>Deja estos campos vacíos si no deseas cambiarla.</small></div>
          <label>Contraseña actual<input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></label>
          <label>Nueva contraseña<input type="password" autoComplete="new-password" minLength={12} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 12 caracteres, con letras y números" /><small>Para cambiarla, ingresa también la contraseña actual.</small></label>
          {error && <p className="admin-settings-message error" role="alert"><X size={16} />{error}</p>}
          {notice && <p className="admin-settings-message success" role="status"><Check size={16} />{notice}</p>}
          <button className="admin-primary-button" type="submit" disabled={busy}><Save size={16} />{busy ? 'Guardando…' : 'Guardar cambios'}</button>
        </form>
        <aside className="admin-settings-note"><span><KeyRound size={20} /></span><h2>Entrega segura de la cuenta</h2><p>Cuando el profesor reciba esta cuenta, actualiza aquí el nombre, el correo y la contraseña para dejarla a su cargo.</p><p>Al cambiar la contraseña, se cerrarán las sesiones abiertas en otros dispositivos. Esta sesión conservará el acceso.</p><small>Correo actual: {email}</small><Link to="/admin"><ArrowLeft size={15} />Volver a administración general</Link></aside></div>
      </div></section>
  </main>;
}
