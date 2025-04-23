import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import Icon from '../../common/Icon';
import PrintButton from './PrintButton';

/**
 * Journey Details Header component
 * Displays the journey ID and delivery timeframe with a back button
 *
 * @param {Object} props - Component props
 * @param {string} props.journeyId - Journey ID
 * @param {Object} props.deliveryTimeframe - Delivery timeframe object with days and minutes
 * @param {Function} props.onBackClick - Function to handle back button click
 * @param {Object} props.journeyDetails - Full journey details object for printing
 * @param {Object} props.printButtonRef - Ref for the print button
 * @returns {JSX.Element}
 */
const JourneyDetailsHeader = ({ journeyId, deliveryTimeframe, onBackClick, journeyDetails, printButtonRef }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        mb: 3
      }}
      role="banner"
      aria-label="Journey details header"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={onBackClick}
          sx={{
            mr: 2,
            width: '40px',
            height: '40px',
            color: 'text.primary'
          }}
          aria-label="Back to journeys"
        >
          <Icon name="ArrowLeft" size={20} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              mr: 2
            }}
            id="journey-title"
          >
            {journeyId}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'success.main',
              fontWeight: 500
            }}
            aria-live="polite"
            aria-label={`Delivery timeframe: ${deliveryTimeframe.days} days ${deliveryTimeframe.minutes} minutes`}
          >
            in {deliveryTimeframe.days} days {deliveryTimeframe.minutes} min
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', ml: 'auto' }}>
        <PrintButton journeyDetails={journeyDetails} ref={printButtonRef} />
      </Box>
    </Box>
  );
};

JourneyDetailsHeader.propTypes = {
  journeyId: PropTypes.string.isRequired,
  deliveryTimeframe: PropTypes.shape({
    days: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  journeyDetails: PropTypes.object.isRequired
};

export default JourneyDetailsHeader;
