import React, { useState } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useData } from '../../context/DataContext';

// Import KPI components
import TripsAndOrdersKPI from './TripsAndOrdersKPI';
import PendingActionsKPI from './PendingActionsKPI';
import VehicleStatusKPI from './VehicleStatusKPI';
import ExceptionsKPI from './ExceptionsKPI';
import KPIDrilldownPane from './KPIDrilldownPane';

const RealtimeKPIDashboard = () => {
  // Get data from context
  const {
    realtimeKpiData,
    lastUpdated,
    updateRealtimeKpiData
  } = useData();

  // State for drilldown
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedKPIData, setSelectedKPIData] = useState(null);

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
      {/* Header with refresh button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3 }}>
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
