import Chip from '@mui/material/Chip';
import { SEMAFORO_COLORS, SEMAFORO_BG, SEMAFORO_LABEL } from '../../utils/semaforo';

const ICONS = { verde: '●', amarillo: '●', rojo: '●' };

export default function SemaforoChip({ estado, size = 'small' }) {
  if (!estado) return null;
  return (
    <Chip
      label={`${ICONS[estado]} ${SEMAFORO_LABEL[estado]}`}
      size={size}
      sx={{
        backgroundColor: SEMAFORO_BG[estado],
        color: SEMAFORO_COLORS[estado],
        fontWeight: 700,
        border: `1px solid ${SEMAFORO_COLORS[estado]}30`,
      }}
    />
  );
}
