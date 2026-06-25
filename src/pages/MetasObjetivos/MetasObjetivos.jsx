import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/common/PageHeader';
import SemaforoChip from '../../components/semaforo/SemaforoChip';
import { useData } from '../../context/DataContext';
import { useIndicadorConEstado } from '../../hooks/useIndicadores';
import {
  getPerspectivas,
  getObjetivos,
  getIndicadoresByPerspectiva,
  getIndicadorById,
} from '../../services/indicadoresService';
import { formatValue } from '../../utils/formatters';

const PERSPECTIVA_COLORS = { financiera: '#0078D4', clientes: '#107C10', procesos: '#FFB900', aprendizaje: '#D13438' };

function FilaIndicador({ indDef, navigate, onEditMeta }) {
  const ind = useIndicadorConEstado(indDef.id);
  if (!ind) return null;
  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell onClick={() => navigate(`/indicadores/${ind.id}`)}>
        <Typography variant="body2" fontWeight={600}>{ind.nombre}</Typography>
        <Typography variant="caption" color="text.secondary" fontFamily="monospace">{ind.id}</Typography>
      </TableCell>
      <TableCell onClick={() => navigate(`/indicadores/${ind.id}`)}>
        <Typography variant="caption" color="text.secondary">{ind.formula}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" fontWeight={600}>
            {ind.meta ? formatValue(ind.meta.valorMeta, ind.unidad) : '—'}
          </Typography>
          <Tooltip title="Editar meta" arrow>
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onEditMeta(ind); }}
              sx={{ ml: 0.5, color: 'primary.main', opacity: 0.7, '&:hover': { opacity: 1 } }}
            >
              <EditIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell align="right" onClick={() => navigate(`/indicadores/${ind.id}`)}>
        <Typography variant="body2" fontWeight={600}>
          {ind.ultimoAvance ? formatValue(ind.ultimoAvance.valorReal, ind.unidad) : '—'}
        </Typography>
      </TableCell>
      <TableCell onClick={() => navigate(`/indicadores/${ind.id}`)}>
        <SemaforoChip estado={ind.semaforo} />
      </TableCell>
    </TableRow>
  );
}

export default function MetasObjetivos() {
  const navigate = useNavigate();
  const { actualizarMeta } = useData();
  const perspectivas = getPerspectivas();
  const objetivos = getObjetivos();

  const [dialogo, setDialogo] = useState(null); // { ind }
  const [nuevaMeta, setNuevaMeta] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  function abrirEdicion(ind) {
    setNuevaMeta(ind.meta ? String(ind.meta.valorMeta) : '');
    setDialogo({ ind });
  }

  function handleGuardarMeta() {
    if (!dialogo || !nuevaMeta || isNaN(parseFloat(nuevaMeta))) return;
    actualizarMeta(dialogo.ind.id, parseFloat(nuevaMeta));
    setDialogo(null);
    setSnackbar(true);
  }

  return (
    <AppShell titulo="Metas y Objetivos">
      <PageHeader
        titulo="Metas y Objetivos BSC"
        subtitulo="Haz clic en el ícono ✏ para editar la meta de cualquier indicador"
      />

      {perspectivas.map((perspectiva) => {
        const indicadoresDef = getIndicadoresByPerspectiva(perspectiva.id);
        const objetivosPers = objetivos.filter((o) => o.perspectivaId === perspectiva.id);

        return (
          <Accordion key={perspectiva.id} defaultExpanded sx={{ mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: PERSPECTIVA_COLORS[perspectiva.id] + '10', borderLeft: `4px solid ${PERSPECTIVA_COLORS[perspectiva.id]}` }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" fontWeight={700}>{perspectiva.nombre}</Typography>
                <Chip label={`${indicadoresDef.length} indicadores`} size="small"
                  sx={{ bgcolor: PERSPECTIVA_COLORS[perspectiva.id], color: '#fff', fontWeight: 600 }} />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {objetivosPers.map((obj) => (
                <Box key={obj.id} sx={{ p: 2, borderBottom: '1px solid #EDEBE9' }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.25 }}>{obj.nombre}</Typography>
                  <Typography variant="caption" color="text.secondary">{obj.descripcion}</Typography>
                </Box>
              ))}
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Indicador</TableCell>
                      <TableCell>Fórmula</TableCell>
                      <TableCell>Meta</TableCell>
                      <TableCell align="right">Valor actual</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {indicadoresDef.map((indDef) => (
                      <FilaIndicador
                        key={indDef.id}
                        indDef={indDef}
                        navigate={navigate}
                        onEditMeta={abrirEdicion}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* Diálogo de edición de meta */}
      <Dialog open={!!dialogo} onClose={() => setDialogo(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Editar meta — {dialogo?.ind?.nombre}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Unidad: <strong>{dialogo?.ind?.unidad}</strong>
            {dialogo?.ind?.tipo === 'menor' && ' · Indicador inverso (menor es mejor)'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {dialogo?.ind?.formula}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label={`Nueva meta (${dialogo?.ind?.unidad ?? ''})`}
            type="number"
            value={nuevaMeta}
            onChange={(e) => setNuevaMeta(e.target.value)}
            inputProps={{ step: 'any' }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogo(null)} variant="outlined">Cancelar</Button>
          <Button
            onClick={handleGuardarMeta}
            variant="contained"
            disabled={!nuevaMeta || isNaN(parseFloat(nuevaMeta))}
          >
            Guardar meta
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbar(false)} sx={{ width: '100%' }}>
          Meta actualizada correctamente.
        </Alert>
      </Snackbar>
    </AppShell>
  );
}
