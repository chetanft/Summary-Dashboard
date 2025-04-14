import React, { createContext, useContext, useState, useEffect } from 'react';
import { kpiData as initialKpiData } from '../data/kpiData';

// Create the context
const DataContext = createContext();

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Provider component
export const DataProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setDashboardData(initialKpiData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to manually refresh data
  const refreshData = () => {
    fetchData();
  };

  // Value to be provided by the context
  const value = {
    dashboardData,
    loading,
    error,
    lastUpdated,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
