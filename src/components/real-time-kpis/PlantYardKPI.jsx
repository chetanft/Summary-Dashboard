import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPIGroupContainer from '../realtime-kpis/KPIGroupContainer';
import StatTile from '../realtime-kpis/StatTile';

const PlantYardKPI = ({ data, onKPIClick }) => {
  if (!data) return null;

  // Prepare chart data
  const chartData = [
    {
      name: 'En Route to Loading',
      value: data.kpis.find(k => k.name === 'En Route to Loading')?.count || 0,
      fill: '#2196f3'
    },
    {
      name: 'Fulfillment Delayed',
      value: data.kpis.find(k => k.name === 'Fulfillment Delayed')?.count || 0,
      fill: '#f44336'
    },
    {
      name: 'At Plant/Dock',
      value: data.kpis.find(k => k.name === 'At Plant/Dock')?.count || 0,
      fill: '#4caf50'
    }
  ];

  // Get individual KPIs
  const enRouteToLoading = data.kpis.find(k => k.name === 'En Route to Loading');
  const fulfillmentDelayed = data.kpis.find(k => k.name === 'Fulfillment Delayed');
  const atPlantDock = data.kpis.find(k => k.name === 'At Plant/Dock');
  const tats = data.kpis.find(k => k.name === 'TATs');

  return (
    <KPIGroupContainer title={data.title}>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* KPI Stats */}
        <Grid item xs={12} md={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ width: '33%' }}>
              <StatTile
                title="En Route to Loading"
              value={enRouteToLoading?.count || 0}
              status={enRouteToLoading?.status || 'normal'}
                onClick={() => onKPIClick('enRouteToLoading', enRouteToLoading)}
              />
            </Box> 
            <Box sx={{ width: '33%' }}>
              <StatTile
                title="Fulfillment Delayed"
                value={fulfillmentDelayed?.count || 0}
                status={fulfillmentDelayed?.status || 'delayed'}
                onClick={() => onKPIClick('fulfillmentDelayed', fulfillmentDelayed)}
              />
            </Box>
            <StatTile
              title="At Plant/Dock"
              value={atPlantDock?.count || 0}
              status={atPlantDock?.status || 'normal'}
              subtitle={atPlantDock?.breakdown ? 
                `${atPlantDock.breakdown['At Plant'] || 0} Plant, ${atPlantDock.breakdown['At Dock'] || 0} Dock` : ''}
              onClick={() => onKPIClick('atPlantDock', atPlantDock)}
            />
          </Box>
        </Grid>

        {/* Chart and TATs */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: '100%', minHeight: 200 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Plant & Yard Distribution</Typography>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart 
                    data={chartData} 
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Turnaround Times (TATs)</Typography>
                <Grid container spacing={2}>
                  {tats && tats.values && Object.entries(tats.values).map(([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <Box sx={{ 
                        p: 1, 
                        borderRadius: 1, 
                        bgcolor: tats.status === 'pending' ? '#fff3e0' : '#e8f5e9',
                        textAlign: 'center'
                      }}>
                        <Typography variant="body2" color="textSecondary">{key}</Typography>
                        <Typography variant="h6">{value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default PlantYardKPI;
