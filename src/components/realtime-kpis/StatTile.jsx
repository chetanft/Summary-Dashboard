import React from 'react';
import { Box, Typography, Paper, Chip, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ErrorIcon from '@mui/icons-material/Error';

const StatTile = ({ 
  title, 
  value, 
  trend = 0, 
  status = 'normal', 
  icon = 'default',
  onClick,
  sx = {}
}) => {
  // Define status colors
  const statusColors = {
    normal: '#4CAF50',    // Green
    attention: '#FF9800', // Orange
    critical: '#F44336'   // Red
  };
  
  // Define icons based on type
  const iconMap = {
    truck: <LocalShippingIcon />,
    order: <InventoryIcon />,
    alert: <WarningIcon />,
    location: <LocationOnIcon />,
    error: <ErrorIcon />,
    default: <InventoryIcon />
  };
  
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: '8px',
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'none',
          boxShadow: onClick ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onClick={onClick}
    >
      {/* Title and Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Box sx={{ 
          color: statusColors[status],
          backgroundColor: `${statusColors[status]}15`, // 15% opacity
          borderRadius: '50%',
          p: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {iconMap[icon]}
        </Box>
      </Box>
      
      {/* Value */}
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold',
          color: statusColors[status],
          my: 1
        }}
      >
        {value}
      </Typography>
      
      {/* Trend */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {trend !== 0 && (
          <Tooltip title={`${Math.abs(trend)} ${trend > 0 ? 'increase' : 'decrease'} in the last update`}>
            <Chip
              icon={trend > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              label={`${trend > 0 ? '+' : ''}${trend}`}
              size="small"
              sx={{
                backgroundColor: trend > 0 ? '#FFEBEE' : '#E8F5E9',
                color: trend > 0 ? '#D32F2F' : '#388E3C',
                fontWeight: 'bold',
                '& .MuiChip-icon': {
                  color: trend > 0 ? '#D32F2F' : '#388E3C',
                }
              }}
            />
          </Tooltip>
        )}
        {trend === 0 && (
          <Typography variant="caption" color="textSecondary">
            No change
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default StatTile;
