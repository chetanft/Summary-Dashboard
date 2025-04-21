import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Tooltip, IconButton, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import TrendIndicator from '../atoms/TrendIndicator';

/**
 * Enhanced MetricCard component for displaying KPI metrics with optional trend indicators and charts
 * This component combines functionality from HeroKPI, SecondaryKPI, and MetricCard
 * 
 * @component
 * @example
 * <EnhancedMetricCard 
 *   title="Revenue" 
 *   value={1234.56} 
 *   format="currency" 
 *   trend={5.2} 
 *   icon={<AttachMoneyIcon />} 
 * />
 */
const EnhancedMetricCard = ({
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
  tooltip,
  chart,
  chartHeight = 200,
  onClick,
  onDrillDown,
  additionalInfo,
  note,
  userRole,
  ...props
}) => {
  const theme = useTheme();
  
  // Format the value based on the format prop
  const formatValue = (val) => {
    if (val === undefined || val === null) {
      return '-';
    }
    
    if (typeof val === 'string') {
      return val;
    }
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'decimal':
        return val.toFixed(2);
      case 'number':
      default:
        return new Intl.NumberFormat('en-IN').format(val);
    }
  };
  
  // Get role-specific title suffix
  const getRoleSuffix = () => {
    if (!userRole) return "";
    if (userRole === 'Branch User') return " (Branch)";
    if (userRole === 'Company User') return " (Company)";
    if (userRole === 'CXO') return " (Pan-India)";
    return "";
  };
  
  // Size variations
  const sizeMap = {
    small: {
      padding: theme.spacing(2),
      titleSize: '0.875rem',
      valueSize: '1.25rem',
      height: chart ? '300px' : 'auto',
    },
    medium: {
      padding: theme.spacing(3),
      titleSize: '1rem',
      valueSize: '1.5rem',
      height: chart ? '350px' : 'auto',
    },
    large: {
      padding: theme.spacing(4),
      titleSize: '1.125rem',
      valueSize: '2rem',
      height: chart ? '400px' : 'auto',
    },
  };
  
  const sizeProps = sizeMap[size] || sizeMap.medium;
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: theme.palette.background.default,
        };
      case 'elevated':
        return {
          boxShadow: theme.shadows[2],
        };
      case 'status':
        const statusColors = {
          success: {
            backgroundColor: theme.palette.success.light,
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
          },
          warning: {
            backgroundColor: theme.palette.warning.light,
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
          },
          error: {
            backgroundColor: theme.palette.error.light,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
          },
          default: {
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          },
        };
        
        const statusStyle = statusColors[status] || statusColors.default;
        
        return {
          backgroundColor: statusStyle.backgroundColor,
          borderLeft: `4px solid ${statusStyle.borderColor}`,
          boxShadow: 'none',
        };
      default:
        return {};
    }
  };
  
  const variantStyles = getVariantStyles();
  
  return (
    <Paper
      elevation={variant === 'elevated' ? 2 : 0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: sizeProps.padding,
        width: '100%',
        height: sizeProps.height,
        ...variantStyles,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s ease',
        '&:hover': onClick ? {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        } : {},
        ...props.sx,
      }}
      onClick={onClick}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {Icon && (
            <Box sx={{ mr: 1 }}>
              <Icon fontSize="small" color="action" />
            </Box>
          )}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: sizeProps.titleSize,
              color: theme.palette.text.secondary,
            }}
          >
            {title}{getRoleSuffix()}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoOutlinedIcon sx={{ ml: 0.5, fontSize: '1rem', color: theme.palette.action.active }} />
            </Tooltip>
          )}
        </Box>
        {onDrillDown && (
          <Tooltip title="View details">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDrillDown({
                  id: title.toLowerCase().replace(/\\s+/g, '_'),
                  title,
                  unit: title.includes('%') ? '%' : '',
                });
              }}
            >
              {size === 'large' ? (
                <OpenInFullIcon sx={{ fontSize: 18, color: theme.palette.action.active }} />
              ) : (
                <ZoomInIcon sx={{ fontSize: 18, color: theme.palette.action.active }} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      
      {/* Value */}
      <Box sx={{ mb: chart ? 2 : 0, flexGrow: chart ? 0 : 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: sizeProps.valueSize,
            color: theme.palette.text.primary,
          }}
        >
          {formatValue(value)}
        </Typography>
        
        {secondaryValue && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 0.5,
            }}
          >
            {secondaryValue}
          </Typography>
        )}
        
        {trend !== undefined && (
          <Box sx={{ mt: 1 }}>
            <TrendIndicator value={trend} inverse={trendInverse} />
          </Box>
        )}
        
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              display: 'block',
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
        
        {additionalInfo && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            {additionalInfo}
          </Typography>
        )}
      </Box>
      
      {/* Chart */}
      {chart && (
        <Box sx={{ flexGrow: 1, width: '100%', minHeight: `${chartHeight}px` }}>
          {chart}
        </Box>
      )}
      
      {/* Note */}
      {note && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            mt: 2,
            fontStyle: 'italic',
          }}
        >
          {note}
        </Typography>
      )}
    </Paper>
  );
};

EnhancedMetricCard.propTypes = {
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
   * Whether the card is in a loading state
   */
  loading: PropTypes.bool,
  
  /**
   * Variant of the card
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'elevated', 'status']),
  
  /**
   * Size of the card
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /**
   * Status for status variant
   */
  status: PropTypes.oneOf(['success', 'warning', 'error', 'default']),
  
  /**
   * Tooltip text
   */
  tooltip: PropTypes.string,
  
  /**
   * Chart component to display
   */
  chart: PropTypes.node,
  
  /**
   * Height of the chart in pixels
   */
  chartHeight: PropTypes.number,
  
  /**
   * Function to call when the card is clicked
   */
  onClick: PropTypes.func,
  
  /**
   * Function to call when the drill down button is clicked
   */
  onDrillDown: PropTypes.func,
  
  /**
   * Additional information to display
   */
  additionalInfo: PropTypes.string,
  
  /**
   * Note to display at the bottom of the card
   */
  note: PropTypes.string,
  
  /**
   * User role for role-specific display
   */
  userRole: PropTypes.string,
};

export default EnhancedMetricCard;
