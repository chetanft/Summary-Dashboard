import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Chip, Tabs, Tab } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useData } from '../../context/DataContext';

// Import KPI components
import TripsAndOrdersKPI from './TripsAndOrdersKPI';
import PendingActionsKPI from './PendingActionsKPI';
import VehicleStatusKPI from './VehicleStatusKPI';
import ExceptionsKPI from './ExceptionsKPI';
import KPIDrilldownPane from './KPIDrilldownPane';

// Import new KPI components
import PlanningIndentKPI from '../real-time-kpis/PlanningIndentKPI';
import PlantYardKPI from '../real-time-kpis/PlantYardKPI';
import TripMonitoringKPI from '../real-time-kpis/TripMonitoringKPI';
import EPodKPI from '../real-time-kpis/EPodKPI';
import FreightReconciliationKPI from '../real-time-kpis/FreightReconciliationKPI';

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

  // State for KPI view tabs
  const [activeTab, setActiveTab] = useState(0);

  // Mock data for the new KPI components
  const [newKpiData, setNewKpiData] = useState({
    planningIndent: {
      title: 'Planning & Indent Health',
      kpis: [
        {
          name: 'Planned Orders',
          count: 95,
          status: 'normal',
        },
        {
          name: 'Pending Planning',
          count: 28,
          status: 'pending',
          breakdown: {
            'Unplanned': 12,
            'Partial': 10,
            'In Progress': 6,
          }
        },
        {
          name: 'Active Indents',
          count: 45,
          status: 'normal',
          breakdown: {
            'Acceptance Pending': 15,
            'Assignment Pending': 18,
            'Expired/Cancelled': 12,
          }
        }
      ],
      details: {
        north: 32,
        south: 28,
        east: 25,
        west: 35,
      },
      chartType: 'stackedBar',
    },
    plantYard: {
      title: 'Plant & Yard Operations',
      kpis: [
        {
          name: 'En Route to Loading',
          count: 32,
          status: 'normal',
        },
        {
          name: 'Fulfillment Delayed',
          count: 8,
          status: 'delayed',
        },
        {
          name: 'At Plant/Dock',
          count: 42,
          status: 'normal',
          breakdown: {
            'At Plant': 22,
            'At Dock': 15,
            'Detained': 5,
          }
        },
        {
          name: 'TATs',
          values: {
            'Plant TAT': '3.5 hrs',
            'Dock TAT': '2.2 hrs',
          },
          status: 'normal',
        }
      ],
      details: {
        north: 25,
        south: 30,
        east: 18,
        west: 28,
      },
      chartType: 'horizontalBar',
    },
    tripMonitoring: {
      title: 'Trips in Transit',
      kpis: [
        {
          name: 'Active Trips',
          count: 145,
          percentage: 72,
          status: 'normal',
        },
        {
          name: 'Delayed Trips',
          count: 18,
          percentage: 9,
          status: 'delayed',
        },
        {
          name: 'Delivering Today',
          count: 32,
          percentage: 16,
          status: 'normal',
        },
        {
          name: 'Untracked Trips',
          count: 6,
          percentage: 3,
          status: 'pending',
        }
      ],
      details: {
        north: 45,
        south: 38,
        east: 32,
        west: 42,
      },
      chartType: 'donut',
    },
    ePod: {
      title: 'ePOD Document Status',
      kpis: [
        {
          name: 'Pending',
          count: 35,
          status: 'pending',
        },
        {
          name: 'Approved',
          count: 142,
          status: 'normal',
        },
        {
          name: 'Disputed',
          count: 12,
          status: 'delayed',
        },
        {
          name: 'Rejected',
          count: 5,
          status: 'delayed',
        }
      ],
      details: {
        north: 48,
        south: 55,
        east: 42,
        west: 49,
      },
      chartType: 'stackedColumn',
    },
    freightReconciliation: {
      title: 'Billing & Closure Status',
      kpis: [
        {
          name: 'Invoices',
          count: 118,
          status: 'normal',
          breakdown: {
            'Generated': 45,
            'Approved': 52,
            'Rejected': 12,
            'Debit Revised': 9,
          }
        },
        {
          name: 'Reconciliation',
          count: 78,
          status: 'pending',
          breakdown: {
            'Pending': 32,
            'Approved': 35,
            'Disputed': 11,
          }
        }
      ],
      details: {
        north: 42,
        south: 38,
        east: 35,
        west: 45,
      },
      chartType: 'groupedBar',
    }
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    const updateNewKpiDataFn = updateRealtimeKpiData();
    if (updateNewKpiDataFn && typeof updateNewKpiDataFn === 'function') {
      setNewKpiData(updateNewKpiDataFn(newKpiData));
    }
  };

  // Set up auto-refresh for new KPI data
  useEffect(() => {
    // Auto-refresh every 2 minutes
    const refreshInterval = setInterval(() => {
      if (activeTab === 1) { // Only refresh if the new view is active
        const updateNewKpiDataFn = updateRealtimeKpiData();
        if (updateNewKpiDataFn && typeof updateNewKpiDataFn === 'function') {
          setNewKpiData(updateNewKpiDataFn(newKpiData));
        }
      }
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(refreshInterval);
  }, [activeTab, newKpiData, updateRealtimeKpiData]);

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
      {/* Header with refresh button and tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="KPI view tabs">
          <Tab label="Current View" />
          <Tab label="New Operational View" />
        </Tabs>
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
        {/* Current View */}
        {activeTab === 0 && realtimeKpiData && (
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

        {/* New Operational View */}
        {activeTab === 1 && (
          <>
            {/* Planning & Indent Bottlenecks */}
            <PlanningIndentKPI
              data={newKpiData.planningIndent}
              onKPIClick={handleKPIClick}
            />

            {/* Plant & Yard Snapshot */}
            <PlantYardKPI
              data={newKpiData.plantYard}
              onKPIClick={handleKPIClick}
            />

            {/* Live Trip Monitoring */}
            <TripMonitoringKPI
              data={newKpiData.tripMonitoring}
              onKPIClick={handleKPIClick}
            />

            {/* ePOD Lifecycle */}
            <EPodKPI
              data={newKpiData.ePod}
              onKPIClick={handleKPIClick}
            />

            {/* Freight & Reconciliation */}
            <FreightReconciliationKPI
              data={newKpiData.freightReconciliation}
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
