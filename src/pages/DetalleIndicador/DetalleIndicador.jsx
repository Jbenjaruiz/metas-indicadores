import { useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import LineChart from '../../components/charts/LineChart';
import { useAuth } from '../../context/AuthContext';
import { useIndicadorConEstado } from '../../hooks/useIndicadores';
import { useAvancesChart, useAvancesData } from '../../hooks/useAvances';
import { formatValue, formatPct, MESES, MESES_FULL } from '../../utils/formatters';
import { calcularSemaforo, calcularCumplimiento, SEMAFORO_COLORS } from '../../utils/semaforo';

const PERSPECTIVA_LABELS = { financiera: 'Financiera', clientes: 'Clientes', procesos: 'Procesos Internos', aprendizaje: 'Aprendizaje' };

export default function DetalleIndicador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const ind = useIndicadorConEstado(id);
  const avances = useAvancesData(id);
  const chartData = useAvancesChart(id, ind?.meta?.valorMeta);

  if (!ind) return null;

  const puedeRegistrar = ['Supervisor', 'Coordinador'].includes(usuario?.rol);

  return (
    <AppShell titulo={ind.nombre}>
      <PageHeader
        titulo={ind.nombre}
        subtitulo={`${id} · ${PERSPECTIVA_LABELS[ind.perspectivaId]} · Responsable: ${ind.responsable}`}
        breadcrumbs={[
          { label: 'Mis Indicadores', href: '/mis-indicadores' },
          { label: ind.nombre },
        ]}
        actions={
          puedeRegistrar && (
            <Button variant="contained" size="small" startIcon={<EditIcon />}
              onClick={() => navigate(`/indicadores/${id}/registrar`)}>
              Registrar avance
            </Button>
          )
        }
      />

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: `4px solid ${ind.semaforo ? SEMAFORO_COLORS[ind.semaforo] : '#EDEBE9'}` }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">Último valor registrado</Typography>
              <Typography variant="h2" fontWeight={700}>
                {ind.ultimoAvance ? formatValue(ind.ultimoAvance.valorReal, ind.unidad) : '—'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <SemaforoChip estado={ind.semaforo} />
                {ind.cumplimiento != null && (
                  <Typography variant="body2" color="text.secondary">{formatPct(ind.cumplimiento)} cumplimiento</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">Meta del período</Typography>
              <Typography variant="h2" fontWeight={700}>
                {ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {ind.meta?.nota}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">Fórmula de cálculo</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ mt: 0.5 }}>{ind.formula}</Typography>
              <Chip label={ind.tipo === 'menor' ? 'Indicador inverso' : 'Indicador directo'} size="small" variant="outlined" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Tendencia anual 2026</Typography>
          <LineChart
            labels={chartData.labels}
            datasets={[
              {
                label: 'Valor real',
                data: chartData.valores,
                borderColor: '#0078D4',
                backgroundColor: 'rgba(0,120,212,0.08)',
                fill: true,
              },
              {
                label: 'Meta',
                data: chartData.metas,
                borderColor: '#D13438',
                borderDash: [6, 3],
                pointRadius: 0,
                borderWidth: 1.5,
              },
            ]}
            height={280}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" gutterBottom>Historial de avances 2026</Typography>
        </CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Mes</TableCell>
                <TableCell align="right">Valor real</TableCell>
                <TableCell align="right">Meta</TableCell>
                <TableCell align="right">Cumplimiento</TableCell>
                <TableCell>Semáforo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Observación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MESES.map((mes, i) => {
                const avance = avances.find((a) => a.mes === i + 1);
                const sem = avance && ind.meta ? calcularSemaforo(avance.valorReal, ind.meta.valorMeta, ind.tipo) : null;
                const pct = avance && ind.meta ? calcularCumplimiento(avance.valorReal, ind.meta.valorMeta, ind.tipo) : null;
                return (
                  <TableRow key={mes} sx={{ bgcolor: i === 5 ? '#EFF6FF' : 'transparent' }}>
                    <TableCell><Typography variant="body2" fontWeight={i === 5 ? 700 : 400}>{MESES_FULL[i]}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>{avance ? formatValue(avance.valorReal, ind.unidad) : '—'}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" color="text.secondary">{ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}</Typography></TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600} color={sem ? SEMAFORO_COLORS[sem] : 'text.secondary'}>
                        {pct != null ? formatPct(pct) : '—'}
                      </Typography>
                    </TableCell>
                    <TableCell><SemaforoChip estado={sem} /></TableCell>
                    <TableCell>
                      <Chip label={avance?.estado ?? '—'} size="small" variant="outlined"
                        color={avance?.estado === 'Aprobado' ? 'success' : avance?.estado === 'Pendiente' ? 'warning' : 'default'} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: avance?.observacion ? 'italic' : 'normal' }}>
                        {avance?.observacion || '—'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </AppShell>
  );
}
