import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper, Button } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Overview Panel component
 * Displays shipper information, trip timing, and distance
 *
 * @param {Object} props - Component props
 * @param {Object} props.shipper - Shipper information
 * @param {Object} props.tripStart - Trip start information
 * @param {Object} props.transitTime - Transit time information
 * @param {Object} props.totalDistance - Total distance information
 * @returns {JSX.Element}
 */
const JourneyOverviewPanel = ({ shipper, tripStart, transitTime, totalDistance }) => {
  const handleEditShipper = () => {
    console.log('Edit shipper clicked');
    // Implement edit shipper functionality
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.light'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: { xs: 2, sm: 3, md: 4, lg: 6 }
        }}
      >
        {/* Shipper Information */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0.5
            }}
          >
            Shipper
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {shipper.name}
            </Typography>

            <Button
              variant="text"
              size="small"
              startIcon={<Icon name="Edit" size={14} />}
              onClick={handleEditShipper}
              sx={{
                color: 'text.secondary',
                p: '4px 8px',
                minWidth: 'auto',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>

        {/* Trip Start Information */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0.5
            }}
          >
            Trip starts on
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {tripStart.formattedDate}
          </Typography>
        </Box>

        {/* Transit Time Information */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0.5
            }}
          >
            Standard transit time
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {transitTime.days} days {transitTime.hours} hrs {transitTime.minutes} min
          </Typography>
        </Box>

        {/* Total Distance Information */}
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0.5
            }}
          >
            Total distance
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {totalDistance.value} {totalDistance.unit}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

JourneyOverviewPanel.propTypes = {
  shipper: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string
  }).isRequired,
  tripStart: PropTypes.shape({
    date: PropTypes.string,
    formattedDate: PropTypes.string.isRequired
  }).isRequired,
  transitTime: PropTypes.shape({
    days: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired
  }).isRequired,
  totalDistance: PropTypes.shape({
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
  }).isRequired
};

export default JourneyOverviewPanel;
