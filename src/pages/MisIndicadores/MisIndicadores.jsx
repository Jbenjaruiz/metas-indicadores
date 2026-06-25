import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import EmptyState from '../../components/common/EmptyState';
import { useIndicadores } from '../../hooks/useIndicadores';
import { useAuth } from '../../context/AuthContext';
import { formatValue, formatPct } from '../../utils/formatters';
import { SEMAFORO_COLORS } from '../../utils/semaforo';

const PERSPECTIVA_LABELS = { financiera: 'Financiera', clientes: 'Clientes', procesos: 'Procesos Internos', aprendizaje: 'Aprendizaje' };
const PERSPECTIVA_COLORS = { financiera: '#0078D4', clientes: '#107C10', procesos: '#FFB900', aprendizaje: '#D13438' };

export default function MisIndicadores() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const indicadores = useIndicadores();
  const puedeRegistrar = ['Supervisor', 'Coordinador'].includes(usuario?.rol);

  if (indicadores.length === 0) {
    return (
      <AppShell titulo="Mis Indicadores">
        <PageHeader titulo="Mis Indicadores" />
        <EmptyState mensaje="No tienes indicadores asignados" />
      </AppShell>
    );
  }

  return (
    <AppShell titulo="Mis Indicadores">
      <PageHeader titulo="Mis Indicadores" subtitulo={`${indicadores.length} indicadores asignados · Junio 2026`} />

      <Grid container spacing={2}>
        {indicadores.map((ind) => (
          <Grid item xs={12} sm={6} md={4} key={ind.id}>
            <Card
              sx={{
                height: '100%',
                borderLeft: `4px solid ${ind.semaforo ? SEMAFORO_COLORS[ind.semaforo] : '#EDEBE9'}`,
                transition: 'box-shadow 0.15s',
                '&:hover': { boxShadow: 3 },
              }}
            >
              <CardActionArea onClick={() => navigate(`/indicadores/${ind.id}`)} sx={{ height: '100%' }}>
                <CardContent sx={{ pb: '12px !important' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Chip
                      label={PERSPECTIVA_LABELS[ind.perspectivaId]}
                      size="small"
                      sx={{
                        bgcolor: PERSPECTIVA_COLORS[ind.perspectivaId] + '18',
                        color: PERSPECTIVA_COLORS[ind.perspectivaId],
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" fontFamily="monospace">{ind.id}</Typography>
                  </Box>

                  <Typography variant="h5" sx={{ mb: 1.5, lineHeight: 1.3 }}>{ind.nombre}</Typography>

                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {ind.ultimoAvance ? formatValue(ind.ultimoAvance.valorReal, ind.unidad) : '—'}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SemaforoChip estado={ind.semaforo} />
                    {ind.cumplimiento != null && (
                      <Typography variant="caption" color="text.secondary">
                        {formatPct(ind.cumplimiento)}
                      </Typography>
                    )}
                  </Box>

                  {ind.meta && (
                    <Typography variant="caption" color="text.secondary">
                      Meta: {formatValue(ind.meta.valorMeta, ind.unidad)}
                    </Typography>
                  )}

                  {ind.ultimoAvance?.observacion && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }} noWrap>
                      "{ind.ultimoAvance.observacion}"
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>

              {puedeRegistrar && (
                <Box sx={{ px: 2, pb: 1.5 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={(e) => { e.stopPropagation(); navigate(`/indicadores/${ind.id}/registrar`); }}
                  >
                    Registrar avance
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </AppShell>
  );
}
