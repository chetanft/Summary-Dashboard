import React from 'react';
import { Box, Tabs, Tab, Typography, Chip } from '@mui/material';
import { getJourneyCountByStatus } from '../../data/journeyData';

/**
 * Journey Status Tabs component
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeStatus - Active status tab
 * @param {Function} props.onStatusChange - Function to handle status change
 * @returns {JSX.Element}
 */
const JourneyStatusTabs = ({ activeStatus, onStatusChange }) => {
  // Define the status tabs
  const statusTabs = [
    { value: 'planned', label: 'Planned' },
    { value: 'en-route-to-loading', label: 'En Route to Loading' },
    { value: 'at-loading', label: 'At Loading' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'at-unloading', label: 'At Unloading' },
    { value: 'in-return', label: 'In Return' },
    { value: 'delivered', label: 'Delivered' }
  ];
  
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs 
        value={activeStatus} 
        onChange={onStatusChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            minWidth: 'auto',
            px: 2,
            py: 1.5,
          }
        }}
      >
        {statusTabs.map((tab) => (
          <Tab 
            key={tab.value}
            value={tab.value} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">{tab.label}</Typography>
                <Chip 
                  label={getJourneyCountByStatus(tab.value)} 
                  size="small" 
                  sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.75rem' }} 
                />
              </Box>
            } 
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default JourneyStatusTabs;
