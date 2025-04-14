import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LineChartComponent from '../charts/LineChartComponent';

/**
 * VehicleUtilizationKPI component for displaying vehicle utilization metrics
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.value - Current utilization percentage
 * @param {number} props.target - Target utilization percentage
 * @param {Array} props.chartData - Data for the chart
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const VehicleUtilizationKPI = ({
  title = "Vehicle Utilisation",
  value = 84,
  target = 96,
  chartData = [],
  onDrillDown
}) => {
  // Format the value as percentage
  const formatValue = (val) => `${val}%`;

  // Create percentage levels for chart
  const chartLevels = [
    { y: 100, label: '100%' },
    { y: 96, label: '96%' },
    { y: 86, label: '86%' },
    { y: 50, label: '50%' },
    { y: 0, label: '0%' }
  ];

  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: '32px',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #F0F1F7',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        backgroundColor: '#FFFFFF',
        gap: '28px'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {title}
          </Typography>
          <Tooltip title="Percentage of fleet vehicles that are actively being utilized">
            <span>
              <InfoOutlinedIcon sx={{ fontSize: 24, color: '#434F64' }} />
            </span>
          </Tooltip>
        </Box>
        {onDrillDown && (
          <Tooltip title="View details">
            <span>
              <IconButton
                size="small"
                onClick={() => onDrillDown({ id: 'vehicle_utilization', title })}
                sx={{ color: '#434F64' }}
              >
                <OpenInFullIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>

      {/* Main values */}
      <Box>
        <Typography
          sx={{
            color: '#434F64',
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '140%',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {formatValue(value)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', mt: 1 }}>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Target
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#434F64',
              fontSize: '12px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {formatValue(target)}
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '120px',
          position: 'relative'
        }}
      >
        <LineChartComponent
          data={chartData}
          lines={[
            {
              dataKey: 'value',
              color: '#FF8A80',
              strokeWidth: 2,
              name: 'Utilization',
              gradient: {
                id: 'utilizationGradient',
                colors: [
                  { offset: '0%', color: 'rgba(255, 138, 128, 0.2)' },
                  { offset: '100%', color: 'rgba(255, 138, 128, 0)' }
                ]
              }
            },
          ]}
          xAxisKey="date"
          unit="%"
          showGrid={false}
          height="100%"
          yAxisTicks={[0, 50, 86, 96, 100]}
          targetLines={[
            { y: 96, color: '#00C638', dashed: true, label: '96%' }
          ]}
          fillUnderLine={true}
        />
      </Box>
    </Paper>
  );
};

export default VehicleUtilizationKPI;