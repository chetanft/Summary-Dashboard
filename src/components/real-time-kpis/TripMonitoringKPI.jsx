import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPIGroupContainer from '../realtime-kpis/KPIGroupContainer';
import StatTile from '../realtime-kpis/StatTile';

const TripMonitoringKPI = ({ data, onKPIClick }) => {
  if (!data) return null;

  // Prepare chart data
  const chartData = data.kpis.map(kpi => ({
    name: kpi.name,
    value: kpi.count,
    percentage: kpi.percentage,
    fill: kpi.status === 'normal' ? '#4caf50' : 
          kpi.status === 'pending' ? '#ff9800' : '#f44336'
  }));

  // Colors for the pie chart
  const COLORS = ['#4caf50', '#f44336', '#2196f3', '#ff9800'];

  // Get individual KPIs
  const activeTrips = data.kpis.find(k => k.name === 'Active Trips');
  const delayedTrips = data.kpis.find(k => k.name === 'Delayed Trips');
  const deliveringToday = data.kpis.find(k => k.name === 'Delivering Today');
  const untrackedTrips = data.kpis.find(k => k.name === 'Untracked Trips');

  return (
    <KPIGroupContainer title={data.title}>
      <Grid container spacing={2}>
        {/* KPI Stats */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StatTile
              title="Active Trips"
              value={activeTrips?.count || 0}
              status={activeTrips?.status || 'normal'}
              subtitle={`${activeTrips?.percentage || 0}% of total trips`}
              onClick={() => onKPIClick('activeTrips', activeTrips)}
            />
            <StatTile
              title="Delayed Trips"
              value={delayedTrips?.count || 0}
              status={delayedTrips?.status || 'delayed'}
              subtitle={`${delayedTrips?.percentage || 0}% of total trips`}
              onClick={() => onKPIClick('delayedTrips', delayedTrips)}
            />
            <StatTile
              title="Delivering Today"
              value={deliveringToday?.count || 0}
              status={deliveringToday?.status || 'normal'}
              subtitle={`${deliveringToday?.percentage || 0}% of total trips`}
              onClick={() => onKPIClick('deliveringToday', deliveringToday)}
            />
          </Box>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%', minHeight: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Trip Status Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} trips`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Untracked Trips Alert */}
            {untrackedTrips && untrackedTrips.count > 0 && (
              <Box sx={{ 
                mt: 2, 
                p: 1, 
                borderRadius: 1, 
                bgcolor: '#ffebee', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="body2" color="error">
                  {untrackedTrips.count} Untracked Trips ({untrackedTrips.percentage}%)
                </Typography>
                <Chip 
                  size="small" 
                  label="Action Required" 
                  color="error" 
                  onClick={() => onKPIClick('untrackedTrips', untrackedTrips)}
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default TripMonitoringKPI;
