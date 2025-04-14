// Alert types
export const alertTypes = {
  VEHICLE_BREAKDOWN: 'Vehicle Breakdown',
  DELAY: 'Delay',
  ROUTE_DEVIATION: 'Route Deviation',
  DOCUMENT_MISSING: 'Document Missing',
  WEATHER: 'Weather Alert',
  TRAFFIC: 'Traffic Alert',
  SYSTEM: 'System Alert',
};

// Alert severities
export const alertSeverities = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Alert statuses
export const alertStatuses = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
};

// Sample alerts data
export const alerts = [
  {
    id: 'ALT001',
    type: alertTypes.VEHICLE_BREAKDOWN,
    title: 'Vehicle Breakdown on Route AMRIT-MUM',
    description: 'Vehicle TN-01-AB-1234 has reported a breakdown on highway NH-48 near Vapi.',
    timestamp: '2023-04-25T10:30:00Z',
    severity: alertSeverities.HIGH,
    status: alertStatuses.NEW,
    affectedOrders: ['SO: 21426', 'SO: 21427'],
    location: {
      lat: 20.3893,
      lng: 72.9106,
      address: 'NH-48, near Vapi, Gujarat',
    },
    assignedTo: null,
    actions: [
      {
        id: 'ACT001',
        type: 'Dispatch Mechanic',
        status: 'pending',
        timestamp: null,
      },
      {
        id: 'ACT002',
        type: 'Notify Customer',
        status: 'pending',
        timestamp: null,
      },
    ],
  },
  {
    id: 'ALT002',
    type: alertTypes.DELAY,
    title: 'Delivery Delay for Order SO: 21426',
    description: 'Order SO: 21426 is delayed by 1 day due to vehicle breakdown.',
    timestamp: '2023-04-25T10:35:00Z',
    severity: alertSeverities.HIGH,
    status: alertStatuses.NEW,
    affectedOrders: ['SO: 21426'],
    location: null,
    assignedTo: null,
    actions: [
      {
        id: 'ACT003',
        type: 'Notify Customer',
        status: 'pending',
        timestamp: null,
      },
      {
        id: 'ACT004',
        type: 'Update ETA',
        status: 'pending',
        timestamp: null,
      },
    ],
  },
  {
    id: 'ALT003',
    type: alertTypes.ROUTE_DEVIATION,
    title: 'Route Deviation for Trip 66147250',
    description: 'Vehicle has deviated from planned route by more than 5km.',
    timestamp: '2023-04-25T11:15:00Z',
    severity: alertSeverities.MEDIUM,
    status: alertStatuses.IN_PROGRESS,
    affectedOrders: ['SO: 21428'],
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Andheri, Mumbai, Maharashtra',
    },
    assignedTo: 'John Doe',
    actions: [
      {
        id: 'ACT005',
        type: 'Contact Driver',
        status: 'completed',
        timestamp: '2023-04-25T11:20:00Z',
      },
      {
        id: 'ACT006',
        type: 'Verify Reason',
        status: 'in_progress',
        timestamp: null,
      },
    ],
  },
  {
    id: 'ALT004',
    type: alertTypes.DOCUMENT_MISSING,
    title: 'Missing E-Way Bill for Order SO: 21429',
    description: 'E-Way Bill is missing for order SO: 21429 which is scheduled for dispatch today.',
    timestamp: '2023-04-25T09:00:00Z',
    severity: alertSeverities.HIGH,
    status: alertStatuses.RESOLVED,
    affectedOrders: ['SO: 21429'],
    location: null,
    assignedTo: 'Jane Smith',
    actions: [
      {
        id: 'ACT007',
        type: 'Generate E-Way Bill',
        status: 'completed',
        timestamp: '2023-04-25T09:30:00Z',
      },
      {
        id: 'ACT008',
        type: 'Attach to Order',
        status: 'completed',
        timestamp: '2023-04-25T09:35:00Z',
      },
    ],
  },
  {
    id: 'ALT005',
    type: alertTypes.WEATHER,
    title: 'Heavy Rain Alert on Route AMRIT-CHN',
    description: 'Heavy rainfall expected on NH-45 between Villupuram and Chennai for next 24 hours.',
    timestamp: '2023-04-25T08:00:00Z',
    severity: alertSeverities.MEDIUM,
    status: alertStatuses.NEW,
    affectedOrders: ['SO: 21430', 'SO: 21431', 'SO: 21432'],
    location: {
      lat: 12.9249,
      lng: 79.7714,
      address: 'NH-45, Villupuram, Tamil Nadu',
    },
    assignedTo: null,
    actions: [
      {
        id: 'ACT009',
        type: 'Notify Drivers',
        status: 'pending',
        timestamp: null,
      },
      {
        id: 'ACT010',
        type: 'Assess Impact',
        status: 'pending',
        timestamp: null,
      },
    ],
  },
  {
    id: 'ALT006',
    type: alertTypes.TRAFFIC,
    title: 'Heavy Traffic on Mumbai-Pune Expressway',
    description: 'Accident reported near Lonavala causing 2-hour delay.',
    timestamp: '2023-04-25T12:30:00Z',
    severity: alertSeverities.MEDIUM,
    status: alertStatuses.NEW,
    affectedOrders: ['SO: 21433', 'SO: 21434'],
    location: {
      lat: 18.7546,
      lng: 73.4006,
      address: 'Mumbai-Pune Expressway, near Lonavala',
    },
    assignedTo: null,
    actions: [
      {
        id: 'ACT011',
        type: 'Notify Drivers',
        status: 'pending',
        timestamp: null,
      },
      {
        id: 'ACT012',
        type: 'Suggest Alternate Route',
        status: 'pending',
        timestamp: null,
      },
    ],
  },
  {
    id: 'ALT007',
    type: alertTypes.SYSTEM,
    title: 'GPS Tracking System Outage',
    description: 'GPS tracking system is experiencing intermittent outages.',
    timestamp: '2023-04-25T13:00:00Z',
    severity: alertSeverities.LOW,
    status: alertStatuses.IN_PROGRESS,
    affectedOrders: [],
    location: null,
    assignedTo: 'IT Support',
    actions: [
      {
        id: 'ACT013',
        type: 'Restart System',
        status: 'completed',
        timestamp: '2023-04-25T13:15:00Z',
      },
      {
        id: 'ACT014',
        type: 'Monitor Performance',
        status: 'in_progress',
        timestamp: null,
      },
    ],
  },
];
