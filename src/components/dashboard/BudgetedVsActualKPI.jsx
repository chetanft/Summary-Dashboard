import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FreightKpiChart from '../charts/FreightKpiChart';
import { fullMonthData } from '../../data/freightKpiData';

/**
 * BudgetedVsActualKPI component for displaying freight budget vs actual metrics
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.actual - Actual value
 * @param {number} props.projected - Projected value
 * @param {number} props.budget - Budget value
 * @param {Array} props.chartData - Data for the chart
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const BudgetedVsActualKPI = ({
  title = "Budgeted vs Actual vs Projected Freight",
  actual = 10,
  projected = 22,
  budget = 20,
  chartData = [],
  onDrillDown
}) => {
  // Format values as currency in Cr format
  const formatValue = (value) => {
    return `₹ ${value} Cr`;
  };

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
        gap: '40px'
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
          <Tooltip title="Comparison of budgeted, actual, and projected freight costs">
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
                onClick={() => onDrillDown({ id: 'budgeted_vs_actual', title })}
                sx={{ color: '#434F64' }}
              >
                <OpenInFullIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>

      {/* Main values */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* Actual */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              color: '#434F64',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            ₹ {actual} Cr
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
            Actual
          </Typography>
        </Box>

        {/* Projected */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Typography
              sx={{
                color: '#5F697B',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '140%',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              ₹ {projected} Cr
            </Typography>
            <ArrowUpwardIcon sx={{ color: '#FF3533', fontSize: 24, transform: 'rotate(-45deg)' }} />
          </Box>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Projected
          </Typography>
        </Box>

        {/* Budget */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            ₹ {budget} Cr
          </Typography>
          <Typography
            sx={{
              color: '#5F697B',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '140%',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Budget
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          height: '348px',
          position: 'relative'
        }}
      >
        <FreightKpiChart
          data={{
            actual: chartData.length > 0 ? chartData.map(item => ({
              date: item.date,
              value: item.actual
            })) : fullMonthData.actual,
            projectedValue: projected,
            budgetValue: budget
          }}
        />
      </Box>
    </Paper>
  );
};

export default BudgetedVsActualKPI;