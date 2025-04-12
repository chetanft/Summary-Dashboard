import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Layout from '../layout/Layout';
import DashboardHeader from './DashboardHeader';
import HeroKPI from './HeroKPI';
import SecondaryKPI from './SecondaryKPI';
import LineChartKPI from './LineChartKPI';
import AlertIndicator from './AlertIndicator';
import { Box, Grid, Skeleton, Typography, Tooltip, IconButton, Chip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
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
      { id: '2A', title: 'KPI 2A', value: 'Value', target: 'Value' },
      { id: '3A', title: 'KPI 3A', value: 'Value', target: 'Value' },
      { id: '3B', title: 'KPI 3B', value: 'Value', target: 'Value' },
      { id: '3C', title: 'KPI 3C', value: 'Value', target: 'Value' },
    ],
    lineChartKPIs: [
      { id: '4A', title: 'KPI 4A', value: 'Value', target: 'Value' },
      { id: '4B', title: 'KPI 4B', value: 'Value', target: 'Value' },
      { id: '4C', title: 'KPI 4C', value: 'Value', target: 'Value' },
      { id: '4D', title: 'KPI 4D', value: 'Value', target: 'Value' },
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

        {/* Alert Indicator */}
        <AlertIndicator />
        {/* First Row - Hero KPI and KPI 2A/3A */}
        <Grid container spacing={2.5}>
          {/* Hero KPI */}
          <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: '32px' }} />
            ) : (
              <HeroKPI title="Hero KPI" data={kpiData.heroKPI} />
            )}
          </Grid>

          {/* KPI 2A and 3A */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2.5} direction="column">
              <Grid item>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <SecondaryKPI
                    title={kpiData.secondaryKPIs[0].title}
                    value={kpiData.secondaryKPIs[0].value}
                    target={kpiData.secondaryKPIs[0].target}
                    color={kpiData.secondaryKPIs[0].color}
                  />
                )}
              </Grid>
              <Grid item>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
                ) : (
                  <SecondaryKPI
                    title={kpiData.secondaryKPIs[1].title}
                    value={kpiData.secondaryKPIs[1].value}
                    target={kpiData.secondaryKPIs[1].target}
                    color={kpiData.secondaryKPIs[1].color}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Row - KPI 3B and 3C */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title={kpiData.secondaryKPIs[2].title}
                value={kpiData.secondaryKPIs[2].value}
                target={kpiData.secondaryKPIs[2].target}
                color={kpiData.secondaryKPIs[2].color}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title={kpiData.secondaryKPIs[3].title}
                value={kpiData.secondaryKPIs[3].value}
                target={kpiData.secondaryKPIs[3].target}
                color={kpiData.secondaryKPIs[3].color}
              />
            )}
          </Grid>
        </Grid>

        {/* Third Row - Line Chart KPIs */}
        <Grid container spacing={2.5}>
          {kpiData.lineChartKPIs.map((kpi) => (
            <Grid item xs={12} sm={6} md={3} key={kpi.id}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={221} sx={{ borderRadius: '32px' }} />
              ) : (
                <LineChartKPI
                  title={kpi.title}
                  value={kpi.value}
                  target={kpi.target}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
