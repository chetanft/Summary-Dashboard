import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useJourney } from '../../contexts/JourneyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../common/Icon';

// Colors for charts
const COLORS = ['#434F64', '#5F697B', '#00C638', '#FF3533', '#FF6C19', '#4299E1', '#9F7AEA', '#ED64A6'];

const JourneyStatistics = () => {
  const { loadStatistics, filters } = useJourney();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await loadStatistics(filters);
        setStatistics(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [filters]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, color: 'error.main' }}>
        <Typography variant="h6">Error</Typography>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!statistics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No statistics available</Typography>
      </Box>
    );
  }

  // Prepare data for journey type chart
  const journeyTypeData = [
    { name: 'Full Truck Load (FTL)', value: statistics.journeysByType.ftl || 0 },
    { name: 'Part Truck Load (PTL)', value: statistics.journeysByType.ptl || 0 },
  ];

  // Prepare data for journey status chart
  const journeyStatusData = Object.entries(statistics.journeysByStatus || {}).map(([key, value]) => {
    const statusLabels = {
      'planned': 'Planned',
      'en-route-to-loading': 'En Route to Loading',
      'at-loading': 'At Loading',
      'in-transit': 'In Transit',
      'at-unloading': 'At Unloading',
      'in-return': 'In Return',
      'delivered': 'Delivered',
    };
    
    return {
      name: statusLabels[key] || key,
      value,
    };
  });

  // Prepare data for alerts chart
  const alertsData = Object.entries(statistics.alertsByType || {}).map(([key, value]) => {
    const alertLabels = {
      'delay': 'Delay',
      'diversion': 'Diversion',
      'long-stoppage': 'Long Stoppage',
      'sos': 'SOS',
      'geofence-breach': 'Geofence Breach',
    };
    
    return {
      name: alertLabels[key] || key,
      value,
    };
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Journey Statistics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon name="Truck" size={24} sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Total Journeys</Typography>
              </Box>
              <Typography variant="h3">{statistics.totalJourneys}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon name="CheckCircle" size={24} sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h3">{statistics.completedJourneys}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon name="Navigation" size={24} sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="h6">In Transit</Typography>
              </Box>
              <Typography variant="h3">{statistics.inTransitJourneys}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon name="AlertTriangle" size={24} sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Delayed</Typography>
              </Box>
              <Typography variant="h3">{statistics.delayedJourneys}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Journey Types
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={journeyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {journeyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} journeys`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Journey Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={journeyStatusData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Journeys" fill="#434F64" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Alerts by Type
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={alertsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Alerts" fill="#FF3533" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Performance Metrics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  On-Time Delivery Rate
                </Typography>
                <Typography variant="h4">
                  {statistics.onTimePercentage.toFixed(1)}%
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      height: 10,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${statistics.onTimePercentage}%`,
                        bgcolor: statistics.onTimePercentage > 80 ? 'success.main' : statistics.onTimePercentage > 60 ? 'warning.main' : 'error.main',
                        borderRadius: 1,
                        height: 10,
                        position: 'absolute',
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  Average Journey Duration
                </Typography>
                <Typography variant="h4">
                  {statistics.averageDuration.toFixed(1)} hours
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Based on {statistics.totalJourneys} journeys
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default JourneyStatistics;
