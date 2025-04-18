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
          <Typography variant="body1">{order.soNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Total weight</Typography>
          <Typography variant="body1">{order.totalWeight}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">No. of DOs</Typography>
          <Typography variant="body1">{order.numberOfDOs}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">No. of SKUs</Typography>
          <Typography variant="body1">{order.numberOfSKUs}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Total Cost</Typography>
          <Typography variant="body1">{order.totalCost}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Created at</Typography>
          <Typography variant="body1">{order.createdAt}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

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
                In Transit
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">ETA</Typography>
                <Typography variant="body1">{order.eta}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">STA</Typography>
                <Typography variant="body1">{order.sta}</Typography>
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
                label="On time" 
                size="small" 
                color="success" 
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Next Milestone:</Typography>
                <Typography variant="body1">{order.nextMilestone}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">ETA:</Typography>
                <Typography variant="body1">{order.nextMilestoneEta}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Sender Information */}
      <Paper sx={{ p: 2, mb: 3, border: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary">Sender</Typography>
        <Typography variant="h6">{order.sender.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {order.sender.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          GSTIN: {order.sender.gstin}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.sender.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.sender.phone}
          </Typography>
        </Box>
      </Paper>

      {/* Ship To Information */}
      <Paper sx={{ p: 2, mb: 3, border: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary">Ship To</Typography>
        <Typography variant="h6">{order.shipTo.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {order.shipTo.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          GSTIN: {order.shipTo.gstin}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.shipTo.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.shipTo.phone}
          </Typography>
        </Box>
      </Paper>

      {/* Bill To Information */}
      <Paper sx={{ p: 2, mb: 3, border: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" color="text.secondary">Bill To</Typography>
        <Typography variant="h6">{order.billTo.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {order.billTo.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          GSTIN: {order.billTo.gstin}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <EmailIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.billTo.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {order.billTo.phone}
          </Typography>
        </Box>
      </Paper>

      {/* IDs */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Planning ID</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{order.planningId}</Typography>
            {order.planningId !== '-' && (
              <LaunchIcon fontSize="small" color="action" sx={{ ml: 1 }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Indent ID</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{order.indentId}</Typography>
            {order.indentId !== '-' && (
              <LaunchIcon fontSize="small" color="action" sx={{ ml: 1 }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">Journey ID</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{order.journeyId}</Typography>
            {order.journeyId !== '-' && (
              <LaunchIcon fontSize="small" color="action" sx={{ ml: 1 }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">ePOD ID</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{order.epodId}</Typography>
            {order.epodId !== '-' && (
              <LaunchIcon fontSize="small" color="action" sx={{ ml: 1 }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">Invoice Number</Typography>
          <Typography variant="body1">{order.invoiceNumber}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetailsTab;
