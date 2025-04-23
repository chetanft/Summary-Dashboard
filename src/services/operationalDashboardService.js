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
 * @param {string} location - Selected location
 * @param {string} searchTerm - Search term for filtering
 * @returns {Promise<Object>} - Dashboard data
 */
export const getOperationalDashboardData = async (userRole = 'cxo', location = null, searchTerm = '') => {
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

  // Apply location filtering if location is provided
  const locationFilteredData = location ? filterDataByLocation(roleFilteredData, location) : roleFilteredData;

  // Apply search filtering if search term is provided
  const searchFilteredData = searchTerm ? filterDataBySearchTerm(locationFilteredData, searchTerm) : locationFilteredData;

  return searchFilteredData;
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

/**
 * Filter data by location
 *
 * @param {Object} data - Data to filter
 * @param {string} location - Location to filter by
 * @returns {Object} - Filtered data
 */
const filterDataByLocation = (data, location) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));

  // This is a simplified example - in a real application, you would filter
  // the data based on the location

  // Example: Adjust values based on location
  if (location === 'MDC Labs, Amritsar') {
    // No changes - this is the default location
  } else if (location === 'Tata Motors, Pune') {
    // Adjust planning data for Tata Motors, Pune
    if (result.planning && result.planning.totalOrders) {
      result.planning.totalOrders.value = Math.round(result.planning.totalOrders.value * 0.8);
      result.planning.totalOrders.breakdown = {
        planned: {
          value: Math.round(result.planning.totalOrders.value * 0.15),
          percentage: 15
        },
        partiallyPlanned: {
          value: Math.round(result.planning.totalOrders.value * 0.25),
          percentage: 25
        },
        unplanned: {
          value: Math.round(result.planning.totalOrders.value * 0.6),
          percentage: 60
        }
      };
    }
  } else if (location === 'Freight Tiger HQ, Mumbai') {
    // Adjust planning data for Freight Tiger HQ, Mumbai
    if (result.planning && result.planning.totalOrders) {
      result.planning.totalOrders.value = Math.round(result.planning.totalOrders.value * 1.2);
      result.planning.totalOrders.breakdown = {
        planned: {
          value: Math.round(result.planning.totalOrders.value * 0.12),
          percentage: 12
        },
        partiallyPlanned: {
          value: Math.round(result.planning.totalOrders.value * 0.18),
          percentage: 18
        },
        unplanned: {
          value: Math.round(result.planning.totalOrders.value * 0.7),
          percentage: 70
        }
      };
    }
  } else if (location === 'Logistics Hub, Delhi') {
    // Adjust planning data for Logistics Hub, Delhi
    if (result.planning && result.planning.totalOrders) {
      result.planning.totalOrders.value = Math.round(result.planning.totalOrders.value * 0.9);
      result.planning.totalOrders.breakdown = {
        planned: {
          value: Math.round(result.planning.totalOrders.value * 0.08),
          percentage: 8
        },
        partiallyPlanned: {
          value: Math.round(result.planning.totalOrders.value * 0.22),
          percentage: 22
        },
        unplanned: {
          value: Math.round(result.planning.totalOrders.value * 0.7),
          percentage: 70
        }
      };
    }
  }

  return result;
};

/**
 * Filter data by search term
 *
 * @param {Object} data - Data to filter
 * @param {string} searchTerm - Search term to filter by
 * @returns {Object} - Filtered data
 */
const filterDataBySearchTerm = (data, searchTerm) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));

  // This is a simplified example - in a real application, you would filter
  // the data based on the search term

  // For now, we'll just return the data as is
  // In a real application, you would search through the data and filter out
  // items that don't match the search term

  return result;
};
