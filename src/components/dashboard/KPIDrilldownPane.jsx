import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getPerformanceData, getBranchPerformanceData } from '../../data/regionalData';
import { formatCurrency } from '../../utils/chartUtils';

/**
 * KPI Drilldown Pane Component
 * Shows detailed regional and branch level data for a selected KPI
 */
const KPIDrilldownPane = ({ open, onClose, kpi }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [performanceData, setPerformanceData] = useState({ top: [], worst: [] });
  const [branchData, setBranchData] = useState({ top: [], worst: [] });
  const [loading, setLoading] = useState(false);

  // Load performance data when KPI changes
  useEffect(() => {
    if (kpi && kpi.id) {
      setLoading(true);
      // Simulate API call with a small delay
      setTimeout(() => {
        const data = getPerformanceData(kpi.id);
        setPerformanceData(data);
        setSelectedRegion(null);
        setLoading(false);
      }, 500);
    }
  }, [kpi]);

  // Load branch data when region changes
  useEffect(() => {
    if (kpi && kpi.id && selectedRegion) {
      setLoading(true);
      // Simulate API call with a small delay
      setTimeout(() => {
        const data = getBranchPerformanceData(kpi.id, selectedRegion.id);
        setBranchData(data);
        setLoading(false);
      }, 300);
    }
  }, [kpi, selectedRegion]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  // Handle back button click
  const handleBack = () => {
    setSelectedRegion(null);
  };

  // Format value based on KPI unit
  const formatValue = (value, unit) => {
    if (value === undefined || value === null) return 'N/A';

    if (unit === 'INR') {
      return formatCurrency(value, 'INR');
    } else if (unit === '%') {
      return `${value}%`;
    } else if (unit === 'INR/km') {
      return `₹${value}/km`;
    } else if (unit === 'days') {
      return `${value} days`;
    }

    return value;
  };

  // Get performance color
  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'good':
        return '#4CAF50';
      case 'average':
        return '#FFC107';
      case 'poor':
        return '#FF3533';
      default:
        return '#838C9D';
    }
  };

  // Get performance background color (lighter version)
  const getPerformanceBackgroundColor = (performance) => {
    switch (performance) {
      case 'good':
        return 'rgba(76, 175, 80, 0.1)';
      case 'average':
        return 'rgba(255, 193, 7, 0.1)';
      case 'poor':
        return 'rgba(255, 53, 51, 0.1)';
      default:
        return 'rgba(131, 140, 157, 0.1)';
    }
  };

  // Get performance icon
  const getPerformanceIcon = (performance) => {
    return performance === 'good' ?
      <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 16 }} /> :
      <TrendingDownIcon sx={{ color: '#FF3533', fontSize: 16 }} />;
  };

  // Get KPI description based on KPI ID
  const getKPIDescription = (kpiId) => {
    switch(kpiId) {
      case 'budgeted_vs_actual_freight':
        return 'Comparison of budgeted, actual, and projected freight costs across regions. Lower actual costs compared to budget indicate better performance.';
      case 'vehicle_utilization':
        return 'Percentage of vehicle capacity utilized during transport. Higher utilization rates indicate better efficiency and cost management.';
      case 'freight_cost_per_km':
        return 'Average cost incurred per kilometer of freight transport. Lower costs indicate better operational efficiency.';
      case 'placement_efficiency':
        return 'Percentage of indent requests that were successfully placed with transporters. Higher placement efficiency indicates better operational performance.';
      case 'order_delivery_time':
        return 'Average time from order creation to delivery completion. Lower delivery times indicate better operational efficiency.';
      case 'otif_percentage':
        return 'On Time In Full - Percentage of deliveries that were completed on time and with full order quantity. Higher OTIF indicates better service quality.';
      case 'delayed_delivery':
        return 'Percentage of deliveries that were delayed beyond the promised delivery date. Lower delayed delivery percentage indicates better service quality.';
      case 'pending_dispatched':
        return 'Percentage of orders that are pending dispatch. Lower pending dispatch percentage indicates better operational efficiency.';
      case 'delivered_vs_running_delayed':
        return 'Comparison of delivered orders versus currently delayed orders. Higher delivered percentage and lower delayed percentage indicate better operational performance.';
      default:
        return 'Detailed performance metrics across regions and branches.';
    }
  };

  // Render region level view
  const renderRegionView = () => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Regional Performance
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Top Performing" />
          <Tab label="Worst Performing" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Region</TableCell>
                <TableCell align="right">Actual</TableCell>
                <TableCell align="right">Target/Budget</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? performanceData.top : performanceData.worst).map((region) => (
                <TableRow
                  key={region.id}
                  hover
                  onClick={() => handleRegionSelect(region)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: getPerformanceBackgroundColor(region.performance),
                    '&:hover': {
                      backgroundColor: `${getPerformanceBackgroundColor(region.performance)} !important`,
                      opacity: 0.9
                    }
                  }}
                >
                  <TableCell>{region.name}</TableCell>
                  <TableCell align="right">{formatValue(region.value, kpi?.unit)}</TableCell>
                  <TableCell align="right">
                    {formatValue(kpi?.id === 'budgeted_vs_actual_freight' ? region.budget : region.target, kpi?.unit)}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(region.performance)}
                      <Chip
                        label={region.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(region.performance),
                          color: 'white',
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Click on a region to view branch-level details
        </Typography>
      </>
    );
  };

  // Render branch level view
  const renderBranchView = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            {selectedRegion?.name} Region Branches
          </Typography>
        </Box>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Top Performing" />
          <Tab label="Worst Performing" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Branch</TableCell>
                <TableCell align="right">Actual</TableCell>
                <TableCell align="right">Target/Budget</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? branchData.top : branchData.worst).map((branch) => (
                <TableRow
                  key={branch.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(branch.performance),
                  }}
                >
                  <TableCell>{branch.name}</TableCell>
                  <TableCell align="right">{formatValue(branch.value, kpi?.unit)}</TableCell>
                  <TableCell align="right">
                    {formatValue(kpi?.id === 'budgeted_vs_actual_freight' ? branch.budget : branch.target, kpi?.unit)}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(branch.performance)}
                      <Chip
                        label={branch.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(branch.performance),
                          color: 'white',
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" component="div">
          {kpi?.title} - Drill Down
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3, py: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          {getKPIDescription(kpi?.id)}
        </Typography>
      </Box>

      <Divider />

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <Typography variant="h6" color="text.secondary">
              Loading data...
            </Typography>
          </Box>
        ) : kpi ? (
          selectedRegion ? renderBranchView() : renderRegionView()
        ) : (
          <Typography>No KPI data available</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default KPIDrilldownPane;
