// src/components/operations/PlantYardOperations.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Tabs, Tab } from '@mui/material';
import { fetchDockOccupancyData } from '../../services/operationsService';
import OperationsDashboard from './OperationsDashboard';
import DockOccupancyHeatmap from './DockOccupancyHeatmap';

const PlantYardOperations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shift, setShift] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchDockOccupancyData();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error loading dock occupancy data:', err);
        setError('Failed to load dock occupancy data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter data based on selected shift - keep this simple
  const filteredData = React.useMemo(() => {
    if (!data) return null;

    if (shift === 'all') return data;

    const shiftRanges = {
      'morning': [0, 8], // 6 AM - 2 PM
      'evening': [8, 16], // 2 PM - 10 PM
      'night': [16, 18] // 10 PM - 11 PM (partial)
    };

    const [start, end] = shiftRanges[shift];

    return {
      ...data,
      hours: data.hours.slice(start, end),
      occupancy: data.occupancy.filter(item =>
        item.hourIndex >= start && item.hourIndex < end
      )
    };
  }, [data, shift]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Operations</Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="operations tabs">
          <Tab label="Operations KPIs" />
          <Tab label="Dock Occupancy" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 ? (
        <OperationsDashboard />
      ) : (
        <Box>
          {/* Filters */}
          <Box sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="shift-select-label">Shift</InputLabel>
              <Select
                labelId="shift-select-label"
                id="shift-select"
                value={shift}
                label="Shift"
                onChange={handleShiftChange}
              >
                <MenuItem value="all">All Shifts</MenuItem>
                <MenuItem value="morning">Morning (6 AM - 2 PM)</MenuItem>
                <MenuItem value="evening">Evening (2 PM - 10 PM)</MenuItem>
                <MenuItem value="night">Night (10 PM - 11 PM)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Heatmap */}
          <Paper sx={{ p: 2, height: 'calc(100vh - 250px)', minHeight: '600px', width: '100%', overflow: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : filteredData ? (
              <DockOccupancyHeatmap data={filteredData} />
            ) : (
              <Alert severity="info">No data available</Alert>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default PlantYardOperations;
