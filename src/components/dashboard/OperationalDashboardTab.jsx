import { useState, useEffect } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

// Import operational dashboard components
import PlanningSection from '../operations/PlanningSection';
import PreDispatchSection from '../operations/PreDispatchSection';
import InTransitSection from '../operations/InTransitSection';
import PostDeliverySection from '../operations/PostDeliverySection';
import KpiDrilldownDialog from '../operations/KpiDrilldownDialog';
import SearchInput from '../operations/SearchInput';
import LocationSelector from '../operations/LocationSelector';

// Import service
import { getOperationalDashboardData } from '../../services/operationalDashboardService';

const OperationalDashboardTab = () => {
  const [data, setData] = useState({
    planning: {
      totalOrders: {
        value: 0,
        trend: 'up',
        trendValue: 0,
        breakdown: {
          planned: { value: 0, percentage: 0 },
          partiallyPlanned: { value: 0, percentage: 0 },
          unplanned: { value: 0, percentage: 0 }
        },
        trendChart: []
      },
      plannedLogisticCost: {
        value: 0,
        trend: 'up',
        trendValue: 0,
        breakdown: {
          transporter1: { value: 0, percentage: 0 },
          transporter2: { value: 0, percentage: 0 },
          transporter3: { value: 0, percentage: 0 }
        }
      },
      ordersPlanned: {
        value: 0,
        trend: 'up',
        trendValue: 0,
        fulfillmentStatus: { value: 0, percentage: 0 },
        slaBreached: { value: 0, percentage: 0 }
      }
    },
    preDispatch: {
      indentStatus: {
        breakdown: {
          accepted: { value: 0, percentage: 0 },
          pending: { value: 0, percentage: 0 }
        }
      },
      acceptedSplit: {
        breakdown: {
          reporting: { value: 0, percentage: 0 },
          assign: { value: 0, percentage: 0 }
        }
      },
      pickupSlaBreached: {
        value: 0,
        breakdown: {
          lessThan2Hours: { value: 0, percentage: 0 },
          twoToFourHours: { value: 0, percentage: 0 },
          moreThan4Hours: { value: 0, percentage: 0 }
        }
      }
    },
    inTransit: {
      deliveredVsInTransit: {
        breakdown: {
          delivered: { value: 0, percentage: 0 },
          inTransit: { value: 0, percentage: 0 }
        }
      },
      tripDelayFlag: {
        value: 0,
        breakdown: {
          lessThan2Hours: { value: 0, percentage: 0 },
          twoToFourHours: { value: 0, percentage: 0 },
          moreThan4Hours: { value: 0, percentage: 0 }
        }
      },
      etaAccuracy: {
        value: 0,
        trend: 'up',
        trendValue: 0,
        trendChart: []
      }
    },
    postDelivery: {
      epodSubmittedVsPending: {
        breakdown: {
          submitted: { value: 0, percentage: 0 },
          pending: { value: 0, percentage: 0 }
        }
      },
      epodApprovalRate: {
        value: 0,
        breakdown: {
          approved: { value: 0, percentage: 0 },
          rejected: { value: 0, percentage: 0 },
          pending: { value: 0, percentage: 0 }
        }
      },
      invoiceStatus: {
        breakdown: {
          generated: { value: 0, percentage: 0 },
          pending: { value: 0, percentage: 0 }
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('cxo');
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState({ id: null, data: null });

  const { currentUser } = useAuth();
  const { refreshData } = useData();

  // Load data when component mounts or dependencies change
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch data from service
        const dashboardData = await getOperationalDashboardData(userRole, location, searchTerm);
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error('Error loading KPI data:', err);
        setError('Failed to load KPI data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay for search to avoid too many requests
    const searchTimer = setTimeout(() => {
      loadData();
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(searchTimer);
  }, [userRole, location, searchTerm]);

  // Handle user role change
  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  // Handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle KPI click for drill-down
  const handleKPIClick = (kpiId, kpiData) => {
    setSelectedKpi({ id: kpiId, data: kpiData });
    setDrilldownOpen(true);
  };

  // Handle drill-down dialog close
  const handleCloseDrilldown = () => {
    setDrilldownOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SearchInput onSearch={handleSearch} />
          <LocationSelector value={location} onChange={handleLocationChange} />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="user-role-select-label">View As</InputLabel>
            <Select
              labelId="user-role-select-label"
              id="user-role-select"
              value={userRole}
              label="View As"
              onChange={handleUserRoleChange}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="cxo">CXO</MenuItem>
              <MenuItem value="company">Company</MenuItem>
              <MenuItem value="branch">Branch</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Planning Section */}
        <PlanningSection data={data.planning} onKPIClick={handleKPIClick} />

        {/* Pre Dispatch Section */}
        <PreDispatchSection data={data.preDispatch} onKPIClick={handleKPIClick} />

        {/* In Transit Section */}
        <InTransitSection data={data.inTransit} onKPIClick={handleKPIClick} />

        {/* Post Delivery Section */}
        <PostDeliverySection data={data.postDelivery} onKPIClick={handleKPIClick} />
      </Box>

      {/* KPI Drilldown Dialog */}
      <KpiDrilldownDialog
        open={drilldownOpen}
        onClose={handleCloseDrilldown}
        kpiId={selectedKpi.id}
        kpiData={selectedKpi.data}
      />
    </Box>
  );
};

export default OperationalDashboardTab;
