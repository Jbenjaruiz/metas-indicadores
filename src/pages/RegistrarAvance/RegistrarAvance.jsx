import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import { useIndicadorConEstado } from '../../hooks/useIndicadores';
import { useData } from '../../context/DataContext';
import { formatValue, formatPct, MESES_FULL } from '../../utils/formatters';
import { calcularSemaforo, calcularCumplimiento } from '../../utils/semaforo';

export default function RegistrarAvance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actualizarAvance } = useData();

  const [mes, setMes] = useState(6);
  const [valor, setValor] = useState('');
  const [observacion, setObservacion] = useState('');
  const [guardado, setGuardado] = useState(false);

  const ind = useIndicadorConEstado(id);
  if (!ind) return null;

  const valorNum = parseFloat(valor);
  const semaforo = !isNaN(valorNum) && ind.meta
    ? calcularSemaforo(valorNum, ind.meta.valorMeta, ind.tipo)
    : null;
  const cumplimiento = !isNaN(valorNum) && ind.meta
    ? calcularCumplimiento(valorNum, ind.meta.valorMeta, ind.tipo)
    : null;

  function handleGuardar() {
    actualizarAvance(id, mes, 2026, valorNum, observacion);
    setGuardado(true);
    setTimeout(() => navigate(`/indicadores/${id}`), 1500);
  }

  return (
    <AppShell titulo="Registrar Resultado">
      <PageHeader
        titulo="Registrar Resultado"
        subtitulo={`${id} · ${ind.nombre}`}
        breadcrumbs={[
          { label: 'Mis Indicadores', href: '/mis-indicadores' },
          { label: ind.nombre, href: `/indicadores/${id}` },
          { label: 'Registrar resultado' },
        ]}
      />

      {guardado && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Resultado guardado. Redirigiendo al detalle...
        </Alert>
      )}

      <Box sx={{ maxWidth: 560 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Información del indicador</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Meta</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Unidad</Typography>
                <Typography variant="body1" fontWeight={600}>{ind.unidad}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Tipo</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {ind.tipo === 'menor' ? 'Inverso (menor es mejor)' : 'Directo (mayor es mejor)'}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Nuevo resultado</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Mes</InputLabel>
              <Select value={mes} label="Mes" onChange={(e) => setMes(e.target.value)}>
                {MESES_FULL.map((nombre, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{nombre} 2026</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={`Valor real (${ind.unidad})`}
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              sx={{ mb: 2 }}
              helperText={ind.formula}
              inputProps={{ step: 'any' }}
            />

            <TextField
              fullWidth
              label="Observación (opcional)"
              multiline
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Condiciones climáticas, incidencias, acciones correctivas..."
              sx={{ mb: 2 }}
            />

            {semaforo && (
              <>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Vista previa del semáforo:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SemaforoChip estado={semaforo} size="medium" />
                  <Typography variant="body1" fontWeight={600}>
                    {formatPct(cumplimiento)} de cumplimiento
                  </Typography>
                </Box>
              </>
            )}

            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              <Button
                variant="contained"
                disabled={!valor || isNaN(valorNum) || guardado}
                onClick={handleGuardar}
              >
                Guardar resultado
              </Button>
              <Button variant="outlined" onClick={() => navigate(`/indicadores/${id}`)}>
                Cancelar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AppShell>
  );
}
