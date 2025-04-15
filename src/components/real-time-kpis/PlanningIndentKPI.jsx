import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPIGroupContainer from '../realtime-kpis/KPIGroupContainer';
import StatTile from '../realtime-kpis/StatTile';

const PlanningIndentKPI = ({ data, onKPIClick }) => {
  if (!data) return null;

  // Prepare chart data
  const chartData = [
    {
      name: 'Planned Orders',
      value: data.kpis.find(k => k.name === 'Planned Orders')?.count || 0,
      fill: '#4caf50'
    },
    {
      name: 'Pending Planning',
      value: data.kpis.find(k => k.name === 'Pending Planning')?.count || 0,
      fill: '#ff9800'
    },
    {
      name: 'Active Indents',
      value: data.kpis.find(k => k.name === 'Active Indents')?.count || 0,
      fill: '#2196f3'
    }
  ];

  // Get individual KPIs
  const plannedOrders = data.kpis.find(k => k.name === 'Planned Orders');
  const pendingPlanning = data.kpis.find(k => k.name === 'Pending Planning');
  const activeIndents = data.kpis.find(k => k.name === 'Active Indents');

  return (
    <KPIGroupContainer title={data.title}>
      <Grid container spacing={2}>
        {/* KPI Stats */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StatTile
              title="Planned Orders"
              value={plannedOrders?.count || 0}
              status={plannedOrders?.status || 'normal'}
              onClick={() => onKPIClick('plannedOrders', plannedOrders)}
            />
            <StatTile
              title="Pending Planning"
              value={pendingPlanning?.count || 0}
              status={pendingPlanning?.status || 'normal'}
              subtitle={pendingPlanning?.breakdown ? 
                `${pendingPlanning.breakdown['Unplanned'] || 0} Unplanned, ${pendingPlanning.breakdown['Partial'] || 0} Partial` : ''}
              onClick={() => onKPIClick('pendingPlanning', pendingPlanning)}
            />
            <StatTile
              title="Active Indents"
              value={activeIndents?.count || 0}
              status={activeIndents?.status || 'normal'}
              subtitle={activeIndents?.breakdown ? 
                `${activeIndents.breakdown['Acceptance Pending'] || 0} Pending Acceptance` : ''}
              onClick={() => onKPIClick('activeIndents', activeIndents)}
            />
          </Box>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%', minHeight: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Planning & Indent Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
              <Chip size="small" label="North" color="primary" variant="outlined" />
              <Chip size="small" label="South" color="secondary" variant="outlined" />
              <Chip size="small" label="East" color="success" variant="outlined" />
              <Chip size="small" label="West" color="warning" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default PlanningIndentKPI;
