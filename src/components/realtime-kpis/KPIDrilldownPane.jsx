import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const KPIDrilldownPane = ({ open, onClose, kpiType, kpiData }) => {
  if (!kpiData) return null;

  // Define KPI titles and descriptions
  const kpiInfo = {
    activeTrips: {
      title: 'Active Trips',
      description: 'Trips that are currently in progress across the network',
      icon: '🚚'
    },
    ordersInTransit: {
      title: 'Orders in Transit',
      description: 'Orders that are currently on the move',
      icon: '📦'
    },
    ordersToDeliver: {
      title: 'Orders to Deliver',
      description: 'Orders that have reached the delivery hub but are not yet delivered',
      icon: '🚚'
    },
    activeVehicles: {
      title: 'Active Vehicles',
      description: 'Vehicles that are currently running',
      icon: '🚛'
    },
    unassignedOrders: {
      title: 'Unassigned Orders',
      description: 'Orders that have not yet been allocated to trips',
      icon: '📋'
    },
    notPickedUpOrders: {
      title: 'Not Picked Up Orders',
      description: 'Orders that have been assigned but not yet picked up',
      icon: '⏳'
    },
    delayedOrders: {
      title: 'Delayed Orders',
      description: 'Orders that are over 1 hour late compared to ETA',
      icon: '⚠️'
    },
    delayAlerts: {
      title: 'Delay Alerts',
      description: 'Alerts triggered for delays in the system',
      icon: '🚨'
    },
    atLoadingPoint: {
      title: 'At Loading Point',
      description: 'Trucks that are waiting to load',
      icon: '📍'
    },
    atUnloadingPoint: {
      title: 'At Unloading Point',
      description: 'Trucks that have reached but not yet delivered',
      icon: '📍'
    },
    atTransferStops: {
      title: 'At Transfer Stops',
      description: 'Vehicles at midway transfer points',
      icon: '📍'
    },
    exceptionFlags: {
      title: 'Exception Flags',
      description: 'Total exception events by type',
      icon: '⚠️'
    },
    gateInPending: {
      title: 'Gate-In Pending',
      description: 'Vehicles near location but not gated in',
      icon: '🚧'
    },
    epodNotUploaded: {
      title: 'ePOD Not Uploaded',
      description: 'Delivered orders without proof of delivery uploaded',
      icon: '📱'
    }
  };

  // Get current KPI info
  const currentKPI = kpiInfo[kpiType] || {
    title: 'KPI Details',
    description: 'Detailed information about this KPI',
    icon: '📊'
  };

  // Prepare chart data from details
  const prepareChartData = () => {
    if (!kpiData.details) return [];
    
    const chartData = [];
    Object.entries(kpiData.details).forEach(([region, value]) => {
      if (value > 0) {
        chartData.push({
          name: region.charAt(0).toUpperCase() + region.slice(1),
          value
        });
      }
    });
    
    return chartData;
  };

  const chartData = prepareChartData();
  
  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Exception breakdown for exception flags
  const renderExceptionBreakdown = () => {
    if (kpiType !== 'exceptionFlags' || !kpiData.byType) return null;
    
    const exceptionData = Object.entries(kpiData.byType).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1'),
      value: count
    }));
    
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Exception Breakdown
        </Typography>
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={exceptionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {exceptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} exceptions`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 450 }, p: 3 }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="span" sx={{ mr: 1 }}>
            {currentKPI.icon}
          </Typography>
          <Typography variant="h6">
            {currentKPI.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        {currentKPI.description}
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* KPI Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <Typography variant="body2" color="textSecondary">
              Current Count
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {kpiData.count}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <Typography variant="body2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={kpiData.status.charAt(0).toUpperCase() + kpiData.status.slice(1)}
              sx={{
                bgcolor: 
                  kpiData.status === 'normal' ? '#E8F5E9' : 
                  kpiData.status === 'attention' ? '#FFF3E0' : 
                  '#FFEBEE',
                color: 
                  kpiData.status === 'normal' ? '#388E3C' : 
                  kpiData.status === 'attention' ? '#F57C00' : 
                  '#D32F2F',
                fontWeight: 'bold'
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      
      {/* Regional Breakdown */}
      {chartData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Regional Breakdown
          </Typography>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
      
      {/* Exception Breakdown (only for exception flags) */}
      {renderExceptionBreakdown()}
      
      {/* Trend Information */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Trend
        </Typography>
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
          <Typography variant="body2">
            {kpiData.trend > 0 
              ? `Increased by ${kpiData.trend} in the last update`
              : kpiData.trend < 0
                ? `Decreased by ${Math.abs(kpiData.trend)} in the last update`
                : 'No change in the last update'}
          </Typography>
        </Paper>
      </Box>
      
      {/* Actions */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Recommended Actions
        </Typography>
        <List disablePadding>
          {kpiData.status === 'critical' && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFEBEE', borderRadius: '8px', width: '100%' }}>
                <ListItemText 
                  primary="Immediate Attention Required" 
                  secondary="This KPI is in critical state and requires immediate action"
                />
              </Paper>
            </ListItem>
          )}
          {kpiData.status === 'attention' && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFF3E0', borderRadius: '8px', width: '100%' }}>
                <ListItemText 
                  primary="Monitor Closely" 
                  secondary="This KPI requires attention and should be monitored closely"
                />
              </Paper>
            </ListItem>
          )}
          {kpiData.status === 'normal' && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#E8F5E9', borderRadius: '8px', width: '100%' }}>
                <ListItemText 
                  primary="No Action Required" 
                  secondary="This KPI is within normal operating parameters"
                />
              </Paper>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default KPIDrilldownPane;
