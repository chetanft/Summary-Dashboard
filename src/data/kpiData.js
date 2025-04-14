// Sample KPI data for the dashboard
// Common KPI data that will be used for all user roles
const commonKpis = [

  {
    id: 'revenue',
    title: 'Total Revenue',
    value: 12500000,
    target: 15000000,
    unit: 'currency',
    color: '#1890FF',
    trend: [10200000, 11000000, 11500000, 12000000, 12500000],
    chartData: [
      { month: 'Jan', value: 10200000 },
      { month: 'Feb', value: 11000000 },
      { month: 'Mar', value: 11500000 },
      { month: 'Apr', value: 12000000 },
      { month: 'May', value: 12500000 },
    ],
    drilldownData: {
      title: 'Revenue by Region',
      data: [
        { name: 'North', value: 4500000 },
        { name: 'South', value: 3200000 },
        { name: 'East', value: 2800000 },
        { name: 'West', value: 2000000 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 1800000 },
          { name: 'Chandigarh', value: 1200000 },
          { name: 'Lucknow', value: 900000 },
          { name: 'Jaipur', value: 600000 },
        ],
        'South': [
          { name: 'Bangalore', value: 1100000 },
          { name: 'Chennai', value: 900000 },
          { name: 'Hyderabad', value: 700000 },
          { name: 'Kochi', value: 500000 },
        ],
        'East': [
          { name: 'Kolkata', value: 1000000 },
          { name: 'Bhubaneswar', value: 700000 },
          { name: 'Guwahati', value: 600000 },
          { name: 'Patna', value: 500000 },
        ],
        'West': [
          { name: 'Mumbai', value: 800000 },
          { name: 'Ahmedabad', value: 500000 },
          { name: 'Pune', value: 400000 },
          { name: 'Surat', value: 300000 },
        ],
      }
    }
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: 8500,
    target: 10000,
    unit: 'number',
    color: '#52C41A',
    trend: [7200, 7600, 7900, 8200, 8500],
    chartData: [
      { month: 'Jan', value: 7200 },
      { month: 'Feb', value: 7600 },
      { month: 'Mar', value: 7900 },
      { month: 'Apr', value: 8200 },
      { month: 'May', value: 8500 },
    ],
    drilldownData: {
      title: 'Orders by Region',
      data: [
        { name: 'North', value: 2800 },
        { name: 'South', value: 2300 },
        { name: 'East', value: 1900 },
        { name: 'West', value: 1500 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 1100 },
          { name: 'Chandigarh', value: 700 },
          { name: 'Lucknow', value: 600 },
          { name: 'Jaipur', value: 400 },
        ],
        'South': [
          { name: 'Bangalore', value: 800 },
          { name: 'Chennai', value: 600 },
          { name: 'Hyderabad', value: 500 },
          { name: 'Kochi', value: 400 },
        ],
        'East': [
          { name: 'Kolkata', value: 700 },
          { name: 'Bhubaneswar', value: 500 },
          { name: 'Guwahati', value: 400 },
          { name: 'Patna', value: 300 },
        ],
        'West': [
          { name: 'Mumbai', value: 600 },
          { name: 'Ahmedabad', value: 400 },
          { name: 'Pune', value: 300 },
          { name: 'Surat', value: 200 },
        ],
      }
    }
  },
  {
    id: 'tonnage',
    title: 'Total Tonnage',
    value: 42500,
    target: 50000,
    unit: 'tonnage',
    color: '#722ED1',
    trend: [36000, 38000, 39500, 41000, 42500],
    chartData: [
      { month: 'Jan', value: 36000 },
      { month: 'Feb', value: 38000 },
      { month: 'Mar', value: 39500 },
      { month: 'Apr', value: 41000 },
      { month: 'May', value: 42500 },
    ],
    drilldownData: {
      title: 'Tonnage by Region',
      data: [
        { name: 'North', value: 14000 },
        { name: 'South', value: 12000 },
        { name: 'East', value: 9500 },
        { name: 'West', value: 7000 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 5500 },
          { name: 'Chandigarh', value: 3500 },
          { name: 'Lucknow', value: 3000 },
          { name: 'Jaipur', value: 2000 },
        ],
        'South': [
          { name: 'Bangalore', value: 4000 },
          { name: 'Chennai', value: 3500 },
          { name: 'Hyderabad', value: 2500 },
          { name: 'Kochi', value: 2000 },
        ],
        'East': [
          { name: 'Kolkata', value: 3500 },
          { name: 'Bhubaneswar', value: 2500 },
          { name: 'Guwahati', value: 2000 },
          { name: 'Patna', value: 1500 },
        ],
        'West': [
          { name: 'Mumbai', value: 3000 },
          { name: 'Ahmedabad', value: 1500 },
          { name: 'Pune', value: 1500 },
          { name: 'Surat', value: 1000 },
        ],
      }
    }
  },
  {
    id: 'ontime',
    title: 'On-Time Delivery',
    value: 87.5,
    target: 95,
    unit: 'percentage',
    color: '#FA8C16',
    trend: [82, 83.5, 85, 86.2, 87.5],
    chartData: [
      { month: 'Jan', value: 82 },
      { month: 'Feb', value: 83.5 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 86.2 },
      { month: 'May', value: 87.5 },
    ],
    drilldownData: {
      title: 'On-Time Delivery by Region',
      data: [
        { name: 'North', value: 89 },
        { name: 'South', value: 91 },
        { name: 'East', value: 85 },
        { name: 'West', value: 86 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 90 },
          { name: 'Chandigarh', value: 92 },
          { name: 'Lucknow', value: 87 },
          { name: 'Jaipur', value: 88 },
        ],
        'South': [
          { name: 'Bangalore', value: 93 },
          { name: 'Chennai', value: 92 },
          { name: 'Hyderabad', value: 90 },
          { name: 'Kochi', value: 89 },
        ],
        'East': [
          { name: 'Kolkata', value: 86 },
          { name: 'Bhubaneswar', value: 85 },
          { name: 'Guwahati', value: 84 },
          { name: 'Patna', value: 83 },
        ],
        'West': [
          { name: 'Mumbai', value: 88 },
          { name: 'Ahmedabad', value: 87 },
          { name: 'Pune', value: 86 },
          { name: 'Surat', value: 85 },
        ],
      }
    }
  },
  {
    id: 'utilization',
    title: 'Fleet Utilization',
    value: 78.3,
    target: 85,
    unit: 'percentage',
    color: '#13C2C2',
    trend: [72, 74, 75.5, 77, 78.3],
    chartData: [
      { month: 'Jan', value: 72 },
      { month: 'Feb', value: 74 },
      { month: 'Mar', value: 75.5 },
      { month: 'Apr', value: 77 },
      { month: 'May', value: 78.3 },
    ],
    drilldownData: {
      title: 'Fleet Utilization by Region',
      data: [
        { name: 'North', value: 80 },
        { name: 'South', value: 82 },
        { name: 'East', value: 76 },
        { name: 'West', value: 75 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 82 },
          { name: 'Chandigarh', value: 81 },
          { name: 'Lucknow', value: 79 },
          { name: 'Jaipur', value: 78 },
        ],
        'South': [
          { name: 'Bangalore', value: 84 },
          { name: 'Chennai', value: 83 },
          { name: 'Hyderabad', value: 81 },
          { name: 'Kochi', value: 80 },
        ],
        'East': [
          { name: 'Kolkata', value: 78 },
          { name: 'Bhubaneswar', value: 76 },
          { name: 'Guwahati', value: 75 },
          { name: 'Patna', value: 74 },
        ],
        'West': [
          { name: 'Mumbai', value: 77 },
          { name: 'Ahmedabad', value: 76 },
          { name: 'Pune', value: 74 },
          { name: 'Surat', value: 73 },
        ],
      }
    }
  },
  {
    id: 'cost',
    title: 'Cost per KM',
    value: 42.5,
    target: 40,
    unit: 'currency',
    color: '#F5222D',
    trend: [45, 44.5, 43.8, 43, 42.5],
    chartData: [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 44.5 },
      { month: 'Mar', value: 43.8 },
      { month: 'Apr', value: 43 },
      { month: 'May', value: 42.5 },
    ],
    drilldownData: {
      title: 'Cost per KM by Region',
      data: [
        { name: 'North', value: 41 },
        { name: 'South', value: 40 },
        { name: 'East', value: 44 },
        { name: 'West', value: 45 },
      ],
      branchData: {
        'North': [
          { name: 'Delhi', value: 40 },
          { name: 'Chandigarh', value: 41 },
          { name: 'Lucknow', value: 42 },
          { name: 'Jaipur', value: 41 },
        ],
        'South': [
          { name: 'Bangalore', value: 39 },
          { name: 'Chennai', value: 40 },
          { name: 'Hyderabad', value: 41 },
          { name: 'Kochi', value: 40 },
        ],
        'East': [
          { name: 'Kolkata', value: 43 },
          { name: 'Bhubaneswar', value: 44 },
          { name: 'Guwahati', value: 45 },
          { name: 'Patna', value: 44 },
        ],
        'West': [
          { name: 'Mumbai', value: 44 },
          { name: 'Ahmedabad', value: 45 },
          { name: 'Pune', value: 46 },
          { name: 'Surat', value: 45 },
        ],
      }
    }
  }
];

