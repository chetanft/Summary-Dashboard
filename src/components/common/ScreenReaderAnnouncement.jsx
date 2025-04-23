import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Screen Reader Announcement component
 * Announces messages to screen readers using ARIA live regions
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Message to announce
 * @param {string} props.politeness - ARIA live politeness setting ('polite' or 'assertive')
 * @param {number} props.clearDelay - Delay in milliseconds before clearing the message
 * @returns {JSX.Element}
 */
const ScreenReaderAnnouncement = ({ message, politeness = 'polite', clearDelay = 5000 }) => {
  const [announcement, setAnnouncement] = useState('');
  
  useEffect(() => {
    if (!message) return;
    
    // Set the announcement
    setAnnouncement(message);
    
    // Clear the announcement after a delay
    const timerId = setTimeout(() => {
      setAnnouncement('');
    }, clearDelay);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [message, clearDelay]);
  
  return (
    <Box
      aria-live={politeness}
      aria-atomic="true"
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}
    >
      {announcement}
    </Box>
  );
};

ScreenReaderAnnouncement.propTypes = {
  message: PropTypes.string,
  politeness: PropTypes.oneOf(['polite', 'assertive']),
  clearDelay: PropTypes.number
};

export default ScreenReaderAnnouncement;
