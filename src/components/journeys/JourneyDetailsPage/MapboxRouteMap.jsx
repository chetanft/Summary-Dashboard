import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useAnalytics from '../../../hooks/useAnalytics';

// Mapbox access token - in a real app, this would be in an environment variable
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvZXhkOGNnMDFtMjJrcGR5ZDFkaHl4ZSJ9.2-9eXQGwfEbxh1hcwslJ4Q';

/**
 * Mapbox Route Map component
 * Displays a map with the journey route and stops using Mapbox
 *
 * @param {Object} props - Component props
 * @param {Array} props.stops - Array of stop objects
 * @param {Array} props.center - Center coordinates [longitude, latitude]
 * @param {number} props.zoom - Map zoom level
 * @returns {JSX.Element}
 */
const MapboxRouteMap = ({ stops, center, zoom }) => {
  const mapRef = useRef(null);
  const analytics = useAnalytics();
  const [viewState, setViewState] = useState({
    longitude: center?.[0] || 78.9629,
    latitude: center?.[1] || 20.5937,
    zoom: zoom || 4,
    bearing: 0,
    pitch: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interactionTimeout, setInteractionTimeout] = useState(null);

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

  // Create GeoJSON for the route
  const routeGeoJSON = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: stops
        .filter(stop => stop.coordinates && stop.coordinates.length === 2)
        .map(stop => stop.coordinates)
    }
  };

  // Route line style
  const routeLineLayer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#4338CA',
      'line-width': 3,
      'line-opacity': 0.8
    }
  };

  // Handle map load
  const handleMapLoad = () => {
    setLoading(false);
    analytics.trackMapInteraction('Load', { success: true });
  };

  // Handle map error
  const handleMapError = (e) => {
    console.error('Map error:', e);
    setError('Failed to load map');
    setLoading(false);
    analytics.trackMapInteraction('Load', { success: false, error: e.message });
  };

  // Handle map move
  const handleMapMove = useCallback((evt) => {
    setViewState(evt.viewState);

    // Debounce tracking to avoid too many events
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
    }

    setInteractionTimeout(setTimeout(() => {
      analytics.trackMapInteraction('Move', {
        zoom: evt.viewState.zoom.toFixed(2),
        center: [evt.viewState.longitude.toFixed(4), evt.viewState.latitude.toFixed(4)]
      });
    }, 500));
  }, [analytics, interactionTimeout]);

  // Handle marker click
  const handleMarkerClick = useCallback((stop) => {
    analytics.trackMapInteraction('MarkerClick', {
      stopId: stop.id,
      stopType: stop.type,
      location: stop.location.name
    });
  }, [analytics]);

  // Calculate the bounds to fit all stops
  useEffect(() => {
    if (mapRef.current && stops.length > 0 && !loading) {
      try {
        const validStops = stops.filter(stop => stop.coordinates && stop.coordinates.length === 2);

        if (validStops.length > 1) {
          const bounds = new mapboxgl.LngLatBounds();

          validStops.forEach(stop => {
            bounds.extend(stop.coordinates);
          });

          mapRef.current.fitBounds(bounds, {
            padding: 50,
            duration: 1000
          });
        }
      } catch (err) {
        console.error('Error fitting bounds:', err);
        // Don't set error state here to avoid breaking the component
      }
    }
  }, [stops, loading]);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        position: 'relative',
        height: '400px'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            backgroundColor: 'background.paper',
            p: 3
          }}
        >
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Box>
      )}

      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={handleMapMove}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: '100%', height: '100%' }}
        onLoad={handleMapLoad}
        onError={handleMapError}
      >
        {/* Navigation controls */}
        <NavigationControl position="top-right" />
        {/* Route line */}
        {stops.length > 1 && (
          <Source id="route-source" type="geojson" data={routeGeoJSON}>
            <Layer {...routeLineLayer} />
          </Source>
        )}

        {/* Stop markers */}
        {stops.map((stop, index) => {
          if (!stop.coordinates || stop.coordinates.length !== 2) return null;

          return (
            <Marker
              key={stop.id || index}
              longitude={stop.coordinates[0]}
              latitude={stop.coordinates[1]}
              anchor="bottom"
              onClick={() => handleMarkerClick(stop)}
            >
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: getStopColor(stop.type),
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {stop.typeCode}
              </Box>
            </Marker>
          );
        })}
      </Map>

      {/* Progress indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '4px',
          p: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
          Journey Progress
        </Typography>

        <Box
          sx={{
            height: '8px',
            bgcolor: 'background.default',
            borderRadius: '4px',
            position: 'relative'
          }}
        >
          {/* Progress indicator - in a real app, this would be calculated based on the journey's progress */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '65%', // Example: 65% complete
              bgcolor: 'primary.main',
              borderRadius: '4px'
            }}
          />

          {/* Current location marker */}
          <Box
            sx={{
              position: 'absolute',
              left: '65%', // Example: 65% complete
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
    </Paper>
  );
};

MapboxRouteMap.propTypes = {
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

export default MapboxRouteMap;
