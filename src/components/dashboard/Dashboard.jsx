import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from '@mui/material';

// Import dashboard data (will be replaced with API call in Phase 2)
import dashboardData from '../../data/dashboardData.json';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('MTD');
  const [lastUpdated, setLastUpdated] = useState('');

  // Simulate data loading
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setData(dashboardData);
        setLastUpdated(new Date().toLocaleString());
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, we would fetch fresh data here
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }, 1000);
  };

  // Handle time period change
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <Layout title={`${currentUser.role} Dashboard`} onRefresh={handleRefresh}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Last updated: {lastUpdated || 'Loading...'}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="time-period-label">Time Period</InputLabel>
              <Select
                labelId="time-period-label"
                id="time-period"
                value={timePeriod}
                label="Time Period"
                onChange={handleTimePeriodChange}
              >
                <MenuItem value="MTD">Month to Date</MenuItem>
                <MenuItem value="QTD">Quarter to Date</MenuItem>
                <MenuItem value="YTD">Year to Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* KPI Cards Section */}
      <Typography variant="h6" gutterBottom>
        Key Performance Indicators
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" height={50} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Paper>
              </Grid>
            ))
          : data?.kpis.map((kpi) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={kpi.id}>
                <Paper
                  sx={{
                    p: 2,
                    borderLeft: 5,
                    borderColor: kpi.color,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {kpi.label}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {kpi.value.toLocaleString()}
                    <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                      {kpi.unit}
                    </Typography>
                  </Typography>
                  {kpi.budget && (
                    <Typography variant="body2" color="text.secondary">
                      Budget: {kpi.budget.toLocaleString()} {kpi.unit}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
      </Grid>

      {/* Charts Section - Placeholder */}
      <Typography variant="h6" gutterBottom>
        Performance Charts
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Chart 1 Placeholder
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Chart 2 Placeholder
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Operational Alerts Section - Placeholder */}
      <Typography variant="h6" gutterBottom>
        Operational Alerts
      </Typography>
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Paper>
              </Grid>
            ))
          : Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Alert Placeholder {index + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a placeholder for operational alerts. Real alerts will be implemented in Phase 5.
                  </Typography>
                </Paper>
              </Grid>
            ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
