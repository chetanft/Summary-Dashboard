import { kpiData } from '../data/kpiData';
import { enhancedOrderData } from '../data/enhancedOrderData';

// Mock API call to fetch dashboard data
export const fetchDashboardData = async (userRole) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // In a real app, this would be an API call
  // For now, return mock data based on user role
  switch (userRole) {
    case 'cxo':
      return {
        kpis: kpiData.cxo,
        orders: enhancedOrderData.slice(0, 50),
        alerts: generateMockAlerts(10),
      };
    case 'company':
      return {
        kpis: kpiData.company,
        orders: enhancedOrderData.slice(0, 30),
        alerts: generateMockAlerts(5),
      };
    case 'branch':
      return {
        kpis: kpiData.branch,
        orders: enhancedOrderData.slice(0, 20),
        alerts: generateMockAlerts(3),
      };
    default:
      return {
        kpis: kpiData.cxo,
        orders: enhancedOrderData.slice(0, 10),
        alerts: generateMockAlerts(2),
      };
  }
};

// Transform dashboard data for components
export const transformDashboardData = (data) => {
  if (!data) return null;

  // Extract user role if available
  const userRole = data.userRole || 'unknown';

  // Transform KPI data with formatted values
  const transformedKpis = transformKpiData(data.kpis, userRole);

  // Create hero KPI data (budgeted vs actual)
  const heroKPI = {
    title: 'Budgeted vs Actual vs Projected Freight',
    actual: data.kpis?.budgetedVsActual?.value || 0,
    formattedActual: formatCurrency(data.kpis?.budgetedVsActual?.value || 0),
    projected: (data.kpis?.budgetedVsActual?.value || 0) * 1.1, // Projected is 10% more than actual for demo
    formattedProjected: formatCurrency((data.kpis?.budgetedVsActual?.value || 0) * 1.1),
    budget: data.kpis?.budgetedVsActual?.target || 0,
    formattedBudget: formatCurrency(data.kpis?.budgetedVsActual?.target || 0),
    chartData: generateChartData(data.kpis?.budgetedVsActual?.value || 0, data.kpis?.budgetedVsActual?.target || 0)
  };

  // Create secondary KPIs
  const secondaryKPIs = [
    {
      id: 'vehicle_utilization',
      title: 'Vehicle Utilisation',
      value: data.kpis?.vehicleUtilization?.value || 0,
      formattedValue: formatPercentage(data.kpis?.vehicleUtilization?.value || 0),
      target: data.kpis?.vehicleUtilization?.target || 0,
      formattedTarget: formatPercentage(data.kpis?.vehicleUtilization?.target || 0),
      chartData: generateRegionalChartData(data.kpis?.vehicleUtilization?.value || 0)
    },
    {
      id: 'freight_cost_per_km',
      title: 'Freight cost per KM',
      value: data.kpis?.freightCost?.value || 0,
      formattedValue: formatCurrency(data.kpis?.freightCost?.value || 0, 'INR/km'),
      target: data.kpis?.freightCost?.target || 0,
      formattedTarget: formatCurrency(data.kpis?.freightCost?.target || 0, 'INR/km'),
      chartData: generateRegionalChartData(data.kpis?.freightCost?.value || 0)
    }
  ];

  return {
    kpis: transformedKpis,
    orders: transformOrderData(data.orders),
    alerts: data.alerts,
    summary: generateSummaryData(data),
    heroKPI,
    secondaryKPIs,
    userRole // Include user role in the transformed data
  };
};

// Format currency values with one decimal point
const formatCurrency = (value, unit = 'Cr') => {
  // Format to one decimal place
  const formattedValue = Number(value).toFixed(1);
  return `₹ ${formattedValue} ${unit}`;
};

// Format percentage values with one decimal point
const formatPercentage = (value) => {
  // Format to one decimal place
  const formattedValue = Number(value).toFixed(1);
  return `${formattedValue}%`;
};

// Generate chart data for budgeted vs actual
const generateChartData = (actual, budget) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => {
    // Generate some variation in the data
    const actualValue = actual * (0.9 + (index * 0.02));
    const budgetValue = budget * (0.95 + (index * 0.01));

    return {
      month,
      actual: Math.round(actualValue),
      budget: Math.round(budgetValue)
    };
  });
};

// Generate regional chart data
const generateRegionalChartData = (baseValue) => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  return regions.map((region, index) => {
    // Generate some variation in the data
    const value = baseValue * (0.9 + (index * 0.05));

    return {
      region,
      value: Math.round(value),
      color: value < baseValue ? '#FF3533' : '#4CAF50'
    };
  });
};

// Transform KPI data
const transformKpiData = (kpis, userRole) => {
  if (!kpis) return {};

  // Create a new object with the transformed data
  const transformedKpis = { ...kpis };

  // Add user role
  transformedKpis.userRole = userRole;

  // Format values for display if they exist
  if (transformedKpis.budgetedVsActual) {
    transformedKpis.budgetedVsActual = {
      ...transformedKpis.budgetedVsActual,
      formattedValue: formatCurrency(transformedKpis.budgetedVsActual.value || 0),
      formattedTarget: formatCurrency(transformedKpis.budgetedVsActual.target || 0)
    };
  }

  if (transformedKpis.vehicleUtilization) {
    transformedKpis.vehicleUtilization = {
      ...transformedKpis.vehicleUtilization,
      formattedValue: formatPercentage(transformedKpis.vehicleUtilization.value || 0),
      formattedTarget: formatPercentage(transformedKpis.vehicleUtilization.target || 0)
    };
  }

  if (transformedKpis.freightCost) {
    transformedKpis.freightCost = {
      ...transformedKpis.freightCost,
      formattedValue: formatCurrency(transformedKpis.freightCost.value || 0, 'INR/km'),
      formattedTarget: formatCurrency(transformedKpis.freightCost.target || 0, 'INR/km')
    };
  }

  return transformedKpis;
};

