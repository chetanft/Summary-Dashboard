import React from 'react';
import { Box, Typography, Paper, Container, AppBar, Toolbar } from '@mui/material';
import { planningKpiData, preDispatchKpiData, inTransitKpiData, postDeliveryKpiData } from '../data/ptl';

const PTLKpiTestPage = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PTL KPI Test Page</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>PTL KPI Test Page</Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Planning KPIs</Typography>
          <pre>{JSON.stringify(planningKpiData, null, 2)}</pre>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Pre-Dispatch KPIs</Typography>
          <pre>{JSON.stringify(preDispatchKpiData, null, 2)}</pre>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>In-Transit KPIs</Typography>
          <pre>{JSON.stringify(inTransitKpiData, null, 2)}</pre>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Post-Delivery KPIs</Typography>
          <pre>{JSON.stringify(postDeliveryKpiData, null, 2)}</pre>
        </Paper>
      </Container>
    </Box>
  );
};

export default PTLKpiTestPage;
