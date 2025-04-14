import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Layout from '../layout/Layout';
import DashboardHeader from './DashboardHeader';
import HeroKPI from './HeroKPI';
import SecondaryKPI from './SecondaryKPI';
import LineChartKPI from './LineChartKPI';
import AlertIndicator from './AlertIndicator';
import KPIDrilldownPane from './KPIDrilldownPane';
import { Box, Grid, Skeleton, Typography, Tooltip, IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const { dashboardData, loading, error, lastUpdated, refreshData } = useData();

  // Handle manual refresh
  const handleRefresh = () => {
    refreshData();
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle KPI drill-down
  const handleKPIDrillDown = (kpi) => {
    setSelectedKPI(kpi);
    setDrilldownOpen(true);
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
    <>
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
        {/* Search and Refresh Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mt: 1,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <TextField
              placeholder="Search KPIs..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: 250, maxWidth: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {lastUpdated ? `Last updated: ${lastUpdated}` : ''}
            </Typography>
          </Box>
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

        {/* First Row - Budgeted vs Actual vs Projected Freight and Vehicle Utilisation */}
        <Grid container spacing={2.5}>
          {/* Budgeted vs Actual vs Projected Freight */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: '16px' }} />
            ) : (
              <HeroKPI
                title="Budgeted vs Actual vs Projected Freight"
                data={{
                  actual: "₹ 10 Cr",
                  projected: "₹ 22 Cr",
                  budget: "₹ 20 cr",
                  chartData: kpiData.heroKPI.chartData
                }}
              />
            )}
          </Grid>

          {/* Vehicle Utilisation */}
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Vehicle Utilisation"
                value="84%"
                target="96%"
                color="primary"
                chartType="line"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
        </Grid>

        {/* Second Row - Freight cost per KM */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Freight cost per KM"
                value="₹ 120"
                target="₹ 100"
                color="error"
                chartType="line"
                note="Low vehicle utilization (84%) may be driving up freight cost per KM."
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Placeholder for future content */}
          </Grid>
        </Grid>

        {/* Third Row - Placement Efficiency, Order to Delivery Time, OTIF */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Placement Efficiency"
                value="87%"
                target="96%"
                color="primary"
                chartType="bar"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Order to Delivery Time"
                value="4 days"
                target="3 days"
                color="error"
                chartType="bar"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="OTIF"
                value="86%"
                target="98%"
                color="primary"
                chartType="bar"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
        </Grid>

        {/* Fourth Row - Delayed Delivery %, Pending Dispatched, Delivered vs Running Delayed */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Delayed Delivery %"
                value="10%"
                target="2%"
                color="error"
                chartType="bar"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Pending Dispatched"
                value="24%"
                target="10%"
                color="error"
                chartType="donut"
                additionalInfo="290 Trips"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px' }} />
            ) : (
              <SecondaryKPI
                title="Delivered vs Running Delayed"
                value="48% vs 23%"
                target="10%"
                color="success"
                chartType="donut"
                onDrillDown={handleKPIDrillDown}
              />
            )}
          </Grid>
        </Grid>
        </Box>
      </Layout>

      {/* KPI Drilldown Pane */}
      <KPIDrilldownPane
        open={drilldownOpen}
        onClose={() => setDrilldownOpen(false)}
        kpi={selectedKPI}
      />
    </>
  );
};

export default Dashboard;
