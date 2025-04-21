import React from 'react';
import {
  Box,
  Typography,
  Button,
  InputBase
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        gap: '10px',
        width: '100%',
        height: '40px',
        background: '#FFFFFF',
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
        {/* Icon */}
        <Box
          sx={{
            width: '28px',
            height: '28px',
            position: 'relative',
          }}
        >
          <Icon name="Navigation" size={28} color="#434F64" />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '140%',
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
          gap: '20px',
          height: '40px',
        }}
      >
        {/* Filter Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '12px',
            height: '40px',
            borderRadius: '8px',
          }}
        >
          {/* Location Dropdown */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '10px',
              width: '236px',
              height: '40px',
            }}
          >
            <Box
              onClick={handleLocationChange}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 12px',
                gap: '10px',
                width: '236px',
                height: '40px',
                minHeight: '40px',
                background: '#F8F8F9',
                border: '1px solid #434F64',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  height: '40px',
                  borderRadius: '8px',
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#434F64',
                  }}
                >
                  {location}
                </Typography>
              </Box>
              <Icon name="ChevronDown" size={16} color="#434F64" />
            </Box>
          </Box>

          {/* Date Range Filter */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              width: '296px',
              height: '40px',
              borderRadius: '8px',
            }}
          >
            <Box
              onClick={handleDateRangeChange}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 12px',
                gap: '10px',
                width: '296px',
                height: '40px',
                minHeight: '40px',
                background: '#F8F8F9',
                border: '1px solid #434F64',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  height: '40px',
                  borderRadius: '8px',
                  flex: 1,
                }}
              >
                <Icon name="Calendar" size={16} color="#434F64" />
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#434F64',
                    flex: 1,
                  }}
                >
                  {dateRange.start}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#838C9D',
                  }}
                >
                  →
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#434F64',
                    flex: 1,
                  }}
                >
                  {dateRange.end}
                </Typography>
              </Box>
              <Box onClick={handleDateRangeClear} sx={{ cursor: 'pointer' }}>
                <Icon name="X" size={16} color="#434F64" />
              </Box>
            </Box>
          </Box>

          {/* Source Filter Dropdown */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '10px',
              width: '191px',
              height: '40px',
            }}
          >
            <Box
              onClick={handleSourceFilterChange}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 12px',
                gap: '10px',
                width: '191px',
                height: '40px',
                minHeight: '40px',
                background: '#F8F8F9',
                border: '1px solid #434F64',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  height: '40px',
                  borderRadius: '8px',
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#434F64',
                  }}
                >
                  {sourceFilter}
                </Typography>
              </Box>
              <Icon name="ChevronDown" size={16} color="#434F64" />
            </Box>
          </Box>

          {/* Search Input */}
          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px 12px',
              gap: '10px',
              width: '259px',
              height: '40px',
              background: '#FFFFFF',
              border: '1px solid #CED1D7',
              borderRadius: '8px',
            }}
          >
            <Icon name="Search" size={16} color="#838C9D" />
            <InputBase
              placeholder="Search My Journeys"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64',
                flex: 1,
                '& .MuiInputBase-input': {
                  padding: 0,
                },
              }}
            />
          </Box>
        </Box>

        {/* Add Journey Button */}
        <Button
          variant="contained"
          startIcon={<Icon name="Plus" size={24} color="#FFFFFF" />}
          onClick={handleAddClick}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 24px',
            gap: '8px',
            width: '180px',
            height: '40px',
            background: '#434F64',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#323C4D',
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '140%',
              display: 'flex',
              alignItems: 'flex-end',
              letterSpacing: '0.0263923px',
              color: '#FFFFFF',
            }}
          >
            Journey
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default JourneyPageHeader;
