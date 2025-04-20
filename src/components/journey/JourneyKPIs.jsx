import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { useJourney } from '../../contexts/JourneyContext';
import Icon from '../common/Icon';

// KPI card component
const KPICard = ({ title, value, trend, icon, color }) => {
  const trendIcon = trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus';
  const trendColor = 
    (title === 'Active Alerts' && trend > 0) ? 'error.main' :
    (title === 'Active Alerts' && trend < 0) ? 'success.main' :
    trend > 0 ? 'success.main' : 
    trend < 0 ? 'error.main' : 
    'text.secondary';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              borderRadius: '50%',
              width: 40,
              height: 40,
            }}
          >
            <Icon name={icon} size={20} />
          </Box>
        </Box>
        
        <Typography variant="h3" component="div" gutterBottom>
          {value}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon name={trendIcon} size={16} sx={{ color: trendColor, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: trendColor }}>
            {Math.abs(trend * 100).toFixed(1)}% {trend > 0 ? 'increase' : trend < 0 ? 'decrease' : 'no change'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

KPICard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const JourneyKPIs = ({ kpis }) => {
  const { loadKPIs, loading, error } = useJourney();

  useEffect(() => {
    if (!kpis) {
      loadKPIs();
    }
  }, [kpis, loadKPIs]);

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

  if (!kpis) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No KPIs available</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Key Performance Indicators
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Total Journeys"
            value={kpis.totalJourneys.value}
            trend={kpis.totalJourneys.trend}
            icon="Truck"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="On-Time Delivery"
            value={`${kpis.onTimeDelivery.value}%`}
            trend={kpis.onTimeDelivery.trend}
            icon="CheckCircle"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Avg. Duration"
            value={`${kpis.averageDuration.value} hrs`}
            trend={kpis.averageDuration.trend}
            icon="Clock"
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <KPICard
            title="Active Alerts"
            value={kpis.activeAlerts.value}
            trend={kpis.activeAlerts.trend}
            icon="AlertTriangle"
            color="warning"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            KPI Insights
          </Typography>
          <Typography variant="body1" paragraph>
            The dashboard shows {kpis.totalJourneys.trend > 0 ? 'an increase' : 'a decrease'} of {Math.abs(kpis.totalJourneys.trend * 100).toFixed(1)}% in total journeys compared to the previous period.
          </Typography>
          <Typography variant="body1" paragraph>
            On-time delivery rate is at {kpis.onTimeDelivery.value}%, which is {kpis.onTimeDelivery.trend > 0 ? 'up' : 'down'} by {Math.abs(kpis.onTimeDelivery.trend * 100).toFixed(1)}% from the last period.
          </Typography>
          <Typography variant="body1" paragraph>
            The average journey duration is {kpis.averageDuration.value} hours, {kpis.averageDuration.trend < 0 ? 'an improvement' : 'an increase'} of {Math.abs(kpis.averageDuration.trend * 100).toFixed(1)}% compared to the previous period.
          </Typography>
          <Typography variant="body1">
            There are currently {kpis.activeAlerts.value} active alerts in the system, which is {kpis.activeAlerts.trend > 0 ? 'up' : 'down'} by {Math.abs(kpis.activeAlerts.trend * 100).toFixed(1)}% from the previous period.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

JourneyKPIs.propTypes = {
  kpis: PropTypes.object,
};

export default JourneyKPIs;
