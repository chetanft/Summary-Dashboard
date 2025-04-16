import React, { useState, useEffect } from 'react';
import { Box, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useData } from '../../context/DataContext';

import KPIDrilldownPane from './KPIDrilldownPane';

// Import operational KPI components
import PlanningIndentKPI from '../real-time-kpis/PlanningIndentKPI';
import PlantYardKPI from '../real-time-kpis/PlantYardKPI';
import TripMonitoringKPI from '../real-time-kpis/TripMonitoringKPI';
import EPodKPI from '../real-time-kpis/EPodKPI';
import FreightReconciliationKPI from '../real-time-kpis/FreightReconciliationKPI';

const RealtimeKPIDashboard = () => {
  // Get data from context
  const {
    operationalKpiData,
    lastUpdated,
    updateOperationalKpiData,
    searchTerm,
    handleSearchTermChange
  } = useData();

  // Local search state
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // State for drilldown
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedKPIData, setSelectedKPIData] = useState(null);

  // Handle manual refresh
  const handleRefresh = () => {
    updateOperationalKpiData();
  };

  // Set up auto-refresh for operational KPI data
  useEffect(() => {
    // Auto-refresh every 2 minutes
    const refreshInterval = setInterval(() => {
      updateOperationalKpiData();
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(refreshInterval);
  }, [updateOperationalKpiData]);

  // Initialize local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  // Handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setLocalSearchTerm(value);

    // Update global search term
    if (handleSearchTermChange) {
      handleSearchTermChange(value);
    }
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

      {/* Operational KPI Groups */}
      <Box>
        {operationalKpiData && (
          <>
            {/* Planning & Indent Bottlenecks */}
            <PlanningIndentKPI
              data={operationalKpiData.planningIndent}
              onKPIClick={handleKPIClick}
            />

            {/* Plant & Yard Snapshot */}
            <PlantYardKPI
              data={operationalKpiData.plantYard}
              onKPIClick={handleKPIClick}
            />

            {/* Live Trip Monitoring */}
            <TripMonitoringKPI
              data={operationalKpiData.tripMonitoring}
              onKPIClick={handleKPIClick}
            />

            {/* ePOD Lifecycle */}
            <EPodKPI
              data={operationalKpiData.ePod}
              onKPIClick={handleKPIClick}
            />

            {/* Freight & Reconciliation */}
            <FreightReconciliationKPI
              data={operationalKpiData.freightReconciliation}
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
