import React from 'react';
import { Box, Chip, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { getAllConsignees } from '../../data/journeyData';

/**
 * Journey Filters component
 *
 * @param {Object} props - Component props
 * @param {Object} props.filters - Filter states
 * @param {Function} props.onFilterChange - Function to handle filter changes
 * @returns {JSX.Element}
 */
const JourneyFilters = ({ filters, onFilterChange }) => {
  const { expectedArrival, delayedStatus, consignee } = filters;

  // Expected arrival filters
  const expectedArrivalFilters = [
    { value: 'lt-1hr', label: '<1 hr', count: 28 },
    { value: 'lt-4hrs', label: '<4 hrs', count: 18 },
    { value: 'lt-6hrs', label: '<6 hrs', count: 18 }
  ];

  // Delayed status filters
  const delayedStatusFilters = [
    { value: 'delayed-lt-1hr', label: '<1 hr', count: 28 },
    { value: 'delayed-lt-2hrs', label: '<2 hrs', count: 18 },
    { value: 'delayed-gt-4hrs', label: '<4+ hrs', count: 16 }
  ];

  // Get all consignees for the dropdown
  const consignees = getAllConsignees();

  // Handle expected arrival filter click
  const handleExpectedArrivalClick = (value) => {
    onFilterChange('expectedArrival', value === expectedArrival ? null : value);
  };

  // Handle delayed status filter click
  const handleDelayedStatusClick = (value) => {
    onFilterChange('delayedStatus', value === delayedStatus ? null : value);
  };

  // Handle consignee change
  const handleConsigneeChange = (event) => {
    onFilterChange('consignee', event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      {/* Expected arrival filters */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem' }}>
          Expected arrival
        </Typography>
        {expectedArrivalFilters.map((filter) => (
          <Chip
            key={filter.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {filter.count}
                </Typography>
                <Typography component="span" sx={{ ml: 0.5, fontSize: '0.75rem' }}>
                  {filter.label}
                </Typography>
              </Box>
            }
            onClick={() => handleExpectedArrivalClick(filter.value)}
            sx={{
              borderRadius: '8px',
              height: '32px',
              bgcolor: expectedArrival === filter.value ? 'primary.light' : 'background.paper',
              border: '1px solid',
              borderColor: expectedArrival === filter.value ? 'primary.main' : 'divider',
              '&:hover': {
                bgcolor: expectedArrival === filter.value ? 'primary.light' : 'action.hover',
              },
              '& .MuiChip-label': {
                padding: '0 12px',
              }
            }}
          />
        ))}
      </Box>

      {/* Delayed filters */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem' }}>
          Delayed
        </Typography>
        {delayedStatusFilters.map((filter) => (
          <Chip
            key={filter.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {filter.count}
                </Typography>
                <Typography component="span" sx={{ ml: 0.5, fontSize: '0.75rem' }}>
                  {filter.label}
                </Typography>
              </Box>
            }
            onClick={() => handleDelayedStatusClick(filter.value)}
            sx={{
              borderRadius: '8px',
              height: '32px',
              bgcolor: delayedStatus === filter.value ? 'error.light' : 'background.paper',
              border: '1px solid',
              borderColor: delayedStatus === filter.value ? 'error.main' : 'divider',
              '&:hover': {
                bgcolor: delayedStatus === filter.value ? 'error.light' : 'action.hover',
              },
              '& .MuiChip-label': {
                padding: '0 12px',
              }
            }}
          />
        ))}
      </Box>

      {/* Consignee filter */}
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <Select
          value={consignee}
          onChange={handleConsigneeChange}
          displayEmpty
          sx={{
            height: '32px',
            '& .MuiSelect-select': {
              paddingTop: '4px',
              paddingBottom: '4px',
            }
          }}
        >
          <MenuItem value="all">All Consignee</MenuItem>
          {consignees.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default JourneyFilters;
