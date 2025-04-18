import { colors } from './themeConfig';

/**
 * Common styling patterns for reuse across components
 */

// Card styling with consistent border, padding, and border radius
export const cardStyle = {
  border: `1px solid ${colors.divider}`,
  borderRadius: 2,
  padding: 3,
  backgroundColor: colors.background.paper,
};

// Flex container with common alignment options
export const flexContainer = (direction = 'row', justify = 'flex-start', align = 'center') => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
});

// Grid container with responsive spacing
export const gridContainer = (spacing = 2) => ({
  display: 'grid',
  gap: spacing,
});

// Status indicator styling based on status type
export const statusIndicator = (status) => {
  const statusColors = {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    default: colors.grey[500],
  };

  const statusColor = statusColors[status] || statusColors.default;

  return {
    backgroundColor: statusColor.light,
    color: statusColor.main,
    borderRadius: 1,
    padding: '4px 8px',
    fontWeight: 500,
    fontSize: '0.75rem',
    display: 'inline-flex',
    alignItems: 'center',
  };
};

// Truncate text with ellipsis
export const truncateText = (lines = 1) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
});

// Responsive styles for different breakpoints
export const responsive = {
  mobile: {
    display: { xs: 'block', sm: 'none' },
  },
  tablet: {
    display: { xs: 'none', sm: 'block', md: 'block', lg: 'none' },
  },
  desktop: {
    display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
  },
  hideOnMobile: {
    display: { xs: 'none', sm: 'block' },
  },
  showOnMobile: {
    display: { xs: 'block', sm: 'none' },
  },
};

// Animation keyframes and transitions
export const animations = {
  fadeIn: {
    opacity: 0,
    animation: 'fadeIn 0.3s ease-in-out forwards',
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
  slideIn: {
    transform: 'translateY(20px)',
    opacity: 0,
    animation: 'slideIn 0.3s ease-in-out forwards',
    '@keyframes slideIn': {
      '0%': {
        transform: 'translateY(20px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
};

// Common form field styling
export const formField = {
  marginBottom: 2,
  '& .MuiInputLabel-root': {
    color: colors.text.secondary,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary.main,
      borderWidth: 1,
    },
  },
};

// Shadow variations
export const shadows = {
  sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  none: 'none',
};
