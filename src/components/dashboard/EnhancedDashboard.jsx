import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Layout from '../layout/Layout';
import DashboardHeader from './DashboardHeader';
import EnhancedHeroKPI from './EnhancedHeroKPI';
import EnhancedSecondaryKPI from './EnhancedSecondaryKPI';
import LineChartKPI from './LineChartKPI';
import { Box, Grid, Skeleton, Typography, Tooltip, IconButton, Chip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

// Import KPI components
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
  const [activeTab, setActiveTab] = useState('summary');
  const { dashboardData, loading, error, lastUpdated, refreshData } = useData();

  // Handle manual refresh
  const handleRefresh = () => {
    refreshData();
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // KPI data from context
  const kpiData = dashboardData || {
    heroKPI: {
      title: 'Hero KPI',
      actual: 'Span 6',
      projected: 'Span 6',
      budget: 'Span 6',
      chartData: [
        { month: 'Nov', value: 210, color: '#FF3533' },
        { month: 'Dec', value: 307, color: '#838C9D' },
        { month: 'Jan', value: 275, color: '#FF3533' },
        { month: 'Feb', value: 348, color: '#838C9D' },
        { month: 'Mar', value: 317, color: '#838C9D' },
      ],
    },
    secondaryKPIs: [
      { id: '2A', title: 'KPI 2A', value: 'Value', target: 'Value', color: 'green', unit: '%' },
      { id: '3A', title: 'KPI 3A', value: 'Value', target: 'Value', color: 'yellow', unit: 'INR' },
      { id: '3B', title: 'KPI 3B', value: 'Value', target: 'Value', color: 'red', unit: '%' },
      { id: '3C', title: 'KPI 3C', value: 'Value', target: 'Value', color: 'green', unit: 'INR' },
    ],
  };

  return (
    <Layout onRefresh={handleRefresh}>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Summary Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Content Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {/* Refresh and Last Updated */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {lastUpdated ? `Last updated: ${lastUpdated}` : ''}
          </Typography>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} size="small" disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

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

        {/* Main KPI Grid Layout */}
        <Grid container spacing={2.5}>
          {/* Left Column - Hero KPI */}
          <Grid item xs={12} md={4}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: '16px' }} />
            ) : (
              <EnhancedHeroKPI title="Freight Budget vs Actual" data={kpiData.heroKPI} />
            )}
          </Grid>

          {/* Right Column - Secondary KPIs */}
          <Grid item xs={12} md={8}>
            {/* Top Row - KPI 2A and 3A */}
            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <EnhancedSecondaryKPI
                    title={kpiData.secondaryKPIs[0].title}
                    value={kpiData.secondaryKPIs[0].value}
                    target={kpiData.secondaryKPIs[0].target}
                    color={kpiData.secondaryKPIs[0].color}
                    unit={kpiData.secondaryKPIs[0].unit}
                    trend={kpiData.secondaryKPIs[0].trend}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <EnhancedSecondaryKPI
                    title={kpiData.secondaryKPIs[1].title}
                    value={kpiData.secondaryKPIs[1].value}
                    target={kpiData.secondaryKPIs[1].target}
                    color={kpiData.secondaryKPIs[1].color}
                    unit={kpiData.secondaryKPIs[1].unit}
                    trend={kpiData.secondaryKPIs[1].trend}
                  />
                )}
              </Grid>
            </Grid>

            {/* Bottom Row - KPI 3B and 3C */}
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <EnhancedSecondaryKPI
                    title={kpiData.secondaryKPIs[2].title}
                    value={kpiData.secondaryKPIs[2].value}
                    target={kpiData.secondaryKPIs[2].target}
                    color={kpiData.secondaryKPIs[2].color}
                    unit={kpiData.secondaryKPIs[2].unit}
                    trend={kpiData.secondaryKPIs[2].trend}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <EnhancedSecondaryKPI
                    title={kpiData.secondaryKPIs[3].title}
                    value={kpiData.secondaryKPIs[3].value}
                    target={kpiData.secondaryKPIs[3].target}
                    color={kpiData.secondaryKPIs[3].color}
                    unit={kpiData.secondaryKPIs[3].unit}
                    trend={kpiData.secondaryKPIs[3].trend}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default EnhancedDashboard;
