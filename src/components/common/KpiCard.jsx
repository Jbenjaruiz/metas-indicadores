import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SemaforoChip from '../semaforo/SemaforoChip';
import { formatValue, formatPct } from '../../utils/formatters';

export default function KpiCard({ titulo, valor, unidad, meta, semaforo, cumplimiento, icono, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s',
        '&:hover': onClick ? { boxShadow: 3 } : {},
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1.3, maxWidth: '75%' }}>
            {titulo}
          </Typography>
          {icono && (
            <Box sx={{ color: 'primary.main', opacity: 0.7, fontSize: 20 }}>
              {icono}
            </Box>
          )}
        </Box>

        <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 700, color: 'text.primary', lineHeight: 1.1 }}>
          {formatValue(valor, unidad)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
          <SemaforoChip estado={semaforo} />
          {cumplimiento != null && (
            <Typography variant="caption" color="text.secondary">
              {formatPct(cumplimiento)} cumplimiento
            </Typography>
          )}
        </Box>

        {meta != null && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Meta: {formatValue(meta, unidad)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
