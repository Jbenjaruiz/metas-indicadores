import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ titulo, subtitulo, breadcrumbs = [], actions }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs sx={{ mb: 0.5 }}>
          {breadcrumbs.map((crumb, i) =>
            crumb.href ? (
              <Link
                key={i}
                component="button"
                variant="caption"
                color="text.secondary"
                underline="hover"
                onClick={() => navigate(crumb.href)}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography key={i} variant="caption" color="text.primary">
                {crumb.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h2" color="text.primary">{titulo}</Typography>
          {subtitulo && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {subtitulo}
            </Typography>
          )}
        </Box>
        {actions && <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>}
      </Box>
    </Box>
  );
}
