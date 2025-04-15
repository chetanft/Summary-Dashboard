import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, transformDashboardData } from '../services/dataService';
import { useAuth } from './AuthContext';
import { generateRealtimeKpiData, simulateRealtimeUpdate } from '../data/realtimeKpiData';

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
  const [userRole, setUserRole] = useState('CXO');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

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

      // Set up auto-refresh interval (5 minutes)
      const refreshInterval = setInterval(() => {
        loadDashboardData();
        updateRealtimeKpiData();
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
    dashboardData,
    realtimeKpiData: filteredRealtimeKpiData || realtimeKpiData, // Use filtered data if available
    userRole,
    selectedBranch,
    loading,
    error,
    lastUpdated: formattedLastUpdated,
    refreshData: loadDashboardData,
    refreshAllData,
    updateRealtimeKpiData,
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
