/**
 * Regional KPI data for drill-down functionality
 * Contains performance data for different regions and branches
 */

export const regionalData = {
  // Budgeted vs Actual vs Projected Freight regional data
  budgeted_vs_actual_freight: {
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
  },

  // Order to Delivery Time regional data
  order_delivery_time: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 4.2,
        target: 3.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 4.5, target: 3.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 4.1, target: 3.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 4.0, target: 3.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 3.8,
        target: 3.0,
        performance: 'average',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 3.9, target: 3.0, performance: 'average' },
          { id: 'chennai', name: 'Chennai', value: 3.7, target: 3.0, performance: 'average' },
          { id: 'hyderabad', name: 'Hyderabad', value: 3.8, target: 3.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 4.5,
        target: 3.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 4.7, target: 3.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 4.4, target: 3.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 4.4, target: 3.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 3.5,
        target: 3.0,
        performance: 'average',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 3.3, target: 3.0, performance: 'average' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 3.6, target: 3.0, performance: 'average' },
          { id: 'pune', name: 'Pune', value: 3.6, target: 3.0, performance: 'average' }
        ]
      }
    ]
  },

  // Delayed Delivery % regional data
  delayed_delivery: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 12.5,
        target: 2.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 11.8, target: 2.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 13.2, target: 2.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 12.5, target: 2.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 9.8,
        target: 2.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 8.5, target: 2.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 10.2, target: 2.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 10.7, target: 2.0, performance: 'poor' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 14.2,
        target: 2.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 13.5, target: 2.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 14.8, target: 2.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 14.3, target: 2.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 8.2,
        target: 2.0,
        performance: 'poor',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 7.5, target: 2.0, performance: 'poor' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 8.7, target: 2.0, performance: 'poor' },
          { id: 'pune', name: 'Pune', value: 8.4, target: 2.0, performance: 'poor' }
        ]
      }
    ]
  },

  // Pending Dispatched regional data
  pending_dispatched: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 22.5,
        target: 10.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 21.8, target: 10.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 23.2, target: 10.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 22.5, target: 10.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 25.8,
        target: 10.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 24.5, target: 10.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 26.2, target: 10.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 26.7, target: 10.0, performance: 'poor' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 27.2,
        target: 10.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 26.5, target: 10.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 27.8, target: 10.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 27.3, target: 10.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 20.2,
        target: 10.0,
        performance: 'poor',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 19.5, target: 10.0, performance: 'poor' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 20.7, target: 10.0, performance: 'poor' },
          { id: 'pune', name: 'Pune', value: 20.4, target: 10.0, performance: 'poor' }
        ]
      }
    ]
  },

  // Delivered vs Running Delayed regional data
  delivered_vs_running_delayed: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 45.5,
        target: 10.0,
        performance: 'good',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 46.8, target: 10.0, performance: 'good' },
          { id: 'chandigarh', name: 'Chandigarh', value: 44.2, target: 10.0, performance: 'good' },
          { id: 'jaipur', name: 'Jaipur', value: 45.5, target: 10.0, performance: 'good' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 42.8,
        target: 10.0,
        performance: 'good',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 43.5, target: 10.0, performance: 'good' },
          { id: 'chennai', name: 'Chennai', value: 42.2, target: 10.0, performance: 'good' },
          { id: 'hyderabad', name: 'Hyderabad', value: 42.7, target: 10.0, performance: 'good' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 40.2,
        target: 10.0,
        performance: 'good',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 41.5, target: 10.0, performance: 'good' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 39.8, target: 10.0, performance: 'good' },
          { id: 'patna', name: 'Patna', value: 39.3, target: 10.0, performance: 'good' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 48.2,
        target: 10.0,
        performance: 'good',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 49.5, target: 10.0, performance: 'good' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 47.7, target: 10.0, performance: 'good' },
          { id: 'pune', name: 'Pune', value: 47.4, target: 10.0, performance: 'good' }
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
        value: 82.5,
        target: 96.0,
        performance: 'average',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 84.8, target: 96.0, performance: 'average' },
          { id: 'chandigarh', name: 'Chandigarh', value: 81.2, target: 96.0, performance: 'average' },
          { id: 'jaipur', name: 'Jaipur', value: 81.5, target: 96.0, performance: 'average' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 85.8,
        target: 96.0,
        performance: 'average',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 86.5, target: 96.0, performance: 'average' },
          { id: 'chennai', name: 'Chennai', value: 85.2, target: 96.0, performance: 'average' },
          { id: 'hyderabad', name: 'Hyderabad', value: 85.7, target: 96.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 79.2,
        target: 96.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 80.5, target: 96.0, performance: 'average' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 78.8, target: 96.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 78.3, target: 96.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 88.2,
        target: 96.0,
        performance: 'good',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 89.5, target: 96.0, performance: 'good' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 87.7, target: 96.0, performance: 'good' },
          { id: 'pune', name: 'Pune', value: 87.4, target: 96.0, performance: 'good' }
        ]
      }
    ]
  },

  // Freight cost per KM regional data
  freight_cost_per_km: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 125.5,
        target: 100.0,
        performance: 'poor',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 128.8, target: 100.0, performance: 'poor' },
          { id: 'chandigarh', name: 'Chandigarh', value: 124.2, target: 100.0, performance: 'poor' },
          { id: 'jaipur', name: 'Jaipur', value: 123.5, target: 100.0, performance: 'poor' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 118.8,
        target: 100.0,
        performance: 'poor',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 119.5, target: 100.0, performance: 'poor' },
          { id: 'chennai', name: 'Chennai', value: 118.2, target: 100.0, performance: 'poor' },
          { id: 'hyderabad', name: 'Hyderabad', value: 118.7, target: 100.0, performance: 'poor' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 130.2,
        target: 100.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 131.5, target: 100.0, performance: 'poor' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 129.8, target: 100.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 129.3, target: 100.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 110.2,
        target: 100.0,
        performance: 'average',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 109.5, target: 100.0, performance: 'average' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 110.7, target: 100.0, performance: 'average' },
          { id: 'pune', name: 'Pune', value: 110.4, target: 100.0, performance: 'average' }
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
        value: 85.5,
        target: 96.0,
        performance: 'average',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 86.8, target: 96.0, performance: 'average' },
          { id: 'chandigarh', name: 'Chandigarh', value: 84.2, target: 96.0, performance: 'average' },
          { id: 'jaipur', name: 'Jaipur', value: 85.5, target: 96.0, performance: 'average' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 82.8,
        target: 96.0,
        performance: 'average',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 83.5, target: 96.0, performance: 'average' },
          { id: 'chennai', name: 'Chennai', value: 82.2, target: 96.0, performance: 'average' },
          { id: 'hyderabad', name: 'Hyderabad', value: 82.7, target: 96.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 80.2,
        target: 96.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 81.5, target: 96.0, performance: 'average' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 79.8, target: 96.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 79.3, target: 96.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 92.2,
        target: 96.0,
        performance: 'good',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 93.5, target: 96.0, performance: 'good' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 91.7, target: 96.0, performance: 'good' },
          { id: 'pune', name: 'Pune', value: 91.4, target: 96.0, performance: 'good' }
        ]
      }
    ]
  },

  // OTIF percentage regional data
  otif_percentage: {
    regions: [
      {
        id: 'north',
        name: 'North',
        value: 84.5,
        target: 98.0,
        performance: 'average',
        branches: [
          { id: 'delhi', name: 'Delhi', value: 85.8, target: 98.0, performance: 'average' },
          { id: 'chandigarh', name: 'Chandigarh', value: 83.2, target: 98.0, performance: 'average' },
          { id: 'jaipur', name: 'Jaipur', value: 84.5, target: 98.0, performance: 'average' }
        ]
      },
      {
        id: 'south',
        name: 'South',
        value: 87.8,
        target: 98.0,
        performance: 'average',
        branches: [
          { id: 'bangalore', name: 'Bangalore', value: 88.5, target: 98.0, performance: 'average' },
          { id: 'chennai', name: 'Chennai', value: 87.2, target: 98.0, performance: 'average' },
          { id: 'hyderabad', name: 'Hyderabad', value: 87.7, target: 98.0, performance: 'average' }
        ]
      },
      {
        id: 'east',
        name: 'East',
        value: 82.2,
        target: 98.0,
        performance: 'poor',
        branches: [
          { id: 'kolkata', name: 'Kolkata', value: 83.5, target: 98.0, performance: 'average' },
          { id: 'bhubaneswar', name: 'Bhubaneswar', value: 81.8, target: 98.0, performance: 'poor' },
          { id: 'patna', name: 'Patna', value: 81.3, target: 98.0, performance: 'poor' }
        ]
      },
      {
        id: 'west',
        name: 'West',
        value: 90.2,
        target: 98.0,
        performance: 'good',
        branches: [
          { id: 'mumbai', name: 'Mumbai', value: 91.5, target: 98.0, performance: 'good' },
          { id: 'ahmedabad', name: 'Ahmedabad', value: 89.7, target: 98.0, performance: 'good' },
          { id: 'pune', name: 'Pune', value: 89.4, target: 98.0, performance: 'good' }
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
  // Map the KPI ID to the correct key in regionalData if needed
  let dataKey = kpiId;

  // Check if the data exists for the given KPI ID
  const data = regionalData[dataKey];
  if (!data || !data.regions || data.regions.length === 0) {
    console.warn(`No data found for KPI ID: ${kpiId}`);
    return { top: [], worst: [] };
  }

  // Sort regions by performance
  const sortedRegions = [...data.regions].sort((a, b) => {
    // For budgeted vs actual freight, we want to compare against budget
    if (kpiId === 'budgeted_vs_actual_freight') {
      // Calculate the difference between actual and budget (negative is good, positive is bad)
      const aDiff = a.value - a.budget;
      const bDiff = b.value - b.budget;
      // Sort by the difference (lower/negative difference is better)
      return aDiff - bDiff;
    }
    // For other metrics where lower is better
    else if (
      kpiId === 'freight_cost_per_km' ||
      kpiId === 'order_delivery_time' ||
      kpiId === 'delayed_delivery'
    ) {
      return a.value - b.value;
    }

    // For metrics where higher is better (utilization, OTIF, placement, delivered vs running)
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
  // Map the KPI ID to the correct key in regionalData if needed
  let dataKey = kpiId;

  // Check if the data exists for the given KPI ID
  const data = regionalData[dataKey];
  if (!data || !data.regions) {
    console.warn(`No data found for KPI ID: ${kpiId}`);
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
    // For budgeted vs actual freight, we want to compare against budget
    if (kpiId === 'budgeted_vs_actual_freight') {
      // Calculate the difference between actual and budget (negative is good, positive is bad)
      const aDiff = a.value - a.budget;
      const bDiff = b.value - b.budget;
      // Sort by the difference (lower/negative difference is better)
      return aDiff - bDiff;
    }
    // For other metrics where lower is better
    else if (
      kpiId === 'freight_cost_per_km' ||
      kpiId === 'order_delivery_time' ||
      kpiId === 'delayed_delivery'
    ) {
      return a.value - b.value;
    }

    // For metrics where higher is better (utilization, OTIF, placement, delivered vs running)
    return b.value - a.value;
  });

  // Get top and worst branches (up to 2 each)
  const top = sortedBranches.slice(0, Math.min(2, sortedBranches.length));
  const worst = sortedBranches.slice(-Math.min(2, sortedBranches.length)).reverse();

  return { top, worst };
};
