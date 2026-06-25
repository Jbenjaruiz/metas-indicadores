import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

import Login from '../pages/Login/Login';
import DashboardEjecutivo from '../pages/DashboardEjecutivo/DashboardEjecutivo';
import DashboardArea from '../pages/DashboardArea/DashboardArea';
import DashboardEquipo from '../pages/DashboardEquipo/DashboardEquipo';
import MisIndicadores from '../pages/MisIndicadores/MisIndicadores';
import DetalleIndicador from '../pages/DetalleIndicador/DetalleIndicador';
import RegistrarAvance from '../pages/RegistrarAvance/RegistrarAvance';
import RegistrarResultado from '../pages/RegistrarResultado/RegistrarResultado';
import MetasObjetivos from '../pages/MetasObjetivos/MetasObjetivos';
import Alertas from '../pages/Alertas/Alertas';
import Reportes from '../pages/Reportes/Reportes';
import Configuracion from '../pages/Configuracion/Configuracion';

function HomeRedirect() {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol === 'Gerente') return <Navigate to="/dashboard" replace />;
  if (usuario.rol === 'Jefe') return <Navigate to="/area" replace />;
  if (usuario.rol === 'Supervisor') return <Navigate to="/equipo" replace />;
  return <Navigate to="/mis-indicadores" replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route path="/dashboard" element={
        <ProtectedRoute roles={['Gerente']}>
          <DashboardEjecutivo />
        </ProtectedRoute>
      } />

      <Route path="/area" element={
        <ProtectedRoute roles={['Gerente', 'Jefe']}>
          <DashboardArea />
        </ProtectedRoute>
      } />

      <Route path="/equipo" element={
        <ProtectedRoute roles={['Gerente', 'Jefe', 'Supervisor']}>
          <DashboardEquipo />
        </ProtectedRoute>
      } />

      <Route path="/mis-indicadores" element={
        <ProtectedRoute>
          <MisIndicadores />
        </ProtectedRoute>
      } />

      <Route path="/indicadores/:id" element={
        <ProtectedRoute>
          <DetalleIndicador />
        </ProtectedRoute>
      } />

      <Route path="/indicadores/:id/registrar" element={
        <ProtectedRoute roles={['Supervisor', 'Coordinador']}>
          <RegistrarAvance />
        </ProtectedRoute>
      } />

      <Route path="/registrar" element={
        <ProtectedRoute roles={['Gerente', 'Jefe', 'Supervisor', 'Coordinador']}>
          <RegistrarResultado />
        </ProtectedRoute>
      } />

      <Route path="/metas" element={
        <ProtectedRoute roles={['Gerente', 'Jefe']}>
          <MetasObjetivos />
        </ProtectedRoute>
      } />

      <Route path="/alertas" element={
        <ProtectedRoute>
          <Alertas />
        </ProtectedRoute>
      } />

      <Route path="/reportes" element={
        <ProtectedRoute roles={['Gerente', 'Jefe']}>
          <Reportes />
        </ProtectedRoute>
      } />

      <Route path="/configuracion" element={
        <ProtectedRoute roles={['Gerente']}>
          <Configuracion />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
