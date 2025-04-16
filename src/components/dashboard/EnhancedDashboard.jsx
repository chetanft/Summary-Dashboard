import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Layout from '../layout/Layout';
import DashboardHeader from './DashboardHeader';
import KPIDrilldownPane from './KPIDrilldownPane';
import { Box, Grid, Skeleton, Typography, Tooltip, IconButton, Chip, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

// Import our new KPI components
import BudgetedVsActualKPI from './BudgetedVsActualKPI';
import VehicleUtilizationKPI from './VehicleUtilizationKPI';
import FreightCostKPI from './FreightCostKPI';
import PlacementEfficiencyKPI from './PlacementEfficiencyKPI';
import OrderDeliveryTimeKPI from './OrderDeliveryTimeKPI';
import OTIFKPI from './OTIFKPI';
import DelayedDeliveryKPI from './DelayedDeliveryKPI';
import PendingDispatchedKPI from './PendingDispatchedKPI';
import DeliveredVsRunningDelayedKPI from './DeliveredVsRunningDelayedKPI';

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const { searchTerm, handleSearchTermChange } = useData();
  const { dashboardData, loading, error, lastUpdated, refreshData } = useData();

  // Handle manual refresh
  const handleRefresh = () => {
    refreshData();
  };

  // Initialize navigate
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Navigate to orders page when 'orders' tab is selected
    if (tab === 'orders') {
      navigate('/orders');
    }
  };

  // Handle KPI drill-down
  const handleKPIDrillDown = (kpi) => {
    setSelectedKPI(kpi);
    setDrilldownOpen(true);
  };

  // Handle drill-down close
  const handleDrilldownClose = () => {
    setDrilldownOpen(false);
  };

  // Generate sample chart data for KPIs
  const generateChartData = (length = 30) => {
    return Array.from({ length }, (_, i) => ({
      date: i + 1,
      value: 75 + Math.floor(Math.random() * 30),
      projected: 85 + Math.floor(Math.random() * 20),
      budget: 90 + Math.floor(Math.random() * 15),
      actual: 70 + Math.floor(Math.random() * 35)
    }));
  };

  // Regional data for bar charts
  const regionData = [
    { region: 'North', value: 80 },
    { region: 'South', value: 78 },
    { region: 'East', value: 75 },
    { region: 'West', value: 95 },
    { region: 'Central', value: 97 }
  ];

  // Get data from context if available, otherwise use sample data
  const getKpiData = () => {
    if (dashboardData?.kpis) {
      // Try to map from real data if available
      return {
        budgetVsActual: {
          actual: dashboardData.kpis.budgetVsActual?.actual || 10,
          projected: dashboardData.kpis.budgetVsActual?.projected || 22,
          budget: dashboardData.kpis.budgetVsActual?.budget || 20,
          chartData: dashboardData.kpis.budgetVsActual?.chartData || generateChartData()
        },
        vehicleUtilization: {
          value: dashboardData.kpis.vehicleUtilization?.value || 84,
          target: dashboardData.kpis.vehicleUtilization?.target || 96,
          chartData: dashboardData.kpis.vehicleUtilization?.chartData || generateChartData()
        },
        freightCost: {
          value: dashboardData.kpis.freightCost?.value || 120,
          target: dashboardData.kpis.freightCost?.target || 100,
          chartData: dashboardData.kpis.freightCost?.chartData || generateChartData(),
          info: "Low vehicle utilisation (84%) may be driving up freight cost per KM."
        },
        placementEfficiency: {
          value: dashboardData.kpis.placementEfficiency?.value || 87,
          target: dashboardData.kpis.placementEfficiency?.target || 96,
          chartData: dashboardData.kpis.placementEfficiency?.chartData || regionData
        },
        orderDeliveryTime: {
          value: dashboardData.kpis.orderDeliveryTime?.value || 4,
          target: dashboardData.kpis.orderDeliveryTime?.target || 3,
          chartData: dashboardData.kpis.orderDeliveryTime?.chartData || [
            { region: 'North', value: 5 },
            { region: 'South', value: 5 },
            { region: 'East', value: 5.5 },
            { region: 'West', value: 3 },
            { region: 'Central', value: 3 }
          ]
        },
        otif: {
          value: dashboardData.kpis.otif?.value || 86,
          target: dashboardData.kpis.otif?.target || 98,
          chartData: dashboardData.kpis.otif?.chartData || regionData.map(item => ({...item, value: item.value - 5}))
        },
        delayedDelivery: {
          value: dashboardData.kpis.delayedDelivery?.value || 10,
          target: dashboardData.kpis.delayedDelivery?.target || 2,
          chartData: dashboardData.kpis.delayedDelivery?.chartData || [
            { region: 'North', value: 12 },
            { region: 'South', value: 10 },
            { region: 'East', value: 12 },
            { region: 'West', value: 1 },
            { region: 'Central', value: 1 }
          ]
        },
        pendingDispatched: {
          value: dashboardData.kpis.pendingDispatched?.value || 24,
          target: dashboardData.kpis.pendingDispatched?.target || 10,
          count: dashboardData.kpis.pendingDispatched?.count || 290
        },
        deliveredRunningDelayed: {
          deliveredValue: dashboardData.kpis.deliveredRunningDelayed?.deliveredValue || 48,
          runningDelayedValue: dashboardData.kpis.deliveredRunningDelayed?.runningDelayedValue || 23,
          runningDelayedTarget: dashboardData.kpis.deliveredRunningDelayed?.runningDelayedTarget || 10,
          deliveredCount: dashboardData.kpis.deliveredRunningDelayed?.deliveredCount || 97,
          runningDelayedCount: dashboardData.kpis.deliveredRunningDelayed?.runningDelayedCount || 47
        }
      };
    }

    // Fallback to sample data
    return {
      budgetVsActual: {
        actual: 10,
        projected: 22,
        budget: 20,
        chartData: generateChartData()
      },
      vehicleUtilization: {
        value: 84,
        target: 96,
        chartData: generateChartData()
      },
      freightCost: {
        value: 120,
        target: 100,
        chartData: generateChartData(),
        info: "Low vehicle utilisation (84%) may be driving up freight cost per KM."
      },
      placementEfficiency: {
        value: 87,
        target: 96,
        chartData: regionData
      },
      orderDeliveryTime: {
        value: 4,
        target: 3,
        chartData: [
          { region: 'North', value: 5 },
          { region: 'South', value: 5 },
          { region: 'East', value: 5.5 },
          { region: 'West', value: 3 },
          { region: 'Central', value: 3 }
        ]
      },
      otif: {
        value: 86,
        target: 98,
        chartData: regionData.map(item => ({...item, value: item.value - 5}))
      },
      delayedDelivery: {
        value: 10,
        target: 2,
        chartData: [
          { region: 'North', value: 12 },
          { region: 'South', value: 10 },
          { region: 'East', value: 12 },
          { region: 'West', value: 1 },
          { region: 'Central', value: 1 }
        ]
      },
      pendingDispatched: {
        value: 24,
        target: 10,
        count: 290
      },
      deliveredRunningDelayed: {
        deliveredValue: 48,
        runningDelayedValue: 23,
        runningDelayedTarget: 10,
        deliveredCount: 97,
        runningDelayedCount: 47
      }
    };
  };

  const kpiData = getKpiData();

  // Styled components to match the Figma design
  const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px 0px 0px',
    gap: '20px',
    width: '100%',
    maxWidth: '100%',
    height: 'calc(100vh - 78px)',
    backgroundColor: '#FFFFFF',
  }));

  const StyledTitleBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    gap: '10px',
    width: '100%',
    height: '48px',
    backgroundColor: '#FFFFFF',
  }));

  const StyledFilterBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px',
    gap: '20px',
  }));

  const StyledContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '20px',
    width: '100%',
    flexGrow: 1,
  }));

  const StyledToggleButton = styled(Box)(({ theme, active }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 12px',
    gap: '4px',
    height: '32px',
    background: active ? '#FFFFFF' : '#F8F8F9',
    boxShadow: active ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
    borderRadius: '5px',
    flex: 1,
    cursor: 'pointer',
  }));

  // Dashboard styling variables to match design
  const dashboardStyles = {
    cardBorderRadius: '32px',
    gridSpacing: 2.5, // 20px spacing
    contentPadding: { xs: '20px', md: '20px' },
    rowHeights: {
      row1: 666, // Height for first row cards (Hero KPIs)
      row2: 323, // Height for second row cards
      row3: 221  // Height for third row cards
    }
  };

  return (
    <Layout onRefresh={handleRefresh}>
      {/* Main Container */}
      <StyledContainer>
        {/* Dashboard Header */}
        <DashboardHeader
          title="Performance Dashboard"
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchBar={true}
        />

        {/* Title Bar and Filter Bar removed - now in DashboardHeader */}

        {/* Error message if any */}
        {error && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <Chip
              label={error}
              color="error"
              variant="outlined"
              sx={{ borderRadius: '4px' }}
            />
          </Box>
        )}

        {/* Content Container */}
        <StyledContentContainer>
          {/* Main Grid with the layout matching the design */}
          <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
            {/* First row: Left half - Budgeted vs Actual */}
            <Grid size={{ xs:12, md:6 }}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row1} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
              ) : (
                <BudgetedVsActualKPI
                  title="Budgeted vs Actual vs Projected Freight"
                  actual={kpiData.budgetVsActual.actual}
                  projected={kpiData.budgetVsActual.projected}
                  budget={kpiData.budgetVsActual.budget}
                  chartData={kpiData.budgetVsActual.chartData}
                  onDrillDown={handleKPIDrillDown}
                />
              )}
            </Grid>

            {/* First row: Right half - Stacked KPIs */}
            <Grid size={{ xs:12, md:6 }}>
              <Grid container direction="column" spacing={2} sx={{ width: '100%', m: 0 }}>
                {/* Vehicle Utilisation KPI */}
                <Grid>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row2} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <VehicleUtilizationKPI
                      title="Vehicle Utilisation"
                      value={kpiData.vehicleUtilization.value}
                      target={kpiData.vehicleUtilization.target}
                      chartData={kpiData.vehicleUtilization.chartData}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>

                {/* Freight Cost KPI */}
                <Grid item>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row2} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <FreightCostKPI
                      title="Freight cost per KM"
                      value={kpiData.freightCost.value}
                      target={kpiData.freightCost.target}
                      chartData={kpiData.freightCost.chartData}
                      info={kpiData.freightCost.info}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Second row: Three KPIs horizontally */}
            <Grid size={{ xs:12, md:12 }}>
              <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <PlacementEfficiencyKPI
                      title="Placement Efficiency"
                      value={kpiData.placementEfficiency.value}
                      target={kpiData.placementEfficiency.target}
                      chartData={kpiData.placementEfficiency.chartData}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>

                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <OrderDeliveryTimeKPI
                      title="Order to Delivery Time"
                      value={kpiData.orderDeliveryTime.value}
                      target={kpiData.orderDeliveryTime.target}
                      chartData={kpiData.orderDeliveryTime.chartData}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>

                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <OTIFKPI
                      title="OTIF"
                      value={kpiData.otif.value}
                      target={kpiData.otif.target}
                      chartData={kpiData.otif.chartData}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Third row: Three KPIs horizontally */}
            <Grid size={{ xs:12, md:12 }}>
              <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <DelayedDeliveryKPI
                      title="Delayed Delivery %"
                      value={kpiData.delayedDelivery.value}
                      target={kpiData.delayedDelivery.target}
                      chartData={kpiData.delayedDelivery.chartData}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>

                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <PendingDispatchedKPI
                      title="Pending Dispatched"
                      value={kpiData.pendingDispatched.value}
                      target={kpiData.pendingDispatched.target}
                      count={kpiData.pendingDispatched.count}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>

                <Grid size={{ xs:12, md:4 }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={dashboardStyles.rowHeights.row3} sx={{ borderRadius: dashboardStyles.cardBorderRadius }} />
                  ) : (
                    <DeliveredVsRunningDelayedKPI
                      title="Delivered vs Running Delayed"
                      deliveredValue={kpiData.deliveredRunningDelayed.deliveredValue}
                      runningDelayedValue={kpiData.deliveredRunningDelayed.runningDelayedValue}
                      runningDelayedTarget={kpiData.deliveredRunningDelayed.runningDelayedTarget}
                      deliveredCount={kpiData.deliveredRunningDelayed.deliveredCount}
                      runningDelayedCount={kpiData.deliveredRunningDelayed.runningDelayedCount}
                      onDrillDown={handleKPIDrillDown}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledContentContainer>

        {/* KPI Drill-down Pane */}
        <KPIDrilldownPane
          open={drilldownOpen}
          onClose={handleDrilldownClose}
          kpi={selectedKPI}
        />
      </StyledContainer>
    </Layout>
  );
};

export default EnhancedDashboard;
