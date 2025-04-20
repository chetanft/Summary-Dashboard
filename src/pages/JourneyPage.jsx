import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab, Container, CircularProgress } from '@mui/material';
import { useJourney } from '../contexts/JourneyContext';
import JourneyList from '../components/journey/JourneyList';
import JourneyFilters from '../components/journey/JourneyFilters';
import JourneyStatistics from '../components/journey/JourneyStatistics';
import JourneyKPIs from '../components/journey/JourneyKPIs';
import JourneyDetailsDrawer from '../components/journey/JourneyDetailsDrawer';
import Icon from '../components/common/Icon';

const JourneyPage = () => {
  const { 
    loading, 
    error, 
    filteredJourneys, 
    selectedJourney,
    loadJourneyById,
    clearSelectedJourney,
    loadKPIs,
    kpis
  } = useJourney();
  
  const [activeTab, setActiveTab] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    // Load KPIs when the component mounts
    loadKPIs();
  }, []);

  useEffect(() => {
    // Open details drawer when a journey is selected
    if (selectedJourney) {
      setDetailsOpen(true);
    }
  }, [selectedJourney]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleJourneyClick = (journeyId) => {
    loadJourneyById(journeyId);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    clearSelectedJourney();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // All Journeys
        return <JourneyList journeys={filteredJourneys} onJourneyClick={handleJourneyClick} />;
      case 1: // Statistics
        return <JourneyStatistics />;
      case 2: // KPIs
        return <JourneyKPIs kpis={kpis} />;
      default:
        return <JourneyList journeys={filteredJourneys} onJourneyClick={handleJourneyClick} />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Journey Management
        </Typography>

        <Box sx={{ display: 'flex', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab 
                  icon={<Icon name="Truck" size={18} />} 
                  label="All Journeys" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<Icon name="BarChart2" size={18} />} 
                  label="Statistics" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<Icon name="Activity" size={18} />} 
                  label="KPIs" 
                  iconPosition="start"
                />
              </Tabs>
            </Paper>

            <JourneyFilters />

            <Paper sx={{ p: 3, minHeight: '60vh' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Box sx={{ p: 3, color: 'error.main' }}>
                  <Typography variant="h6">Error</Typography>
                  <Typography>{error}</Typography>
                </Box>
              ) : (
                renderTabContent()
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      <JourneyDetailsDrawer 
        open={detailsOpen} 
        onClose={handleCloseDetails} 
        journey={selectedJourney}
      />
    </Container>
  );
};

export default JourneyPage;
