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
import { Box, Typography, Button, IconButton } from '@mui/material';
import {
  FilterList as FilterIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  GetApp as GetAppIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';

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
  
  return (
    <Layout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="My Journeys"
        activeTab="journeys"
        searchBar={true}
        searchValue={localSearchTerm}
        onSearch={handleSearch}
      />
      
      {/* Journey Status Tabs */}
      <JourneyStatusTabs 
        activeStatus={activeStatus} 
        onStatusChange={handleStatusChange} 
      />
      
      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <JourneyFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => handleViewModeChange('list')}
            color={viewMode === 'list' ? 'primary' : 'default'}
          >
            <ViewListIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => handleViewModeChange('grid')}
            color={viewMode === 'grid' ? 'primary' : 'default'}
          >
            <ViewModuleIcon />
          </IconButton>
          <IconButton size="small">
            <GetAppIcon />
          </IconButton>
          <IconButton size="small">
            <PrintIcon />
          </IconButton>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            size="small"
          >
            More Filters
          </Button>
        </Box>
      </Box>
      
      {/* Journeys count */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        {filteredJourneys.length} Journeys available
      </Typography>
      
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