// Transform order data
const transformOrderData = (orders) => {
  return orders.map(order => ({
    ...order,
    // Add any additional transformations here
    statusColor: getStatusColor(order.status),
  }));
};

// Generate summary data
const generateSummaryData = (data) => {
  const { kpis, orders } = data;

  return {
    totalOrders: orders.length,
    onTimeDelivery: kpis.otif?.value || 0,
    delayedOrders: orders.filter(o => o.status === 'Delayed').length,
    inTransitOrders: orders.filter(o => o.status === 'In Transit').length,
  };
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'In Transit':
      return 'info';
    case 'Delayed':
      return 'error';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

// Generate mock alerts
const generateMockAlerts = (count) => {
  const alertTypes = [
    'Order delayed',
    'Vehicle breakdown',
    'Weather alert',
    'Traffic congestion',
    'Document missing',
    'Payment pending',
    'Delivery exception',
  ];

  const alerts = [];

  for (let i = 0; i < count; i++) {
    alerts.push({
      id: `alert-${i + 1}`,
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      message: `Alert message ${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      isRead: Math.random() > 0.7,
    });
  }

  return alerts;
};

// Fetch order details by ID
export const fetchOrderDetails = async (orderId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find the order in our mock data
  const order = enhancedOrderData.find(o => o.id === orderId);

  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  return {
    ...order,
    // Add additional details that might not be in the list view
    timeline: generateOrderTimeline(order),
    comments: generateOrderComments(order),
  };
};

// Generate a mock timeline for an order
const generateOrderTimeline = (order) => {
  // This would come from the API in a real app
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return [
    {
      id: 'day-1',
      date: yesterday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      events: [
        {
          id: 'event-1',
          type: 'Order Created',
          details: `Sales Order ${order.soNumber || order.id} created`,
          time: '09:30 AM',
          status: 'completed',
          icon: 'document',
        },
        {
          id: 'event-2',
          type: 'Planning',
          details: 'Trip planning completed',
          time: '11:45 AM',
          status: 'completed',
          icon: 'assignment',
        },
      ],
    },
    {
      id: 'day-2',
      date: today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      events: [
        {
          id: 'event-3',
          type: 'Vehicle Assigned',
          details: `Vehicle ${order.vehicleNumber || 'TN01AB1234'} assigned`,
          time: '08:15 AM',
          status: 'completed',
          icon: 'shipping',
          subEvents: [
            {
              id: 'sub-event-1',
              type: 'Driver Assigned',
              details: order.driverName || 'John Doe',
              time: '08:20 AM',
            },
          ],
        },
        {
          id: 'event-4',
          type: 'Loading Started',
          details: 'Loading in progress at warehouse',
          time: '10:30 AM',
          status: 'active',
          icon: 'schedule',
        },
      ],
    },
  ];
};

// Generate mock comments for an order
const generateOrderComments = (order) => {
  return [
    {
      id: 'comment-1',
      user: 'System',
      comment: `Order ${order.soNumber || order.id} created in the system`,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      time: '09:30 AM (Yesterday)',
    },
    {
      id: 'comment-2',
      user: 'John Doe',
      comment: 'Vehicle assigned and ready for loading',
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      time: '08:15 AM (Today)',
    },
  ];
};

// Fetch KPI drill-down data
export const fetchKpiDrilldownData = async (kpiId, level, parentId = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // In a real app, this would fetch data from an API
  // For now, return mock data based on the KPI and level

  // Level can be 'region', 'branch', or 'order'
  switch (level) {
    case 'region':
      return generateRegionalData(kpiId);
    case 'branch':
      return generateBranchData(kpiId, parentId);
    case 'order':
      return generateOrderLevelData(kpiId, parentId);
    default:
      throw new Error(`Invalid drill-down level: ${level}`);
  }
};

// Generate mock regional data for KPI drill-down
const generateRegionalData = (kpiId) => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];

  return regions.map(region => {
    const value = Math.round(Math.random() * 100);
    const target = 75;
    const variance = value - target;

    return {
      id: `region-${region.toLowerCase()}`,
      name: `${region} Region`,
      value,
      target,
      variance,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendValue: Math.round(Math.random() * 10),
    };
  }).sort((a, b) => b.value - a.value); // Sort by value descending
};

// Generate mock branch data for KPI drill-down
const generateBranchData = (kpiId, regionId) => {
  const region = regionId.split('-')[1];
  const branches = [
    `${region} Main`,
    `${region} Central`,
    `${region} Airport`,
    `${region} Industrial`,
    `${region} Downtown`,
  ];

  return branches.map(branch => {
    const value = Math.round(Math.random() * 100);
    const target = 75;
    const variance = value - target;

    return {
      id: `branch-${branch.toLowerCase().replace(' ', '-')}`,
      name: branch,
      value,
      target,
      variance,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendValue: Math.round(Math.random() * 10),
    };
  }).sort((a, b) => b.value - a.value); // Sort by value descending
};

// Generate mock order-level data for KPI drill-down
const generateOrderLevelData = (kpiId, branchId) => {
  return enhancedOrderData.slice(0, 10).map(order => ({
    id: order.id,
    orderNumber: order.soNumber || order.id,
    customer: order.customer || 'Customer Name',
    origin: order.origin || 'Origin City',
    destination: order.destination || 'Destination City',
    status: order.status,
    value: Math.round(Math.random() * 100),
  }));
};
