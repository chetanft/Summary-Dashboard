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
    { value: 'planned', label: 'Planned', count: getJourneyCountByStatus('planned') },
    { value: 'en-route-to-loading', label: 'En Route to Loading', count: getJourneyCountByStatus('en-route-to-loading') },
    { value: 'at-loading', label: 'At Loading', count: getJourneyCountByStatus('at-loading') },
    { value: 'in-transit', label: 'In Transit', count: getJourneyCountByStatus('in-transit') },
    { value: 'at-unloading', label: 'At Unloading', count: getJourneyCountByStatus('at-unloading') },
    { value: 'in-return', label: 'In Return', count: getJourneyCountByStatus('in-return') },
    { value: 'delivered', label: 'Delivered', count: getJourneyCountByStatus('delivered') }
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
            textTransform: 'none',
            fontWeight: 'normal',
            color: 'text.primary',
            '&.Mui-selected': {
              color: 'primary.main',
              fontWeight: 500,
            }
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
          }
        }}
      >
        {statusTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: activeStatus === tab.value ? 500 : 400,
                    fontSize: '0.875rem',
                  }}
                >
                  {tab.label}
                </Typography>
                <Chip
                  label={tab.count}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 20,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: activeStatus === tab.value ? 'primary.light' : 'grey.200',
                    color: activeStatus === tab.value ? 'primary.main' : 'text.secondary',
                    '& .MuiChip-label': {
                      px: 1,
                    }
                  }}
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
