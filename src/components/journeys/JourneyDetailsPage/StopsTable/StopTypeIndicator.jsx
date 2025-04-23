import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Stop Type Indicator component
 * Displays a circular indicator with a code for the stop type
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Stop type
 * @param {string} props.code - Stop type code
 * @returns {JSX.Element}
 */
const StopTypeIndicator = ({ type, code }) => {
  // Memoize the color calculation to prevent recalculation on re-renders
  const typeColor = useMemo(() => {
    const colors = {
      'Origin': '#1D4ED8', // Blue
      'Pickup': '#10B981', // Green
      'Transfer': '#6366F1', // Indigo
      'Destination': '#EF4444', // Red
      'Return Pickup': '#F59E0B', // Amber
      'Return Origin': '#1D4ED8' // Blue
    };
    return colors[type] || '#9CA3AF'; // Default gray
  }, [type]);

  return (
    <Box
      sx={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: typeColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        flexShrink: 0
      }}
    >
      {code}
    </Box>
  );
};

StopTypeIndicator.propTypes = {
  type: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
};

// Use memo to prevent unnecessary re-renders
export default memo(StopTypeIndicator);
