import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CompositeChartComponent from '../charts/CompositeChartComponent';
import { EnhancedMetricCard } from '../core';

/**
 * BudgetedVsActualKPI component for displaying freight budget vs actual metrics
 * Using the standardized EnhancedMetricCard component
 *
 * @param {Object} props
 * @param {string} props.title - Title of the KPI
 * @param {number} props.actual - Actual value
 * @param {number} props.projected - Projected value
 * @param {number} props.budget - Budget value
 * @param {string} props.formattedActual - Formatted actual value
 * @param {string} props.formattedProjected - Formatted projected value
 * @param {string} props.formattedBudget - Formatted budget value
 * @param {Array} props.chartData - Data for the chart
 * @param {string} props.userRole - User role (CXO, Company User, Branch User)
 * @param {Function} props.onDrillDown - Function to handle drill down
 * @returns {JSX.Element}
 */
const BudgetedVsActualKPI = ({
  title = "Budgeted vs Actual vs Projected Freight",
  actual = 10,
  projected = 22,
  budget = 20,
  formattedActual,
  formattedProjected,
  formattedBudget,
  chartData = [],
  userRole,
  onDrillDown
}) => {
  // Format values as currency in Cr format
  const formatValue = (value) => {
    return `₹ ${value} Cr`;
  };

  // Create the chart component
  const chartComponent = (
    <>
      {/* Chart */}
      <Box
        sx={{
          width: '100%',
          height: '348px',
          position: 'relative'
        }}
      >
        <CompositeChartComponent
          data={chartData}
          areas={[
            { dataKey: 'actual', color: '#5F697B', fillOpacity: 0.3, strokeWidth: 0, name: 'Actual' }
          ]}
          lines={[
            { dataKey: 'projected', color: '#FF3533', strokeWidth: 2, name: 'Projected' },
            { dataKey: 'budget', color: '#00C638', strokeWidth: 1, name: 'Budget', strokeDasharray: '3 3' }
          ]}
          xAxisKey="date"
          unit="₹"
          showGrid={true}
          showLegend={false}
          height="100%"
        />
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 1.5,
          flexWrap: 'wrap',
          mt: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 51,
              height: 0,
              border: '0.8px dashed #00C638',
              borderRadius: '10.7px'
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            Budget
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 51,
              height: 0,
              border: '0.8px dashed #FF3533',
              borderRadius: '10.7px'
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            Projected
          </Typography>
        </Box>
      </Box>
    </>
  );

  // Create the value display
  const valueDisplay = (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
      {/* Actual */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {formattedActual || formatValue(actual)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          Actual
        </Typography>
      </Box>

      {/* Projected */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            {formattedProjected || formatValue(projected)}
          </Typography>
          <ArrowUpwardIcon sx={{ color: 'error.main', fontSize: 24, transform: 'rotate(-45deg)' }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
          }}
        >
          Projected
        </Typography>
      </Box>

      {/* Budget */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
          }}
        >
          {formattedBudget || formatValue(budget)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
          }}
        >
          Budget
        </Typography>
      </Box>
    </Box>
  );

  return (
    <EnhancedMetricCard
      title={title}
      userRole={userRole}
      size="large"
      variant="elevated"
      tooltip="Comparison of budgeted, actual, and projected freight costs"
      onDrillDown={() => onDrillDown({ id: 'budgeted_vs_actual_freight', title })}
      chart={
        <>
          {valueDisplay}
          {chartComponent}
        </>
      }
      chartHeight={400}
      sx={{
        height: '100%',
        borderRadius: '32px',
      }}
    />
  );
};

export default BudgetedVsActualKPI;