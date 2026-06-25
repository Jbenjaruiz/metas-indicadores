import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { SEMAFORO_COLORS, SEMAFORO_LABEL } from '../../utils/semaforo';

export default function SemaforoDot({ estado, size = 14 }) {
  if (!estado) return null;
  return (
    <Tooltip title={SEMAFORO_LABEL[estado]} arrow>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: SEMAFORO_COLORS[estado],
          flexShrink: 0,
          boxShadow: `0 0 0 3px ${SEMAFORO_COLORS[estado]}25`,
        }}
      />
    </Tooltip>
  );
}
