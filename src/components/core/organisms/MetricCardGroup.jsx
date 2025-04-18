import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { colors } from '../../../theme/themeConfig';

/**
 * MetricCardGroup component for grouping related metric cards with an optional title
 * 
 * @component
 * @example
 * <MetricCardGroup title="Performance Metrics" subtitle="Last 30 days">
 *   <MetricCard title="Revenue" value={1234.56} format="currency" />
 *   <MetricCard title="Orders" value={42} format="number" />
 * </MetricCardGroup>
 */
const MetricCardGroup = ({
  title,
  subtitle,
  children,
  variant = 'default',
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  spacing = 2,
  dividers = false,
  headerAction,
  ...props
}) => {
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
          backgroundColor: colors.grey[50],
        };
      case 'elevated':
        return {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        };
      case 'none':
        return {
          boxShadow: 'none',
          backgroundColor: 'transparent',
          padding: 0,
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
  const showHeader = title || subtitle || headerAction;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        padding: variant === 'none' ? 0 : 3,
        ...variantStyles,
        ...props.sx,
      }}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Box>
            {title && (
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {title}
              </Typography>
            )}
            
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {headerAction && (
            <Box>
              {headerAction}
            </Box>
          )}
        </Box>
      )}
      
      {/* Grid of metric cards */}
      <Grid container spacing={spacing}>
        {React.Children.map(children, (child, index) => (
          <Grid item {...columns} key={index}>
            {child}
            {dividers && index < React.Children.count(children) - 1 && (
              <Divider sx={{ my: 2, display: { xs: 'block', sm: 'none' } }} />
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

MetricCardGroup.propTypes = {
  /**
   * Optional title for the group
   */
  title: PropTypes.string,
  
  /**
   * Optional subtitle for the group
   */
  subtitle: PropTypes.string,
  
  /**
   * Child components (typically MetricCard components)
   */
  children: PropTypes.node.isRequired,
  
  /**
   * Visual variant of the container
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'elevated', 'none']),
  
  /**
   * Column configuration for different breakpoints
   */
  columns: PropTypes.object,
  
  /**
   * Spacing between grid items
   */
  spacing: PropTypes.number,
  
  /**
   * Whether to show dividers between items on mobile
   */
  dividers: PropTypes.bool,
  
  /**
   * Optional action component to display in the header
   */
  headerAction: PropTypes.node,
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default MetricCardGroup;
