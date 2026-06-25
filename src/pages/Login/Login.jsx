import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useAuth } from '../../context/AuthContext';
import usersData from '../../data/users.json';

const ROL_COLORS = {
  Gerente: '#0078D4',
  Jefe: '#107C10',
  Supervisor: '#FFB900',
  Coordinador: '#605E5C',
};

const ROL_DESCRIPTION = {
  Gerente: 'Vista global · Configuración · Reportes',
  Jefe: 'Gestión de área · Aprobación de avances',
  Supervisor: 'Seguimiento de equipo · Ingreso de avances',
  Coordinador: 'Mis metas · Registro de avances',
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  function handleIngresar() {
    if (!selected) return;
    login(selected);
    navigate('/');
  }

  const selectedUser = usersData.usuarios.find((u) => u.id === selected);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F3F2F1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 680 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                bgcolor: '#0078D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AgricultureIcon sx={{ color: '#fff', fontSize: 36 }} />
            </Box>
          </Box>
          <Typography variant="h2" color="text.primary" gutterBottom>
            Plataforma de Metas e Indicadores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agropecuaria Popoyan · Balanced Scorecard 2026
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Selecciona tu perfil de acceso
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Demo interactiva — sin contraseña requerida
            </Typography>

            <Grid container spacing={1.5}>
              {usersData.usuarios.map((user) => (
                <Grid item xs={12} sm={6} key={user.id}>
                  <Box
                    onClick={() => setSelected(user.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 1,
                      border: '1.5px solid',
                      borderColor: selected === user.id ? '#0078D4' : '#EDEBE9',
                      bgcolor: selected === user.id ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      '&:hover': { borderColor: '#0078D4', bgcolor: '#F8FBFF' },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: ROL_COLORS[user.rol],
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {user.nombre}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                        <Chip
                          label={user.rol}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.6875rem',
                            bgcolor: ROL_COLORS[user.rol],
                            color: '#fff',
                            fontWeight: 600,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {user.area}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {selectedUser && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ bgcolor: '#F3F2F1', borderRadius: 1, p: 1.5, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Acceso como <strong>{selectedUser.rol}</strong>:{' '}
                    {ROL_DESCRIPTION[selectedUser.rol]}
                  </Typography>
                </Box>
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!selected}
              onClick={handleIngresar}
              sx={{ mt: selectedUser ? 0 : 2, py: 1.25 }}
            >
              Ingresar al sistema
            </Button>
          </CardContent>
        </Card>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          Demo · Datos simulados · Junio 2026
        </Typography>
      </Box>
    </Box>
  );
}
