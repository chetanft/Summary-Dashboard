import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import FreightKpiChart from '../components/charts/FreightKpiChart';
import { fullMonthData } from '../data/freightKpiData';

/**
 * Demo page for the Freight KPI Chart
 */
const FreightKpiDemo = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Freight KPI Chart Demo
      </Typography>
      
      <Typography variant="body1" paragraph>
        This page demonstrates the Freight KPI Chart component that visualizes budget vs actual vs projected freight spend.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <FreightKpiChart data={fullMonthData} />
        </Paper>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Chart Description
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Budget (Green dashed line):</strong> The allocated spend for the month, shown as a constant horizontal line.
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Actual (Black line with grey fill):</strong> The cumulative spend so far, shown as an area chart.
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Projected (Red dotted line):</strong> The trend-based forecast till the end of the month, shown as a diagonal line from the current actual value to the projected end value.
        </Typography>
        
        <Typography variant="body1" paragraph>
          The chart helps visualize whether the freight spend is on track to stay within budget or if it's projected to exceed the budget by the end of the month.
        </Typography>
      </Box>
    </Container>
  );
};

export default FreightKpiDemo;
