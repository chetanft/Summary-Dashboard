/**
 * User role utility functions for transforming data based on user role
 */

/**
 * Transform data based on user role
 * 
 * @param {Object} data - Data to transform
 * @param {string} userRole - User role ('cxo', 'company', 'branch')
 * @returns {Object} - Transformed data
 */
export const transformDataForUserRole = (data, userRole) => {
  switch(userRole) {
    case 'cxo':
      return transformForCXO(data);
    case 'company':
      return transformForCompany(data);
    case 'branch':
      return transformForBranch(data);
    default:
      return data;
  }
};

/**
 * Transform data for CXO role
 * 
 * @param {Object} data - Data to transform
 * @returns {Object} - Transformed data
 */
const transformForCXO = (data) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));
  
  // Apply CXO-specific transformations
  // For example, show aggregated data across all branches
  
  // Example: Scale up values for company-wide view
  if (result.planning && result.planning.totalOrders) {
    result.planning.totalOrders.value = 1000; // Example value for CXO
    result.planning.totalOrders.breakdown = {
      planned: { value: 104, percentage: 10.4 },
      partiallyPlanned: { value: 204, percentage: 20.4 },
      unplanned: { value: 692, percentage: 69.2 }
    };
  }
  
  if (result.planning && result.planning.plannedLogisticCost) {
    result.planning.plannedLogisticCost.value = 21.71; // Example value for CXO
  }
  
  return result;
};

/**
 * Transform data for Company role
 * 
 * @param {Object} data - Data to transform
 * @returns {Object} - Transformed data
 */
const transformForCompany = (data) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));
  
  // Apply company-specific transformations
  // For example, show aggregated data for a specific company
  
  // Example: Scale down values for company-level view
  if (result.planning && result.planning.totalOrders) {
    result.planning.totalOrders.value = 750; // Example value for Company
    result.planning.totalOrders.breakdown = {
      planned: { value: 78, percentage: 10.4 },
      partiallyPlanned: { value: 153, percentage: 20.4 },
      unplanned: { value: 519, percentage: 69.2 }
    };
  }
  
  if (result.planning && result.planning.plannedLogisticCost) {
    result.planning.plannedLogisticCost.value = 16.28; // Example value for Company
  }
  
  return result;
};

/**
 * Transform data for Branch role
 * 
 * @param {Object} data - Data to transform
 * @returns {Object} - Transformed data
 */
const transformForBranch = (data) => {
  // Deep clone to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));
  
  // Apply branch-specific transformations
  // For example, show data only for a specific branch
  
  // Example: Scale down values for branch-level view
  if (result.planning && result.planning.totalOrders) {
    result.planning.totalOrders.value = 250; // Example value for Branch
    result.planning.totalOrders.breakdown = {
      planned: { value: 26, percentage: 10.4 },
      partiallyPlanned: { value: 51, percentage: 20.4 },
      unplanned: { value: 173, percentage: 69.2 }
    };
  }
  
  if (result.planning && result.planning.plannedLogisticCost) {
    result.planning.plannedLogisticCost.value = 5.43; // Example value for Branch
  }
  
  return result;
};
