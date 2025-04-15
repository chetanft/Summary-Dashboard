import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPIGroupContainer from '../realtime-kpis/KPIGroupContainer';
import StatTile from '../realtime-kpis/StatTile';

const EPodKPI = ({ data, onKPIClick }) => {
  if (!data) return null;

  // Prepare chart data
  const chartData = [
    {
      name: 'Pending',
      value: data.kpis.find(k => k.name === 'Pending')?.count || 0,
      fill: '#ff9800'
    },
    {
      name: 'Approved',
      value: data.kpis.find(k => k.name === 'Approved')?.count || 0,
      fill: '#4caf50'
    },
    {
      name: 'Disputed',
      value: data.kpis.find(k => k.name === 'Disputed')?.count || 0,
      fill: '#f44336'
    },
    {
      name: 'Rejected',
      value: data.kpis.find(k => k.name === 'Rejected')?.count || 0,
      fill: '#9c27b0'
    }
  ];

  // Get individual KPIs
  const pending = data.kpis.find(k => k.name === 'Pending');
  const approved = data.kpis.find(k => k.name === 'Approved');
  const disputed = data.kpis.find(k => k.name === 'Disputed');
  const rejected = data.kpis.find(k => k.name === 'Rejected');

  // Calculate total and percentages
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const pendingPercentage = total > 0 ? Math.round((pending?.count || 0) / total * 100) : 0;
  const approvedPercentage = total > 0 ? Math.round((approved?.count || 0) / total * 100) : 0;

  return (
    <KPIGroupContainer title={data.title}>
      <Grid container spacing={2}>
        {/* KPI Stats */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StatTile
              title="Pending"
              value={pending?.count || 0}
              status={pending?.status || 'pending'}
              subtitle={`${pendingPercentage}% of total ePODs`}
              onClick={() => onKPIClick('pendingEPods', pending)}
            />
            <StatTile
              title="Approved"
              value={approved?.count || 0}
              status={approved?.status || 'normal'}
              subtitle={`${approvedPercentage}% of total ePODs`}
              onClick={() => onKPIClick('approvedEPods', approved)}
            />
            <StatTile
              title="Disputed/Rejected"
              value={(disputed?.count || 0) + (rejected?.count || 0)}
              status="delayed"
              subtitle={`${disputed?.count || 0} Disputed, ${rejected?.count || 0} Rejected`}
              onClick={() => onKPIClick('disputedRejectedEPods', { disputed, rejected })}
            />
          </Box>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%', minHeight: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>ePOD Status Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Region Distribution */}
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

export default EPodKPI;
