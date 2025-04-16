/**
 * Data generators for KPI drilldown views
 * These functions generate sample data for different drilldown types
 */

// Generate sample vehicle type data for branch view
export const generateVehicleTypeData = (kpiId) => {
  return {
    top: [
      { id: 'vt-1', type: 'LCV', count: 15, utilization: 72, performance: 'average' },
      { id: 'vt-2', type: 'HCV', count: 8, utilization: 85, performance: 'good' },
    ],
    worst: [
      { id: 'vt-3', type: 'Trailer', count: 12, utilization: 65, performance: 'poor' },
      { id: 'vt-4', type: 'Container', count: 5, utilization: 58, performance: 'poor' },
    ]
  };
};

// Generate sample route type data for branch view
export const generateRouteTypeData = (kpiId) => {
  return {
    top: [
      { id: 'rt-1', type: 'Long Haul', count: 12, costPerKm: 5.2, performance: 'average' },
      { id: 'rt-3', type: 'City Distribution', count: 25, costPerKm: 4.5, performance: 'good' },
    ],
    worst: [
      { id: 'rt-2', type: 'Short Haul', count: 18, costPerKm: 6.8, performance: 'poor' },
      { id: 'rt-4', type: 'Last Mile', count: 30, costPerKm: 7.2, performance: 'poor' },
    ]
  };
};

// Generate sample transporter data for branch view
export const generateTransporterData = (kpiId) => {
  return {
    top: [
      { id: 'trans-1', name: 'Express Logistics', orders: 15, onTime: 13, performance: 'good' },
      { id: 'trans-3', name: 'Reliable Transport', orders: 12, onTime: 10, performance: 'good' },
    ],
    worst: [
      { id: 'trans-2', name: 'Swift Carriers', orders: 8, onTime: 5, performance: 'poor' },
      { id: 'trans-4', name: 'Fast Freight', orders: 5, onTime: 3, performance: 'poor' },
    ]
  };
};

// Generate sample branch data with vehicle types for company view
export const generateBranchVehicleTypeData = (regionId) => {
  return {
    top: [
      { id: 'branch-1', name: 'Delhi', vehicleTypes: 4, utilization: 72, performance: 'average' },
      { id: 'branch-2', name: 'Mumbai', vehicleTypes: 5, utilization: 85, performance: 'good' },
    ],
    worst: [
      { id: 'branch-3', name: 'Bangalore', vehicleTypes: 3, utilization: 65, performance: 'poor' },
      { id: 'branch-4', name: 'Chennai', vehicleTypes: 4, utilization: 58, performance: 'poor' },
    ]
  };
};

// Generate sample branch data with transporters for company view
export const generateBranchTransporterData = (regionId) => {
  return {
    top: [
      { id: 'branch-1', name: 'Delhi', transporters: 8, onTime: 85, performance: 'good' },
      { id: 'branch-2', name: 'Mumbai', transporters: 6, onTime: 72, performance: 'average' },
    ],
    worst: [
      { id: 'branch-3', name: 'Bangalore', transporters: 5, onTime: 65, performance: 'poor' },
      { id: 'branch-4', name: 'Chennai', transporters: 7, onTime: 58, performance: 'poor' },
    ]
  };
};

// Generate sample order data for specific KPIs
export const generateSampleOrderData = (kpiId) => {
  return [
    {
      id: 'SO: 21424',
      customer: 'ABC Industries',
      route: 'Delhi - Mumbai',
      status: 'In Transit',
      performance: 'good'
    },
    {
      id: 'SO: 21425',
      customer: 'XYZ Corp',
      route: 'Bangalore - Chennai',
      status: 'Delayed',
      performance: 'poor'
    },
    {
      id: 'SO: 21426',
      customer: 'PQR Ltd',
      route: 'Mumbai - Pune',
      status: 'On Time',
      performance: 'good'
    },
    {
      id: 'SO: 21427',
      customer: 'LMN Enterprises',
      route: 'Delhi - Jaipur',
      status: 'Delayed',
      performance: 'poor'
    }
  ];
};
