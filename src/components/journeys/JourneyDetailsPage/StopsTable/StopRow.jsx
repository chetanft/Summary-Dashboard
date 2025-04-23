import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Box, Typography } from '@mui/material';
import StopTypeIndicator from './StopTypeIndicator';
import LoadIDCell from './LoadIDCell';
import Rating from '../../../common/Rating';

/**
 * Stop Row component
 * Displays a row in the stops table
 *
 * @param {Object} props - Component props
 * @param {Object} props.stop - Stop object
 * @returns {JSX.Element}
 */
const StopRow = ({ stop }) => {
  const {
    type, typeCode, location, vehicle, driver, load
  } = stop;

  return (
    <TableRow
      sx={{
        height: '80px',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      {/* Stop Type and Location Cell */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <StopTypeIndicator type={type} code={typeCode} />

          <Box sx={{ ml: 2 }}>
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
      </TableCell>

      {/* Vehicle and Driver Cell */}
      <TableCell>
        {vehicle && driver && (
          <Box>
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
      </TableCell>

      {/* Load ID Cell */}
      <TableCell>
        <LoadIDCell
          loadId={load.id}
          isReturn={load.isReturn}
          stopId={stop.id}
          journeyId={stop.journeyId}
        />
      </TableCell>
    </TableRow>
  );
};

StopRow.propTypes = {
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
export default memo(StopRow);
