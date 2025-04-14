import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DonutChartComponent from '../charts/DonutChartComponent';

/**
 * PendingDispatchedKPI component for displaying pending dispatch percentage
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.value - Current pending dispatch percentage
 * @param {number} props.target - Target (maximum) pending dispatch percentage
 * @param {number} props.count - Count of shipments pending dispatch
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const PendingDispatchedKPI = ({
  title = "Pending Dispatched",
  value = 24,
  target = 10,
  count = 290,
  onDrillDown
}) => {
  // Format the value as percentage
  const formatValue = (val) => `${val}%`;

  // Chart data
  const donutData = [
    { name: 'Pending', value: value, color: '#FF3533' },
    { name: 'Dispatched', value: 100 - value, color: '#E0E0E0' }
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
          <Tooltip title="Percentage of orders that are pending dispatch">
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
                onClick={() => onDrillDown({ id: 'pending_dispatched', title })}
                sx={{ color: '#434F64' }}
              >
                <OpenInFullIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>

      {/* Main values and Target */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Pending
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Target: {formatValue(target)}
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
          width: '100%',
          height: '200px',
          position: 'relative'
        }}
      >
        <DonutChartComponent
          data={donutData}
          innerRadius={75}
          outerRadius={90}
          height={180}
          centerLabel={{ value: `${value}%`, label: count.toString() }}
        />
      </Box>
    </Paper>
  );
};

export default PendingDispatchedKPI;