import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useSearch } from '../../context/SearchContext';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import JourneyStatusTabs from './JourneyStatusTabs';
import JourneyFilters from './JourneyFilters';
import JourneysTable from './JourneysTable';
import JourneyDetailsDrawer from './JourneyDetailsDrawer';
import { journeyData } from '../../data/journeyData';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import Icon from '../common/Icon';
import { format } from 'date-fns';

/**
 * My Journeys Page component
 *
 * @returns {JSX.Element}
 */
const MyJourneysPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { searchTerm, handleSearchTermChange } = useData();
  const { addRecentSearch } = useSearch();

  // Get journey type from URL query params (ftl or ptl)
  const queryParams = new URLSearchParams(location.search);
  const journeyType = queryParams.get('type') || 'all';

  // State for journey status tabs
  const [activeStatus, setActiveStatus] = useState('en-route-to-loading');

  // State for filters
  const [filters, setFilters] = useState({
    expectedArrival: null,
    delayedStatus: null,
    consignee: 'all'
  });

  // State for journey data
  const [filteredJourneys, setFilteredJourneys] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for view mode
  const [viewMode, setViewMode] = useState('list');

  // Search state
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Date range filter state
  const [dateRange, setDateRange] = useState({
    start: '12 Aug 2024',
    end: '12 Sep 2024'
  });

  // Source filter state
  const [sourceFilter, setSourceFilter] = useState('Outbound - Source');

  // Initialize with journey data
  useEffect(() => {
    // Filter journeys based on type, status, and filters
    let filtered = [...journeyData];

    // Filter by journey type if specified
    if (journeyType !== 'all') {
      filtered = filtered.filter(journey => journey.type.toLowerCase() === journeyType.toLowerCase());
    }

    // Filter by status
    filtered = filtered.filter(journey => journey.status === activeStatus);

    // Apply consignee filter
    if (filters.consignee !== 'all') {
      filtered = filtered.filter(journey => journey.to.company === filters.consignee);
    }

    // Apply search filter
    if (localSearchTerm) {
      const searchLower = localSearchTerm.toLowerCase();
      filtered = filtered.filter(journey =>
        journey.id.toLowerCase().includes(searchLower) ||
        journey.tripId.toLowerCase().includes(searchLower) ||
        journey.from.location.toLowerCase().includes(searchLower) ||
        journey.from.company.toLowerCase().includes(searchLower) ||
        journey.to.location.toLowerCase().includes(searchLower) ||
        journey.to.company.toLowerCase().includes(searchLower) ||
        journey.vehicleInfo.toLowerCase().includes(searchLower) ||
        journey.tripInfo.toLowerCase().includes(searchLower)
      );
    }

    setFilteredJourneys(filtered);
  }, [journeyType, activeStatus, filters, localSearchTerm]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Initialize local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  // Handle status change
  const handleStatusChange = (event, newStatus) => {
    if (newStatus !== null) {
      setActiveStatus(newStatus);
    }
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // Handle journey click
  const handleJourneyClick = (journey) => {
    setSelectedJourney(journey);
    setDrawerOpen(true);

    // Add to recent searches
    addRecentSearch({
      type: 'Journey ID',
      value: journey.id,
      tripId: journey.tripId
    });
  };

  // Handle close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle search
  const handleSearch = (value) => {
    setLocalSearchTerm(value);
    if (handleSearchTermChange) {
      handleSearchTermChange(value);
    }
  };

  // Handle add journey
  const handleAddJourney = () => {
    console.log('Add journey clicked');
    // Implement journey creation logic here
  };

  // Handle date range change
  const handleDateRangeChange = (newRange) => {
    if (newRange === null) {
      // Reset to default date range
      setDateRange({
        start: '12 Aug 2024',
        end: '12 Sep 2024'
      });
    } else {
      setDateRange(newRange);
    }
  };

  // Handle source filter change
  const handleSourceFilterChange = () => {
    // This would typically open a dropdown or dialog to select a new source
    console.log('Source filter clicked');
    // For now, we'll just toggle between two options
    setSourceFilter(sourceFilter === 'Outbound - Source' ? 'Inbound - Destination' : 'Outbound - Source');
  };

  return (
    <Layout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="My Journeys"
        activeTab="controlTower" /* Using controlTower to hide toggle tabs */
        searchBar={false}
        showDateFilter={false}
        showSourceFilter={false}
        showAddButton={false}
      />

      {/* Journey Status Tabs */}
      <JourneyStatusTabs
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
      />

      {/* Filter Bar */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
        mb: 2,
        height: '40px'
      }}>
        {/* Source Filter */}
        <Box sx={{
          width: '236px',
          height: '40px',
          border: '1px solid #434F64',
          borderRadius: '8px',
          backgroundColor: '#F8F8F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px'
        }}>
          <Typography variant="body1" sx={{ color: '#434F64' }}>
            {sourceFilter}
          </Typography>
          <Icon name="ChevronDown" size={16} color="#434F64" />
        </Box>

        {/* Date Range Filter */}
        <Box sx={{
          width: '296px',
          height: '40px',
          border: '1px solid #434F64',
          borderRadius: '8px',
          backgroundColor: '#F8F8F9',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '4px'
        }}>
          <Icon name="Calendar" size={16} color="#434F64" />
          <Typography variant="body1" sx={{ color: '#434F64', flexGrow: 1 }}>
            {dateRange.start}
          </Typography>
          <Typography variant="body1" sx={{ color: '#838C9D' }}>
            -
          </Typography>
          <Typography variant="body1" sx={{ color: '#434F64', flexGrow: 1 }}>
            {dateRange.end}
          </Typography>
          <Icon name="X" size={16} color="#434F64" />
        </Box>

        {/* Status Filter */}
        <Box sx={{
          width: '191px',
          height: '40px',
          border: '1px solid #434F64',
          borderRadius: '8px',
          backgroundColor: '#F8F8F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px'
        }}>
          <Typography variant="body1" sx={{ color: '#434F64' }}>
            All Statuses
          </Typography>
          <Icon name="ChevronDown" size={16} color="#434F64" />
        </Box>

        {/* Search Box */}
        <Box sx={{
          width: '259px',
          height: '40px',
          border: '1px solid #CED1D7',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '10px'
        }}>
          <Icon name="Search" size={16} color="#838C9D" />
          <input
            type="text"
            placeholder="Search"
            value={localSearchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              background: 'transparent',
              color: '#434F64',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </Box>

        {/* Add Journey Button */}
        <Button
          variant="contained"
          startIcon={<Icon name="Plus" size={24} color="#FFFFFF" />}
          onClick={handleAddJourney}
          sx={{
            backgroundColor: '#434F64',
            borderRadius: '8px',
            textTransform: 'none',
            padding: '12px 24px',
            height: '40px',
            '&:hover': {
              backgroundColor: '#323C4D',
            },
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          Journey
        </Button>
      </Box>

      {/* Journeys Table */}
      <JourneysTable
        journeys={filteredJourneys}
        onJourneyClick={handleJourneyClick}
      />

      {/* Journey Details Drawer */}
      <JourneyDetailsDrawer
        journey={selectedJourney}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </Layout>
  );
};

export default MyJourneysPage;
