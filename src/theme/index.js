import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0078D4',
      light: '#2B88D8',
      dark: '#005A9E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#605E5C',
      light: '#8A8886',
      dark: '#3B3A39',
    },
    success: {
      main: '#107C10',
      light: '#54A354',
      dark: '#0B5C0B',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFB900',
      light: '#FFC83D',
      dark: '#C78A00',
      contrastText: '#000000',
    },
    error: {
      main: '#D13438',
      light: '#DA5D5F',
      dark: '#A02020',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F3F2F1',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#201F1E',
      secondary: '#605E5C',
    },
    divider: '#EDEBE9',
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2rem' },
    h2: { fontWeight: 700, fontSize: '1.5rem' },
    h3: { fontWeight: 600, fontSize: '1.25rem' },
    h4: { fontWeight: 600, fontSize: '1.125rem' },
    h5: { fontWeight: 600, fontSize: '1rem' },
    h6: { fontWeight: 600, fontSize: '0.875rem' },
    subtitle1: { fontWeight: 600 },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.8125rem' },
    caption: { fontSize: '0.75rem', color: '#605E5C' },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.08)',
    '0 2px 6px rgba(0,0,0,0.10)',
    '0 4px 12px rgba(0,0,0,0.10)',
    '0 8px 24px rgba(0,0,0,0.12)',
    ...Array(20).fill('none'),
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid #EDEBE9',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 4,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#F3F2F1',
          fontSize: '0.8125rem',
          color: '#201F1E',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;
