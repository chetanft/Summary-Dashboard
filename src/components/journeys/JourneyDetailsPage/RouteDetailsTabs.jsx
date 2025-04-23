import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

/**
 * Route Details Tabs component
 * Displays tabs for different journey types (Outbound, Round trip, Express Delivery)
 *
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Function to handle tab change
 * @returns {JSX.Element}
 */
const RouteDetailsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'outbound', label: 'Outbound' },
    { id: 'roundTrip', label: 'Round trip' },
    { id: 'expressDelivery', label: 'Express Delivery' }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}
      role="tablist"
      aria-label="Route details tabs"
    >
      {tabs.map(tab => (
        <Button
          key={tab.id}
          variant="text"
          disableRipple
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          sx={{
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1, sm: 2 },
            minWidth: { xs: 'auto', sm: '100px' },
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            color: activeTab === tab.id ? 'primary.main' : 'text.secondary',
            fontWeight: activeTab === tab.id ? 600 : 400,
            borderBottom: activeTab === tab.id ? '2px solid' : 'none',
            borderColor: 'primary.main',
            borderRadius: 0,
            position: 'relative',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main'
            },
            '&:focus-visible': {
              backgroundColor: 'action.hover',
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px'
            },
            '&::after': activeTab === tab.id ? {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: 'background.paper'
            } : {}
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

RouteDetailsTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default RouteDetailsTabs;
