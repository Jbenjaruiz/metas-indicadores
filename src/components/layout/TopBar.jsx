import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResumenEjecutivo } from '../../hooks/useIndicadores';

export default function TopBar({ titulo }) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const { rojo, amarillo } = useResumenEjecutivo();
  const alertCount = rojo + amarillo;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        borderBottom: '1px solid #EDEBE9',
        color: 'text.primary',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ minHeight: 56, px: 3 }}>
        <Typography variant="h5" sx={{ flex: 1, color: 'text.primary' }}>
          {titulo}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Junio 2026
          </Typography>

          <IconButton size="small" onClick={() => navigate('/alertas')} sx={{ mx: 0.5 }}>
            <Badge badgeContent={alertCount} color="error" max={99}>
              <NotificationsIcon sx={{ color: 'text.secondary' }} />
            </Badge>
          </IconButton>

          {usuario && (
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.75rem', fontWeight: 700 }}>
              {usuario.avatar}
            </Avatar>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
