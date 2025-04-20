import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Alert } from '@mui/material';
import Icon from '../common/Icon';

const JourneyMap = ({ journey }) => {
  // In a real application, this would use a mapping library like Google Maps, Mapbox, or Leaflet
  // For this implementation, we'll create a simple placeholder
  
  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Journey Map
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            In a production environment, this would display an interactive map showing the journey route, current location, and stops.
            The map would be implemented using a mapping library like Google Maps, Mapbox, or Leaflet.
          </Typography>
        </Alert>
        
        <Box
          sx={{
            height: 400,
            bgcolor: 'background.paper',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Icon name="Map" size={64} sx={{ color: 'text.secondary', mb: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Journey Map Placeholder
          </Typography>
          
          <Typography variant="body1" align="center" gutterBottom>
            {journey.from.location} to {journey.to.location}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center">
            Distance: {journey.distance} km
          </Typography>
          
          <Box sx={{ mt: 3, width: '100%', maxWidth: 500 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'success.main',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    mr: 1,
                  }}
                />
                <Typography variant="body2">{journey.from.location} (Origin)</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {journey.actualDeparture ? 'Departed' : 'Not departed'}
              </Typography>
            </Box>
            
            {journey.stops
              .filter(stop => stop.type !== 'pickup' && stop.type !== 'delivery')
              .map((stop, index) => (
                <Box key={stop.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        bgcolor: 'warning.main',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">{stop.location} (Stop {index + 1})</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stop.status === 'completed' ? 'Completed' : stop.status === 'skipped' ? 'Skipped' : 'Pending'}
                  </Typography>
                </Box>
              ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'error.main',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    mr: 1,
                  }}
                />
                <Typography variant="body2">{journey.to.location} (Destination)</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {journey.actualArrival ? 'Arrived' : 'Not arrived'}
              </Typography>
            </Box>
            
            <Box
              sx={{
                mt: 2,
                height: 8,
                bgcolor: 'background.default',
                borderRadius: 4,
                position: 'relative',
              }}
            >
              {/* Progress bar based on journey status */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${journey.getProgressPercentage()}%`,
                  bgcolor: journey.isDelayed ? 'warning.main' : 'primary.main',
                  borderRadius: 4,
                }}
              />
              
              {/* Current location marker */}
              {journey.status !== 'planned' && journey.status !== 'delivered' && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${journey.getProgressPercentage()}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: journey.isDelayed ? 'error.main' : 'primary.main',
                    border: '2px solid',
                    borderColor: 'background.paper',
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <Icon name="MapPin" size={18} sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="body2">
              Current Location: {journey.currentLocation.lat.toFixed(6)}, {journey.currentLocation.lng.toFixed(6)}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

JourneyMap.propTypes = {
  journey: PropTypes.object.isRequired,
};

export default JourneyMap;
