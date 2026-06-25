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
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import KpiCard from '../../components/common/KpiCard';
import LineChart from '../../components/charts/LineChart';
import { useAuth } from '../../context/AuthContext';
import { useIndicadorConEstado } from '../../hooks/useIndicadores';
import { useAvancesChart } from '../../hooks/useAvances';
import { MESES } from '../../utils/formatters';

const AREAS = [
  { id: 'prod', nombre: 'Producción Agrícola', indicadores: ['IND-P01', 'IND-P02', 'IND-P03', 'IND-P04'] },
  { id: 'ventas', nombre: 'Comercialización y Ventas', indicadores: ['IND-C01', 'IND-C02', 'IND-C03', 'IND-F02'] },
];

function KpiCardConEstado({ indId, onClick }) {
  const ind = useIndicadorConEstado(indId);
  if (!ind) return null;
  return (
    <KpiCard
      titulo={ind.nombre}
      valor={ind.ultimoAvance?.valorReal}
      unidad={ind.unidad}
      meta={ind.meta?.valorMeta}
      semaforo={ind.semaforo}
      cumplimiento={ind.cumplimiento}
      onClick={onClick}
    />
  );
}

function TendenciaChart({ indId }) {
  const ind = useIndicadorConEstado(indId);
  const chartData = useAvancesChart(indId, ind?.meta?.valorMeta);
  if (!ind) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Tendencia — {ind.nombre}</Typography>
        <LineChart
          labels={chartData.labels}
          datasets={[
            { label: 'Valor real', data: chartData.valores, borderColor: '#0078D4', backgroundColor: 'rgba(0,120,212,0.08)', fill: true },
            { label: 'Meta', data: chartData.metas, borderColor: '#D13438', borderDash: [6, 3], pointRadius: 0 },
          ]}
          height={280}
        />
      </CardContent>
    </Card>
  );
}

export default function DashboardArea() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const defaultArea = usuario?.rol === 'Jefe'
    ? AREAS.find((a) => a.id === usuario.areaId) ?? AREAS[0]
    : AREAS[0];

  const [areaId, setAreaId] = useState(defaultArea.id);
  const area = AREAS.find((a) => a.id === areaId) ?? AREAS[0];

  return (
    <AppShell titulo="Dashboard de Área">
      <PageHeader titulo="Dashboard de Área" subtitulo="Indicadores por área estratégica · Junio 2026" />

      {usuario?.rol === 'Gerente' && (
        <Box sx={{ mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Área</InputLabel>
            <Select value={areaId} label="Área" onChange={(e) => setAreaId(e.target.value)}>
              {AREAS.map((a) => <MenuItem key={a.id} value={a.id}>{a.nombre}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      )}

      <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>{area.nombre}</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {area.indicadores.map((indId) => (
          <Grid item xs={12} sm={6} md={3} key={indId}>
            <KpiCardConEstado indId={indId} onClick={() => navigate(`/indicadores/${indId}`)} />
          </Grid>
        ))}
      </Grid>

      <TendenciaChart indId={area.indicadores[0]} />
    </AppShell>
  );
}
