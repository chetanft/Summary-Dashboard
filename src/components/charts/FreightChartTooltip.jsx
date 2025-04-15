import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { formatCurrency } from '../../utils/chartUtils';

/**
 * Custom tooltip component for the Freight KPI Chart
 * Shows actual, budget, and projected values
 */
const FreightChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Find the data for each series
  const actualData = payload.find(p => p.dataKey === 'value');
  const budgetData = payload.find(p => p.dataKey === 'budget');
  const projectedData = payload.find(p => p.dataKey === 'projected');

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        minWidth: 180
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
        {label}
      </Typography>
      
      {actualData && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: '#000000' }}>
            Actual:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {formatCurrency(actualData.value, 'INR', true)}
          </Typography>
        </Box>
      )}
      
      {budgetData && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: '#00C638' }}>
            Budget:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {formatCurrency(budgetData.value, 'INR', true)}
          </Typography>
        </Box>
      )}
      
      {projectedData && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: projectedData.value > budgetData?.value ? '#FF3533' : '#00C638'
            }}
          >
            Projected:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {formatCurrency(projectedData.value, 'INR', true)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default FreightChartTooltip;
