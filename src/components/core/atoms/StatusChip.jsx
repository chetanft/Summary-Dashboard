import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Typography, Box } from '@mui/material';
import { colors } from '../../../theme/themeConfig';

/**
 * StatusChip component for displaying status indicators in a consistent way
 * 
 * @component
 * @example
 * <StatusChip status="success" label="Completed" />
 * <StatusChip status="error" label="Failed" />
 * <StatusChip status="warning" label="Pending" />
 */
const StatusChip = ({
  status = 'default',
  label,
  size = 'small',
  variant = 'filled',
  icon: Icon,
  count,
  ...props
}) => {
  // Define status color mapping
  const statusColors = {
    success: {
      main: colors.success.main,
      light: colors.success.light,
      contrastText: colors.success.contrastText,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      contrastText: colors.warning.contrastText,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      contrastText: colors.error.contrastText,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      contrastText: colors.info.contrastText,
    },
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      contrastText: colors.secondary.contrastText,
    },
    default: {
      main: colors.grey[500],
      light: colors.grey[100],
      contrastText: '#FFFFFF',
    },
  };

  // Get color based on status
  const colorSet = statusColors[status] || statusColors.default;

  // Define size variations
  const sizeProps = {
    small: {
      height: '24px',
      fontSize: '12px',
      iconSize: 16,
    },
    medium: {
      height: '32px',
      fontSize: '14px',
      iconSize: 20,
    },
    large: {
      height: '40px',
      fontSize: '16px',
      iconSize: 24,
    },
  };

  const currentSize = sizeProps[size] || sizeProps.small;

  // Define variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colorSet.main}`,
          color: colorSet.main,
        };
      case 'subtle':
        return {
          backgroundColor: colorSet.light,
          color: colorSet.main,
          border: 'none',
        };
      case 'filled':
      default:
        return {
          backgroundColor: colorSet.main,
          color: colorSet.contrastText,
          border: 'none',
        };
    }
  };

  const variantStyle = getVariantStyles();

  // Render chip with optional count
  return (
    <Chip
      label={
        count !== undefined ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              component="span"
              sx={{ fontWeight: 600, fontSize: currentSize.fontSize }}
            >
              {count}
            </Typography>
            {label && (
              <Typography
                component="span"
                sx={{ fontWeight: 500, fontSize: currentSize.fontSize }}
              >
                {label}
              </Typography>
            )}
          </Box>
        ) : (
          label
        )
      }
      icon={Icon ? <Icon style={{ fontSize: currentSize.iconSize }} /> : undefined}
      size={size === 'large' ? 'medium' : size}
      sx={{
        fontWeight: 500,
        fontSize: currentSize.fontSize,
        height: currentSize.height,
        borderRadius: '4px',
        ...variantStyle,
        ...props.sx,
      }}
      {...props}
    />
  );
};

StatusChip.propTypes = {
  /**
   * Status type that determines the color
   */
  status: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'info',
    'primary',
    'secondary',
    'default',
  ]),
  
  /**
   * Text label to display
   */
  label: PropTypes.node,
  
  /**
   * Size of the chip
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Visual variant of the chip
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'subtle']),
  
  /**
   * Optional icon component
   */
  icon: PropTypes.elementType,
  
  /**
   * Optional count to display
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default StatusChip;
