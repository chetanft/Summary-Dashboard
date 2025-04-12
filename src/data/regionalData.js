/**
 * Regional KPI data for drill-down functionality
 * Contains performance data for different regions and branches
 */

export const regionalData = {
  // Freight Budget vs Actual regional data
  freight_budget_actual: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 245000,
        budget: 300000,
        performance: 'good', // good, average, poor
        branches: [
          { id: 'delhi', name: 'Delhi', value: 98000, budget: 120000, performance: 'good' },
          { id: 'chandigarh', name: 'Chandigarh', value: 75000, budget: 90000, performance: 'good' },
          { id: 'jaipur', name: 'Jaipur', value: 72000, budget: 90000, performance: 'good' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 210000,
        budget: 200000,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 85000, budget: 70000, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 75000, budget: 70000, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 50000, budget: 60000, performance: 'good' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 180000,
        budget: 220000,
        performance: 'good',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 90000, budget: 110000, performance: 'good' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 50000, budget: 60000, performance: 'good' },
          { id: 'patna', name: 'Patna', value: 40000, budget: 50000, performance: 'good' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 251095,
        budget: 280000,
        performance: 'good',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 120000, budget: 130000, performance: 'good' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 76095, budget: 90000, performance: 'good' },
          { id: 'pune', name: 'Pune', value: 55000, budget: 60000, performance: 'good' }
        ]
      }
    ]
  },
  
  // Freight Cost per KM regional data
  freight_cost_per_km: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 5.2,
        target: 5.0,
        performance: 'average',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 5.5, target: 5.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 4.9, target: 5.0, performance: 'good' },
          { id: 'jaipur', name: 'Jaipur', value: 5.2, target: 5.0, performance: 'average' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 5.7,
        target: 5.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 6.1, target: 5.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 5.8, target: 5.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 5.2, target: 5.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 5.3,
        target: 5.0,
        performance: 'average',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 5.4, target: 5.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 5.2, target: 5.0, performance: 'average' },
          { id: 'patna', name: 'Patna', value: 5.3, target: 5.0, performance: 'average' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 5.8,
        target: 5.0,
        performance: 'poor',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 6.2, target: 5.0, performance: 'poor' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 5.7, target: 5.0, performance: 'poor' },
          { id: 'pune', name: 'Pune', value: 5.5, target: 5.0, performance: 'poor' }
        ]
      }
    ]
  },
  
  // Vehicle Utilization regional data
  vehicle_utilization: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 68.5,
        target: 85.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 72.3, target: 85.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 65.8, target: 85.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 67.4, target: 85.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 61.2,
        target: 85.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 63.5, target: 85.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 58.7, target: 85.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 61.4, target: 85.0, performance: 'poor' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 59.8,
        target: 85.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 62.1, target: 85.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 57.5, target: 85.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 59.8, target: 85.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 67.3,
        target: 85.0,
        performance: 'poor',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 71.2, target: 85.0, performance: 'poor' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 65.8, target: 85.0, performance: 'poor' },
          { id: 'pune', name: 'Pune', value: 64.9, target: 85.0, performance: 'poor' }
        ]
      }
    ]
  },
  
  // OTIF % regional data
  otif_percentage: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 88.2,
        target: 95.0,
        performance: 'average',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 90.5, target: 95.0, performance: 'average' },
          { id: 'chandigarh', name: 'Chandigarh', value: 87.3, target: 95.0, performance: 'average' },
          { id: 'jaipur', name: 'Jaipur', value: 86.8, target: 95.0, performance: 'average' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 85.1,
        target: 95.0,
        performance: 'average',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 87.2, target: 95.0, performance: 'average' },
          { id: 'chennai', name: 'Chennai', value: 84.5, target: 95.0, performance: 'average' },
          { id: 'hyderabad', name: 'Hyderabad', value: 83.6, target: 95.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 83.7,
        target: 95.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 85.3, target: 95.0, performance: 'average' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 82.1, target: 95.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 83.7, target: 95.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 89.4,
        target: 95.0,
        performance: 'average',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 91.8, target: 95.0, performance: 'average' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 88.5, target: 95.0, performance: 'average' },
          { id: 'pune', name: 'Pune', value: 87.9, target: 95.0, performance: 'average' }
        ]
      }
    ]
  },
  
  // Placement Efficiency regional data
  placement_efficiency: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 76.8,
        target: 90.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 79.2, target: 90.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 75.6, target: 90.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 75.6, target: 90.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 71.3,
        target: 90.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 73.5, target: 90.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 70.2, target: 90.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 70.2, target: 90.0, performance: 'poor' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 69.8,
        target: 90.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 72.1, target: 90.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 68.5, target: 90.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 68.8, target: 90.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 76.5,
        target: 90.0,
        performance: 'poor',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 79.2, target: 90.0, performance: 'poor' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 75.8, target: 90.0, performance: 'poor' },
          { id: 'pune', name: 'Pune', value: 74.5, target: 90.0, performance: 'poor' }
        ]
      }
    ]
  }
};

