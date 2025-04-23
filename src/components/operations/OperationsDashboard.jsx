import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import PlanningSection from './PlanningSection';
import PreDispatchSection from './PreDispatchSection';
import InTransitSection from './InTransitSection';
import PostDeliverySection from './PostDeliverySection';
import LocationSelector from './LocationSelector';
import SearchInput from './SearchInput';
import KpiDrilldownDialog from './KpiDrilldownDialog';
import { getOperationalDashboardData } from '../../services/operationalDashboardService';

/**
 * Operations Dashboard component that integrates all KPI sections
 *
 * @returns {JSX.Element}
 */
const OperationsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [userRole, setUserRole] = useState('cxo');
  const [location, setLocation] = useState('MDC Labs, Amritsar');
  const [searchTerm, setSearchTerm] = useState('');
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState({ id: null, data: null });

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch data from service
        const dashboardData = await getOperationalDashboardData(userRole, location, searchTerm);
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error('Error loading KPI data:', err);
        setError('Failed to load KPI data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay for search to avoid too many requests
    const searchTimer = setTimeout(() => {
      loadData();
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(searchTimer);
  }, [userRole, location, searchTerm]);

  // Handle KPI click for drilldown
  const handleKPIClick = (kpiId, kpiData) => {
    console.log('KPI clicked:', kpiId, kpiData);
    setSelectedKpi({ id: kpiId, data: kpiData });
    setDrilldownOpen(true);
  };

  // Handle close drilldown dialog
  const handleCloseDrilldown = () => {
    setDrilldownOpen(false);
  };

  // Handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle user role change
  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#434F64' }}>
          Operational Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <SearchInput onSearch={handleSearch} />
          <LocationSelector value={location} onChange={handleLocationChange} />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="user-role-select-label">View As</InputLabel>
            <Select
              labelId="user-role-select-label"
              id="user-role-select"
              value={userRole}
              label="View As"
              onChange={handleUserRoleChange}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="cxo">CXO</MenuItem>
              <MenuItem value="company">Company</MenuItem>
              <MenuItem value="branch">Branch</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Dashboard Content */}
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

      {/* KPI Drilldown Dialog */}
      <KpiDrilldownDialog
        open={drilldownOpen}
        onClose={handleCloseDrilldown}
        kpiId={selectedKpi.id}
        kpiData={selectedKpi.data}
      />
    </Box>
  );
};

export default OperationsDashboard;
