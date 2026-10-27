import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import CareerSelectionPage from './pages/CareerSelectionPage';
import SystemsHomePage from './pages/SystemsHomePage';
import SystemsNewsPage from './pages/SystemsNewsPage';
import SystemsSchedulesPage from './pages/SystemsSchedulesPage';
import SystemsTeachersPage from './pages/SystemsTeachersPage';
import AdminPage from './pages/AdminPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import SystemsAdminPage from './pages/SystemsAdminPage';
import LoginPage from './pages/LoginPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { menuOptions } from './data/systems';

type AuthUser = { id: string; displayName: string; email: string; role: string; careerId: string | null; careerName: string | null; roleName?: string };

function AdminRoute() {
  const location = useLocation();
  const [state, setState] = useState<{ loading: boolean; user: AuthUser | null }>({ loading: true, user: null });
  useEffect(() => {
    let live = true;
    fetch('/api/auth/me').then(async (response) => response.ok ? response.json() : { user: null }).then((data) => {
      if (live) setState({ loading: false, user: data.user });
    }).catch(() => { if (live) setState({ loading: false, user: null }); });
    return () => { live = false; };
  }, [location.pathname]);
  if (state.loading) return <div className="route-loading">Verificando sesión…</div>;
  if (!state.user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (state.user.role !== 'SUPER_ADMIN') return <Navigate to={state.user.role === 'USER' ? '/' : '/admin/carrera'} replace />;
  return location.pathname === '/admin/ajustes' ? <AdminSettingsPage user={state.user} /> : <AdminPage user={state.user} />;
}

function CareerAdminRoute() {
  const [state, setState] = useState<{ loading: boolean; user: AuthUser | null }>({ loading: true, user: null });
  useEffect(() => {
    let live = true;
    fetch('/api/auth/me').then(async (response) => response.ok ? response.json() : { user: null }).then((data) => {
      if (live) setState({ loading: false, user: data.user });
    }).catch(() => { if (live) setState({ loading: false, user: null }); });
    return () => { live = false; };
  }, []);
  if (state.loading) return <div className="route-loading">Verificando sesión…</div>;
  if (!state.user) return <Navigate to="/login" replace />;
  if (state.user.role === 'SUPER_ADMIN') return <Navigate to="/admin" replace />;
  if (state.user.role === 'USER') return <Navigate to="/" replace />;
  if (state.user.careerId === 'ingenieria-sistemas') return <SystemsAdminPage user={state.user} />;
  return <main className="career-admin-future"><span><GraduationCap size={27} /></span><p>CampusTouch · Administración</p><h1>Hola, {state.user.displayName}</h1><h2>{state.user.careerName || 'Administración de carrera'}</h2><p>Tu cuenta tiene el rol de {state.user.roleName || 'administrador de carrera'}. El panel para esta carrera se habilitará en una siguiente etapa.</p><button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.assign('/login'); }}>Cerrar sesión</button></main>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/carreras/sistemas/inicio" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/carreras/sistemas" element={<CareerSelectionPage />} />
      <Route path="/carreras/sistemas/inicio" element={<SystemsHomePage />} />
      <Route path="/carreras/sistemas/noticias" element={<SystemsNewsPage />} />
      <Route path="/carreras/sistemas/horarios" element={<SystemsSchedulesPage />} />
      <Route path="/carreras/sistemas/profesores" element={<SystemsTeachersPage />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/admin/carrera" element={<CareerAdminRoute />} />
      {menuOptions.filter((option) => !['noticias', 'horarios', 'profesores'].includes(option.path) && !('externalUrl' in option)).map((option) => (
        <Route key={option.path} path={`/carreras/sistemas/${option.path}`} element={<PlaceholderPage />} />
      ))}
      <Route path="*" element={<Navigate to="/carreras/sistemas/inicio" replace />} />
    </Routes>
  );
}
