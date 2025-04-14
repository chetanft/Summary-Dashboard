// Mock data for real-time KPIs
export const generateRealtimeKpiData = (userRole = 'CXO') => {
  // Base data that will be filtered based on user role
  const baseData = {
    // 1. Trips & Orders In Progress
    tripsAndOrders: {
      activeTrips: {
        count: 125,
        trend: +5,
        status: 'normal',
        details: {
          north: 32,
          south: 28,
          east: 35,
          west: 30,
          central: 0, // Branch specific
        }
      },
      ordersInTransit: {
        count: 342,
        trend: -2,
        status: 'normal',
        details: {
          north: 85,
          south: 76,
          east: 92,
          west: 89,
          central: 0, // Branch specific
        }
      },
      ordersToDeliver: {
        count: 78,
        trend: +12,
        status: 'attention',
        details: {
          north: 18,
          south: 22,
          east: 15,
          west: 23,
          central: 0, // Branch specific
        }
      },
      activeVehicles: {
        count: 98,
        trend: +3,
        status: 'normal',
        details: {
          north: 25,
          south: 22,
          east: 28,
          west: 23,
          central: 0, // Branch specific
        }
      }
    },

    // 2. Pending Actions
    pendingActions: {
      unassignedOrders: {
        count: 42,
        trend: -5,
        status: 'attention',
        details: {
          north: 12,
          south: 8,
          east: 15,
          west: 7,
          central: 0, // Branch specific
        }
      },
      notPickedUpOrders: {
        count: 18,
        trend: +2,
        status: 'attention',
        details: {
          north: 5,
          south: 4,
          east: 6,
          west: 3,
          central: 0, // Branch specific
        }
      },
      delayedOrders: {
        count: 15,
        trend: +8,
        status: 'critical',
        details: {
          north: 4,
          south: 3,
          east: 5,
          west: 3,
          central: 0, // Branch specific
        }
      },
      delayAlerts: {
        count: 23,
        trend: +10,
        status: 'critical',
        details: {
          north: 6,
          south: 5,
          east: 8,
          west: 4,
          central: 0, // Branch specific
        }
      }
    },

    // 3. Vehicle Status Locations
    vehicleStatus: {
      atLoadingPoint: {
        count: 32,
        trend: -2,
        status: 'normal',
        details: {
          north: 8,
          south: 7,
          east: 10,
          west: 7,
          central: 0, // Branch specific
        }
      },
      atUnloadingPoint: {
        count: 28,
        trend: +4,
        status: 'attention',
        details: {
          north: 7,
          south: 6,
          east: 9,
          west: 6,
          central: 0, // Branch specific
        }
      },
      atTransferStops: {
        count: 15,
        trend: 0,
        status: 'normal',
        details: {
          north: 4,
          south: 3,
          east: 5,
          west: 3,
          central: 0, // Branch specific
        }
      }
    },

    // 4. Exceptions & Process Flags
    exceptions: {
      exceptionFlags: {
        count: 35,
        trend: +15,
        status: 'critical',
        byType: {
          vehicleBreakdown: 8,
          routeDeviation: 12,
          documentMissing: 10,
          weather: 5
        },
        details: {
          north: 9,
          south: 8,
          east: 11,
          west: 7,
          central: 0, // Branch specific
        }
      },
      gateInPending: {
        count: 12,
        trend: -3,
        status: 'attention',
        details: {
          north: 3,
          south: 3,
          east: 4,
          west: 2,
          central: 0, // Branch specific
        }
      },
      epodNotUploaded: {
        count: 24,
        trend: +5,
        status: 'critical',
        details: {
          north: 6,
          south: 5,
          east: 8,
          west: 5,
          central: 0, // Branch specific
        }
      }
    }
  };

  // Filter data based on user role
  if (userRole === 'CXO') {
    // CXO sees all data at the organization level
    return baseData;
  } else if (userRole === 'Company') {
    // Company (L1) sees data for all branches, but with more detailed breakdown
    return {
      ...baseData,
      // Add any L1-specific transformations here
    };
  } else if (userRole === 'Branch') {
    // Branch (L2) sees only branch-specific data
    // For demo purposes, we'll use "central" as the branch
    const branchData = JSON.parse(JSON.stringify(baseData));
    
    // Set central branch data (normally this would come from the backend)
    branchData.tripsAndOrders.activeTrips.count = 22;
    branchData.tripsAndOrders.activeTrips.details.central = 22;
    
    branchData.tripsAndOrders.ordersInTransit.count = 65;
    branchData.tripsAndOrders.ordersInTransit.details.central = 65;
    
    branchData.tripsAndOrders.ordersToDeliver.count = 14;
    branchData.tripsAndOrders.ordersToDeliver.details.central = 14;
    
    branchData.tripsAndOrders.activeVehicles.count = 18;
    branchData.tripsAndOrders.activeVehicles.details.central = 18;
    
    branchData.pendingActions.unassignedOrders.count = 8;
    branchData.pendingActions.unassignedOrders.details.central = 8;
    
    branchData.pendingActions.notPickedUpOrders.count = 3;
    branchData.pendingActions.notPickedUpOrders.details.central = 3;
    
    branchData.pendingActions.delayedOrders.count = 2;
    branchData.pendingActions.delayedOrders.details.central = 2;
    
    branchData.pendingActions.delayAlerts.count = 4;
    branchData.pendingActions.delayAlerts.details.central = 4;
    
    branchData.vehicleStatus.atLoadingPoint.count = 6;
    branchData.vehicleStatus.atLoadingPoint.details.central = 6;
    
    branchData.vehicleStatus.atUnloadingPoint.count = 5;
    branchData.vehicleStatus.atUnloadingPoint.details.central = 5;
    
    branchData.vehicleStatus.atTransferStops.count = 3;
    branchData.vehicleStatus.atTransferStops.details.central = 3;
    
    branchData.exceptions.exceptionFlags.count = 7;
    branchData.exceptions.exceptionFlags.details.central = 7;
    
    branchData.exceptions.gateInPending.count = 2;
    branchData.exceptions.gateInPending.details.central = 2;
    
    branchData.exceptions.epodNotUploaded.count = 5;
    branchData.exceptions.epodNotUploaded.details.central = 5;
    
    return branchData;
  }
  
  // Default to CXO view
  return baseData;
};

