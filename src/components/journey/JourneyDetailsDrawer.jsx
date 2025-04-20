import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Tabs,
  Tab,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import Icon from '../common/Icon';
import { formatDate } from '../../utils/dateUtils';
import JourneyTimeline from './JourneyTimeline';
import JourneyMap from './JourneyMap';
import JourneyDocuments from './JourneyDocuments';
import JourneyAlerts from './JourneyAlerts';

// Status color mapping
const statusColors = {
  'planned': 'info',
  'en-route-to-loading': 'info',
  'at-loading': 'warning',
  'in-transit': 'primary',
  'at-unloading': 'warning',
  'in-return': 'warning',
  'delivered': 'success',
};

// Status label mapping
const statusLabels = {
  'planned': 'Planned',
  'en-route-to-loading': 'En Route to Loading',
  'at-loading': 'At Loading',
  'in-transit': 'In Transit',
  'at-unloading': 'At Unloading',
  'in-return': 'In Return',
  'delivered': 'Delivered',
};

// Journey type label mapping
const typeLabels = {
  'ftl': 'Full Truck Load (FTL)',
  'ptl': 'Part Truck Load (PTL)',
};

const JourneyDetailsDrawer = ({ open, onClose, journey }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!journey) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
            maxWidth: '1000px',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </Drawer>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Details
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Journey Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Journey ID
                      </Typography>
                      <Typography variant="body1">{journey.id}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Trip ID
                      </Typography>
                      <Typography variant="body1">{journey.tripId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Type
                      </Typography>
                      <Typography variant="body1">{typeLabels[journey.type] || journey.type}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={statusLabels[journey.status] || journey.status}
                        size="small"
                        color={statusColors[journey.status] || 'default'}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Created At
                      </Typography>
                      <Typography variant="body1">{formatDate(journey.createdAt)}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Vehicle & Driver
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle Info
                      </Typography>
                      <Typography variant="body1">{journey.vehicleInfo}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle Number
                      </Typography>
                      <Typography variant="body1">{journey.vehicleNumber}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Driver Name
                      </Typography>
                      <Typography variant="body1">{journey.driverName}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Driver Contact
                      </Typography>
                      <Typography variant="body1">{journey.driverNumber}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Tracking Type
                      </Typography>
                      <Typography variant="body1">{journey.trackingType}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Origin
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1">{journey.from.location}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                      <Typography variant="body1">{journey.from.company}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1">{journey.from.address}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Contact Person
                      </Typography>
                      <Typography variant="body1">{journey.from.contactPerson}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Contact Number
                      </Typography>
                      <Typography variant="body1">{journey.from.contactNumber}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Destination
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1">{journey.to.location}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                      <Typography variant="body1">{journey.to.company}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1">{journey.to.address}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Contact Person
                      </Typography>
                      <Typography variant="body1">{journey.to.contactPerson}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Contact Number
                      </Typography>
                      <Typography variant="body1">{journey.to.contactNumber}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Schedule
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Expected Departure
                        </Typography>
                        <Typography variant="body1">{formatDate(journey.expectedDeparture)}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Actual Departure
                        </Typography>
                        <Typography variant="body1">
                          {journey.actualDeparture ? formatDate(journey.actualDeparture) : 'Not departed'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Expected Arrival
                        </Typography>
                        <Typography variant="body1">{formatDate(journey.expectedArrival)}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Actual Arrival
                        </Typography>
                        <Typography variant="body1">
                          {journey.actualArrival ? formatDate(journey.actualArrival) : 'Not arrived'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          ETA
                        </Typography>
                        <Typography variant="body1">
                          {journey.eta ? formatDate(journey.eta) : 'Not available'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Distance
                        </Typography>
                        <Typography variant="body1">{journey.distance} km</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body1">
                          {journey.isDelayed ? (
                            <Chip
                              icon={<Icon name="Clock" size={14} />}
                              label={`Delayed by ${journey.delayTime}`}
                              size="small"
                              color="error"
                            />
                          ) : (
                            <Chip label="On Time" size="small" color="success" />
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Load Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography variant="body1">{journey.loadDetails.weight} kg</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Volume
                        </Typography>
                        <Typography variant="body1">{journey.loadDetails.volume} m³</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Packages
                        </Typography>
                        <Typography variant="body1">{journey.loadDetails.packages}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Material
                        </Typography>
                        <Typography variant="body1">{journey.loadDetails.material}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Value
                        </Typography>
                        <Typography variant="body1">₹{journey.loadDetails.value.toLocaleString()}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      case 1: // Timeline
        return <JourneyTimeline journey={journey} />;
      case 2: // Map
        return <JourneyMap journey={journey} />;
      case 3: // Documents
        return <JourneyDocuments journey={journey} />;
      case 4: // Alerts
        return <JourneyAlerts journey={journey} />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
          maxWidth: '1000px',
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Journey Details</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Icon name="X" size={24} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Chip
              label={typeLabels[journey.type] || journey.type}
              size="small"
              color={journey.type === 'ftl' ? 'primary' : 'secondary'}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Chip
              label={statusLabels[journey.status] || journey.status}
              size="small"
              color={statusColors[journey.status] || 'default'}
            />
          </Grid>
          {journey.isDelayed && (
            <Grid item>
              <Chip
                icon={<Icon name="Clock" size={14} />}
                label={`Delayed by ${journey.delayTime}`}
                size="small"
                color="error"
              />
            </Grid>
          )}
        </Grid>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          {journey.from.location} to {journey.to.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {journey.tripId} • {formatDate(journey.expectedDeparture)} - {formatDate(journey.expectedArrival)}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="journey details tabs"
        >
          <Tab icon={<Icon name="Info" size={18} />} label="Details" iconPosition="start" />
          <Tab icon={<Icon name="Timeline" size={18} />} label="Timeline" iconPosition="start" />
          <Tab icon={<Icon name="Map" size={18} />} label="Map" iconPosition="start" />
          <Tab icon={<Icon name="File" size={18} />} label="Documents" iconPosition="start" />
          <Tab 
            icon={<Icon name="AlertTriangle" size={18} />} 
            label={`Alerts ${journey.alerts.length > 0 ? `(${journey.alerts.length})` : ''}`} 
            iconPosition="start" 
          />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2, overflow: 'auto', flex: 1 }}>
        {renderTabContent()}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<Icon name="Printer" size={18} />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>
    </Drawer>
  );
};

JourneyDetailsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  journey: PropTypes.object,
};

export default JourneyDetailsDrawer;
