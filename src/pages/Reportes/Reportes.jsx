import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import BarChart from '../../components/charts/BarChart';
import { useResumenEjecutivo } from '../../hooks/useIndicadores';
import { getPerspectivas } from '../../services/indicadoresService';

export default function Reportes() {
  const [periodo, setPeriodo] = useState('jun2026');
  const [perspectiva, setPerspectiva] = useState('todas');
  const [exportado, setExportado] = useState(false);
  const resumen = useResumenEjecutivo();
  const perspectivas = getPerspectivas();

  const byPerspectiva = perspectivas.map((p) => {
    const inds = resumen.indicadores.filter((i) => i.perspectivaId === p.id && i.cumplimiento != null);
    const avg = inds.length ? inds.reduce((s, i) => s + i.cumplimiento, 0) / inds.length : 0;
    return { nombre: p.nombre, avg };
  });

  function handleExport() {
    setExportado(true);
    setTimeout(() => setExportado(false), 3000);
  }

  return (
    <AppShell titulo="Reportes">
      <PageHeader titulo="Reportes y Análisis" subtitulo="Generación de informes por período y perspectiva" />

      {exportado && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Exportación simulada — en producción generaría el archivo real.
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Período</InputLabel>
          <Select value={periodo} label="Período" onChange={(e) => setPeriodo(e.target.value)}>
            <MenuItem value="jun2026">Junio 2026</MenuItem>
            <MenuItem value="q22026">Q2 2026</MenuItem>
            <MenuItem value="2026">Anual 2026</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Perspectiva BSC</InputLabel>
          <Select value={perspectiva} label="Perspectiva BSC" onChange={(e) => setPerspectiva(e.target.value)}>
            <MenuItem value="todas">Todas</MenuItem>
            {perspectivas.map((p) => <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Resumen ejecutivo</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Total indicadores', valor: resumen.total, color: 'text.primary' },
                  { label: 'En meta (verde)', valor: resumen.verde, color: '#107C10' },
                  { label: 'En riesgo (amarillo)', valor: resumen.amarillo, color: '#C78A00' },
                  { label: 'Críticos (rojo)', valor: resumen.rojo, color: '#D13438' },
                  { label: 'Avances pendientes', valor: resumen.pendientes, color: '#605E5C' },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body1" fontWeight={700} color={item.color}>{item.valor}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Cumplimiento promedio por perspectiva</Typography>
              <BarChart
                labels={byPerspectiva.map((p) => p.nombre)}
                datasets={[{
                  label: 'Cumplimiento %',
                  data: byPerspectiva.map((p) => p.avg),
                  backgroundColor: ['rgba(0,120,212,0.15)', 'rgba(16,124,16,0.15)', 'rgba(255,185,0,0.15)', 'rgba(209,52,56,0.15)'],
                  borderColor: ['#0078D4', '#107C10', '#FFB900', '#D13438'],
                  borderWidth: 2,
                }]}
                height={220}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Exportar reporte</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Genera el informe del período seleccionado en el formato deseado.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<PictureAsPdfIcon />} onClick={handleExport}>Exportar PDF</Button>
            <Button variant="outlined" startIcon={<TableChartIcon />} onClick={handleExport}>Exportar Excel</Button>
          </Box>
        </CardContent>
      </Card>
    </AppShell>
  );
}
