import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EmptyState({ mensaje = 'Sin datos disponibles', icon }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        color: 'text.secondary',
      }}
    >
      {icon && <Box sx={{ fontSize: 48, mb: 1, opacity: 0.4 }}>{icon}</Box>}
      <Typography variant="body2" color="text.secondary">
        {mensaje}
      </Typography>
    </Box>
  );
}
