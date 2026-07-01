import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import usersData from '../../data/users.json';

const ROL_COLORS = { Gerente: '#0078D4', Jefe: '#107C10', Supervisor: '#FFB900', Coordinador: '#605E5C' };

export default function Configuracion() {
  const usuarios = usersData.usuarios;
  const porRol = {
    Gerente: usuarios.filter((u) => u.rol === 'Gerente'),
    Jefe: usuarios.filter((u) => u.rol === 'Jefe'),
    Supervisor: usuarios.filter((u) => u.rol === 'Supervisor'),
    Coordinador: usuarios.filter((u) => u.rol === 'Coordinador'),
  };

  return (
    <AppShell titulo="Configuración">
      <PageHeader titulo="Configuración del sistema" subtitulo="Gestión de usuarios · Estructura organizacional" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ pb: 0 }}>
              <Typography variant="h5" gutterBottom>Usuarios del sistema ({usuarios.length})</Typography>
            </CardContent>
            {Object.entries(porRol).map(([rol, lista]) => (
              <Box key={rol}>
                <Box sx={{ px: 2, py: 0.75, bgcolor: '#F3F2F1' }}>
                  <Chip label={rol} size="small" sx={{ bgcolor: ROL_COLORS[rol], color: '#fff', fontWeight: 600 }} />
                </Box>
                <List disablePadding>
                  {lista.map((u) => (
                    <ListItem key={u.id} divider sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: ROL_COLORS[u.rol], fontSize: '0.75rem', fontWeight: 700 }}>
                          {u.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={u.nombre}
                        secondary={`${u.area} · ${u.email}`}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                      <Chip
                        label={`${u.indicadores.length} indicadores`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.6875rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Parámetros del semáforo</Typography>
              {[
                { color: '#107C10', label: 'Verde — En línea', condicion: 'Cumplimiento = 100%' },
                { color: '#FFB900', label: 'Amarillo — Riesgo', condicion: 'Cumplimiento 85–99%' },
                { color: '#D13438', label: 'Rojo — Desviado', condicion: 'Cumplimiento < 85%' },
              ].map((s) => (
                <Box key={s.color} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: s.color, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600} color={s.color}>{s.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{s.condicion}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Información del sistema</Typography>
              {[
                { label: 'Versión', valor: 'Demo v1.0' },
                { label: 'Período activo', valor: 'Junio 2026' },
                { label: 'Marco estratégico', valor: 'BSC' },
                { label: 'Indicadores totales', valor: '13' },
                { label: 'Usuarios', valor: '9' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #EDEBE9' }}>
                  <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  <Typography variant="caption" fontWeight={600}>{item.valor}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AppShell>
  );
}