// Simulate real-time updates
export const simulateRealtimeUpdate = (currentData, userRole = 'CXO') => {
  const newData = JSON.parse(JSON.stringify(currentData));
  
  // Randomly update some values to simulate real-time changes
  const randomChange = () => Math.floor(Math.random() * 5) - 2; // Random number between -2 and 2
  
  // Update trips and orders
  newData.tripsAndOrders.activeTrips.count += randomChange();
  newData.tripsAndOrders.ordersInTransit.count += randomChange();
  newData.tripsAndOrders.ordersToDeliver.count += randomChange();
  newData.tripsAndOrders.activeVehicles.count += randomChange();
  
  // Update pending actions
  newData.pendingActions.unassignedOrders.count += randomChange();
  newData.pendingActions.notPickedUpOrders.count += randomChange();
  newData.pendingActions.delayedOrders.count += randomChange();
  newData.pendingActions.delayAlerts.count += randomChange();
  
  // Update vehicle status
  newData.vehicleStatus.atLoadingPoint.count += randomChange();
  newData.vehicleStatus.atUnloadingPoint.count += randomChange();
  newData.vehicleStatus.atTransferStops.count += randomChange();
  
  // Update exceptions
  newData.exceptions.exceptionFlags.count += randomChange();
  newData.exceptions.gateInPending.count += randomChange();
  newData.exceptions.epodNotUploaded.count += randomChange();
  
  // Update status based on thresholds
  // This would normally be based on business rules
  const updateStatus = (item) => {
    if (item.count > 30) {
      item.status = 'critical';
    } else if (item.count > 20) {
      item.status = 'attention';
    } else {
      item.status = 'normal';
    }
    
    // Update trend
    item.trend = item.count - currentData.pendingActions.unassignedOrders.count;
  };
  
  // Apply status updates
  updateStatus(newData.pendingActions.unassignedOrders);
  updateStatus(newData.pendingActions.delayedOrders);
  updateStatus(newData.exceptions.exceptionFlags);
  
  return newData;
};