// Export KPI data with the structure expected by dataService.js
export const kpiData = {
  cxo: {
    budgetedVsActual: {
      value: 85,
      target: 90,
      trend: +2
    },
    vehicleUtilization: {
      value: 78,
      target: 85,
      trend: -1
    },
    freightCost: {
      value: 42,
      target: 40,
      trend: +1
    },
    placementEfficiency: {
      value: 92,
      target: 95,
      trend: +3
    },
    orderDeliveryTime: {
      value: 3.2,
      target: 3.0,
      trend: -0.1
    },
    otif: {
      value: 88,
      target: 95,
      trend: +1
    },
    delayedDelivery: {
      value: 15,
      target: 10,
      trend: -2
    },
    pendingDispatched: {
      value: 25,
      target: 20,
      trend: -3
    },
    deliveredRunningDelayed: {
      value: 12,
      target: 8,
      trend: -1
    }
  },
  company: {
    budgetedVsActual: {
      value: 82,
      target: 90,
      trend: +1
    },
    vehicleUtilization: {
      value: 75,
      target: 85,
      trend: -2
    },
    freightCost: {
      value: 44,
      target: 40,
      trend: +2
    },
    placementEfficiency: {
      value: 90,
      target: 95,
      trend: +2
    },
    orderDeliveryTime: {
      value: 3.4,
      target: 3.0,
      trend: -0.2
    },
    otif: {
      value: 85,
      target: 95,
      trend: +1
    },
    delayedDelivery: {
      value: 18,
      target: 10,
      trend: -1
    },
    pendingDispatched: {
      value: 28,
      target: 20,
      trend: -2
    },
    deliveredRunningDelayed: {
      value: 14,
      target: 8,
      trend: -1
    }
  },
  branch: {
    budgetedVsActual: {
      value: 80,
      target: 90,
      trend: +1
    },
    vehicleUtilization: {
      value: 72,
      target: 85,
      trend: -3
    },
    freightCost: {
      value: 46,
      target: 40,
      trend: +3
    },
    placementEfficiency: {
      value: 88,
      target: 95,
      trend: +1
    },
    orderDeliveryTime: {
      value: 3.6,
      target: 3.0,
      trend: -0.3
    },
    otif: {
      value: 82,
      target: 95,
      trend: +1
    },
    delayedDelivery: {
      value: 20,
      target: 10,
      trend: -1
    },
    pendingDispatched: {
      value: 30,
      target: 20,
      trend: -1
    },
    deliveredRunningDelayed: {
      value: 16,
      target: 8,
      trend: -1
    }
  }
};
