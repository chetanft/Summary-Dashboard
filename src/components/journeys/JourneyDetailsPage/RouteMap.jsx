import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Route Map component
 * Displays a map with the journey route and stops
 * 
 * @param {Object} props - Component props
 * @param {Array} props.stops - Array of stop objects
 * @param {Array} props.center - Center coordinates [longitude, latitude]
 * @param {number} props.zoom - Map zoom level
 * @returns {JSX.Element}
 */
const RouteMap = ({ stops, center, zoom }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  
  // In a real application, this would use a mapping library like Mapbox or Google Maps
  // For this implementation, we'll create a placeholder
  
  // Get color based on stop type
  const getStopColor = (type) => {
    const colors = {
      'Origin': '#1D4ED8', // Blue
      'Pickup': '#10B981', // Green
      'Transfer': '#6366F1', // Indigo
      'Destination': '#EF4444', // Red
      'Return Pickup': '#F59E0B', // Amber
      'Return Origin': '#1D4ED8' // Blue
    };
    return colors[type] || '#9CA3AF'; // Default gray
  };
  
  // Calculate route progress percentage
  const getProgressPercentage = () => {
    // In a real application, this would be based on the journey's progress
    return 65; // Example: 65% complete
  };
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      <Box 
        ref={mapContainerRef}
        sx={{ 
          height: '320px',
          width: '100%',
          position: 'relative',
          bgcolor: '#F8F9FA',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3
        }}
      >
        <Icon name="Map" size={64} sx={{ color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Journey Route Map
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3, maxWidth: '500px' }}>
          In a production environment, this would display an interactive map showing the journey route, 
          current location, and all stops using a mapping library like Mapbox or Google Maps.
        </Typography>
        
        <Box sx={{ width: '100%', maxWidth: '500px' }}>
          {/* Route visualization */}
          <Box sx={{ mb: 3 }}>
            {stops.map((stop, index) => (
              <Box 
                key={stop.id || index}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      bgcolor: getStopColor(stop.type),
                      mr: 1
                    }}
                  />
                  <Typography variant="body2">
                    {stop.location.name} ({stop.type})
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {index === 0 ? 'Start' : index === stops.length - 1 ? 'End' : `Stop ${index}`}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Progress bar */}
          <Box 
            sx={{ 
              mt: 2,
              height: '8px',
              bgcolor: 'background.default',
              borderRadius: '4px',
              position: 'relative'
            }}
          >
            {/* Progress indicator */}
            <Box 
              sx={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${getProgressPercentage()}%`,
                bgcolor: 'primary.main',
                borderRadius: '4px'
              }}
            />
            
            {/* Current location marker */}
            <Box 
              sx={{ 
                position: 'absolute',
                left: `${getProgressPercentage()}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                bgcolor: 'primary.main',
                border: '2px solid',
                borderColor: 'background.paper',
                zIndex: 1
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

RouteMap.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      typeCode: PropTypes.string.isRequired,
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        city: PropTypes.string,
        state: PropTypes.string
      }).isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    })
  ).isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number
};

export default RouteMap;
