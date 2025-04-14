import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LineChartComponent from '../charts/LineChartComponent';

/**
 * FreightCostKPI component for displaying freight cost per KM metrics
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.value - Current freight cost per KM
 * @param {number} props.target - Target freight cost per KM
 * @param {Array} props.chartData - Data for the chart
 * @param {string} props.info - Additional information or alert
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const FreightCostKPI = ({
  title = "Freight cost per KM",
  value = 120,
  target = 100,
  chartData = [],
  info = "Low vehicle utilisation (84%) may be driving up freight cost per KM.",
  onDrillDown
}) => {
  // Format the value as currency
  const formatValue = (val) => `₹ ${val}`;

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
          <Tooltip title="Average cost per kilometer for freight transport">
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
                onClick={() => onDrillDown({ id: 'freight_cost_per_km', title })}
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
          ₹ {value}
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
            ₹ {target}
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
              color: '#FF3533',
              strokeWidth: 2,
              name: 'Cost per KM',
              gradient: {
                id: 'costGradient',
                colors: [
                  { offset: '0%', color: 'rgba(255, 53, 51, 0.2)' },
                  { offset: '100%', color: 'rgba(255, 53, 51, 0)' }
                ]
              }
            },
          ]}
          xAxisKey="date"
          unit="₹"
          showGrid={false}
          height="100%"
          yAxisTicks={[0, 50, 100, 120, 150]}
          targetLines={[
            { y: 100, color: '#00C638', dashed: true, label: '₹100' }
          ]}
          fillUnderLine={true}
        />
      </Box>

      {/* Additional Info */}
      {info && (
        <Typography
          sx={{
            color: '#1890FF',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '140%',
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          {info}
        </Typography>
      )}
    </Paper>
  );
};

export default FreightCostKPI;