/**
 * Get regional data for a specific KPI
 * @param {string} kpiId - The ID of the KPI
 * @returns {Object} - Regional data for the KPI
 */
export const getRegionalData = (kpiId) => {
  return regionalData[kpiId] || null;
};

/**
 * Get top and worst performing regions for a KPI
 * @param {string} kpiId - The ID of the KPI
 * @returns {Object} - Object containing top and worst performing regions
 */
export const getPerformanceData = (kpiId) => {
  const data = regionalData[kpiId];
  if (!data || !data.regions || data.regions.length === 0) {
    return { top: [], worst: [] };
  }

  // Sort regions by performance
  const sortedRegions = [...data.regions].sort((a, b) => {
    // For budget vs actual, lower is better (under budget)
    if (kpiId === 'freight_budget_actual') {
      const aRatio = a.value / a.budget;
      const bRatio = b.value / b.budget;
      return aRatio - bRatio;
    }
    
    // For cost per km, lower is better
    if (kpiId === 'freight_cost_per_km') {
      return a.value - b.value;
    }
    
    // For others (utilization, OTIF, placement), higher is better
    return b.value - a.value;
  });

  // Get top 2 and worst 2 regions
  const top = sortedRegions.slice(0, 2);
  const worst = sortedRegions.slice(-2).reverse();

  return { top, worst };
};

/**
 * Get branch data for a specific region and KPI
 * @param {string} kpiId - The ID of the KPI
 * @param {string} regionId - The ID of the region
 * @returns {Array} - Branch data for the region
 */
export const getBranchData = (kpiId, regionId) => {
  const data = regionalData[kpiId];
  if (!data || !data.regions) {
    return [];
  }

  const region = data.regions.find(r => r.id === regionId);
  return region ? region.branches : [];
};

/**
 * Get top and worst performing branches for a region and KPI
 * @param {string} kpiId - The ID of the KPI
 * @param {string} regionId - The ID of the region
 * @returns {Object} - Object containing top and worst performing branches
 */
export const getBranchPerformanceData = (kpiId, regionId) => {
  const branches = getBranchData(kpiId, regionId);
  if (!branches || branches.length === 0) {
    return { top: [], worst: [] };
  }

  // Sort branches by performance
  const sortedBranches = [...branches].sort((a, b) => {
    // For budget vs actual, lower is better (under budget)
    if (kpiId === 'freight_budget_actual') {
      const aRatio = a.value / a.budget;
      const bRatio = b.value / b.budget;
      return aRatio - bRatio;
    }
    
    // For cost per km, lower is better
    if (kpiId === 'freight_cost_per_km') {
      return a.value - b.value;
    }
    
    // For others (utilization, OTIF, placement), higher is better
    return b.value - a.value;
  });

  // Get top and worst branches (up to 2 each)
  const top = sortedBranches.slice(0, Math.min(2, sortedBranches.length));
  const worst = sortedBranches.slice(-Math.min(2, sortedBranches.length)).reverse();

  return { top, worst };
};
