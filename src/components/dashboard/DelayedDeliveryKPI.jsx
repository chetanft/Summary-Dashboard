import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BarGroupChartComponent from '../charts/BarGroupChartComponent';

/**
 * DelayedDeliveryKPI component for displaying delayed delivery percentage by region
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.value - Overall delayed delivery percentage
 * @param {number} props.target - Target (maximum) delayed delivery percentage
 * @param {Array} props.chartData - Data for the chart by region
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const DelayedDeliveryKPI = ({
  title = "Delayed Delivery %",
  value = 10,
  target = 2,
  chartData = [
    { region: 'North', value: 12, color: '#FF3533' },
    { region: 'South', value: 10, color: '#FF3533' },
    { region: 'East', value: 12, color: '#FF3533' },
    { region: 'West', value: 1, color: '#4CAF50' },
    { region: 'Central', value: 1, color: '#4CAF50' }
  ],
  onDrillDown
}) => {
  // Format the value as percentage
  const formatValue = (val) => `${val}%`;

  // Transform chart data to include colors based on target (for delayed deliveries, lower is better)
  const transformedChartData = chartData.map(data => ({
    ...data,
    color: data.value <= target ? '#00C638' : '#FF3533'
  }));

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
          <Tooltip title="Percentage of deliveries that are delayed beyond the promised delivery date">
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
                onClick={() => onDrillDown({ id: 'delayed_delivery', title })}
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
            color: value <= target ? '#00C638' : '#FF3533',
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
      <Box sx={{ flexGrow: 1, width: '100%', height: '200px' }}>
        <BarGroupChartComponent
          data={transformedChartData}
          bars={[
            {
              dataKey: 'value',
              colors: transformedChartData.map(item => item.color)
            }
          ]}
          xAxisKey="region"
          unit="%"
          showGrid={false}
          height="100%"
          barGap={5}
          barSize={20}
          targetLine={{ y: target, color: '#00C638' }}
        />
      </Box>

      {/* Legend */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
          {/* Optional footer text */}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DelayedDeliveryKPI;