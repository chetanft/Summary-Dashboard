import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Tooltip } from '@mui/material';
import { truncateText } from '../../../theme/styleUtils';

/**
 * ValueDisplay component for displaying a value with optional label, icon, and formatting
 * 
 * @component
 * @example
 * <ValueDisplay label="Revenue" value={1234.56} format="currency" />
 * <ValueDisplay label="Completion" value={75} format="percentage" />
 * <ValueDisplay label="Status" value="Active" icon={<CheckCircleIcon />} />
 */
const ValueDisplay = ({
  label,
  value,
  format,
  icon: Icon,
  size = 'medium',
  color = 'primary',
  align = 'left',
  tooltip,
  truncate = false,
  ...props
}) => {
  // Format the value based on the format prop
  const formatValue = (val) => {
    if (val === undefined || val === null) {
      return '-';
    }

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(val);
      case 'percentage':
        return `${Number(val).toFixed(1)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(val);
      case 'decimal':
        return Number(val).toFixed(1);
      default:
        return val.toString();
    }
  };

  // Define size variations
  const sizeMap = {
    small: {
      labelVariant: 'caption',
      valueVariant: 'body2',
      iconSize: 16,
      spacing: 0.5,
    },
    medium: {
      labelVariant: 'body2',
      valueVariant: 'h6',
      iconSize: 20,
      spacing: 1,
    },
    large: {
      labelVariant: 'subtitle2',
      valueVariant: 'h5',
      iconSize: 24,
      spacing: 1.5,
    },
  };

  // Get size properties
  const sizeProps = sizeMap[size] || sizeMap.medium;

  // Define color variations
  const colorMap = {
    primary: 'primary.main',
    secondary: 'secondary.main',
    success: 'success.main',
    warning: 'warning.main',
    error: 'error.main',
    info: 'info.main',
    default: 'text.primary',
  };

  // Get color property
  const colorValue = colorMap[color] || colorMap.default;

  // Format the displayed value
  const displayValue = formatValue(value);

  // Create the component content
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        ...props.sx,
      }}
      {...props}
    >
      {label && (
        <Typography
          variant={sizeProps.labelVariant}
          color="text.secondary"
          sx={{
            mb: sizeProps.spacing,
            ...(truncate && truncateText(1)),
          }}
        >
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <Icon style={{ fontSize: sizeProps.iconSize, color: colorValue }} />
          </Box>
        )}
        <Typography
          variant={sizeProps.valueVariant}
          color={colorValue}
          fontWeight={500}
          sx={{
            ...(truncate && truncateText(1)),
          }}
        >
          {displayValue}
        </Typography>
      </Box>
    </Box>
  );

  // Wrap with tooltip if provided
  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

ValueDisplay.propTypes = {
  /**
   * Optional label to display above the value
   */
  label: PropTypes.string,
  
  /**
   * The value to display
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  
  /**
   * Format to apply to the value
   */
  format: PropTypes.oneOf(['currency', 'percentage', 'number', 'decimal']),
  
  /**
   * Optional icon component to display before the value
   */
  icon: PropTypes.elementType,
  
  /**
   * Size of the component
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Color theme for the value
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'default']),
  
  /**
   * Alignment of the content
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),
  
  /**
   * Optional tooltip text
   */
  tooltip: PropTypes.string,
  
  /**
   * Whether to truncate text with ellipsis
   */
  truncate: PropTypes.bool,
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default ValueDisplay;
