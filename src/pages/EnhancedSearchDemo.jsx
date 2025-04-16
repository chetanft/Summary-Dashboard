import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useSearch } from '../context/SearchContext';
import EnhancedSearchDropdown from '../components/common/EnhancedSearchDropdown';
import Layout from '../components/layout/Layout';

// Sample recent searches data
const recentSearchesData = [
  { type: 'Order ID', value: '14312734', tripId: '14312734' },
  { type: 'Invoice No.', value: '14312734', tripId: '14312734' },
  { type: 'LR Number', value: '14312734', tripId: '14312734' }
];

// Sample search results data
const searchResultsData = [
  { type: 'Order ID', value: '14312734', tripId: '14312734' },
  { type: 'Order ID', value: '14312735', tripId: '14312735' },
  { type: 'Invoice No.', value: '14312736', tripId: '14312736' },
  { type: 'LR Number', value: '14312737', tripId: '14312737' },
  { type: 'Order ID', value: '14312738', tripId: '14312738' },
  { type: 'Invoice No.', value: '14312739', tripId: '14312739' }
];

const EnhancedSearchDemo = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useSearch();

  // Handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item);

    // Add to recent searches
    addRecentSearch(item);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSelectedItem(null);
  };

  // Handle clearing all recent searches
  const handleClearAllRecentSearches = () => {
    clearRecentSearches();
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Enhanced Search Dropdown Demo
        </Typography>

        <Typography variant="body1" paragraph>
          This page demonstrates the enhanced search dropdown component with recent searches functionality.
        </Typography>

        <Paper sx={{ p: 3, mb: 4, width: '100%', maxWidth: '600px', mx: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <EnhancedSearchDropdown
              data={searchResultsData}
              placeholder="Search Orders"
              onSelect={handleSelect}
              recentSearches={recentSearches}
              onClearSearch={handleClearSearch}
              width="100%"
            />
          </Box>

          {selectedItem && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Selected Item:
              </Typography>
              <Typography variant="body1">
                {selectedItem.type}: <strong>{selectedItem.value}</strong>
              </Typography>
              {selectedItem.tripId && (
                <Typography variant="body1">
                  Trip ID: <strong>{selectedItem.tripId}</strong>
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Recent Searches
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleClearAllRecentSearches}
            >
              Clear All
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            {recentSearches.length > 0 ? (
              recentSearches.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant="body1">
                      {item.type}: <strong>{item.value}</strong>
                    </Typography>
                    {item.tripId && (
                      <Typography variant="body2" color="text.secondary">
                        Trip ID: {item.tripId}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No recent searches
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default EnhancedSearchDemo;
