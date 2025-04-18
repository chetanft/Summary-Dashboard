import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { colors } from '../../../theme/themeConfig';

/**
 * TrendIndicator component for displaying value trends with directional indicators
 * 
 * @component
 * @example
 * <TrendIndicator value={5.2} />
 * <TrendIndicator value={-3.8} inverse={true} />
 */
const TrendIndicator = ({
  value,
  inverse = false,
  showIcon = true,
  size = 'medium',
  suffix = '%',
  ...props
}) => {
  // Determine if the trend is positive (considering the inverse prop)
  const isPositive = inverse ? value < 0 : value > 0;
  const isNeutral = value === 0;
  
  // Determine color based on trend direction
  const getColor = () => {
    if (isNeutral) return colors.grey[500];
    return isPositive ? colors.success.main : colors.error.main;
  };
  
  // Size variations
  const sizeMap = {
    small: {
      fontSize: '0.75rem',
      iconSize: 12,
    },
    medium: {
      fontSize: '0.875rem',
      iconSize: 16,
    },
    large: {
      fontSize: '1rem',
      iconSize: 20,
    },
  };
  
  const sizeProps = sizeMap[size] || sizeMap.medium;
  
  // Format the value
  const formattedValue = `${Math.abs(value).toFixed(1)}${suffix}`;
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: getColor(),
        ...props.sx,
      }}
      {...props}
    >
      {showIcon && !isNeutral && (
        isPositive ? (
          <ArrowUpward sx={{ fontSize: sizeProps.iconSize, mr: 0.5 }} />
        ) : (
          <ArrowDownward sx={{ fontSize: sizeProps.iconSize, mr: 0.5 }} />
        )
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: sizeProps.fontSize,
        }}
      >
        {formattedValue}
      </Typography>
    </Box>
  );
};

TrendIndicator.propTypes = {
  /**
   * The trend value to display
   */
  value: PropTypes.number.isRequired,
  
  /**
   * Whether to inverse the color logic (negative is good, positive is bad)
   */
  inverse: PropTypes.bool,
  
  /**
   * Whether to show the directional icon
   */
  showIcon: PropTypes.bool,
  
  /**
   * Size of the component
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Suffix to append to the value (e.g., '%')
   */
  suffix: PropTypes.string,
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default TrendIndicator;
