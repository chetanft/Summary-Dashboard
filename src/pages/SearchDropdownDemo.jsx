import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Divider, Chip } from '@mui/material';
import SearchDropdown from '../components/common/SearchDropdown';
import Layout from '../components/layout/Layout';

// Sample data for the demo
const stringData = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape',
  'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya',
  'Quince', 'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon'
];

const objectData = [
  { id: 1, name: 'New Delhi', region: 'North' },
  { id: 2, name: 'Mumbai', region: 'West' },
  { id: 3, name: 'Chennai', region: 'South' },
  { id: 4, name: 'Kolkata', region: 'East' },
  { id: 5, name: 'Bangalore', region: 'South' },
  { id: 6, name: 'Hyderabad', region: 'South' },
  { id: 7, name: 'Ahmedabad', region: 'West' },
  { id: 8, name: 'Pune', region: 'West' },
  { id: 9, name: 'Jaipur', region: 'North' },
  { id: 10, name: 'Lucknow', region: 'North' },
  { id: 11, name: 'Kanpur', region: 'North' },
  { id: 12, name: 'Nagpur', region: 'West' },
  { id: 13, name: 'Indore', region: 'Central' },
  { id: 14, name: 'Thane', region: 'West' },
  { id: 15, name: 'Bhopal', region: 'Central' }
];

const orderData = [
  { id: 'SO-12345', customer: 'ABC Corp', status: 'Delivered' },
  { id: 'SO-12346', customer: 'XYZ Industries', status: 'In Transit' },
  { id: 'SO-12347', customer: 'Global Enterprises', status: 'Pending' },
  { id: 'SO-12348', customer: 'Local Business', status: 'Delivered' },
  { id: 'SO-12349', customer: 'National Corp', status: 'Delayed' },
  { id: 'SO-12350', customer: 'International Ltd', status: 'In Transit' },
  { id: 'SO-12351', customer: 'Regional Supplies', status: 'Pending' },
  { id: 'SO-12352', customer: 'City Distributors', status: 'Delivered' },
  { id: 'SO-12353', customer: 'Metro Logistics', status: 'In Transit' },
  { id: 'SO-12354', customer: 'Urban Freight', status: 'Delayed' }
];

const SearchDropdownDemo = () => {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search Dropdown Component Demo
        </Typography>

        <Typography variant="body1" paragraph>
          This page demonstrates the SearchDropdown component with different types of data.
          Try typing in the search boxes below to see the dropdown in action.
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Basic String Search
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Search for fruits from a simple string array.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <SearchDropdown
              data={stringData}
              placeholder="Search for a fruit..."
              onSelect={(value) => setSelectedFruit(value)}
              width="100%"
            />
          </Box>

          {selectedFruit && (
            <Typography variant="body2">
              Selected fruit: <strong>{selectedFruit}</strong>
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Object Data Search
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Search for cities from an array of objects.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <SearchDropdown
              data={objectData}
              placeholder="Search for a city or region..."
              onSelect={(value) => setSelectedCity(value)}
              labelKey="name"
              valueKey="id"
              searchKeys={['name', 'region']}
              width="100%"
            />
          </Box>

          {selectedCity && (
            <Typography variant="body2">
              Selected city ID: <strong>{selectedCity}</strong>
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Search
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Search for orders by ID or customer name.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <SearchDropdown
              data={orderData}
              placeholder="Search for an order by ID or customer..."
              onSelect={(value) => setSelectedOrder(value)}
              labelKey="id"
              valueKey="id"
              searchKeys={['id', 'customer', 'status']}
              width="100%"
              renderOption={(item, searchValue) => {
                // Custom render function for order items
                const getStatusColor = (status) => {
                  switch (status) {
                    case 'Delivered': return 'success';
                    case 'In Transit': return 'info';
                    case 'Pending': return 'warning';
                    case 'Delayed': return 'error';
                    default: return 'default';
                  }
                };

                // Helper function to highlight matching text
                const highlightText = (text) => {
                  if (!searchValue.trim()) return text;
                  const regex = new RegExp(`(${searchValue})`, 'gi');
                  const parts = text.split(regex);

                  return (
                    <>
                      {parts.map((part, i) =>
                        regex.test(part) ? (
                          <Typography component="span" key={i} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {part}
                          </Typography>
                        ) : (
                          <Typography component="span" key={i}>
                            {part}
                          </Typography>
                        )
                      )}
                    </>
                  );
                };

                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {highlightText(item.id)}
                      </Typography>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {highlightText(item.customer)}
                    </Typography>
                  </Box>
                );
              }}
            />
          </Box>

          {selectedOrder && (
            <Typography variant="body2">
              Selected order: <strong>{selectedOrder}</strong>
            </Typography>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default SearchDropdownDemo;
