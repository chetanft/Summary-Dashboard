/**
 * Sample alert data for the TMS Dashboard
 */

export const alerts = [
  {
    id: 'ALT-001',
    title: 'Delayed Shipment',
    description: 'Shipment #21424 is delayed by 2 hours',
    severity: 'high',
    type: 'delay',
    status: 'open',
    createdAt: '2024-04-12T09:30:00',
    updatedAt: '2024-04-12T09:30:00',
    assignedTo: null,
    relatedOrderId: '21424',
    actions: [
      {
        id: 'ACT-001',
        type: 'acknowledge',
        label: 'Acknowledge',
        status: 'available'
      },
      {
        id: 'ACT-002',
        type: 'resolve',
        label: 'Resolve',
        status: 'available'
      }
    ]
  },
  {
    id: 'ALT-002',
    title: 'Vehicle Breakdown',
    description: 'Vehicle AP 12K 1234 has reported a breakdown near Mumbai',
    severity: 'critical',
    type: 'breakdown',
    status: 'open',
    createdAt: '2024-04-12T08:15:00',
    updatedAt: '2024-04-12T08:15:00',
    assignedTo: null,
    relatedOrderId: '21424',
    actions: [
      {
        id: 'ACT-003',
        type: 'acknowledge',
        label: 'Acknowledge',
        status: 'available'
      },
      {
        id: 'ACT-004',
        type: 'resolve',
        label: 'Resolve',
        status: 'available'
      }
    ]
  },
  {
    id: 'ALT-003',
    title: 'Weather Alert',
    description: 'Heavy rainfall expected on route for shipment #21425',
    severity: 'medium',
    type: 'weather',
    status: 'acknowledged',
    createdAt: '2024-04-11T14:45:00',
    updatedAt: '2024-04-11T15:30:00',
    assignedTo: 'Rajesh Kumar',
    relatedOrderId: '21425',
    actions: [
      {
        id: 'ACT-005',
        type: 'acknowledge',
        label: 'Acknowledged',
        status: 'completed'
      },
      {
        id: 'ACT-006',
        type: 'resolve',
        label: 'Resolve',
        status: 'available'
      }
    ]
  },
  {
    id: 'ALT-004',
    title: 'Document Missing',
    description: 'E-way bill missing for shipment #21426',
    severity: 'medium',
    type: 'documentation',
    status: 'resolved',
    createdAt: '2024-04-10T11:20:00',
    updatedAt: '2024-04-10T16:45:00',
    assignedTo: 'Priya Sharma',
    relatedOrderId: '21426',
    actions: [
      {
        id: 'ACT-007',
        type: 'acknowledge',
        label: 'Acknowledged',
        status: 'completed'
      },
      {
        id: 'ACT-008',
        type: 'resolve',
        label: 'Resolved',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ALT-005',
    title: 'Delivery Exception',
    description: 'Customer not available at delivery location for shipment #21425',
    severity: 'high',
    type: 'delivery',
    status: 'open',
    createdAt: '2024-04-12T10:05:00',
    updatedAt: '2024-04-12T10:05:00',
    assignedTo: null,
    relatedOrderId: '21425',
    actions: [
      {
        id: 'ACT-009',
        type: 'acknowledge',
        label: 'Acknowledge',
        status: 'available'
      },
      {
        id: 'ACT-010',
        type: 'resolve',
        label: 'Resolve',
        status: 'available'
      }
    ]
  }
];

export const alertTypes = [
  { id: 'delay', label: 'Delay', color: '#FFA500' },
  { id: 'breakdown', label: 'Breakdown', color: '#FF0000' },
  { id: 'weather', label: 'Weather', color: '#1E90FF' },
  { id: 'documentation', label: 'Documentation', color: '#9370DB' },
  { id: 'delivery', label: 'Delivery', color: '#FF6347' }
];

export const alertSeverities = [
  { id: 'low', label: 'Low', color: '#4CAF50' },
  { id: 'medium', label: 'Medium', color: '#FFC107' },
  { id: 'high', label: 'High', color: '#FF9800' },
  { id: 'critical', label: 'Critical', color: '#F44336' }
];

export const alertStatuses = [
  { id: 'open', label: 'Open', color: '#F44336' },
  { id: 'acknowledged', label: 'Acknowledged', color: '#FFC107' },
  { id: 'resolved', label: 'Resolved', color: '#4CAF50' }
];
