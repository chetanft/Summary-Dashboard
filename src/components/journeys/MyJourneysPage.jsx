import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useSearch } from '../../context/SearchContext';
import Layout from '../layout/Layout';
import JourneyPageHeader from './JourneyPageHeader';
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
      {/* Journey Page Header */}
      <JourneyPageHeader
        title="My Journeys"
        location="MDC Labs, Amritsar"
        dateRange={dateRange}
        sourceFilter={sourceFilter}
        searchTerm={localSearchTerm}
        onLocationChange={handleSourceFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onSourceFilterChange={handleSourceFilterChange}
        onSearch={handleSearch}
        onAddClick={handleAddJourney}
      />

      {/* Journey Status Tabs */}
      <JourneyStatusTabs
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
      />

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
