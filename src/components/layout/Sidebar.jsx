import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;

const NAV_ITEMS = [
  { label: 'Dashboard Ejecutivo', icon: <DashboardIcon />, path: '/dashboard', roles: ['Gerente'] },
  { label: 'Dashboard de Área', icon: <BarChartIcon />, path: '/area', roles: ['Gerente', 'Jefe'] },
  { label: 'Dashboard de Equipo', icon: <GroupIcon />, path: '/equipo', roles: ['Gerente', 'Jefe', 'Supervisor'] },
  { label: 'Mis Indicadores', icon: <AssignmentIcon />, path: '/mis-indicadores', roles: ['Gerente', 'Jefe', 'Supervisor', 'Coordinador'] },
  { label: 'Registrar Resultado', icon: <AddBoxIcon />, path: '/registrar', roles: ['Gerente', 'Jefe', 'Supervisor', 'Coordinador'] },
  { label: 'Metas y Objetivos', icon: <TrackChangesIcon />, path: '/metas', roles: ['Gerente', 'Jefe'] },
  { label: 'Alertas', icon: <NotificationsActiveIcon />, path: '/alertas', roles: ['Gerente', 'Jefe', 'Supervisor', 'Coordinador'] },
  { label: 'Reportes', icon: <AssessmentIcon />, path: '/reportes', roles: ['Gerente', 'Jefe'] },
  { label: 'Configuración', icon: <SettingsIcon />, path: '/configuracion', roles: ['Gerente'] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(usuario?.rol));

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Box
      sx={{
        width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
        flexShrink: 0,
        transition: 'width 0.2s ease',
        bgcolor: '#1B1B1B',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: collapsed ? 1.5 : 2.5,
          py: 2,
          minHeight: 64,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <AgricultureIcon sx={{ color: '#0078D4', fontSize: 28, flexShrink: 0 }} />
        {!collapsed && (
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#fff', lineHeight: 1.2, fontWeight: 700, fontSize: '0.8125rem' }}>
              Metas &amp;
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#0078D4', lineHeight: 1.2, fontWeight: 700, fontSize: '0.8125rem' }}>
              Indicadores
            </Typography>
          </Box>
        )}
      </Box>

      {/* Nav items */}
      <List sx={{ flex: 1, pt: 1, px: collapsed ? 0.5 : 1 }}>
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Tooltip key={item.path} title={collapsed ? item.label : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 0.25,
                  px: collapsed ? 1.5 : 1.5,
                  py: 1,
                  bgcolor: active ? '#0078D4' : 'transparent',
                  '&:hover': { bgcolor: active ? '#0078D4' : 'rgba(255,255,255,0.06)' },
                  minHeight: 40,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: '#ffffff',
                        fontSize: '0.8125rem',
                        fontWeight: active ? 600 : 400,
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* User section */}
      {!collapsed && usuario && (
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#0078D4', fontSize: '0.75rem', fontWeight: 700 }}>
            {usuario.avatar}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, display: 'block', lineHeight: 1.3 }} noWrap>
              {usuario.nombre}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6875rem' }}>
              {usuario.rol}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Collapse toggle + logout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 0.5 : 1.5,
          py: 1,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          gap: 0.5,
        }}
      >
        {!collapsed && (
          <Tooltip title="Cerrar sesión" arrow>
            <IconButton size="small" onClick={handleLogout} sx={{ color: 'rgba(255,255,255,0.45)', '&:hover': { color: '#fff' } }}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={collapsed ? 'Expandir' : 'Contraer'} placement="right" arrow>
          <IconButton size="small" onClick={() => setCollapsed(!collapsed)} sx={{ color: 'rgba(255,255,255,0.45)', '&:hover': { color: '#fff' } }}>
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
