import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';
import DashboardHeader from './DashboardHeader';
import KPIDrilldownPane from './KPIDrilldownPane';
import OperationalDashboardTab from './OperationalDashboardTab';
import { Box, Grid, Skeleton, Typography, Tooltip, IconButton, Chip, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

// Helper function to format values with one decimal point
const formatToOneDecimal = (value) => {
  return Number(value).toFixed(1);
};

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
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const { searchTerm, handleSearchTermChange, dashboardData, loading, error, lastUpdated, refreshData } = useData();
  const { recentSearches } = useSearch();
  const { currentUser } = useAuth();

  // Initialize local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

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
    if (dashboardData?.kpis || dashboardData?.heroKPI) {
      // Try to map from real data if available
      return {
        budgetVsActual: {
          actual: dashboardData.heroKPI?.actual || dashboardData.kpis?.budgetedVsActual?.actual || 10,
          projected: dashboardData.heroKPI?.projected || dashboardData.kpis?.budgetedVsActual?.projected || 22,
          budget: dashboardData.heroKPI?.budget || dashboardData.kpis?.budgetedVsActual?.target || 20,
          chartData: dashboardData.heroKPI?.chartData || dashboardData.kpis?.budgetedVsActual?.chartData || generateChartData()
        },
        vehicleUtilization: {
          value: dashboardData.secondaryKPIs?.[0]?.value || dashboardData.kpis?.vehicleUtilization?.value || 84,
          target: dashboardData.secondaryKPIs?.[0]?.target || dashboardData.kpis?.vehicleUtilization?.target || 96,
          chartData: dashboardData.secondaryKPIs?.[0]?.chartData || dashboardData.kpis?.vehicleUtilization?.chartData || generateChartData()
        },
        freightCost: {
          value: dashboardData.secondaryKPIs?.[1]?.value || dashboardData.kpis?.freightCost?.value || 120,
          target: dashboardData.secondaryKPIs?.[1]?.target || dashboardData.kpis?.freightCost?.target || 100,
          chartData: dashboardData.secondaryKPIs?.[1]?.chartData || dashboardData.kpis?.freightCost?.chartData || generateChartData(),
          info: "Low vehicle utilisation (84%) may be driving up freight cost per KM."
        },
        placementEfficiency: {
          value: dashboardData.kpis?.placementEfficiency?.value || 87,
          target: dashboardData.kpis?.placementEfficiency?.target || 96,
          chartData: dashboardData.kpis?.placementEfficiency?.chartData || regionData
        },
        orderDeliveryTime: {
          value: dashboardData.kpis?.orderDeliveryTime?.value || 4,
          target: dashboardData.kpis?.orderDeliveryTime?.target || 3,
          chartData: dashboardData.kpis?.orderDeliveryTime?.chartData || [
            { region: 'North', value: 5 },
            { region: 'South', value: 5 },
            { region: 'East', value: 5.5 },
            { region: 'West', value: 3 },
            { region: 'Central', value: 3 }
          ]
        },
        otif: {
          value: dashboardData.kpis?.otif?.value || 86,
          target: dashboardData.kpis?.otif?.target || 98,
          chartData: dashboardData.kpis?.otif?.chartData || regionData.map(item => ({...item, value: item.value - 5}))
        },
        delayedDelivery: {
          value: dashboardData.kpis?.delayedDelivery?.value || 10,
          target: dashboardData.kpis?.delayedDelivery?.target || 2,
          chartData: dashboardData.kpis?.delayedDelivery?.chartData || [
            { region: 'North', value: 12 },
            { region: 'South', value: 10 },
            { region: 'East', value: 12 },
            { region: 'West', value: 1 },
            { region: 'Central', value: 1 }
          ]
        },
        pendingDispatched: {
          value: dashboardData.kpis?.pendingDispatched?.value || 24,
          target: dashboardData.kpis?.pendingDispatched?.target || 10,
          count: dashboardData.kpis?.pendingDispatched?.count || 290
        },
        deliveredRunningDelayed: {
          deliveredValue: dashboardData.kpis?.deliveredRunningDelayed?.deliveredValue || 48,
          runningDelayedValue: dashboardData.kpis?.deliveredRunningDelayed?.runningDelayedValue || 23,
          runningDelayedTarget: dashboardData.kpis?.deliveredRunningDelayed?.runningDelayedTarget || 10,
          deliveredCount: dashboardData.kpis?.deliveredRunningDelayed?.deliveredCount || 97,
          runningDelayedCount: dashboardData.kpis?.deliveredRunningDelayed?.runningDelayedCount || 47
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
          searchData={[
            { type: 'KPI', value: 'Vehicle Utilization', tripId: null },
            { type: 'KPI', value: 'Freight Cost', tripId: null },
            { type: 'KPI', value: 'Placement Efficiency', tripId: null },
            { type: 'KPI', value: 'Order Delivery Time', tripId: null },
            { type: 'KPI', value: 'OTIF', tripId: null },
            { type: 'KPI', value: 'Delayed Delivery', tripId: null },
            { type: 'KPI', value: 'Pending Dispatched', tripId: null },
            { type: 'Region', value: 'North', tripId: null },
            { type: 'Region', value: 'South', tripId: null },
            { type: 'Region', value: 'East', tripId: null },
            { type: 'Region', value: 'West', tripId: null },
            { type: 'Region', value: 'Central', tripId: null }
          ]}
          onSearch={(value) => {
            setLocalSearchTerm(value);
            if (handleSearchTermChange) {
              handleSearchTermChange(value);
            }
          }}
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
          {activeTab === 'operations' ? (
            <OperationalDashboardTab />
          ) : (
            /* Main Grid with the layout matching the design */
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
                    formattedActual={dashboardData?.heroKPI?.formattedActual}
                    formattedProjected={dashboardData?.heroKPI?.formattedProjected}
                    formattedBudget={dashboardData?.heroKPI?.formattedBudget}
                    chartData={kpiData.budgetVsActual.chartData}
                    userRole={currentUser?.role}
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
                        formattedValue={dashboardData?.secondaryKPIs?.[0]?.formattedValue}
                        formattedTarget={dashboardData?.secondaryKPIs?.[0]?.formattedTarget}
                        chartData={kpiData.vehicleUtilization.chartData}
                        userRole={currentUser?.role}
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
                        formattedValue={dashboardData?.secondaryKPIs?.[1]?.formattedValue}
                        formattedTarget={dashboardData?.secondaryKPIs?.[1]?.formattedTarget}
                        chartData={kpiData.freightCost.chartData}
                        info={kpiData.freightCost.info}
                        userRole={currentUser?.role}
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
                        formattedValue={`${formatToOneDecimal(kpiData.placementEfficiency.value)}%`}
                        formattedTarget={`${formatToOneDecimal(kpiData.placementEfficiency.target)}%`}
                        chartData={kpiData.placementEfficiency.chartData}
                        userRole={currentUser?.role}
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
                        formattedValue={`${formatToOneDecimal(kpiData.orderDeliveryTime.value)} days`}
                        formattedTarget={`${formatToOneDecimal(kpiData.orderDeliveryTime.target)} days`}
                        userRole={currentUser?.role}
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
                        formattedValue={`${formatToOneDecimal(kpiData.otif.value)}%`}
                        formattedTarget={`${formatToOneDecimal(kpiData.otif.target)}%`}
                        chartData={kpiData.otif.chartData}
                        userRole={currentUser?.role}
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
                        formattedValue={`${formatToOneDecimal(kpiData.delayedDelivery.value)}%`}
                        formattedTarget={`${formatToOneDecimal(kpiData.delayedDelivery.target)}%`}
                        chartData={kpiData.delayedDelivery.chartData}
                        userRole={currentUser?.role}
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
                        formattedValue={`${formatToOneDecimal(kpiData.pendingDispatched.value)}%`}
                        formattedTarget={`${formatToOneDecimal(kpiData.pendingDispatched.target)}%`}
                        count={kpiData.pendingDispatched.count}
                        userRole={currentUser?.role}
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
                        formattedDeliveredValue={`${formatToOneDecimal(kpiData.deliveredRunningDelayed.deliveredValue)}%`}
                        formattedRunningDelayedValue={`${formatToOneDecimal(kpiData.deliveredRunningDelayed.runningDelayedValue)}%`}
                        formattedRunningDelayedTarget={`${formatToOneDecimal(kpiData.deliveredRunningDelayed.runningDelayedTarget)}%`}
                        deliveredCount={kpiData.deliveredRunningDelayed.deliveredCount}
                        runningDelayedCount={kpiData.deliveredRunningDelayed.runningDelayedCount}
                        userRole={currentUser?.role}
                        onDrillDown={handleKPIDrillDown}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </StyledContentContainer>

        {/* KPI Drill-down Pane */}
        <KPIDrilldownPane
          open={drilldownOpen}
          onClose={handleDrilldownClose}
          kpi={selectedKPI}
          userRole={currentUser?.role}
        />
      </StyledContainer>
    </Layout>
  );
};

export default EnhancedDashboard;
