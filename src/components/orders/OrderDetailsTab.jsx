import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LaunchIcon from '@mui/icons-material/Launch';

const OrderDetailsTab = ({ order }) => {
  if (!order) return <Typography>No order data available</Typography>;

  return (
    <Box>
      {/* Basic Order Details */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">SO Number</Typography>
          <Typography variant="body1">{order.soNumber || order.id}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Total weight</Typography>
          <Typography variant="body1">{order.totalWeight || order.details?.weight || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">No. of DOs</Typography>
          <Typography variant="body1">{order.numberOfDOs || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">No. of SKUs</Typography>
          <Typography variant="body1">{order.numberOfSKUs || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Origin</Typography>
          <Typography variant="body1">{order.origin || order.details?.origin || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Destination</Typography>
          <Typography variant="body1">{order.destination || order.details?.destination || 'N/A'}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Current Status */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: order.status === 'In Transit' ? '#f5f9ff' : 'background.paper',
                border: 1,
                borderColor: 'divider'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Current Status
              </Typography>
              <Typography variant="body1">{order.status || 'N/A'}</Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">ETA</Typography>
                <Typography variant="body1">{order.eta || order.details?.expectedDelivery || 'N/A'}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Current Location</Typography>
                <Typography variant="body1">{order.currentLocation || order.details?.currentLocation || 'N/A'}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: order.isOnTime ? '#f0fff5' : 'background.paper',
                border: 1,
                borderColor: 'divider'
              }}
            >
              <Chip 
                label={order.deliveryStatus || "Status not available"} 
                size="small" 
                color={order.statusColor || "default"} 
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Next Milestone:</Typography>
                <Typography variant="body1">{order.nextMilestone || order.milestones?.next?.name || 'N/A'}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">ETA:</Typography>
                <Typography variant="body1">{order.nextMilestoneEta || order.milestones?.next?.eta || 'N/A'}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Vehicle & Driver Details */}
      <Typography variant="h6" sx={{ mb: 2 }}>Vehicle & Driver Details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Vehicle Number</Typography>
          <Typography variant="body1">{order.vehicleNumber || order.details?.vehicle || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Driver Name</Typography>
          <Typography variant="body1">{order.driverName || (order.details?.driver && order.details.driver.split('(')[0]) || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Driver Contact</Typography>
          <Typography variant="body1">
            {order.driverContact || (order.details?.driver && order.details.driver.match(/\(([^)]+)\)/) && order.details.driver.match(/\(([^)]+)\)/)[1]) || 'N/A'}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Generated IDs */}
      <Typography variant="h6" sx={{ mb: 2 }}>Generated IDs</Typography>
      <Grid container spacing={3}>
        {order.generatedIds ? (
          Object.entries(order.generatedIds).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <Typography variant="subtitle2" color="text.secondary">{key}</Typography>
              <Typography variant="body1">{value}</Typography>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No generated IDs available</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OrderDetailsTab;
