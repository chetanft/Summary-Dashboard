import { createTheme } from '@mui/material/styles';
import colorData from './colors.json';

// Color palette
const colors = {
  primary: {
    main: colorData.primary.main || '#434F64',
    light: colorData.primary.light || '#5F697B',
    dark: colorData.primary.dark || '#2D3748',
    contrastText: colorData.primary.contrastText || '#FFFFFF',
  },
  secondary: {
    main: colorData.text.primary,
    light: colorData.text.secondary,
    dark: colorData.text.dark,
    contrastText: '#FFFFFF',
  },
  error: {
    main: colorData.status.error.main || colorData.error[400],
    light: colorData.status.error.light || colorData.error[50],
    dark: colorData.status.error.dark || colorData.error[600],
    contrastText: '#FFFFFF',
  },
  warning: {
    main: colorData.status.warning.main || colorData.warning[400],
    light: colorData.status.warning.light || colorData.warning[50],
    dark: colorData.status.warning.dark || colorData.warning[600],
    contrastText: '#FFFFFF',
  },
  success: {
    main: colorData.status.success.main || colorData.success[500],
    light: colorData.status.success.light || colorData.success[50],
    dark: colorData.status.success.dark || colorData.success[600],
    contrastText: '#FFFFFF',
  },
  info: {
    main: colorData.status.info.main || colorData.info[500],
    light: colorData.status.info.light || colorData.info[50],
    dark: colorData.status.info.dark || colorData.info[600],
    contrastText: '#FFFFFF',
  },
  grey: colorData.grey,
  background: {
    default: colorData.background.default,
    paper: colorData.background.paper,
  },
  text: {
    primary: colorData.text.primary,
    secondary: colorData.text.secondary,
    disabled: colorData.text.disabled,
  },
  divider: colorData.divider,
  status: colorData.status,
  action: colorData.action,
};

// Typography
const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.2,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.2,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    textTransform: 'none',
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
};

// Spacing
const spacing = 8;

// Shape
const shape = {
  borderRadius: 8,
};

// Shadows
const shadows = [
  'none',
  '0px 1px 2px rgba(0, 0, 0, 0.05)',
  '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
  '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ...Array(18).fill('none'),
];

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
        boxShadow: 'none',
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
        boxShadow: shadows[1],
      },
      elevation1: {
        boxShadow: shadows[1],
      },
      elevation2: {
        boxShadow: shadows[2],
      },
      elevation3: {
        boxShadow: shadows[3],
      },
      elevation4: {
        boxShadow: shadows[4],
      },
      elevation5: {
        boxShadow: shadows[5],
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        boxShadow: shadows[1],
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
};

// Create and export theme
const theme = createTheme({
  palette: colors,
  typography,
  spacing,
  shape,
  shadows: [...shadows],
  components,
});

export default theme;

// Export individual theme parts for granular usage
export { colors, typography, spacing, shape, shadows, components };
