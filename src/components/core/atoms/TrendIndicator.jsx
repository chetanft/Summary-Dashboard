import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

/**
 * TrendIndicator component for displaying trend values with up/down arrows
 * 
 * @component
 * @example
 * <TrendIndicator value={5.2} />
 */
const TrendIndicator = ({
  value,
  inverse = false,
  showIcon = true,
  size = 'medium',
  ...props
}) => {
  const theme = useTheme();
  
  // Determine if the trend is positive, negative, or neutral
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;
  
  // Determine if the trend is good or bad based on the inverse prop
  const isGood = inverse ? isNegative : isPositive;
  const isBad = inverse ? isPositive : isNegative;
  
  // Get the color based on whether the trend is good or bad
  const getColor = () => {
    if (isNeutral) return theme.palette.text.secondary;
    if (isGood) return theme.palette.success.main;
    if (isBad) return theme.palette.error.main;
    return theme.palette.text.secondary;
  };
  
  // Size variations
  const sizeMap = {
    small: {
      fontSize: '0.75rem',
      iconSize: '0.875rem',
    },
    medium: {
      fontSize: '0.875rem',
      iconSize: '1rem',
    },
    large: {
      fontSize: '1rem',
      iconSize: '1.25rem',
    },
  };
  
  const sizeProps = sizeMap[size] || sizeMap.medium;
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      {showIcon && !isNeutral && (
        isPositive ? (
          <ArrowUpwardIcon
            sx={{
              fontSize: sizeProps.iconSize,
              color: getColor(),
              mr: 0.5,
            }}
          />
        ) : (
          <ArrowDownwardIcon
            sx={{
              fontSize: sizeProps.iconSize,
              color: getColor(),
              mr: 0.5,
            }}
          />
        )
      )}
      <Typography
        variant="body2"
        sx={{
          fontSize: sizeProps.fontSize,
          fontWeight: 500,
          color: getColor(),
        }}
      >
        {isNeutral ? 'No change' : `${Math.abs(value).toFixed(1)}%`}
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
   * Whether to inverse the trend indicator (negative is good, positive is bad)
   */
  inverse: PropTypes.bool,
  
  /**
   * Whether to show the trend icon
   */
  showIcon: PropTypes.bool,
  
  /**
   * Size of the trend indicator
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default TrendIndicator;
