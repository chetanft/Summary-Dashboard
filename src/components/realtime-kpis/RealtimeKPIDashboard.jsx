import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Divider, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useData } from '../../context/DataContext';

// Import KPI components
import RoleSelector from './RoleSelector';
import TripsAndOrdersKPI from './TripsAndOrdersKPI';
import PendingActionsKPI from './PendingActionsKPI';
import VehicleStatusKPI from './VehicleStatusKPI';
import ExceptionsKPI from './ExceptionsKPI';
import KPIDrilldownPane from './KPIDrilldownPane';

const RealtimeKPIDashboard = () => {
  // Get data from context
  const {
    realtimeKpiData,
    userRole,
    lastUpdated,
    updateRealtimeKpiData,
    changeUserRole
  } = useData();

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for drilldown
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedKPIData, setSelectedKPIData] = useState(null);

  // Handle role change
  const handleRoleChange = (newRole) => {
    changeUserRole(newRole);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    updateRealtimeKpiData();
  };

  // Handle KPI click for drilldown
  const handleKPIClick = (kpiType, data) => {
    setSelectedKPI(kpiType);
    setSelectedKPIData(data);
    setDrilldownOpen(true);
  };

  // Close drilldown
  const handleCloseDrilldown = () => {
    setDrilldownOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Real-Time Operational KPIs
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Last updated: ${lastUpdated || 'Never'}`}
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Role Selector and Search */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <RoleSelector
            currentRole={userRole}
            onRoleChange={handleRoleChange}
            availableRoles={['CXO', 'Company', 'Branch']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search KPIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* KPI Groups */}
      <Box>
        {/* Trips & Orders In Progress */}
        {realtimeKpiData && (
          <>
            <TripsAndOrdersKPI
              data={realtimeKpiData.tripsAndOrders}
              onKPIClick={handleKPIClick}
            />

            {/* Pending Actions */}
            <PendingActionsKPI
              data={realtimeKpiData.pendingActions}
              onKPIClick={handleKPIClick}
            />

            {/* Vehicle Status Locations */}
            <VehicleStatusKPI
              data={realtimeKpiData.vehicleStatus}
              onKPIClick={handleKPIClick}
            />

            {/* Exceptions & Process Flags */}
            <ExceptionsKPI
              data={realtimeKpiData.exceptions}
              onKPIClick={handleKPIClick}
            />
          </>
        )}
      </Box>

      {/* KPI Drilldown Pane */}
      <KPIDrilldownPane
        open={drilldownOpen}
        onClose={handleCloseDrilldown}
        kpiType={selectedKPI}
        kpiData={selectedKPIData}
      />
    </Box>
  );
};

export default RealtimeKPIDashboard;
