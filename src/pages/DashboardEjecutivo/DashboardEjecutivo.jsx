import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import SemaforoDot from '../../components/semaforo/SemaforoDot';
import DoughnutChart from '../../components/charts/DoughnutChart';
import RadarChart from '../../components/charts/RadarChart';
import BarChart from '../../components/charts/BarChart';
import { useResumenEjecutivo } from '../../hooks/useIndicadores';
import { getPerspectivas } from '../../services/indicadoresService';
import { formatValue, formatPct } from '../../utils/formatters';

const PERSPECTIVA_LABELS = { financiera: 'Financiera', clientes: 'Clientes', procesos: 'Procesos Internos', aprendizaje: 'Aprendizaje' };
const PERSPECTIVA_COLORS = { financiera: '#0078D4', clientes: '#107C10', procesos: '#FFB900', aprendizaje: '#D13438' };

export default function DashboardEjecutivo() {
  const navigate = useNavigate();
  const resumen = useResumenEjecutivo();
  const perspectivas = getPerspectivas();
  const [filtroPerspectiva, setFiltroPerspectiva] = useState('todas');

  const indicadoresFiltrados = filtroPerspectiva === 'todas'
    ? resumen.indicadores
    : resumen.indicadores.filter((i) => i.perspectivaId === filtroPerspectiva);

  const cumplimientoPorPerspectiva = perspectivas.map((p) => {
    const inds = resumen.indicadores.filter((i) => i.perspectivaId === p.id && i.cumplimiento != null);
    if (inds.length === 0) return 0;
    return inds.reduce((s, i) => s + i.cumplimiento, 0) / inds.length;
  });

  const indsPorCumplimiento = [...resumen.indicadores]
    .filter((i) => i.cumplimiento != null)
    .sort((a, b) => a.cumplimiento - b.cumplimiento);

  return (
    <AppShell titulo="Dashboard Ejecutivo">
      <PageHeader titulo="Vista Ejecutiva" subtitulo="Consolidated BSC · Junio 2026 · 13 indicadores" />

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Perspectiva BSC</InputLabel>
          <Select value={filtroPerspectiva} label="Perspectiva BSC" onChange={(e) => setFiltroPerspectiva(e.target.value)}>
            <MenuItem value="todas">Todas las perspectivas</MenuItem>
            {perspectivas.map((p) => <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Período</InputLabel>
          <Select value="jun2026" label="Período">
            <MenuItem value="jun2026">Junio 2026</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 700 }}>{resumen.total}</Typography>
            <Typography variant="caption" color="text.secondary">Total indicadores</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, borderTop: '3px solid #107C10' }}>
            <Typography variant="h2" sx={{ color: '#107C10', fontWeight: 700 }}>{resumen.verde}</Typography>
            <Typography variant="caption" color="text.secondary">En línea</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, borderTop: '3px solid #FFB900' }}>
            <Typography variant="h2" sx={{ color: '#FFB900', fontWeight: 700 }}>{resumen.amarillo}</Typography>
            <Typography variant="caption" color="text.secondary">Riesgo</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, borderTop: '3px solid #D13438' }}>
            <Typography variant="h2" sx={{ color: '#D13438', fontWeight: 700 }}>{resumen.rojo}</Typography>
            <Typography variant="caption" color="text.secondary">Desviado</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Distribución semáforo</Typography>
              <DoughnutChart
                labels={['En línea', 'Riesgo', 'Desviado']}
                values={[resumen.verde, resumen.amarillo, resumen.rojo]}
                colors={['#107C10', '#FFB900', '#D13438']}
                height={220}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Cumplimiento por perspectiva BSC</Typography>
              <RadarChart
                labels={perspectivas.map((p) => p.nombre)}
                datasets={[{
                  label: 'Cumplimiento %',
                  data: cumplimientoPorPerspectiva,
                  backgroundColor: 'rgba(0,120,212,0.15)',
                  borderColor: '#0078D4',
                  pointBackgroundColor: '#0078D4',
                }]}
                height={220}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Ranking de cumplimiento</Typography>
              <BarChart
                labels={indsPorCumplimiento.map((i) => i.id)}
                datasets={[{
                  label: 'Cumplimiento %',
                  data: indsPorCumplimiento.map((i) => Math.min(i.cumplimiento ?? 0, 130)),
                  backgroundColor: indsPorCumplimiento.map((i) =>
                    i.semaforo === 'verde' ? '#107C10' : i.semaforo === 'amarillo' ? '#FFB900' : '#D13438'
                  ),
                }]}
                horizontal
                height={220}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" gutterBottom>
            Indicadores {filtroPerspectiva !== 'todas' && `— ${PERSPECTIVA_LABELS[filtroPerspectiva]}`}
          </Typography>
        </CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Indicador</TableCell>
                <TableCell>Perspectiva</TableCell>
                <TableCell align="right">Valor real</TableCell>
                <TableCell align="right">Meta</TableCell>
                <TableCell align="right">Cumplimiento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Avance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {indicadoresFiltrados.map((ind) => (
                <TableRow key={ind.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/indicadores/${ind.id}`)}>
                  <TableCell><Typography variant="caption" fontFamily="monospace" color="text.secondary">{ind.id}</Typography></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SemaforoDot estado={ind.semaforo} />
                      <Typography variant="body2" fontWeight={500}>{ind.nombre}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={PERSPECTIVA_LABELS[ind.perspectivaId]} size="small"
                      sx={{ bgcolor: PERSPECTIVA_COLORS[ind.perspectivaId] + '18', color: PERSPECTIVA_COLORS[ind.perspectivaId], fontWeight: 600, fontSize: '0.6875rem' }} />
                  </TableCell>
                  <TableCell align="right"><Typography variant="body2" fontWeight={600}>{ind.ultimoAvance ? formatValue(ind.ultimoAvance.valorReal, ind.unidad) : '—'}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" color="text.secondary">{ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}</Typography></TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color={ind.semaforo === 'verde' ? '#107C10' : ind.semaforo === 'amarillo' ? '#C78A00' : '#D13438'}>
                      {ind.cumplimiento != null ? formatPct(ind.cumplimiento) : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell><SemaforoChip estado={ind.semaforo} /></TableCell>
                  <TableCell>
                    <Chip label={ind.ultimoAvance?.estado ?? '—'} size="small" variant="outlined"
                      color={ind.ultimoAvance?.estado === 'Aprobado' ? 'success' : ind.ultimoAvance?.estado === 'Pendiente' ? 'warning' : 'default'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </AppShell>
  );
}
