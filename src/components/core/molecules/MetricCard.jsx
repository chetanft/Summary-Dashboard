import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Tooltip, Skeleton } from '@mui/material';
import TrendIndicator from './TrendIndicator';
import { truncateText } from '../../../theme/styleUtils';
import { colors } from '../../../theme/themeConfig';

/**
 * MetricCard component for displaying KPI metrics with optional trend indicators
 * 
 * @component
 * @example
 * <MetricCard 
 *   title="Revenue" 
 *   value={1234.56} 
 *   format="currency" 
 *   trend={5.2} 
 *   icon={<AttachMoneyIcon />} 
 * />
 */
const MetricCard = ({
  title,
  subtitle,
  value,
  secondaryValue,
  format,
  trend,
  trendInverse = false,
  icon: Icon,
  loading = false,
  variant = 'default',
  size = 'medium',
  status,
  onClick,
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
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
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

  // Size variations
  const sizeMap = {
    small: {
      height: 100,
      padding: 1.5,
      titleVariant: 'caption',
      valueVariant: 'h6',
      iconSize: 20,
    },
    medium: {
      height: 120,
      padding: 2,
      titleVariant: 'body2',
      valueVariant: 'h5',
      iconSize: 24,
    },
    large: {
      height: 150,
      padding: 2.5,
      titleVariant: 'subtitle2',
      valueVariant: 'h4',
      iconSize: 32,
    },
  };

  const sizeProps = sizeMap[size] || sizeMap.medium;

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${colors.divider}`,
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: colors.primary.light,
          color: colors.primary.main,
        };
      case 'elevated':
        return {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        };
      case 'status':
        const statusColor = status ? colors[status]?.light || colors.grey[100] : colors.grey[100];
        return {
          backgroundColor: statusColor,
          border: `1px solid ${colors[status]?.main || colors.grey[300]}`,
        };
      case 'default':
      default:
        return {
          border: `1px solid ${colors.divider}`,
          boxShadow: 'none',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Paper
      elevation={0}
      sx={{
        height: sizeProps.height,
        padding: sizeProps.padding,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        } : {},
        ...variantStyles,
        ...props.sx,
      }}
      onClick={onClick}
      {...props}
    >
      {/* Header with title and icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box>
          <Tooltip title={title} arrow>
            <Typography
              variant={sizeProps.titleVariant}
              color="text.secondary"
              sx={{
                fontWeight: 500,
                ...truncateText(1),
                maxWidth: '100%',
              }}
            >
              {loading ? <Skeleton width={100} /> : title}
            </Typography>
          </Tooltip>
          
          {subtitle && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mt: 0.5,
                ...truncateText(1),
              }}
            >
              {loading ? <Skeleton width={80} /> : subtitle}
            </Typography>
          )}
        </Box>
        
        {Icon && !loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: status ? colors[status]?.main : 'inherit',
            }}
          >
            <Icon style={{ fontSize: sizeProps.iconSize }} />
          </Box>
        )}
        
        {Icon && loading && (
          <Skeleton variant="circular" width={sizeProps.iconSize} height={sizeProps.iconSize} />
        )}
      </Box>
      
      {/* Value and trend */}
      <Box sx={{ mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Typography
            variant={sizeProps.valueVariant}
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {loading ? (
              <Skeleton width={80} height={40} />
            ) : (
              formatValue(value)
            )}
          </Typography>
          
          {secondaryValue && !loading && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, ml: 1 }}
            >
              {formatValue(secondaryValue)}
            </Typography>
          )}
          
          {trend !== undefined && !loading && (
            <Box sx={{ ml: 'auto' }}>
              <TrendIndicator
                value={trend}
                inverse={trendInverse}
                size={size === 'large' ? 'medium' : 'small'}
              />
            </Box>
          )}
          
          {trend !== undefined && loading && (
            <Skeleton width={50} height={24} sx={{ ml: 'auto' }} />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

MetricCard.propTypes = {
  /**
   * Title of the metric card
   */
  title: PropTypes.string.isRequired,
  
  /**
   * Optional subtitle
   */
  subtitle: PropTypes.string,
  
  /**
   * Primary value to display
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /**
   * Optional secondary value to display
   */
  secondaryValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /**
   * Format to apply to the value
   */
  format: PropTypes.oneOf(['currency', 'percentage', 'number', 'decimal']),
  
  /**
   * Optional trend value
   */
  trend: PropTypes.number,
  
  /**
   * Whether to inverse the trend indicator (negative is good, positive is bad)
   */
  trendInverse: PropTypes.bool,
  
  /**
   * Optional icon component
   */
  icon: PropTypes.elementType,
  
  /**
   * Whether the card is in loading state
   */
  loading: PropTypes.bool,
  
  /**
   * Visual variant of the card
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'elevated', 'status']),
  
  /**
   * Size of the card
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Status color theme (used with variant="status")
   */
  status: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default MetricCard;
