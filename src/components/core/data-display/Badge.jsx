import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

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
  // Color mapping for different variants based on design specs
  const colorMap = {
    primary: {
      filled: {
        backgroundColor: '#E3F2FD',
        color: '#1976D2',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#2196F3',
        border: '1px solid #2196F3',
      },
    },
    secondary: {
      filled: {
        backgroundColor: '#F3E5F5',
        color: '#7B1FA2',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#9C27B0',
        border: '1px solid #9C27B0',
      },
    },
    success: {
      filled: {
        backgroundColor: '#DFFFE8',
        color: '#00763D',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#00763D',
        border: '1px solid #00763D',
      },
    },
    warning: {
      filled: {
        backgroundColor: '#FFEBDC',
        color: '#FF6C19',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#FF6C19',
        border: '1px solid #FF6C19',
      },
    },
    error: {
      filled: {
        backgroundColor: '#FFEAEA',
        color: '#FF3533',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#FF3533',
        border: '1px solid #FF3533',
      },
    },
    info: {
      filled: {
        backgroundColor: '#E1F5FE',
        color: '#0288D1',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#03A9F4',
        border: '1px solid #03A9F4',
      },
    },
    default: {
      filled: {
        backgroundColor: '#F0F1F7',
        color: '#434F64',
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#434F64',
        border: '1px solid #434F64',
      },
    },
  };

  // Size mapping based on design specs
  const sizeMap = {
    small: {
      padding: '2px 8px',
      fontSize: '12px',
      borderRadius: '4px',
      gap: '8px',
    },
    medium: {
      padding: '2px 8px',
      fontSize: '14px',
      borderRadius: '4px',
      gap: '8px',
    },
    large: {
      padding: '2px 8px',
      fontSize: '16px',
      borderRadius: '4px',
      gap: '8px',
    },
  };

  // Get styles based on variant, color, and size
  const colorStyles = colorMap[color]?.[variant] || colorMap.default[variant];
  const sizeStyles = sizeMap[size] || sizeMap.medium;

  // Base styles for the badge based on design specs
  const baseStyles = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontFamily: '"Inter", sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '140%',
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
            marginRight: '8px',
            '& svg': {
              fontSize: sizeMap[size].fontSize,
            },
          }}
        >
          {icon}
        </Box>
      )}
      {label}
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
