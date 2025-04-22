import React from 'react';
import {
  Box,
  Typography,
  Button,
  InputBase,
  IconButton
} from '@mui/material';
import Icon from '../common/Icon';

/**
 * Journey Page Header component
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.location - Selected location
 * @param {Object} props.dateRange - Date range object with start and end dates
 * @param {string} props.sourceFilter - Source filter value
 * @param {string} props.searchTerm - Search term
 * @param {Function} props.onLocationChange - Function to handle location change
 * @param {Function} props.onDateRangeChange - Function to handle date range change
 * @param {Function} props.onSourceFilterChange - Function to handle source filter change
 * @param {Function} props.onSearch - Function to handle search
 * @param {Function} props.onAddClick - Function to handle add button click
 * @returns {JSX.Element}
 */
const JourneyPageHeader = ({
  title = 'My Journeys',
  location = 'MDC Labs, Amritsar',
  dateRange = { start: '12 Aug 2024', end: '12 Sep 2024' },
  sourceFilter = 'Outbound - Source',
  searchTerm = '',
  onLocationChange,
  onDateRangeChange,
  onSourceFilterChange,
  onSearch,
  onAddClick
}) => {
  // Handle location change
  const handleLocationChange = () => {
    if (onLocationChange) {
      onLocationChange();
    }
  };

  // Handle date range change
  const handleDateRangeChange = () => {
    if (onDateRangeChange) {
      onDateRangeChange();
    }
  };

  // Handle date range clear
  const handleDateRangeClear = () => {
    if (onDateRangeChange) {
      onDateRangeChange(null);
    }
  };

  // Handle source filter change
  const handleSourceFilterChange = () => {
    if (onSourceFilterChange) {
      onSourceFilterChange();
    }
  };

  // Handle search
  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Handle add button click
  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: '#FFFFFF',
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 0px',
          gap: '10px',
          width: '100%',
          height: '40px',
        }}
      >
        {/* Title Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '12px',
            height: '34px',
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#434F64',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Filter Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',
            height: '32px',
          }}
        >
          {/* Location Dropdown */}
          <Box
            onClick={handleLocationChange}
            sx={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: '4px',
              border: '1px solid #E0E4E8',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <Typography variant="body2" sx={{ color: '#434F64', fontSize: '14px' }}>
              {location}
            </Typography>
            <Icon name="ChevronDown" size={12} color="#838C9D" />
          </Box>

          {/* Date Range Filter */}
          <Box
            onClick={handleDateRangeChange}
            sx={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: '4px',
              border: '1px solid #E0E4E8',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <Icon name="Calendar" size={12} color="#838C9D" />
            <Typography variant="body2" sx={{ color: '#434F64', fontSize: '14px' }}>
              {dateRange.start}
            </Typography>
            <Typography variant="body2" sx={{ color: '#838C9D', fontSize: '14px' }}>
              →
            </Typography>
            <Typography variant="body2" sx={{ color: '#434F64', fontSize: '14px' }}>
              {dateRange.end}
            </Typography>
            <Box onClick={(e) => { e.stopPropagation(); handleDateRangeClear(); }} sx={{ cursor: 'pointer' }}>
              <Icon name="X" size={12} color="#838C9D" />
            </Box>
          </Box>

          {/* Source Filter Dropdown */}
          <Box
            onClick={handleSourceFilterChange}
            sx={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: '4px',
              border: '1px solid #E0E4E8',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <Typography variant="body2" sx={{ color: '#434F64', fontSize: '14px' }}>
              {sourceFilter}
            </Typography>
            <Icon name="ChevronDown" size={12} color="#838C9D" />
          </Box>

          {/* Search Input */}
          <Box
            sx={{
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: '4px',
              border: '1px solid #E0E4E8',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              flex: 1,
              maxWidth: '300px',
            }}
          >
            <Icon name="Search" size={12} color="#838C9D" />
            <InputBase
              placeholder="Search My Journeys"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#434F64',
                flex: 1,
                '& .MuiInputBase-input': {
                  padding: 0,
                },
              }}
            />
          </Box>

          {/* Add Journey Button */}
          <Button
            variant="contained"
            startIcon={<Icon name="Plus" size={16} color="#FFFFFF" />}
            onClick={handleAddClick}
            sx={{
              backgroundColor: '#434F64',
              borderRadius: '4px',
              textTransform: 'none',
              padding: '0 16px',
              height: '32px',
              '&:hover': {
                backgroundColor: '#323C4D',
              },
              fontSize: '14px',
              fontWeight: 500,
              marginLeft: 'auto',
            }}
          >
            Add Journey
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyPageHeader;
