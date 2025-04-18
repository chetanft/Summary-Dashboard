// Mock data generators for Control Tower

// Alert types
const indentIssueTypes = [
  'Delayed placement',
  'RC/PAN mismatch',
  'Unapproved 3rd-party vehicle',
];

const inTransitAlertTypes = [
  'Long stoppage',
  'Route deviation',
  'Diversion',
  'GPS tracking failure',
  'Detention at origin',
  'Detention at destination',
  'E-Waybill expiry',
  'SIM consent failure',
  'Driver unreachable',
];

const epodIssueTypes = [
  'Late POD upload',
  'Rejected POD',
  'Missing proof',
  'Disputes',
];

const tripTypes = ['FTL', 'PTL', 'Express'];
const lanes = ['Mumbai-Delhi', 'Chennai-Bangalore', 'Kolkata-Hyderabad', 'Pune-Ahmedabad', 'Delhi-Jaipur'];
const lspNames = ['Safexpress', 'TCI', 'Gati', 'DHL', 'Blue Dart', 'Delhivery'];
const vehicleTypes = ['LCV', 'Truck', 'Container', 'Trailer'];
const escalationStatuses = ['None', 'Level 1', 'Level 2', 'Level 3', 'Resolved'];
const actionTaken = ['Called driver', 'Notified LSP', 'Rerouted', 'Escalated', 'Replaced vehicle', 'None'];

// Generate a random alert
const generateRandomAlert = (type, timestamp) => {
  let alertType;
  
  if (type === 'indent') {
    alertType = indentIssueTypes[Math.floor(Math.random() * indentIssueTypes.length)];
  } else if (type === 'transit') {
    alertType = inTransitAlertTypes[Math.floor(Math.random() * inTransitAlertTypes.length)];
  } else {
    alertType = epodIssueTypes[Math.floor(Math.random() * epodIssueTypes.length)];
  }
  
  return {
    id: Math.random().toString(36).substring(2, 10),
    type: alertType,
    timestamp: new Date(timestamp - Math.floor(Math.random() * 86400000)).toISOString(),
    status: Math.random() > 0.3 ? 'Resolved' : 'Active',
    description: `Issue detected: ${alertType}`,
    action: actionTaken[Math.floor(Math.random() * actionTaken.length)],
  };
};

// Generate random trip data
export const generateMockTripData = (count) => {
  const trips = [];
  
  for (let i = 0; i < count; i++) {
    const timestamp = Date.now() - Math.floor(Math.random() * 30 * 86400000); // Random date within last 30 days
    const tripType = tripTypes[Math.floor(Math.random() * tripTypes.length)];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const lspName = lspNames[Math.floor(Math.random() * lspNames.length)];
    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const vehicleNumber = `MH${Math.floor(Math.random() * 99) + 1}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 9999) + 1000}`;
    
    // Generate random alerts
    const hasIndentIssue = Math.random() > 0.7;
    const hasInTransitAlert = Math.random() > 0.5;
    const hasEpodIssue = Math.random() > 0.7;
    
    const indentIssues = hasIndentIssue ? [generateRandomAlert('indent', timestamp)] : [];
    
    const inTransitAlertCount = hasInTransitAlert ? Math.floor(Math.random() * 3) + 1 : 0;
    const inTransitAlerts = [];
    for (let j = 0; j < inTransitAlertCount; j++) {
      inTransitAlerts.push(generateRandomAlert('transit', timestamp));
    }
    
    const epodIssues = hasEpodIssue ? [generateRandomAlert('epod', timestamp)] : [];
    
    // Calculate delay duration (in hours)
    const delayDuration = (indentIssues.length > 0 || inTransitAlerts.length > 0) 
      ? Math.floor(Math.random() * 48) + 1 
      : 0;
    
    // Determine escalation status
    const escalationStatus = escalationStatuses[Math.floor(Math.random() * escalationStatuses.length)];
    
    // Determine current status
    const statuses = ['Planned', 'In Transit', 'At Origin', 'At Destination', 'Completed', 'Delayed'];
    const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    trips.push({
      tripId: `FT${Math.floor(Math.random() * 10000) + 10000}`,
      vehicleNumber,
      vehicleType,
      tripType,
      lane,
      lspName,
      timestamp: new Date(timestamp).toISOString(),
      indentIssues,
      inTransitAlerts,
      epodIssues,
      escalationStatus,
      delayDuration,
      currentStatus,
      actionTaken: actionTaken[Math.floor(Math.random() * actionTaken.length)],
    });
  }
  
  return trips;
};

// Generate mock KPI data
export const generateMockKPIData = () => {
  return {
    tripsWithExceptions: {
      value: Math.floor(Math.random() * 30) + 20,
      trend: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : -Math.floor(Math.random() * 10) - 1,
    },
    avgDelayDuration: {
      value: Math.floor(Math.random() * 24) + 6,
      trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
    },
    escalationRate: {
      value: Math.floor(Math.random() * 20) + 5,
      trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
    },
    onTimeDelivery: {
      value: Math.floor(Math.random() * 30) + 70,
      trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
    },
    // Failing KPIs
    delayedExecution: {
      tripsDelayedInTransit: {
        value: Math.floor(Math.random() * 15) + 10,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithDetentionAtOrigin: {
        value: Math.floor(Math.random() * 12) + 8,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithDetentionAtDestination: {
        value: Math.floor(Math.random() * 10) + 5,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithLongStoppage: {
        value: Math.floor(Math.random() * 8) + 3,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
    },
    nonCompliantMovement: {
      tripsWithRouteDeviation: {
        value: Math.floor(Math.random() * 12) + 5,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithDiversion: {
        value: Math.floor(Math.random() * 8) + 2,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithEWaybillExpiry: {
        value: Math.floor(Math.random() * 6) + 1,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsNotTracked: {
        value: Math.floor(Math.random() * 10) + 3,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithDriverChangeNotCaptured: {
        value: Math.floor(Math.random() * 7) + 2,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
    },
    failureInClosure: {
      tripsNotAutoClosed: {
        value: Math.floor(Math.random() * 15) + 5,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      podsDelayedOrRejected: {
        value: Math.floor(Math.random() * 12) + 8,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      tripsWithMultipleEscalations: {
        value: Math.floor(Math.random() * 10) + 3,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1,
      },
      criticalIncidents: {
        value: Math.floor(Math.random() * 5) + 1,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 3) - 1,
      },
    },
  };
};
