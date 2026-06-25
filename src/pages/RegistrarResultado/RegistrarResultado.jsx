import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useIndicadores, useIndicadorConEstado } from '../../hooks/useIndicadores';
import { formatValue, formatPct, MESES_FULL } from '../../utils/formatters';
import { calcularSemaforo, calcularCumplimiento, SEMAFORO_COLORS } from '../../utils/semaforo';

function FormularioAvance({ ind, onGuardado }) {
  const { actualizarAvance } = useData();
  const [mes, setMes] = useState(6);
  const [valor, setValor] = useState('');
  const [observacion, setObservacion] = useState('');
  const [guardado, setGuardado] = useState(false);

  const valorNum = parseFloat(valor);
  const semaforo = !isNaN(valorNum) && ind?.meta
    ? calcularSemaforo(valorNum, ind.meta.valorMeta, ind.tipo)
    : null;
  const cumplimiento = !isNaN(valorNum) && ind?.meta
    ? calcularCumplimiento(valorNum, ind.meta.valorMeta, ind.tipo)
    : null;

  function handleGuardar() {
    actualizarAvance(ind.id, mes, 2026, valorNum, observacion);
    setGuardado(true);
    setValor('');
    setObservacion('');
    setTimeout(() => { setGuardado(false); onGuardado?.(); }, 2000);
  }

  if (!ind) return null;

  return (
    <Box>
      {guardado && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Resultado guardado correctamente para {MESES_FULL[mes - 1]} 2026.
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Mes</InputLabel>
            <Select value={mes} label="Mes" onChange={(e) => setMes(e.target.value)}>
              {MESES_FULL.map((nombre, i) => (
                <MenuItem key={i + 1} value={i + 1}>{nombre} 2026</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={`Valor real (${ind.unidad})`}
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            inputProps={{ step: 'any' }}
            helperText={`Meta: ${ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}`}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observación (opcional)"
            multiline
            rows={2}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Condiciones climáticas, incidencias, acciones correctivas..."
          />
        </Grid>
      </Grid>

      {semaforo && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, p: 1.5, bgcolor: SEMAFORO_COLORS[semaforo] + '10', borderRadius: 1 }}>
          <SemaforoChip estado={semaforo} />
          <Typography variant="body2" fontWeight={600}>
            {formatPct(cumplimiento)} de cumplimiento
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatValue(valorNum, ind.unidad)} vs meta {formatValue(ind.meta?.valorMeta, ind.unidad)}
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          disabled={!valor || isNaN(valorNum) || guardado}
          onClick={handleGuardar}
        >
          Guardar resultado
        </Button>
      </Box>
    </Box>
  );
}

function PanelIndicador({ ind }) {
  const indConEstado = useIndicadorConEstado(ind.id);
  const [abierto, setAbierto] = useState(false);

  const PERSPECTIVA_COLORS = { financiera: '#0078D4', clientes: '#107C10', procesos: '#FFB900', aprendizaje: '#D13438' };

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `4px solid ${indConEstado?.semaforo ? SEMAFORO_COLORS[indConEstado.semaforo] : '#EDEBE9'}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: abierto ? 2 : 0 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="body1" fontWeight={600}>{ind.nombre}</Typography>
              <Typography variant="caption" color="text.secondary" fontFamily="monospace">{ind.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <SemaforoChip estado={indConEstado?.semaforo} />
              {indConEstado?.ultimoAvance && (
                <Typography variant="caption" color="text.secondary">
                  Último registro: <strong>{formatValue(indConEstado.ultimoAvance.valorReal, ind.unidad)}</strong>
                  {' '}· {MESES_FULL[(indConEstado.ultimoAvance.mes ?? 1) - 1]} 2026
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            size="small"
            variant={abierto ? 'outlined' : 'contained'}
            onClick={() => setAbierto(!abierto)}
            sx={{ ml: 2, flexShrink: 0 }}
          >
            {abierto ? 'Cerrar' : 'Ingresar resultado'}
          </Button>
        </Box>

        {abierto && (
          <>
            <Divider sx={{ mb: 2 }} />
            <FormularioAvance ind={indConEstado} onGuardado={() => setAbierto(false)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function RegistrarResultado() {
  const { usuario } = useAuth();
  const indicadores = useIndicadores();

  return (
    <AppShell titulo="Registrar Resultados">
      <PageHeader
        titulo="Registrar Resultados"
        subtitulo={`${indicadores.length} indicadores asignados · Selecciona el indicador, el mes y el valor`}
      />

      {indicadores.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No tienes indicadores asignados.</Typography>
          </CardContent>
        </Card>
      ) : (
        indicadores.map((ind) => (
          <PanelIndicador key={ind.id} ind={ind} />
        ))
      )}
    </AppShell>
  );
}
