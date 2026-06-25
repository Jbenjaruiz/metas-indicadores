import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoDot from '../../components/semaforo/SemaforoDot';
import { useAuth } from '../../context/AuthContext';
import { useIndicadorConEstado } from '../../hooks/useIndicadores';
import usersData from '../../data/users.json';

const ROL_COLORS = { Supervisor: '#FFB900', Coordinador: '#605E5C' };

function IndicadorFila({ indId, navigate }) {
  const ind = useIndicadorConEstado(indId);
  if (!ind) return null;
  return (
    <Box
      onClick={() => navigate(`/indicadores/${indId}`)}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        py: 0.75, px: 1, borderRadius: 0.5, cursor: 'pointer',
        '&:hover': { bgcolor: '#F3F2F1' },
        borderBottom: '1px solid #F3F2F1',
      }}
    >
      <SemaforoDot estado={ind.semaforo} size={10} />
      <Typography variant="caption" sx={{ flex: 1 }} noWrap>{ind.nombre}</Typography>
      <Typography variant="caption" color="text.secondary" fontFamily="monospace">{indId}</Typography>
    </Box>
  );
}

function TarjetaMiembro({ miembro, navigate }) {
  const inds = miembro.indicadores.map((id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useIndicadorConEstado(id);
  });
  const verde = inds.filter((i) => i?.semaforo === 'verde').length;
  const amarillo = inds.filter((i) => i?.semaforo === 'amarillo').length;
  const rojo = inds.filter((i) => i?.semaforo === 'rojo').length;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: ROL_COLORS[miembro.rol] ?? '#605E5C', fontSize: '0.8125rem', fontWeight: 700 }}>
            {miembro.avatar}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{miembro.nombre}</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip label={miembro.rol} size="small" sx={{ height: 18, fontSize: '0.6875rem', bgcolor: ROL_COLORS[miembro.rol] ?? '#605E5C', color: '#fff', fontWeight: 600 }} />
              <Typography variant="caption" color="text.secondary">{miembro.area}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {verde > 0 && <Chip label={`${verde} meta`} size="small" sx={{ bgcolor: '#E7F3E7', color: '#107C10', fontWeight: 600, fontSize: '0.6875rem' }} />}
          {amarillo > 0 && <Chip label={`${amarillo} riesgo`} size="small" sx={{ bgcolor: '#FFF8E1', color: '#C78A00', fontWeight: 600, fontSize: '0.6875rem' }} />}
          {rojo > 0 && <Chip label={`${rojo} crítico`} size="small" sx={{ bgcolor: '#FDEEEE', color: '#D13438', fontWeight: 600, fontSize: '0.6875rem' }} />}
          {inds.length === 0 && <Typography variant="caption" color="text.secondary">Sin indicadores</Typography>}
        </Box>

        {miembro.indicadores.map((indId) => (
          <IndicadorFila key={indId} indId={indId} navigate={navigate} />
        ))}
      </CardContent>
    </Card>
  );
}

export default function DashboardEquipo() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const miembros = usersData.usuarios.filter((u) => {
    if (usuario?.rol === 'Gerente' || usuario?.rol === 'Jefe') {
      return u.rol === 'Supervisor' || u.rol === 'Coordinador';
    }
    if (usuario?.rol === 'Supervisor') {
      return u.rol === 'Coordinador' && u.areaId === usuario.areaId;
    }
    return false;
  });

  return (
    <AppShell titulo="Dashboard de Equipo">
      <PageHeader titulo="Dashboard de Equipo" subtitulo="Estado de cumplimiento por colaborador · Junio 2026" />
      <Grid container spacing={2}>
        {miembros.map((miembro) => (
          <Grid item xs={12} sm={6} md={4} key={miembro.id}>
            <TarjetaMiembro miembro={miembro} navigate={navigate} />
          </Grid>
        ))}
      </Grid>
    </AppShell>
  );
}
