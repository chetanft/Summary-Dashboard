import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { statusIndicator } from '../../../theme/styleUtils';
import { colors } from '../../../theme/themeConfig';

/**
 * StatusBadge component for displaying status indicators
 * 
 * @component
 * @example
 * <StatusBadge status="success" label="Completed" />
 * <StatusBadge status="error" label="Failed" />
 * <StatusBadge status="warning" label="Pending" />
 */
const StatusBadge = ({ 
  status = 'default', 
  label, 
  icon: Icon, 
  size = 'medium',
  variant = 'contained',
  ...props 
}) => {
  // Define size variations
  const sizeMap = {
    small: {
      py: 0.25,
      px: 1,
      fontSize: '0.75rem',
      iconSize: 14,
    },
    medium: {
      py: 0.5,
      px: 1.5,
      fontSize: '0.875rem',
      iconSize: 16,
    },
    large: {
      py: 0.75,
      px: 2,
      fontSize: '1rem',
      iconSize: 20,
    },
  };

  // Get status color
  const getStatusColor = () => {
    const statusColors = {
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      default: colors.grey[500],
    };
    
    return statusColors[status] || statusColors.default;
  };

  const statusColor = getStatusColor();
  const sizeProps = sizeMap[size] || sizeMap.medium;

  // Style based on variant
  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${statusColor.main}`,
          color: statusColor.main,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: statusColor.main,
        };
      case 'contained':
      default:
        return {
          backgroundColor: statusColor.light,
          color: statusColor.main,
        };
    }
  };

  const variantStyle = getVariantStyle();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '16px',
        py: sizeProps.py,
        px: sizeProps.px,
        ...variantStyle,
        ...props.sx,
      }}
      {...props}
    >
      {Icon && (
        <Box sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
          <Icon fontSize="inherit" style={{ fontSize: sizeProps.iconSize }} />
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: sizeProps.fontSize,
          lineHeight: 1.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

StatusBadge.propTypes = {
  /**
   * Status type that determines the color
   */
  status: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'default']),
  
  /**
   * Text label to display
   */
  label: PropTypes.string.isRequired,
  
  /**
   * Optional icon component to display before the label
   */
  icon: PropTypes.elementType,
  
  /**
   * Size of the badge
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Variant style of the badge
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default StatusBadge;
