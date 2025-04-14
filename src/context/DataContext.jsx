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
  const [userRole, setUserRole] = useState('CXO');
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
  }, [currentUser]);

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
  }, [currentUser, userRole]);

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
  }, [realtimeKpiData, userRole]);

  // Function to change user role for real-time KPI data
  const changeUserRole = useCallback((role) => {
    setUserRole(role);
    // Load new data for the selected role
    const data = generateRealtimeKpiData(role);
    setRealtimeKpiData(data);
    setLastUpdated(new Date());
  }, []);

  // Function to refresh all data
  const refreshAllData = useCallback(() => {
    loadDashboardData();
    updateRealtimeKpiData();
  }, [loadDashboardData, updateRealtimeKpiData]);

  // Load data on initial render and when user changes
  useEffect(() => {
    loadDashboardData();
    loadRealtimeKpiData();

    // Set up auto-refresh interval (5 minutes)
    const refreshInterval = setInterval(() => {
      loadDashboardData();
      updateRealtimeKpiData();
    }, 5 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(refreshInterval);
  }, [loadDashboardData, loadRealtimeKpiData, updateRealtimeKpiData]);

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
    realtimeKpiData,
    userRole,
    loading,
    error,
    lastUpdated: formattedLastUpdated,
    refreshData: loadDashboardData,
    refreshAllData,
    updateRealtimeKpiData,
    changeUserRole
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
