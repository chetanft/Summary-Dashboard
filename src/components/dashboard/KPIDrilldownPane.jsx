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
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import {
  generateVehicleTypeData,
  generateRouteTypeData,
  generateTransporterData,
  generateBranchVehicleTypeData,
  generateBranchTransporterData,
  generateSampleOrderData
} from '../../data/drilldownData';

/**
 * KPI Drilldown Pane Component
 * Shows detailed regional and branch level data for a selected KPI
 */
const KPIDrilldownPane = ({ open, onClose, kpi, userRole }) => {
  // Use passed userRole if available, otherwise get from auth context
  const { currentUser } = useAuth();
  const effectiveUserRole = userRole || currentUser?.role;
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [performanceData, setPerformanceData] = useState({ top: [], worst: [] });
  const [branchData, setBranchData] = useState({ top: [], worst: [] });
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [drilldownType, setDrilldownType] = useState('region'); // 'region', 'branch', 'vehicleType', 'routeType', 'transporter', 'branchVehicleType', 'branchTransporter'
  const [drilldownData, setDrilldownData] = useState({ top: [], worst: [] });



  // Load performance data when KPI changes
  useEffect(() => {
    if (kpi && kpi.id) {
      setLoading(true);

      // For branch users, show appropriate drill-down data
      if (effectiveUserRole === ROLES.BRANCH_USER) {
        // Simulate API call with a small delay
        setTimeout(() => {
          let data;

          // Select appropriate data based on KPI type
          console.log('Branch user KPI drilldown for:', kpi.id);
          switch(kpi.id) {
            case 'vehicle_utilization':
            case 'freight_budget_actual':
            case 'budgeted_vs_actual_freight':
              data = generateVehicleTypeData(kpi.id);
              setDrilldownType('vehicleType');
              break;

            case 'freight_cost_per_km':
              data = generateRouteTypeData(kpi.id);
              setDrilldownType('routeType');
              break;

            case 'placement_efficiency':
            case 'order_delivery_time':
            case 'otif_percentage':
            case 'delayed_delivery':
            case 'pending_dispatched':
            case 'delivered_vs_running_delayed':
              data = generateTransporterData(kpi.id);
              setDrilldownType('transporter');
              break;

            default:
              console.log('Using default order view for KPI:', kpi.id);
              data = generateSampleOrderData(kpi.id);
              setOrderData(data);
              setDrilldownType('order');
              break;
          }

          if (data && data.top && data.worst) {
            setDrilldownData(data);
          }
          setLoading(false);
        }, 500);
      } else if (effectiveUserRole === ROLES.COMPANY_USER) {
        // For company users, show branch-level data directly
        setTimeout(() => {
          console.log('Company user KPI drilldown for:', kpi.id);
          let data;

          switch(kpi.id) {
            case 'vehicle_utilization':
            case 'freight_budget_actual':
            case 'budgeted_vs_actual_freight':
            case 'freight_cost_per_km':
              // Show top and worst performing branches by vehicle type
              data = generateBranchVehicleTypeData('all');
              setDrilldownType('branchVehicleType');
              break;

            case 'placement_efficiency':
            case 'order_delivery_time':
            case 'otif_percentage':
            case 'delayed_delivery':
            case 'pending_dispatched':
            case 'delivered_vs_running_delayed':
              // Show top and worst performing branches by transporter
              data = generateBranchTransporterData('all');
              setDrilldownType('branchTransporter');
              break;

            default:
              // Default to showing regional data for other KPIs
              data = getPerformanceData(kpi.id);
              setPerformanceData(data);
              setSelectedRegion(null);
              setDrilldownType('region');
              break;
          }

          if (data && data.top && data.worst) {
            setDrilldownData(data);
          }
          setLoading(false);
        }, 500);
      } else {
        // For CXO users, show regional data
        setTimeout(() => {
          const data = getPerformanceData(kpi.id);
          setPerformanceData(data);
          setSelectedRegion(null);
          setDrilldownType('region');
          setLoading(false);
        }, 500);
      }
    }
  }, [kpi, effectiveUserRole]);

  // Load branch data when region changes
  useEffect(() => {
    if (kpi && kpi.id && selectedRegion) {
      setLoading(true);

      // For company users, show appropriate branch-level drill-down
      if (effectiveUserRole === ROLES.COMPANY_USER) {
        setTimeout(() => {
          let data;

          // Select appropriate data based on KPI type
          console.log('Company user KPI drilldown for:', kpi.id);
          switch(kpi.id) {
            case 'vehicle_utilization':
            case 'freight_budget_actual':
            case 'budgeted_vs_actual_freight':
            case 'freight_cost_per_km':
              data = generateBranchVehicleTypeData(selectedRegion.id);
              setDrilldownType('branchVehicleType');
              break;

            case 'placement_efficiency':
            case 'order_delivery_time':
            case 'otif_percentage':
            case 'delayed_delivery':
            case 'pending_dispatched':
            case 'delivered_vs_running_delayed':
              data = generateBranchTransporterData(selectedRegion.id);
              setDrilldownType('branchTransporter');
              break;

            default:
              console.log('Using default branch view for KPI:', kpi.id);
              data = getBranchPerformanceData(kpi.id, selectedRegion.id);
              setDrilldownType('branch');
              break;
          }

          setBranchData(data);
          setLoading(false);
        }, 300);
      } else {
        // For CXO users, show standard branch data
        setTimeout(() => {
          const data = getBranchPerformanceData(kpi.id, selectedRegion.id);
          setBranchData(data);
          setDrilldownType('branch');
          setLoading(false);
        }, 300);
      }
    }
  }, [kpi, selectedRegion, currentUser]);

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

  // Get performance icon for budgeted vs actual freight
  const getBudgetPerformanceIcon = (value, budget) => {
    return value <= budget ?
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
                      {kpi?.id === 'budgeted_vs_actual_freight'
                        ? getBudgetPerformanceIcon(region.value, region.budget)
                        : getPerformanceIcon(region.performance)
                      }
                      <Chip
                        label={kpi?.id === 'budgeted_vs_actual_freight'
                          ? (region.value <= region.budget ? 'good' : 'poor')
                          : region.performance
                        }
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: kpi?.id === 'budgeted_vs_actual_freight'
                            ? getPerformanceColor(region.value <= region.budget ? 'good' : 'poor')
                            : getPerformanceColor(region.performance),
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
                      {kpi?.id === 'budgeted_vs_actual_freight'
                        ? getBudgetPerformanceIcon(branch.value, branch.budget)
                        : getPerformanceIcon(branch.performance)
                      }
                      <Chip
                        label={kpi?.id === 'budgeted_vs_actual_freight'
                          ? (branch.value <= branch.budget ? 'good' : 'poor')
                          : branch.performance
                        }
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: kpi?.id === 'budgeted_vs_actual_freight'
                            ? getPerformanceColor(branch.value <= branch.budget ? 'good' : 'poor')
                            : getPerformanceColor(branch.performance),
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

  // Render vehicle type view for branch users
  const renderVehicleTypeView = () => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vehicle Type Performance
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Top Performing" />
          <Tab label="Underutilized" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Utilization (%)</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0
                ? drilldownData.top
                : drilldownData.worst
              ).map((vehicleType) => (
                <TableRow
                  key={vehicleType.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(vehicleType.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{vehicleType.type}</TableCell>
                  <TableCell>{vehicleType.count}</TableCell>
                  <TableCell>{vehicleType.utilization}%</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(vehicleType.performance)}
                      <Chip
                        label={vehicleType.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(vehicleType.performance),
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

        <Typography variant="body2" color="text.secondary">
          {activeTab === 0
            ? `Showing top performing vehicle types`
            : `Showing underutilized vehicle types`}
        </Typography>
      </>
    );
  };

  // Render route type view for branch users
  const renderRouteTypeView = () => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Route Type Performance
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Top Performing" />
          <Tab label="Underperforming" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Route Type</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Cost per KM (₹)</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0
                ? drilldownData.top
                : drilldownData.worst
              ).map((routeType) => (
                <TableRow
                  key={routeType.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(routeType.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{routeType.type}</TableCell>
                  <TableCell>{routeType.count}</TableCell>
                  <TableCell>{routeType.costPerKm}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(routeType.performance)}
                      <Chip
                        label={routeType.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(routeType.performance),
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

        <Typography variant="body2" color="text.secondary">
          {activeTab === 0
            ? `Showing top performing route types`
            : `Showing underperforming route types`}
        </Typography>
      </>
    );
  };

  // Render transporter view for branch users
  const renderTransporterView = () => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Transporter Performance
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Top Performing" />
          <Tab label="Underperforming" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transporter</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>On-Time</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0
                ? drilldownData.top
                : drilldownData.worst
              ).map((transporter) => (
                <TableRow
                  key={transporter.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(transporter.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{transporter.name}</TableCell>
                  <TableCell>{transporter.orders}</TableCell>
                  <TableCell>{transporter.onTime} orders</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(transporter.performance)}
                      <Chip
                        label={transporter.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(transporter.performance),
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

        <Typography variant="body2" color="text.secondary">
          {activeTab === 0
            ? `Showing top performing transporters`
            : `Showing underperforming transporters`}
        </Typography>
      </>
    );
  };

  // Render branch vehicle type view for company users
  const renderBranchVehicleTypeView = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {selectedRegion && (
            <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">
            {selectedRegion ? `${selectedRegion.name} Region Branches - Vehicle Types` : 'Branch Vehicle Type Performance'}
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
                <TableCell>Vehicle Types</TableCell>
                <TableCell>Utilization (%)</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? (selectedRegion ? branchData.top : drilldownData.top) : (selectedRegion ? branchData.worst : drilldownData.worst)).map((branch) => (
                <TableRow
                  key={branch.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(branch.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.vehicleTypes}</TableCell>
                  <TableCell>{branch.utilization}%</TableCell>
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

  // Render branch transporter view for company users
  const renderBranchTransporterView = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {selectedRegion && (
            <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">
            {selectedRegion ? `${selectedRegion.name} Region Branches - Transporters` : 'Branch Transporter Performance'}
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
                <TableCell>Transporters</TableCell>
                <TableCell>On-Time (%)</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? (selectedRegion ? branchData.top : drilldownData.top) : (selectedRegion ? branchData.worst : drilldownData.worst)).map((branch) => (
                <TableRow
                  key={branch.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(branch.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.transporters}</TableCell>
                  <TableCell>{branch.onTime}%</TableCell>
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

  // Render order level view for branch users
  const renderOrderView = () => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order Performance
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="All Orders" />
          <Tab label="Delayed Orders" />
        </Tabs>

        <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0
                ? orderData
                : orderData.filter(order => order.status === 'Delayed')
              ).map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor: getPerformanceBackgroundColor(order.performance),
                    '&:hover': {
                      opacity: 0.9,
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.route}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          order.status === 'Delivered' ? '#E8F5E9' :
                          order.status === 'In Transit' ? '#E3F2FD' :
                          order.status === 'Delayed' ? '#FFEAEA' :
                          order.status === 'On Time' ? '#E8F5E9' :
                          '#FFF8E1',
                        color:
                          order.status === 'Delivered' ? '#2E7D32' :
                          order.status === 'In Transit' ? '#1565C0' :
                          order.status === 'Delayed' ? '#D32F2F' :
                          order.status === 'On Time' ? '#2E7D32' :
                          '#F57C00',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {getPerformanceIcon(order.performance)}
                      <Chip
                        label={order.performance}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: getPerformanceColor(order.performance),
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

        <Typography variant="body2" color="text.secondary">
          {activeTab === 0
            ? `Showing ${orderData.length} orders for your branch`
            : `Showing ${orderData.filter(order => order.status === 'Delayed').length} delayed orders`}
        </Typography>
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
          effectiveUserRole === ROLES.BRANCH_USER ? (
            // Branch user views based on drilldown type
            console.log('Rendering branch user view with drilldown type:', drilldownType),
            drilldownType === 'vehicleType' ? renderVehicleTypeView() :
            drilldownType === 'routeType' ? renderRouteTypeView() :
            drilldownType === 'transporter' ? renderTransporterView() :
            renderOrderView()
          ) : effectiveUserRole === ROLES.COMPANY_USER ? (
            // Company user views - show branch data directly
            drilldownType === 'branchVehicleType' ? renderBranchVehicleTypeView() :
            drilldownType === 'branchTransporter' ? renderBranchTransporterView() :
            selectedRegion ? renderBranchView() : renderRegionView()
          ) : (
            // CXO views
            selectedRegion ? renderBranchView() : renderRegionView()
          )
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
