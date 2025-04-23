import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography, Divider } from '@mui/material';
import StopTypeIndicator from './StopTypeIndicator';
import LoadIDCell from './LoadIDCell';
import Rating from '../../../common/Rating';

/**
 * Stop Card component
 * Mobile-friendly card view for stops
 *
 * @param {Object} props - Component props
 * @param {Object} props.stop - Stop object
 * @returns {JSX.Element}
 */
const StopCard = ({ stop }) => {
  const {
    type, typeCode, location, vehicle, driver, load
  } = stop;

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      {/* Header with Stop Type and Location */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start' }}>
        <StopTypeIndicator type={type} code={typeCode} />

        <Box sx={{ ml: 2, flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              mb: 0.5
            }}
          >
            {location.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: location.rating ? 0.5 : 0
            }}
          >
            {location.city}, {location.state}
          </Typography>

          {location.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={location.rating} size="small" />
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5,
                  color: 'text.secondary'
                }}
              >
                {location.rating}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Vehicle and Driver Information */}
      {vehicle && driver && (
        <Box sx={{ p: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0.5,
              fontWeight: 500
            }}
          >
            Vehicle & Driver
          </Typography>

          <Typography variant="body2">
            {vehicle.number}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            {driver.name}
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Load ID Information */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 0.5,
            fontWeight: 500
          }}
        >
          Load ID
        </Typography>

        <LoadIDCell
          loadId={load.id}
          isReturn={load.isReturn}
          stopId={stop.id}
          journeyId={stop.journeyId}
        />
      </Box>
    </Paper>
  );
};

StopCard.propTypes = {
  stop: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    typeCode: PropTypes.string.isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
      state: PropTypes.string,
      rating: PropTypes.number
    }).isRequired,
    vehicle: PropTypes.shape({
      number: PropTypes.string,
      type: PropTypes.string
    }),
    driver: PropTypes.shape({
      name: PropTypes.string
    }),
    load: PropTypes.shape({
      id: PropTypes.string.isRequired,
      isReturn: PropTypes.bool
    }).isRequired
  }).isRequired
};

// Use memo to prevent unnecessary re-renders
export default memo(StopCard);
