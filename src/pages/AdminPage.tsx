import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Activity, ArrowLeft, Check, GraduationCap, Image, LockKeyhole, LogOut, Pencil, Plus, Save, Search, Settings, Shield, Trash2, Users, UserRound, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type AuthUser = { id: string; displayName: string; email: string; role: string; careerId: string | null; careerName: string | null };
type ManagedUser = AuthUser & { roleName: string; active: boolean; createdAt: string; photoUrl: string };
type Career = { id: string; name: string };
type Role = 'CAREER_ADMIN' | 'CONTENT_EDITOR' | 'SCHEDULE_MANAGER' | 'TEACHER_MANAGER' | 'CONSULTANT' | 'USER';
const roleOptions: { value: Role; label: string }[] = [
  { value: 'CAREER_ADMIN', label: 'Administrador de Carrera' }, { value: 'CONTENT_EDITOR', label: 'Editor de Contenido' },
  { value: 'SCHEDULE_MANAGER', label: 'Gestor de Horarios' }, { value: 'TEACHER_MANAGER', label: 'Gestor de Profesores' },
  { value: 'CONSULTANT', label: 'Consultor' }, { value: 'USER', label: 'Usuario general' },
];

export default function AdminPage({ user }: { user: AuthUser }) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [search, setSearch] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('CAREER_ADMIN');
  const [careerId, setCareerId] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editTarget, setEditTarget] = useState<ManagedUser | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editBusy, setEditBusy] = useState(false);
  const [editError, setEditError] = useState('');
  const [section, setSection] = useState<'overview' | 'accounts' | 'roles'>('overview');
  const [roleBusyId, setRoleBusyId] = useState('');

  async function loadData() {
    const [usersResponse, careersResponse] = await Promise.all([fetch('/api/admin/users'), fetch('/api/admin/careers')]);
    if (!usersResponse.ok || !careersResponse.ok) throw new Error('No se pudieron cargar las cuentas de la base de datos.');
    const userData = await usersResponse.json(); const careerData = await careersResponse.json();
    setUsers(userData.users); setCareers(careerData.careers); setCareerId((current) => current || careerData.careers[0]?.id || '');
  }

  useEffect(() => { loadData().catch((cause) => setError(cause instanceof Error ? cause.message : 'Error de conexión.')).finally(() => setLoading(false)); }, []);
  const visibleUsers = useMemo(() => users.filter((item) => `${item.displayName} ${item.email} ${item.roleName} ${item.careerName || ''}`.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es'))), [users, search]);
  const activeUsers = users.filter((item) => item.active).length;
  const activeAdmins = users.filter((item) => item.active && item.role !== 'USER').length;
  const inactiveUsers = users.length - activeUsers;
  const generalUsers = users.filter((item) => item.role === 'USER').length;

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setNotice(''); setBusy(true);
    try {
      const response = await fetch('/api/admin/users', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ displayName, email, password, role, careerId: role === 'USER' ? null : careerId }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo crear la cuenta.');
      setUsers((current) => [data.user, ...current]); setDisplayName(''); setEmail(''); setPassword(''); setNotice('La cuenta quedó creada en la base de datos.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); } finally { setBusy(false); }
  }

  async function toggleAccount(account: ManagedUser) {
    setError(''); setNotice('');
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(account.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: !account.active }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo cambiar el estado.');
      setUsers((current) => current.map((item) => item.id === account.id ? { ...item, active: !account.active } : item));
      setNotice(account.active ? 'La cuenta se desactivó y sus sesiones fueron cerradas.' : 'La cuenta quedó activa.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
  }

  async function assignAccess(account: ManagedUser, nextRole: Role, nextCareerId: string | null) {
    if (account.role === nextRole && account.careerId === nextCareerId) return;
    setRoleBusyId(account.id); setError(''); setNotice('');
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(account.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ role: nextRole, careerId: nextCareerId }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudieron actualizar los permisos.');
      setUsers((current) => current.map((item) => item.id === account.id ? { ...item, role: data.role, roleName: data.roleName, careerId: data.careerId, careerName: data.careerName } : item));
      setNotice(`Permisos actualizados para ${account.displayName}. Se cerraron sus sesiones activas.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
    finally { setRoleBusyId(''); }
  }

  async function deleteAccount(account: ManagedUser) {
    if (!window.confirm(`¿Eliminar definitivamente la cuenta de ${account.displayName} (${account.email})?`)) return;
    setError(''); setNotice('');
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(account.id)}`, { method: 'DELETE' });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo eliminar la cuenta.');
      setUsers((current) => current.filter((item) => item.id !== account.id));
      setNotice('La cuenta fue eliminada.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); }
  }

  function openEdit(account: ManagedUser) {
    setError(''); setNotice(''); setEditError(''); setEditTarget(account); setEditName(account.displayName); setEditEmail(account.email); setEditPhotoUrl(account.photoUrl || ''); setEditPassword('');
  }

  async function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editTarget) return;
    setEditError(''); setNotice(''); setEditBusy(true);
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(editTarget.id)}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ displayName: editName, email: editEmail, photoUrl: editPhotoUrl, password: editPassword }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo actualizar la cuenta.');
      setUsers((current) => current.map((account) => account.id === editTarget.id ? { ...account, ...data.user } : account));
      const changingOwnAccount = editTarget.id === user.id;
      setEditTarget(null); setNotice(editPassword ? 'Contraseña actualizada; las demás sesiones de esta cuenta se cerraron.' : 'Cuenta actualizada correctamente.'); setEditPassword('');
      if (changingOwnAccount) window.setTimeout(() => window.location.reload(), 700);
    } catch (cause) { setEditError(cause instanceof Error ? cause.message : 'No se pudo conectar.'); } finally { setEditBusy(false); }
  }

  async function logout() { await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' }).catch(() => undefined); window.location.replace('/login'); }

  return <main className="admin-screen">
    <aside className="admin-sidebar"><div className="admin-brand"><span className="admin-brand-seal"><GraduationCap size={27} /></span><span><strong>CampusTouch</strong><small>Administración general</small></span></div>
      <nav className="admin-side-nav"><p className="admin-nav-section">PLATAFORMA</p><button type="button" className={`admin-nav-item ${section === 'overview' ? 'active' : ''}`} onClick={() => setSection('overview')}><Activity size={19} /><span>Resumen general</span></button><p className="admin-nav-section">USUARIOS Y PERMISOS</p><button type="button" className={`admin-nav-item ${section === 'accounts' ? 'active' : ''}`} onClick={() => setSection('accounts')}><Users size={19} /><span>Cuentas y administradores</span></button><button type="button" className={`admin-nav-item ${section === 'roles' ? 'active' : ''}`} onClick={() => setSection('roles')}><Shield size={19} /><span>Roles de acceso</span></button><p className="admin-nav-section">CUENTA</p><Link className="admin-nav-item" to="/admin/ajustes"><Settings size={19} /><span>Ajustes de cuenta</span></Link></nav>
      <div className="admin-sidebar-campus"><div><strong>Facultad de Ingeniería</strong><span>Universidad Mariana</span></div></div>
    </aside>
    <section className="admin-workspace"><header className="admin-topbar"><Link className="admin-menu-button" to="/" aria-label="Volver al inicio"><ArrowLeft size={20} /></Link><div className="admin-topbar-brand"><strong>Facultad de Ingeniería</strong><span>Universidad Mariana</span></div><label className="admin-global-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cuentas..." /></label><button className="admin-logout" onClick={logout}><LogOut size={16} /><span>Cerrar sesión</span></button><div className="admin-current-user"><span className="admin-current-avatar">{user.displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span><span><strong>{user.displayName}</strong><small>Administrador Principal</small></span></div></header>
      <div className="admin-scroll-area"><div className="admin-page-heading"><div><h1>Administración general</h1><p>Gestiona las cuentas, las carreras asignadas y el acceso a CampusTouch.</p></div><span className="admin-demo-pill admin-live-pill"><LockKeyhole size={15} /> Acceso protegido</span></div>
        <div className={`admin-dashboard-grid ${section === 'accounts' ? '' : 'admin-main-view'}`}><div className="admin-main-column">
          {section === 'overview' && <div className="admin-stats"><article className="admin-stat-card"><span className="stat-icon stat-blue"><GraduationCap /></span><span><strong>{careers.length}</strong><b>Carreras</b><small>Disponibles para asignación</small></span></article><article className="admin-stat-card"><span className="stat-icon stat-green"><Users /></span><span><strong>{users.length}</strong><b>Cuentas totales</b><small>{activeUsers} con acceso activo</small></span></article><article className="admin-stat-card"><span className="stat-icon stat-purple"><Shield /></span><span><strong>{activeAdmins}</strong><b>Administradores activos</b><small>Con permisos administrativos</small></span></article><article className="admin-stat-card"><span className="stat-icon stat-green"><Check /></span><span><strong>{activeUsers}</strong><b>Cuentas activas</b><small>Acceso habilitado</small></span></article><article className="admin-stat-card"><span className="stat-icon stat-purple"><X /></span><span><strong>{inactiveUsers}</strong><b>Cuentas inactivas</b><small>Acceso deshabilitado</small></span></article><article className="admin-stat-card"><span className="stat-icon stat-blue"><UserRound /></span><span><strong>{generalUsers}</strong><b>Usuarios generales</b><small>Sin rol administrativo</small></span></article></div>}
          <section className="admin-list-panel"><div className="admin-list-heading"><strong>{section === 'roles' ? 'Roles y permisos por cuenta' : section === 'accounts' ? 'Cuentas y administradores' : 'Cuentas registradas'}</strong><span>{visibleUsers.length} en la base de datos</span></div>{section === 'roles' && <p className="admin-role-help">Asigna a cada cuenta un rol de acceso y una carrera. Los cambios se guardan en D1 y cierran las sesiones activas de esa cuenta.</p>}<div className="admin-table-scroll"><table className="admin-users-table"><thead><tr><th>Cuenta</th><th>Rol</th><th>Carrera</th><th>Estado</th>{section === 'accounts' && <th>Editar</th>}{section !== 'roles' && <th>Acceso</th>}{section === 'accounts' && <th>Eliminar</th>}</tr></thead><tbody>{loading ? <tr><td className="admin-empty-row" colSpan={section === 'overview' ? 5 : section === 'roles' ? 4 : 7}>Cargando cuentas…</td></tr> : visibleUsers.length === 0 ? <tr><td className="admin-empty-row" colSpan={section === 'overview' ? 5 : section === 'roles' ? 4 : 7}>Aún no hay cuentas o no hay coincidencias.</td></tr> : visibleUsers.map((account) => <tr key={account.id}><td><span className="admin-person"><span className="admin-avatar avatar-blue avatar-small">{account.photoUrl ? <img src={account.photoUrl} alt="" /> : account.displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span><span><strong>{account.displayName}</strong><small>{account.email}</small></span></span></td><td>{section === 'roles' && account.role !== 'SUPER_ADMIN' ? <select className="admin-role-select" aria-label={`Rol para ${account.email}`} value={account.role} disabled={roleBusyId === account.id} onChange={(event) => void assignAccess(account, event.target.value as Role, event.target.value === 'USER' ? null : account.careerId || careerId || null)}>{roleOptions.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select> : account.roleName}</td><td>{section === 'roles' && account.role !== 'SUPER_ADMIN' && account.role !== 'USER' ? <select className="admin-role-select" aria-label={`Carrera para ${account.email}`} value={account.careerId || ''} disabled={roleBusyId === account.id} onChange={(event) => void assignAccess(account, account.role as Role, event.target.value || null)}><option value="">Selecciona carrera</option>{careers.map((career) => <option key={career.id} value={career.id}>{career.name}</option>)}</select> : account.careerName || 'Todas las carreras'}{roleBusyId === account.id && <small className="admin-role-saving">Guardando…</small>}</td><td><span className={`admin-user-state ${account.active ? 'active' : ''}`}>{account.active ? 'Activa' : 'Inactiva'}</span></td>{section === 'accounts' && <td><button type="button" className="admin-row-action" onClick={() => openEdit(account)} aria-label={`Editar cuenta ${account.email}`} title="Editar cuenta"><Pencil size={15} /></button></td>}{section !== 'roles' && <td><button className={`admin-status-toggle ${account.active ? 'on' : ''}`} onClick={() => toggleAccount(account)} role="switch" aria-checked={account.active} aria-label={`${account.active ? 'Desactivar' : 'Activar'} cuenta ${account.email}`}><span /></button></td>}{section === 'accounts' && <td><button type="button" className="admin-row-action" disabled={account.id === user.id || account.role === 'SUPER_ADMIN'} onClick={() => void deleteAccount(account)} aria-label={`Eliminar cuenta ${account.email}`} title={account.id === user.id || account.role === 'SUPER_ADMIN' ? 'No se puede eliminar la cuenta principal' : 'Eliminar cuenta'}><Trash2 size={15} /></button></td>}</tr>)}</tbody></table></div></section>
        </div>{section === 'accounts' && <aside className="admin-right-column"><form className="admin-assign-panel" onSubmit={createAccount}><h2><span><Plus size={19} /></span>Crear cuenta</h2><p className="admin-form-intro">Las cuentas se guardan en Cloudflare D1. La contraseña se almacena como hash seguro.</p><label>Nombre completo<input required minLength={2} maxLength={100} value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Nombre de la persona" /></label><label>Correo electrónico<input required type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.com" /></label><label>Contraseña inicial<input required type="password" minLength={12} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="12 caracteres, letras y números" /><small>Entrega esta contraseña a la persona por un canal privado.</small></label><label>Rol<select value={role} onChange={(event) => setRole(event.target.value as Role)}>{roleOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>{role !== 'USER' && <label>Carrera<select required value={careerId} onChange={(event) => setCareerId(event.target.value)}><option value="">Selecciona una carrera...</option>{careers.map((career) => <option value={career.id} key={career.id}>{career.name}</option>)}</select></label>}<div className="admin-info-callout"><LockKeyhole size={17} /><span>El acceso principal sólo se configura una vez. No se crean cuentas institucionales automáticamente.</span></div><button disabled={busy} className="admin-primary-button" type="submit"><Plus size={17} />{busy ? 'Guardando…' : 'Crear cuenta'}</button></form></aside>}
        </div>
      </div></section>
    {editTarget && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditTarget(null); }}><section className="admin-account-modal" role="dialog" aria-modal="true" aria-labelledby="edit-account-title"><header><span className="admin-account-modal-icon"><UserRound size={19} /></span><div><h2 id="edit-account-title">Editar cuenta</h2><p>{editTarget.roleName} · {editTarget.careerName || 'Todas las carreras'}</p></div><button type="button" className="admin-row-action" onClick={() => setEditTarget(null)} aria-label="Cerrar"><X size={17} /></button></header><form onSubmit={saveAccount}><label>Nombre completo<input required minLength={2} maxLength={100} value={editName} onChange={(event) => setEditName(event.target.value)} /></label><label>Correo electrónico<input required type="email" maxLength={254} value={editEmail} onChange={(event) => setEditEmail(event.target.value)} /></label><label>Foto de perfil <small>URL HTTPS o ruta de imagen del sitio</small><span className="admin-photo-field"><Image size={17} /><input type="text" value={editPhotoUrl} onChange={(event) => setEditPhotoUrl(event.target.value)} placeholder="https://... o /images/foto.png" /></span></label>{editPhotoUrl && <div className="admin-photo-preview"><img src={editPhotoUrl} alt="Vista previa de foto de perfil" /><span>Vista previa</span></div>}<label>Nueva contraseña <small>Déjala vacía para conservar la actual</small><input type="password" autoComplete="new-password" minLength={12} maxLength={128} value={editPassword} onChange={(event) => setEditPassword(event.target.value)} placeholder="Al menos 12 caracteres con letras y números" /></label><p className="admin-account-modal-note"><LockKeyhole size={15} />Si cambias la contraseña, la persona deberá volver a iniciar sesión.</p>{editError && <p className="admin-settings-message error" role="alert"><X size={16} />{editError}</p>}<footer><button type="button" className="admin-modal-cancel" onClick={() => setEditTarget(null)}>Cancelar</button><button type="submit" className="admin-primary-button" disabled={editBusy}><Save size={16} />{editBusy ? 'Guardando…' : 'Guardar cambios'}</button></footer></form></section></div>}
    {(error || notice) && <div className={`admin-toast ${error ? 'admin-toast-error' : ''}`} role="status">{error ? <X size={17} /> : <Check size={17} />}{error || notice}<button onClick={() => { setError(''); setNotice(''); }} aria-label="Cerrar aviso"><X size={15} /></button></div>}
  </main>;
}
