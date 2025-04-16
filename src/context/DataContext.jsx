import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, transformDashboardData } from '../services/dataService';
import { useAuth } from './AuthContext';
import { generateRealtimeKpiData, simulateRealtimeUpdate } from '../data/realtimeKpiData';

// Function to generate new operational KPI data
const generateOperationalKpiData = (userRole = 'CXO') => {
  return {
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
  };
};

// Function to simulate updates to operational KPI data
const simulateOperationalKpiUpdate = (data) => {
  if (!data) return data;

  const newData = JSON.parse(JSON.stringify(data)); // Deep clone

  // Update all KPI groups
  Object.keys(newData).forEach(groupKey => {
    const group = newData[groupKey];

    // Update KPIs in each group
    if (group.kpis && Array.isArray(group.kpis)) {
      group.kpis.forEach(kpi => {
        if (typeof kpi.count === 'number') {
          // Random fluctuation between -5% and +5%
          const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
          kpi.count = Math.max(1, Math.round(kpi.count * fluctuation));
        }

        // Update breakdown if exists
        if (kpi.breakdown) {
          Object.keys(kpi.breakdown).forEach(key => {
            const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
            kpi.breakdown[key] = Math.max(1, Math.round(kpi.breakdown[key] * fluctuation));
          });
        }
      });
    }
  });

  return newData;
};

