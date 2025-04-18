import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';
import { alerts } from '../../data/alertData';

const AlertIndicator = () => {
  const navigate = useNavigate();
  
  // Count alerts by severity
  const alertCounts = {
    critical: alerts.filter(alert => alert.severity === 'critical' && alert.status === 'open').length,
    high: alerts.filter(alert => alert.severity === 'high' && alert.status === 'open').length,
    medium: alerts.filter(alert => alert.severity === 'medium' && alert.status === 'open').length,
    low: alerts.filter(alert => alert.severity === 'low' && alert.status === 'open').length,
  };
  
  const totalAlerts = alertCounts.critical + alertCounts.high + alertCounts.medium + alertCounts.low;
  
  const handleViewAlerts = () => {
    navigate('/alerts');
  };
  
  if (totalAlerts === 0) {
    return null;
  }
  
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alertCounts.critical > 0 ? '#FEF2F2' : '#FFF7ED',
        border: 1,
        borderColor: alertCounts.critical > 0 ? '#FEE2E2' : '#FFEDD5',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <WarningAmberIcon 
          sx={{ 
            color: alertCounts.critical > 0 ? '#DC2626' : '#F97316',
            mr: 2,
            fontSize: 28
          }} 
        />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {alertCounts.critical > 0 
              ? 'Critical Alerts Require Attention' 
              : 'Operational Alerts Require Attention'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            {alertCounts.critical > 0 && (
              <Chip 
                label={`${alertCounts.critical} Critical`} 
                size="small" 
                sx={{ bgcolor: '#DC2626', color: 'white' }} 
              />
            )}
            {alertCounts.high > 0 && (
              <Chip 
                label={`${alertCounts.high} High`} 
                size="small" 
                sx={{ bgcolor: '#F97316', color: 'white' }} 
              />
            )}
            {alertCounts.medium > 0 && (
              <Chip 
                label={`${alertCounts.medium} Medium`} 
                size="small" 
                sx={{ bgcolor: '#F59E0B', color: 'white' }} 
              />
            )}
            {alertCounts.low > 0 && (
              <Chip 
                label={`${alertCounts.low} Low`} 
                size="small" 
                sx={{ bgcolor: '#65A30D', color: 'white' }} 
              />
            )}
          </Box>
        </Box>
      </Box>
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleViewAlerts}
        sx={{ 
          borderColor: alertCounts.critical > 0 ? '#DC2626' : '#F97316',
          color: alertCounts.critical > 0 ? '#DC2626' : '#F97316',
        }}
      >
        View Alerts
      </Button>
    </Paper>
  );
};

export default AlertIndicator;
