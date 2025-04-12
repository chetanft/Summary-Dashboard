import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchDashboardData, transformDashboardData } from '../services/dataService';
import { useAuth } from './AuthContext';

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

  // Load data on initial render and when user changes
  useEffect(() => {
    loadDashboardData();

    // Set up auto-refresh interval (5 minutes)
    const refreshInterval = setInterval(() => {
      loadDashboardData();
    }, 5 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(refreshInterval);
  }, [loadDashboardData]);

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
    loading,
    error,
    lastUpdated: formattedLastUpdated,
    refreshData: loadDashboardData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
