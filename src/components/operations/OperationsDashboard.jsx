import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import PlanningSection from './PlanningSection';
import PreDispatchSection from './PreDispatchSection';
import InTransitSection from './InTransitSection';
import PostDeliverySection from './PostDeliverySection';
import { ptlKpiData } from '../../data/ptl';

/**
 * Operations Dashboard component that integrates all KPI sections
 *
 * @returns {JSX.Element}
 */
const OperationsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data
        setData(ptlKpiData);
        setError(null);
      } catch (err) {
        console.error('Error loading KPI data:', err);
        setError('Failed to load KPI data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle KPI click for drilldown
  const handleKPIClick = (kpiId, kpiData) => {
    console.log('KPI clicked:', kpiId, kpiData);
    // Implement drilldown functionality here
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No data available</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Planning Section */}
      <PlanningSection data={data.planning} onKPIClick={handleKPIClick} />

      {/* Pre Dispatch Section */}
      <PreDispatchSection data={data.preDispatch} onKPIClick={handleKPIClick} />

      {/* In Transit Section */}
      <InTransitSection data={data.inTransit} onKPIClick={handleKPIClick} />

      {/* Post Delivery Section */}
      <PostDeliverySection data={data.postDelivery} onKPIClick={handleKPIClick} />
    </Box>
  );
};

export default OperationsDashboard;
