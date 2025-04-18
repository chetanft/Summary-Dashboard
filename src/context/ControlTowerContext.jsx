import { createContext, useContext, useState, useEffect } from 'react';
import { generateMockTripData, generateMockKPIData } from '../data/mockControlTowerData';

const ControlTowerContext = createContext();

export const useControlTower = () => useContext(ControlTowerContext);

export const ControlTowerProvider = ({ children }) => {
  const [tripData, setTripData] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    alertType: [],
    tripType: [],
    lane: [],
    vehicle: [],
    lsp: [],
  });
  const [timeRange, setTimeRange] = useState('7d'); // '7d' or '30d'

  // Load mock data on component mount
  useEffect(() => {
    try {
      setLoading(true);
      
      // Generate mock data
      const mockTripData = generateMockTripData(100);
      const mockKPIData = generateMockKPIData();
      
      // Generate trend data (7 days and 30 days)
      const mockTrendData = {
        '7d': Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          indentIssues: Math.floor(Math.random() * 15) + 5,
          inTransitAlerts: Math.floor(Math.random() * 20) + 10,
          epodIssues: Math.floor(Math.random() * 12) + 3,
        })),
        '30d': Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          indentIssues: Math.floor(Math.random() * 15) + 5,
          inTransitAlerts: Math.floor(Math.random() * 20) + 10,
          epodIssues: Math.floor(Math.random() * 12) + 3,
        })),
      };
      
      setTripData(mockTripData);
      setKpiData(mockKPIData);
      setTrendData(mockTrendData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load Control Tower data');
      setLoading(false);
      console.error('Error loading Control Tower data:', err);
    }
  }, []);

  // Filter trips based on current filters
  const filteredTrips = tripData.filter(trip => {
    // Date range filter
    if (filters.dateRange[0] && filters.dateRange[1]) {
      const tripDate = new Date(trip.timestamp);
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);
      if (tripDate < startDate || tripDate > endDate) return false;
    }
    
    // Alert type filter
    if (filters.alertType.length > 0) {
      const tripAlertTypes = [...trip.indentIssues, ...trip.inTransitAlerts, ...trip.epodIssues].map(alert => alert.type);
      if (!filters.alertType.some(type => tripAlertTypes.includes(type))) return false;
    }
    
    // Trip type filter
    if (filters.tripType.length > 0 && !filters.tripType.includes(trip.tripType)) return false;
    
    // Lane filter
    if (filters.lane.length > 0 && !filters.lane.includes(trip.lane)) return false;
    
    // Vehicle filter
    if (filters.vehicle.length > 0 && !filters.vehicle.includes(trip.vehicleNumber)) return false;
    
    // LSP filter
    if (filters.lsp.length > 0 && !filters.lsp.includes(trip.lspName)) return false;
    
    return true;
  });

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateRange: [null, null],
      alertType: [],
      tripType: [],
      lane: [],
      vehicle: [],
      lsp: [],
    });
  };

  // Select a trip for detailed view
  const selectTrip = (tripId) => {
    const trip = tripData.find(t => t.tripId === tripId);
    setSelectedTrip(trip || null);
  };

  // Clear selected trip
  const clearSelectedTrip = () => {
    setSelectedTrip(null);
  };

  // Toggle time range for trend data
  const toggleTimeRange = () => {
    setTimeRange(prev => prev === '7d' ? '30d' : '7d');
  };

  // Refresh data
  const refreshData = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockTripData = generateMockTripData(100);
      const mockKPIData = generateMockKPIData();
      
      setTripData(mockTripData);
      setKpiData(mockKPIData);
      setLoading(false);
    }, 1000);
  };

  const value = {
    tripData,
    filteredTrips,
    kpiData,
    trendData: trendData[timeRange] || [],
    timeRange,
    loading,
    error,
    selectedTrip,
    filters,
    updateFilters,
    clearFilters,
    selectTrip,
    clearSelectedTrip,
    toggleTimeRange,
    refreshData,
  };

  return (
    <ControlTowerContext.Provider value={value}>
      {children}
    </ControlTowerContext.Provider>
  );
};

export default ControlTowerContext;
