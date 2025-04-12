/**
 * Data Service for TMS Dashboard
 * Handles loading, transforming, and filtering KPI data based on user role
 */

// Import dashboard data
import dashboardData from '../data/dashboardData.json';
import { getRegionalData } from '../data/regionalData';

/**
 * Fetches dashboard data based on user role
 * @param {string} userRole - The role of the current user (CXO, Company, Branch)
 * @returns {Promise} - Promise that resolves to filtered dashboard data
 */
export const fetchDashboardData = (userRole) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // In a real app, this would be an API call
        // For now, we're using the imported JSON data

        // Filter KPIs based on user role
        const filteredData = filterDataByRole(dashboardData, userRole);

        // Validate data structure
        if (!filteredData || !filteredData.kpis) {
          throw new Error('Invalid dashboard data structure');
        }

        resolve(filteredData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        reject(error.message || 'Failed to load dashboard data');
      }
    }, 500);
  });
};

/**
 * Filters dashboard data based on user role
 * @param {Object} data - The complete dashboard data
 * @param {string} userRole - The role of the current user
 * @returns {Object} - Filtered dashboard data
 */
const filterDataByRole = (data, userRole) => {
  // Clone the data to avoid modifying the original
  const filteredData = { ...data };

  // In a real app, we would filter KPIs based on the user role
  // For now, we're returning all KPIs for all roles

  // For demonstration, we'll filter some KPIs for Branch users
  if (userRole === 'Branch') {
    // Branch users only see specific KPIs
    filteredData.kpis = data.kpis.filter(kpi =>
      ['vehicle_utilization', 'placement_efficiency', 'otif_percentage'].includes(kpi.id)
    );
  }

  return filteredData;
};

/**
 * Fetches regional data for a specific KPI
 * @param {string} kpiId - The ID of the KPI
 * @returns {Promise} - Promise that resolves to regional data
 */
export const fetchRegionalData = (kpiId) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // In a real app, this would be an API call
        // For now, we're using the imported regional data
        const data = getRegionalData(kpiId);

        if (!data) {
          throw new Error(`No regional data found for KPI: ${kpiId}`);
        }

        resolve(data);
      } catch (error) {
        console.error('Error fetching regional data:', error);
        reject(error.message || 'Failed to load regional data');
      }
    }, 500);
  });
};

/**
 * Transforms raw KPI data into the format needed by dashboard components
 * @param {Object} data - The raw dashboard data
 * @returns {Object} - Transformed data for dashboard components
 */
export const transformDashboardData = (data) => {
  if (!data || !data.kpis) return null;

  // Find the main KPI for the hero component (using freight_budget_actual)
  const heroKPI = data.kpis.find(kpi => kpi.id === 'freight_budget_actual');

  // Get the remaining KPIs for secondary components
  const secondaryKPIs = data.kpis.filter(kpi => kpi.id !== 'freight_budget_actual')
    .map(kpi => ({
      id: kpi.id,
      title: kpi.label,
      value: formatKPIValue(kpi.value, kpi.unit),
      target: kpi.target ? formatKPIValue(kpi.target, kpi.unit) : 'N/A',
      color: kpi.color,
      unit: kpi.unit,
      trend: kpi.trend || []
    }));

  // Transform hero KPI data
  const transformedHeroKPI = heroKPI ? {
    title: heroKPI.label,
    actual: formatKPIValue(heroKPI.value, heroKPI.unit),
    projected: heroKPI.projected ? formatKPIValue(heroKPI.projected, heroKPI.unit) : 'N/A',
    budget: formatKPIValue(heroKPI.budget, heroKPI.unit),
    color: heroKPI.color,
    unit: heroKPI.unit,
    chartData: transformChartData(heroKPI.trend)
  } : null;

  return {
    lastUpdated: data.lastUpdated,
    heroKPI: transformedHeroKPI,
    secondaryKPIs,
    lineChartKPIs: []  // Will be populated in future phases
  };
};

/**
 * Formats KPI values with appropriate units
 * @param {number} value - The raw KPI value
 * @param {string} unit - The unit of measurement
 * @returns {string} - Formatted KPI value with unit
 */
const formatKPIValue = (value, unit) => {
  if (value === undefined || value === null) return 'N/A';

  // Format based on unit
  switch (unit) {
    case 'INR':
      return `₹${formatNumber(value)}`;
    case '%':
      return `${value}%`;
    case 'INR/km':
      return `₹${value}/km`;
    default:
      return `${value} ${unit}`;
  }
};

/**
 * Formats large numbers with commas
 * @param {number} num - The number to format
 * @returns {string} - Formatted number with commas
 */
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Transforms trend data into chart data format
 * @param {Array} trend - Array of trend values
 * @returns {Array} - Formatted chart data
 */
const transformChartData = (trend) => {
  if (!trend || !Array.isArray(trend)) return [];

  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return trend.map((value, index) => ({
    month: months[index % months.length],
    value: value,
    // Alternate colors for visual distinction
    color: index % 2 === 0 ? '#FF3533' : '#838C9D'
  }));
};
