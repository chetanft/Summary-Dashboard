import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ptlKpiData } from '../../data/ptl';

const TestPTLKPI = () => {
  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h5" gutterBottom>PTL KPI Test Component</Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Planning Data:</Typography>
        <pre>{JSON.stringify(ptlKpiData.planning, null, 2)}</pre>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Pre-Dispatch Data:</Typography>
        <pre>{JSON.stringify(ptlKpiData.preDispatch, null, 2)}</pre>
      </Box>
    </Paper>
  );
};

export default TestPTLKPI;
