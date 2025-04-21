import React from 'react';
import { useTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ErrorIcon from '@mui/icons-material/Error';
import { EnhancedMetricCard } from '../core';

const StatTile = ({
  title,
  value,
  trend = 0,
  status = 'normal',
  icon = 'default',
  onClick,
  subtitle,
  sx = {}
}) => {
  const theme = useTheme();

  // Map status to theme status
  const statusMap = {
    normal: 'success',
    attention: 'warning',
    critical: 'error',
    pending: 'warning',
    delayed: 'error'
  };

  // Define icons based on type
  const iconMap = {
    truck: LocalShippingIcon,
    order: InventoryIcon,
    alert: WarningIcon,
    location: LocationOnIcon,
    error: ErrorIcon,
    default: InventoryIcon
  };

  // Get the icon component
  const IconComponent = iconMap[icon];

  // Determine if trend should be inverted (for metrics where lower is better)
  const trendInverse = status === 'critical' || status === 'delayed';

  return (
    <EnhancedMetricCard
      title={title}
      value={value}
      secondaryValue={subtitle}
      trend={trend !== 0 ? trend : undefined}
      trendInverse={trendInverse}
      icon={IconComponent}
      status={statusMap[status] || 'default'}
      variant="elevated"
      size="small"
      onClick={onClick}
      sx={{
        height: '100%',
        width: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'none',
          boxShadow: onClick ? theme.shadows[4] : theme.shadows[1]
        },
        ...sx
      }}
    />
  );
};

export default StatTile;
