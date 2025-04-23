/**
 * Service for fetching and transforming operational dashboard data
 */
import { getMonthToDateRange, getLastSixMonthsRange, filterDataByDateRange } from '../utils/dateUtils';
import { transformDataForUserRole } from '../utils/userRoleUtils';
import { planningKpiData } from '../data/ptl/planningKpiData';
import { preDispatchKpiData } from '../data/ptl/preDispatchKpiData';
import { inTransitKpiData } from '../data/ptl/inTransitKpiData';
import { postDeliveryKpiData } from '../data/ptl/postDeliveryKpiData';

/**
 * Get operational dashboard data with appropriate filtering and transformations
 * 
 * @param {string} userRole - User role ('cxo', 'company', 'branch')
 * @returns {Promise<Object>} - Dashboard data
 */
export const getOperationalDashboardData = async (userRole = 'cxo') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get base data
  const baseData = {
    planning: planningKpiData,
    preDispatch: preDispatchKpiData,
    inTransit: inTransitKpiData,
    postDelivery: postDeliveryKpiData
  };
  
  // Apply time-based filtering
  const timeFilteredData = applyTimeFiltering(baseData);
  
  // Apply user role transformations
  const roleFilteredData = transformDataForUserRole(timeFilteredData, userRole);
  
  return roleFilteredData;
};

/**
 * Apply time-based filtering to dashboard data
 * 
 * @param {Object} data - Dashboard data
 * @returns {Object} - Filtered data
 */
const applyTimeFiltering = (data) => {
  const result = { ...data };
  
  // Apply month-to-date filtering for Planning, Pre-Dispatch, In-Transit
  const monthToDateRange = getMonthToDateRange();
  result.planning = filterDataByDateRange(data.planning, monthToDateRange);
  result.preDispatch = filterDataByDateRange(data.preDispatch, monthToDateRange);
  result.inTransit = filterDataByDateRange(data.inTransit, monthToDateRange);
  
  // Apply last six months filtering for Post-Delivery
  const sixMonthsRange = getLastSixMonthsRange();
  result.postDelivery = filterDataByDateRange(data.postDelivery, sixMonthsRange);
  
  return result;
};

/**
 * Filter data by date range
 * 
 * @param {Object} data - Data to filter
 * @param {Object} dateRange - Date range { start, end }
 * @returns {Object} - Filtered data
 */
const filterDataByDateRange = (data, dateRange) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));
  
  // Filter trend charts and other time-based data
  // This is a simplified example - actual implementation would need to handle
  // the specific structure of each data section
  if (result.trendChart) {
    result.trendChart = result.trendChart.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= dateRange.start && itemDate <= dateRange.end;
    });
  }
  
  return result;
};
