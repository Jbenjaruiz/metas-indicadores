import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import { useIndicadores } from '../../hooks/useIndicadores';
import { formatValue, formatPct } from '../../utils/formatters';

export default function Alertas() {
  const navigate = useNavigate();
  const indicadores = useIndicadores();

  const criticos = indicadores.filter((i) => i.semaforo === 'rojo').sort((a, b) => a.cumplimiento - b.cumplimiento);
  const enRiesgo = indicadores.filter((i) => i.semaforo === 'amarillo').sort((a, b) => a.cumplimiento - b.cumplimiento);

  return (
    <AppShell titulo="Alertas">
      <PageHeader
        titulo="Panel de Alertas"
        subtitulo={`${criticos.length} críticos · ${enRiesgo.length} en riesgo · Junio 2026`}
      />

      {criticos.length === 0 && enRiesgo.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" color="success.main">Sin alertas activas</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Todos los indicadores están dentro del rango esperado.
            </Typography>
          </CardContent>
        </Card>
      )}

      {criticos.length > 0 && (
        <Card sx={{ mb: 2, borderLeft: '4px solid #D13438' }}>
          <CardContent sx={{ pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <ErrorIcon sx={{ color: '#D13438' }} />
              <Typography variant="h5" color="error">Indicadores críticos ({criticos.length})</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Cumplimiento &lt; 70% — requieren intervención inmediata
            </Typography>
          </CardContent>
          <List disablePadding>
            {criticos.map((ind, i) => (
              <Box key={ind.id}>
                {i > 0 && <Divider />}
                <ListItemButton onClick={() => navigate(`/indicadores/${ind.id}`)}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{ind.nombre}</Typography>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">{ind.id}</Typography>
                      </Box>
                    }
                    secondary={
                      ind.ultimoAvance?.observacion
                        ? `"${ind.ultimoAvance.observacion}"`
                        : `Valor: ${formatValue(ind.ultimoAvance?.valorReal, ind.unidad)} · Meta: ${formatValue(ind.meta?.valorMeta, ind.unidad)}`
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={700} color="error">{formatPct(ind.cumplimiento)}</Typography>
                    <SemaforoChip estado={ind.semaforo} />
                  </Box>
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Card>
      )}

      {enRiesgo.length > 0 && (
        <Card sx={{ borderLeft: '4px solid #FFB900' }}>
          <CardContent sx={{ pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <WarningAmberIcon sx={{ color: '#FFB900' }} />
              <Typography variant="h5" sx={{ color: '#C78A00' }}>Riesgo ({enRiesgo.length})</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Cumplimiento 85–99% — plan de acción preventivo recomendado
            </Typography>
          </CardContent>
          <List disablePadding>
            {enRiesgo.map((ind, i) => (
              <Box key={ind.id}>
                {i > 0 && <Divider />}
                <ListItemButton onClick={() => navigate(`/indicadores/${ind.id}`)}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{ind.nombre}</Typography>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">{ind.id}</Typography>
                      </Box>
                    }
                    secondary={`Valor: ${formatValue(ind.ultimoAvance?.valorReal, ind.unidad)} · Meta: ${formatValue(ind.meta?.valorMeta, ind.unidad)}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#C78A00' }}>{formatPct(ind.cumplimiento)}</Typography>
                    <SemaforoChip estado={ind.semaforo} />
                  </Box>
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Card>
      )}
    </AppShell>
  );
}
