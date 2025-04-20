import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Text } from '../typography';

/**
 * Badge component for displaying status indicators or labels.
 */
const Badge = ({
  label,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  icon,
  className,
  sx = {},
  ...props
}) => {
  // Color mapping for different variants
  const colorMap = {
    primary: {
      filled: {
        backgroundColor: 'var(--color-primary-light, #E3F2FD)',
        color: 'var(--color-primary-dark, #1976D2)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-primary-main, #2196F3)',
        border: '1px solid var(--color-primary-main, #2196F3)',
      },
    },
    secondary: {
      filled: {
        backgroundColor: 'var(--color-secondary-light, #F3E5F5)',
        color: 'var(--color-secondary-dark, #7B1FA2)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-secondary-main, #9C27B0)',
        border: '1px solid var(--color-secondary-main, #9C27B0)',
      },
    },
    success: {
      filled: {
        backgroundColor: 'var(--color-success-light, #E8F5E9)',
        color: 'var(--color-success-dark, #388E3C)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-success-main, #4CAF50)',
        border: '1px solid var(--color-success-main, #4CAF50)',
      },
    },
    warning: {
      filled: {
        backgroundColor: 'var(--color-warning-light, #FFF8E1)',
        color: 'var(--color-warning-dark, #F57C00)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-warning-main, #FF9800)',
        border: '1px solid var(--color-warning-main, #FF9800)',
      },
    },
    error: {
      filled: {
        backgroundColor: 'var(--color-error-light, #FFEBEE)',
        color: 'var(--color-error-dark, #D32F2F)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-error-main, #F44336)',
        border: '1px solid var(--color-error-main, #F44336)',
      },
    },
    info: {
      filled: {
        backgroundColor: 'var(--color-info-light, #E1F5FE)',
        color: 'var(--color-info-dark, #0288D1)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-info-main, #03A9F4)',
        border: '1px solid var(--color-info-main, #03A9F4)',
      },
    },
    default: {
      filled: {
        backgroundColor: 'var(--color-grey-200, #EEEEEE)',
        color: 'var(--color-grey-800, #424242)',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: 'var(--color-grey-600, #757575)',
        border: '1px solid var(--color-grey-400, #BDBDBD)',
      },
    },
  };

  // Size mapping
  const sizeMap = {
    small: {
      padding: '2px 8px',
      fontSize: '0.75rem',
      borderRadius: '4px',
    },
    medium: {
      padding: '4px 12px',
      fontSize: '0.875rem',
      borderRadius: '6px',
    },
    large: {
      padding: '6px 16px',
      fontSize: '1rem',
      borderRadius: '8px',
    },
  };

  // Get styles based on variant, color, and size
  const colorStyles = colorMap[color]?.[variant] || colorMap.default[variant];
  const sizeStyles = sizeMap[size] || sizeMap.medium;

  // Base styles for the badge
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    ...colorStyles,
    ...sizeStyles,
    ...sx,
  };

  return (
    <Box
      component="span"
      className={`badge badge-${variant} badge-${color} badge-${size} ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      {icon && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            marginRight: '4px',
            '& svg': {
              fontSize: sizeMap[size].fontSize,
            },
          }}
        >
          {icon}
        </Box>
      )}
      <Text
        component="span"
        size={size === 'large' ? 'medium' : size === 'medium' ? 'small' : 'small'}
        sx={{ lineHeight: 1.2 }}
      >
        {label}
      </Text>
    </Box>
  );
};

Badge.propTypes = {
  /** The text to display in the badge */
  label: PropTypes.node.isRequired,
  /** The variant of the badge */
  variant: PropTypes.oneOf(['filled', 'outlined']),
  /** The color of the badge */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'default']),
  /** The size of the badge */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Optional icon to display before the label */
  icon: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Badge;
