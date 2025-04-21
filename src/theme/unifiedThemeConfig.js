import { createTheme } from '@mui/material/styles';

// Import colors from existing theme files
const colors = {
  primary: {
    main: '#434F64',
    light: '#5F697B',
    dark: '#2D3748',
    contrastText: '#FFFFFF',
  },
  secondary: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  success: {
    main: '#00C638',
    light: '#DFFFEA',
    dark: '#00763D',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#FF3533',
    light: '#FFEBEA',
    dark: '#B80100',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FF6C19',
    light: '#FFEBDC',
    dark: '#DD6A00',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#4299E1',
    light: '#E6F7FF',
    dark: '#2A69AC',
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#434F64',
    secondary: '#5F697B',
    disabled: '#A0AEC0',
  },
  background: {
    default: '#F7FAFC',
    paper: '#FFFFFF',
    light: '#F5F7FA',
  },
  divider: '#E0E4E8',
  grey: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
};

// Define typography
const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
};

// Define shadows
const shadows = [
  'none',
  '0px 1px 3px rgba(0, 0, 0, 0.1)',
  '0px 2px 6px rgba(0, 0, 0, 0.15)',
  '0px 4px 10px rgba(0, 0, 0, 0.2)',
  '0px 8px 16px rgba(0, 0, 0, 0.25)',
  '0px 12px 24px rgba(0, 0, 0, 0.3)',
];

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        padding: '8px 16px',
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      contained: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        borderWidth: 1,
        '&:hover': {
          borderWidth: 1,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
      elevation1: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
      elevation2: {
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      },
      elevation3: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      },
      elevation4: {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
      },
      elevation5: {
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: '12px 16px',
      },
      head: {
        fontWeight: 600,
        backgroundColor: colors.background.light,
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 4,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: colors.grey[800],
        fontSize: '0.75rem',
        padding: '8px 12px',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 8,
      },
    },
  },
};

// Create theme
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
    },
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    text: colors.text,
    background: colors.background,
    divider: colors.divider,
    grey: colors.grey,
  },
  typography,
  shadows,
  components,
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
});

export default theme;
