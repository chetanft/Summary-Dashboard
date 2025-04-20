import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Link,
  Grid,
} from '@mui/material';
import { formatDate, formatTime } from '../../utils/dateUtils';
import Icon from '../common/Icon';

// Timeline milestone icons
const milestoneIcons = {
  'journey-created': 'FileText',
  'journey-started': 'Play',
  'en-route-to-loading': 'Navigation',
  'at-loading': 'Package',
  'in-transit': 'Truck',
  'at-unloading': 'PackageOpen',
  'delivered': 'CheckCircle',
  'pod-submitted': 'Upload',
  'pod-approved': 'CheckSquare',
  'pod-rejected': 'XSquare',
};

// Timeline milestone colors
const milestoneColors = {
  'journey-created': 'info',
  'journey-started': 'info',
  'en-route-to-loading': 'info',
  'at-loading': 'warning',
  'in-transit': 'primary',
  'at-unloading': 'warning',
  'delivered': 'success',
  'pod-submitted': 'info',
  'pod-approved': 'success',
  'pod-rejected': 'error',
};

// Timeline milestone labels
const milestoneLabels = {
  'journey-created': 'Journey Created',
  'journey-started': 'Journey Started',
  'en-route-to-loading': 'En Route to Loading',
  'at-loading': 'At Loading',
  'in-transit': 'In Transit',
  'at-unloading': 'At Unloading',
  'delivered': 'Delivered',
  'pod-submitted': 'POD Submitted',
  'pod-approved': 'POD Approved',
  'pod-rejected': 'POD Rejected',
};

const JourneyTimeline = ({ journey }) => {
  // Sort timeline events by timestamp
  const sortedTimeline = [...journey.timeline].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Journey Timeline
        </Typography>
        
        <Stepper orientation="vertical">
          {sortedTimeline.map((event, index) => (
            <Step key={event.id} active={true} completed={true}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${milestoneColors[event.milestone] || 'primary'}.light`,
                      color: `${milestoneColors[event.milestone] || 'primary'}.main`,
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                    }}
                  >
                    <Icon name={milestoneIcons[event.milestone] || 'Circle'} size={16} />
                  </Box>
                )}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    {milestoneLabels[event.milestone] || event.milestone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(event.timestamp)} {formatTime(event.timestamp)}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  {event.notes && (
                    <Typography variant="body2" paragraph>
                      {event.notes}
                    </Typography>
                  )}
                  
                  {event.location && event.location.lat && event.location.lng && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <Icon name="MapPin" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Location: {event.location.lat.toFixed(6)}, {event.location.lng.toFixed(6)}
                    </Typography>
                  )}
                  
                  {event.documents && event.documents.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Documents:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {event.documents.map((docId) => {
                          const document = journey.documents.find(doc => doc.id === docId);
                          return document ? (
                            <Chip
                              key={docId}
                              icon={<Icon name="File" size={14} />}
                              label={document.name}
                              size="small"
                              component={Link}
                              href={document.url}
                              target="_blank"
                              clickable
                            />
                          ) : (
                            <Chip
                              key={docId}
                              icon={<Icon name="File" size={14} />}
                              label={`Document ${docId}`}
                              size="small"
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Created by: {event.createdBy}
                  </Typography>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {sortedTimeline.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No timeline events available
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Stops
        </Typography>
        
        <Grid container spacing={2}>
          {journey.stops.map((stop) => (
            <Grid item xs={12} md={6} key={stop.id}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1">
                    {stop.location} ({stop.type === 'pickup' ? 'Pickup' : 'Delivery'})
                  </Typography>
                  <Chip
                    label={stop.status === 'completed' ? 'Completed' : stop.status === 'skipped' ? 'Skipped' : 'Pending'}
                    size="small"
                    color={stop.status === 'completed' ? 'success' : stop.status === 'skipped' ? 'warning' : 'info'}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {stop.address}, {stop.city}, {stop.state} - {stop.pincode}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Expected Arrival
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(stop.expectedArrival)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Actual Arrival
                    </Typography>
                    <Typography variant="body2">
                      {stop.actualArrival ? formatDate(stop.actualArrival) : 'Not arrived'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Expected Departure
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(stop.expectedDeparture)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Actual Departure
                    </Typography>
                    <Typography variant="body2">
                      {stop.actualDeparture ? formatDate(stop.actualDeparture) : 'Not departed'}
                    </Typography>
                  </Grid>
                </Grid>
                
                {stop.notes && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Notes: {stop.notes}
                    </Typography>
                  </Box>
                )}
                
                {stop.documents && stop.documents.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Documents:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {stop.documents.map((doc) => (
                        <Chip
                          key={doc.id}
                          icon={<Icon name="File" size={14} />}
                          label={doc.name}
                          size="small"
                          component={Link}
                          href={doc.url}
                          target="_blank"
                          clickable
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {journey.stops.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No stops available
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

JourneyTimeline.propTypes = {
  journey: PropTypes.object.isRequired,
};

export default JourneyTimeline;