// Create the data context
const DataContext = createContext();

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Data provider component
export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [realtimeKpiData, setRealtimeKpiData] = useState(null);
  const [filteredRealtimeKpiData, setFilteredRealtimeKpiData] = useState(null);
  const [operationalKpiData, setOperationalKpiData] = useState(null);
  const [filteredOperationalKpiData, setFilteredOperationalKpiData] = useState(null);
  const [userRole, setUserRole] = useState('CXO');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDashboardData, setFilteredDashboardData] = useState(null);

  // Function to load dashboard data
  const loadDashboardData = useCallback(async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch data based on user role
      const data = await fetchDashboardData(currentUser.role);

      // Transform data for dashboard components
      const transformedData = transformDashboardData(data);

      // Update state
      setDashboardData(transformedData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  }, []); // Empty dependency array to prevent re-creation on every render

  // Function to load real-time KPI data
  const loadRealtimeKpiData = useCallback(() => {
    if (!currentUser) return;

    try {
      const data = generateRealtimeKpiData(userRole);
      setRealtimeKpiData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading real-time KPI data:', err);
      setError('Failed to load real-time KPI data');
    }
  }, []); // Empty dependency array to prevent re-creation on every render

  // Function to load operational KPI data
  const loadOperationalKpiData = useCallback(() => {
    if (!currentUser) return;

    try {
      const data = generateOperationalKpiData(userRole);
      setOperationalKpiData(data);
      setFilteredOperationalKpiData(filterDataByBranch(data, selectedBranch));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error loading operational KPI data:', err);
      setError('Failed to load operational KPI data');
    }
  }, []); // Empty dependency array to prevent re-creation on every render

  // Function to update real-time KPI data
  const updateRealtimeKpiData = useCallback(() => {
    if (!realtimeKpiData) return;

    try {
      const updatedData = simulateRealtimeUpdate(realtimeKpiData, userRole);
      setRealtimeKpiData(updatedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error updating real-time KPI data:', err);
    }
  }, []); // Empty dependency array to prevent re-creation on every render

  // Function to update operational KPI data
  const updateOperationalKpiData = useCallback(() => {
    if (!operationalKpiData) return;

    try {
      const updatedData = simulateOperationalKpiUpdate(operationalKpiData);
      setOperationalKpiData(updatedData);
      setFilteredOperationalKpiData(filterDataByBranch(updatedData, selectedBranch));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error updating operational KPI data:', err);
    }
  }, []); // Empty dependency array to prevent re-creation on every render

  // Function to filter data based on selected branch
  const filterDataByBranch = useCallback((data, branch) => {
    if (!data || branch === 'all') return data;

    const result = JSON.parse(JSON.stringify(data)); // Deep clone

    // Handle region selection (north, south, east, west)
    if (['north', 'south', 'east', 'west'].includes(branch)) {
      const region = branch;

      // Filter data to only include the selected region
      // For each KPI group, update the count to show only the selected region's data
      Object.keys(result).forEach(groupKey => {
        const group = result[groupKey];
        Object.keys(group).forEach(kpiKey => {
          const kpi = group[kpiKey];
          if (kpi.details && kpi.details[region] !== undefined) {
            kpi.count = kpi.details[region];
          }
        });
      });

      return result;
    }

    // Handle specific branch selection (e.g., north-delhi)
    if (branch.includes('-')) {
      const [region, branchName] = branch.split('-');

      // For a specific branch, we would typically have branch-level data
      // For this demo, we'll simulate by adjusting the region data
      Object.keys(result).forEach(groupKey => {
        const group = result[groupKey];
        Object.keys(group).forEach(kpiKey => {
          const kpi = group[kpiKey];
          if (kpi.details && kpi.details[region] !== undefined) {
            // Simulate branch data as a fraction of region data
            kpi.count = Math.round(kpi.details[region] * 0.3); // 30% of region data
          }
        });
      });

      return result;
    }

    return data;
  }, []);

  // Function to filter dashboard data based on search term
  const filterDashboardDataBySearch = useCallback((data, term) => {
    if (!data || !term || term.trim() === '') {
      return data;
    }

    const searchLower = term.toLowerCase();
    const result = JSON.parse(JSON.stringify(data)); // Deep clone

    // Filter KPIs based on search term
    if (result.kpis) {
      result.kpis = result.kpis.filter(kpi =>
        kpi.label.toLowerCase().includes(searchLower) ||
        kpi.id.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, []);

  // Function to filter operational KPI data based on search term
  const filterOperationalKpiDataBySearch = useCallback((data, term) => {
    if (!data || !term || term.trim() === '') {
      return data;
    }

    const searchLower = term.toLowerCase();
    const result = JSON.parse(JSON.stringify(data)); // Deep clone

    // Filter each KPI group based on search term
    Object.keys(result).forEach(groupKey => {
      const group = result[groupKey];

      // Check if the group title matches the search term
      const groupMatches = group.title.toLowerCase().includes(searchLower);

      // If the group doesn't match, check if any of its KPIs match
      if (!groupMatches) {
        // Filter KPIs that match the search term
        const filteredKpis = group.kpis.filter(kpi =>
          kpi.name.toLowerCase().includes(searchLower)
        );

        // If no KPIs match, remove the group from the result
        if (filteredKpis.length === 0) {
          delete result[groupKey];
        } else {
          // Otherwise, update the group's KPIs
          group.kpis = filteredKpis;
        }
      }
    });

    return result;
  }, []);

  // Function to handle search term changes
  const handleSearchTermChange = useCallback((term) => {
    setSearchTerm(term);

    // Filter dashboard data
    if (dashboardData) {
      const filtered = filterDashboardDataBySearch(dashboardData, term);
      setFilteredDashboardData(filtered);
    }

    // Filter operational KPI data
    if (operationalKpiData) {
      const filtered = filterOperationalKpiDataBySearch(operationalKpiData, term);
      setFilteredOperationalKpiData(filtered);
    }
  }, [dashboardData, operationalKpiData, filterDashboardDataBySearch, filterOperationalKpiDataBySearch]);

  // Function to handle branch change
  const handleBranchChange = useCallback((branch) => {
    setSelectedBranch(branch);

    // Update filtered data
    if (realtimeKpiData) {
      const filteredData = filterDataByBranch(realtimeKpiData, branch);
      setFilteredRealtimeKpiData(filteredData);
      setLastUpdated(new Date());
    }
  }, [filterDataByBranch, realtimeKpiData]);

  // Function to change user role for real-time KPI data
  const changeUserRole = useCallback((role) => {
    setUserRole(role);
    // Load new data for the selected role
    const data = generateRealtimeKpiData(role);
    setRealtimeKpiData(data);
    setFilteredRealtimeKpiData(filterDataByBranch(data, selectedBranch));
    setLastUpdated(new Date());
  }, [filterDataByBranch, selectedBranch]); // Add dependencies

  // Function to refresh all data
  const refreshAllData = useCallback(() => {
    loadDashboardData();
    updateRealtimeKpiData();
  }, [loadDashboardData, updateRealtimeKpiData]);

  // Load data on initial render and when user changes
  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
      loadRealtimeKpiData();
      loadOperationalKpiData();

      // Set up auto-refresh interval (5 minutes)
      const refreshInterval = setInterval(() => {
        loadDashboardData();
        updateRealtimeKpiData();
        updateOperationalKpiData();
      }, 5 * 60 * 1000);

      // Clean up interval on unmount
      return () => clearInterval(refreshInterval);
    }
  }, [currentUser]); // Only depend on currentUser to prevent infinite loops

  // Initialize filtered data when realtimeKpiData changes
  useEffect(() => {
    if (realtimeKpiData) {
      setFilteredRealtimeKpiData(filterDataByBranch(realtimeKpiData, selectedBranch));
    }
  }, [realtimeKpiData, filterDataByBranch, selectedBranch]);

  // Initialize filtered data when operationalKpiData changes
  useEffect(() => {
    if (operationalKpiData) {
      setFilteredOperationalKpiData(filterDataByBranch(operationalKpiData, selectedBranch));
    }
  }, [operationalKpiData, filterDataByBranch, selectedBranch]);

  // Format the last updated timestamp
  const formattedLastUpdated = lastUpdated
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      }).format(lastUpdated)
    : null;

  // Context value
  const value = {
    dashboardData: filteredDashboardData || dashboardData, // Use filtered data if available
    realtimeKpiData: filteredRealtimeKpiData || realtimeKpiData, // Use filtered data if available
    operationalKpiData: filteredOperationalKpiData || operationalKpiData, // Use filtered data if available
    userRole,
    selectedBranch,
    searchTerm,
    loading,
    error,
    lastUpdated: formattedLastUpdated,
    refreshData: loadDashboardData,
    refreshAllData,
    updateRealtimeKpiData,
    updateOperationalKpiData,
    handleSearchTermChange,
    changeUserRole,
    handleBranchChange
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
