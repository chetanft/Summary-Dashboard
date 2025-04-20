import { createTheme } from '@mui/material/styles';
import colorData from './colors.json';

// Convert RGB values from Typography.json to hex
const rgbToHex = (r, g, b) => {
  const toHex = (c) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Color palette - Using dark gray as primary instead of blue
const colors = {
  primary: {
    main: '#434F64', // Dark gray as primary color
    light: '#5F697B',
    dark: '#2D3748',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: colorData.text.primary,
    light: colorData.text.secondary,
    dark: colorData.text.dark,
    contrastText: '#FFFFFF',
  },
  error: {
    main: rgbToHex(1, 0.209, 0.199), // Critical from Colors.json
    light: rgbToHex(1, 0.917, 0.916), // Critical - Light from Colors.json
    dark: rgbToHex(0.721, 0.005, 0), // Critical - Dark from Colors.json
    contrastText: '#FFFFFF',
  },
  warning: {
    main: rgbToHex(1, 0.424, 0.098), // Warning from Colors.json
    light: rgbToHex(1, 0.922, 0.863), // Warning - Light from Colors.json
    dark: rgbToHex(0.867, 0.416, 0), // Warning - Dark from Colors.json
    contrastText: '#FFFFFF',
  },
  success: {
    main: rgbToHex(0, 0.776, 0.220), // Positive from Colors.json
    light: rgbToHex(0.875, 1, 0.910), // Positive - Light from Colors.json
    dark: rgbToHex(0, 0.463, 0.240), // Positive - Dark from Colors.json
    contrastText: '#FFFFFF',
  },
  info: {
    main: colorData.status.info.main,
    light: colorData.status.info.light,
    dark: colorData.status.info.dark,
    contrastText: '#FFFFFF',
  },
  grey: {
    50: rgbToHex(0.973, 0.973, 0.976), // BG from Colors.json
    100: rgbToHex(0.941, 0.945, 0.969), // Divider from Colors.json
    200: colorData.grey[200],
    300: colorData.grey[300],
    400: colorData.grey[400],
    500: rgbToHex(0.514, 0.549, 0.616), // Dark 25 from Colors.json
    600: rgbToHex(0.373, 0.412, 0.482), // Dark 50 from Colors.json
    700: rgbToHex(0.263, 0.310, 0.392), // Dark 100 from Colors.json
    800: colorData.grey[800],
    900: colorData.grey[900],
  },
  background: {
    default: rgbToHex(0.973, 0.973, 0.976), // BG from Colors.json
    paper: rgbToHex(1, 1, 1), // Super White from Colors.json
  },
  text: {
    primary: rgbToHex(0.263, 0.310, 0.392), // Dark 100 from Colors.json
    secondary: rgbToHex(0.373, 0.412, 0.482), // Dark 50 from Colors.json
    disabled: rgbToHex(0.514, 0.549, 0.616), // Dark 25 from Colors.json
  },
  divider: rgbToHex(0.941, 0.945, 0.969), // Divider from Colors.json
  status: {
    success: {
      main: rgbToHex(0, 0.776, 0.220), // Positive from Colors.json
      light: rgbToHex(0.875, 1, 0.910), // Positive - Light from Colors.json
      dark: rgbToHex(0, 0.463, 0.240), // Positive - Dark from Colors.json
    },
    error: {
      main: rgbToHex(1, 0.209, 0.199), // Critical from Colors.json
      light: rgbToHex(1, 0.917, 0.916), // Critical - Light from Colors.json
      dark: rgbToHex(0.721, 0.005, 0), // Critical - Dark from Colors.json
    },
    warning: {
      main: rgbToHex(1, 0.424, 0.098), // Warning from Colors.json
      light: rgbToHex(1, 0.922, 0.863), // Warning - Light from Colors.json
      dark: rgbToHex(0.867, 0.416, 0), // Warning - Dark from Colors.json
    },
    info: {
      main: colorData.status.info.main,
      light: colorData.status.info.light,
      dark: colorData.status.info.dark,
    },
  },
  action: colorData.action,
};

// Typography based on Typography.json
const typography = {
  fontFamily: 'Inter, sans-serif', // font/family/title primary from Typography.json
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600, // font/weight/semibold from Typography.json
    fontSize: '28px', // font/sizes/xxl from Typography.json
    lineHeight: 1.4,
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '24px', // font/sizes/xl from Typography.json
    lineHeight: 1.4,
  },
  h3: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '20px', // font/sizes/lg from Typography.json
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '16px', // font/sizes/md from Typography.json
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px', // font/sizes/sm from Typography.json
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '12px', // Smaller than font/sizes/sm
    lineHeight: 1.4,
  },
  subtitle1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500, // font/weight/medium from Typography.json
    fontSize: '16px', // font/sizes/md from Typography.json
    lineHeight: 1.4,
  },
  subtitle2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '14px', // font/sizes/sm from Typography.json
    lineHeight: 1.4,
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400, // font/weight/regular from Typography.json
    fontSize: '16px', // font/sizes/md from Typography.json
    lineHeight: 1.4,
  },
  body2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px', // font/sizes/sm from Typography.json
    lineHeight: 1.4,
  },
  button: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '14px', // font/sizes/sm from Typography.json
    lineHeight: 1.4,
    textTransform: 'none',
  },
  caption: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px', // Smaller than font/sizes/sm
    lineHeight: 1.4,
  },
  overline: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '12px', // Smaller than font/sizes/sm
    lineHeight: 1.4,
    textTransform: 'uppercase',
  },
};

// Spacing
const spacing = 8;

// Shape
const shape = {
  borderRadius: 4, // Reduced from 8 to match the badge border-radius
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
        borderRadius: 4,
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
        borderRadius: 4,
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
        borderRadius: 4,
        boxShadow: shadows[1],
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 4,
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
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: 'Inter, sans-serif',
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
