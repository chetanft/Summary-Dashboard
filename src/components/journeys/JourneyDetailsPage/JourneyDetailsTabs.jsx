import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Journey Details Tabs component
 * Displays tabs for different journey status (Tracking, Loads, Alerts, In yard management)
 *
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Function to handle tab change
 * @returns {JSX.Element}
 */
const JourneyDetailsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'tracking', label: 'Tracking' },
    { id: 'loads', label: 'Loads' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'yard-management', label: 'In yard management' }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid #CED1D7',
        width: '100%',
        height: '78px',
        alignItems: 'flex-end'
      }}
      role="tablist"
      aria-label="Journey details tabs"
    >
      {tabs.map(tab => (
        <Box
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '12px 32px 14px',
            gap: '10px',
            height: '78px',
            borderBottom: activeTab === tab.id 
              ? '4px solid #434F64' 
              : '1px solid #CED1D7',
            cursor: 'pointer'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              height: '22px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64'
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

JourneyDetailsTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default JourneyDetailsTabs;
