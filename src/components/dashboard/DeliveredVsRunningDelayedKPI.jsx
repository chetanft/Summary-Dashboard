import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DonutChartComponent from '../charts/DonutChartComponent';

/**
 * DeliveredVsRunningDelayedKPI component for displaying delivered vs running delayed percentages
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.deliveredValue - Delivered percentage
 * @param {number} props.runningDelayedValue - Running delayed percentage
 * @param {number} props.runningDelayedTarget - Target (maximum) running delayed percentage
 * @param {number} props.deliveredCount - Count of delivered shipments
 * @param {number} props.runningDelayedCount - Count of running delayed shipments
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const DeliveredVsRunningDelayedKPI = ({ 
  title = "Delivered vs Running Delayed", 
  deliveredValue = 48, 
  runningDelayedValue = 23,
  runningDelayedTarget = 10,
  deliveredCount = 97,
  runningDelayedCount = 47,
  onDrillDown 
}) => {
  // Format the value as percentage
  const formatValue = (val) => `${val}%`;

  // Chart data
  const donutData = [
    { name: 'Delivered', value: deliveredValue, color: '#4CAF50' },
    { name: 'Running Delayed', value: runningDelayedValue, color: '#FF3533' }
  ];

  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#434F64', 
              fontWeight: 600,
              fontSize: '18px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {title}
          </Typography>
          <Tooltip title="Comparison of delivered versus currently running delayed shipments">
            <InfoOutlinedIcon sx={{ fontSize: 18, color: '#838C9D' }} />
          </Tooltip>
        </Box>
        {onDrillDown && (
          <IconButton 
            size="small" 
            onClick={() => onDrillDown({ id: 'delivered_vs_running_delayed', title })}
            sx={{ color: '#838C9D' }}
          >
            <OpenInFullIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      {/* Main values */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography 
            sx={{ 
              color: '#4CAF50', 
              fontWeight: 600,
              fontSize: '28px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {formatValue(deliveredValue)}
          </Typography>
          <Typography 
            sx={{ 
              color: '#838C9D', 
              fontWeight: 600,
              fontSize: '16px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            vs
          </Typography>
          <Typography 
            sx={{ 
              color: '#FF3533', 
              fontWeight: 600,
              fontSize: '28px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {formatValue(runningDelayedValue)}
          </Typography>
        </Box>
      </Box>

      {/* Target for Running Delayed */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            component="span" 
            sx={{ 
              color: '#5F697B', 
              fontSize: '13px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Running Delayed Target:
          </Typography>
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 600, 
              ml: 0.5,
              color: '#434F64',
              fontSize: '13px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {formatValue(runningDelayedTarget)}
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <DonutChartComponent
          data={donutData}
          innerRadius={70}
          outerRadius={85}
          height={160}
          showLabel={false}
        />
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#4CAF50' 
            }} 
          />
          <Typography 
            sx={{ 
              color: '#5F697B', 
              fontSize: '12px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {`Delivered (${deliveredCount})`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#FF3533' 
            }} 
          />
          <Typography 
            sx={{ 
              color: '#5F697B', 
              fontSize: '12px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {`Running Delayed (${runningDelayedCount})`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DeliveredVsRunningDelayedKPI; 