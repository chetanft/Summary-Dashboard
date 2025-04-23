# Operational Dashboard Service Documentation

## Overview

The `operationalDashboardService.js` file provides functions for fetching and transforming operational dashboard data. It is responsible for retrieving data from the backend, applying filters, and transforming the data based on user role, location, and search term.

## Functions

### getOperationalDashboardData

```javascript
/**
 * Get operational dashboard data with appropriate filtering and transformations
 * 
 * @param {string} userRole - User role ('cxo', 'company', 'branch')
 * @param {string} location - Selected location
 * @param {string} searchTerm - Search term for filtering
 * @returns {Promise<Object>} - Dashboard data
 */
export const getOperationalDashboardData = async (userRole = 'cxo', location = null, searchTerm = '') => {
  // ...
};
```

This function is the main entry point for fetching operational dashboard data. It takes the following parameters:

- `userRole`: The user role ('cxo', 'company', 'branch'). Defaults to 'cxo'.
- `location`: The selected location. Defaults to null.
- `searchTerm`: The search term for filtering. Defaults to an empty string.

It returns a Promise that resolves to the dashboard data.

The function performs the following steps:

1. Simulates an API delay.
2. Gets the base data from the mock data files.
3. Applies time-based filtering to the data.
4. Applies user role transformations to the data.
5. Applies location filtering to the data if a location is provided.
6. Applies search filtering to the data if a search term is provided.
7. Returns the filtered and transformed data.

### applyTimeFiltering

```javascript
/**
 * Apply time-based filtering to dashboard data
 * 
 * @param {Object} data - Dashboard data
 * @returns {Object} - Filtered data
 */
const applyTimeFiltering = (data) => {
  // ...
};
```

This function applies time-based filtering to the dashboard data. It takes the following parameter:

- `data`: The dashboard data to filter.

It returns the filtered data.

The function performs the following steps:

1. Creates a deep clone of the data to avoid modifying the original data.
2. Applies month-to-date filtering for Planning, Pre-Dispatch, and In-Transit sections.
3. Applies last six months filtering for the Post-Delivery section.
4. Returns the filtered data.

### filterDataByDateRange

```javascript
/**
 * Filter data by date range
 * 
 * @param {Object} data - Data to filter
 * @param {Object} dateRange - Date range { start, end }
 * @returns {Object} - Filtered data
 */
const filterDataByDateRange = (data, dateRange) => {
  // ...
};
```

This function filters data by date range. It takes the following parameters:

- `data`: The data to filter.
- `dateRange`: The date range to filter by, with `start` and `end` properties.

It returns the filtered data.

The function performs the following steps:

1. Creates a deep clone of the data to avoid modifying the original data.
2. Filters trend charts and other time-based data based on the date range.
3. Returns the filtered data.

### filterDataByLocation

```javascript
/**
 * Filter data by location
 * 
 * @param {Object} data - Data to filter
 * @param {string} location - Location to filter by
 * @returns {Object} - Filtered data
 */
const filterDataByLocation = (data, location) => {
  // ...
};
```

This function filters data by location. It takes the following parameters:

- `data`: The data to filter.
- `location`: The location to filter by.

It returns the filtered data.

The function performs the following steps:

1. Creates a deep clone of the data to avoid modifying the original data.
2. Adjusts values based on the location.
3. Returns the filtered data.

### filterDataBySearchTerm

```javascript
/**
 * Filter data by search term
 * 
 * @param {Object} data - Data to filter
 * @param {string} searchTerm - Search term to filter by
 * @returns {Object} - Filtered data
 */
const filterDataBySearchTerm = (data, searchTerm) => {
  // ...
};
```

This function filters data by search term. It takes the following parameters:

- `data`: The data to filter.
- `searchTerm`: The search term to filter by.

It returns the filtered data.

The function performs the following steps:

1. Creates a deep clone of the data to avoid modifying the original data.
2. In a real application, it would filter the data based on the search term.
3. Returns the filtered data.

## Usage

```javascript
import { getOperationalDashboardData } from '../../services/operationalDashboardService';

// In a React component
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from service
      const dashboardData = await getOperationalDashboardData(userRole, location, searchTerm);
      setData(dashboardData);
      setError(null);
    } catch (err) {
      console.error('Error loading KPI data:', err);
      setError('Failed to load KPI data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a small delay for search to avoid too many requests
  const searchTimer = setTimeout(() => {
    loadData();
  }, searchTerm ? 500 : 0);

  return () => clearTimeout(searchTimer);
}, [userRole, location, searchTerm]);
```

## Dependencies

The `operationalDashboardService.js` file depends on the following files:

- `dateUtils.js`: Provides functions for working with dates.
- `userRoleUtils.js`: Provides functions for transforming data based on user role.
- `planningKpiData.js`: Provides mock data for planning KPIs.
- `preDispatchKpiData.js`: Provides mock data for pre-dispatch KPIs.
- `inTransitKpiData.js`: Provides mock data for in-transit KPIs.
- `postDeliveryKpiData.js`: Provides mock data for post-delivery KPIs.

## Best Practices

1. **Error Handling**: Handle errors gracefully and provide meaningful error messages.
2. **Performance**: Optimize performance by minimizing the number of API calls and using efficient filtering and transformation functions.
3. **Caching**: Consider implementing caching to reduce the number of API calls.
4. **Testing**: Write unit tests for the service functions to ensure they work as expected.
5. **Documentation**: Document the service functions and their parameters to make it easier for other developers to use them.

## Future Enhancements

1. **Real API Integration**: Replace the mock data with real API calls.
2. **Pagination**: Implement pagination for large datasets.
3. **Sorting**: Implement sorting for tabular data.
4. **Filtering**: Enhance filtering capabilities to support more complex filters.
5. **Caching**: Implement caching to reduce the number of API calls.
6. **Error Handling**: Enhance error handling to provide more detailed error messages.
7. **Logging**: Implement logging to track API calls and errors.
8. **Performance Monitoring**: Implement performance monitoring to track API call performance.
9. **Authentication**: Implement authentication to secure API calls.
10. **Authorization**: Implement authorization to restrict access to certain data based on user role.
