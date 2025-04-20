/**
 * Journey Model - Defines the data structure for a journey
 */

/**
 * Journey Status Enum
 * Represents the possible statuses of a journey
 */
export const JourneyStatus = {
  PLANNED: 'planned',
  EN_ROUTE_TO_LOADING: 'en-route-to-loading',
  AT_LOADING: 'at-loading',
  IN_TRANSIT: 'in-transit',
  AT_UNLOADING: 'at-unloading',
  IN_RETURN: 'in-return',
  DELIVERED: 'delivered',
};

/**
 * Journey Type Enum
 * Represents the possible types of a journey
 */
export const JourneyType = {
  FTL: 'ftl', // Full Truck Load
  PTL: 'ptl', // Part Truck Load
};

/**
 * Journey Creation Method Enum
 * Represents the possible methods of journey creation
 */
export const JourneyCreationMethod = {
  UI: 'ui',
  EXCEL: 'excel',
  SAP: 'sap',
  INDENT: 'indent',
};

/**
 * POD Status Enum
 * Represents the possible statuses of a Proof of Delivery
 */
export const PODStatus = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

/**
 * Alert Type Enum
 * Represents the possible types of alerts
 */
export const AlertType = {
  DELAY: 'delay',
  DIVERSION: 'diversion',
  LONG_STOPPAGE: 'long-stoppage',
  SOS: 'sos',
  GEOFENCE_BREACH: 'geofence-breach',
};

/**
 * Alert Severity Enum
 * Represents the possible severities of alerts
 */
export const AlertSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

/**
 * Tracking Type Enum
 * Represents the possible types of tracking
 */
export const TrackingType = {
  SIM: 'sim',
  GPS: 'gps',
  MANUAL: 'manual',
};

/**
 * Consent Status Enum
 * Represents the possible statuses of tracking consent
 */
export const ConsentStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

/**
 * Journey Model Class
 * Represents a journey in the system
 */
export class Journey {
  constructor(data = {}) {
    // Basic journey information
    this.id = data.id || '';
    this.tripId = data.tripId || '';
    this.type = data.type || JourneyType.FTL;
    this.status = data.status || JourneyStatus.PLANNED;
    this.creationMethod = data.creationMethod || JourneyCreationMethod.UI;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    
    // Origin and destination
    this.from = data.from || {
      location: '',
      company: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      contactPerson: '',
      contactNumber: '',
      branchId: '',
    };
    
    this.to = data.to || {
      location: '',
      company: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      contactPerson: '',
      contactNumber: '',
      branchId: '',
    };
    
    // Vehicle and driver information
    this.vehicleInfo = data.vehicleInfo || '';
    this.vehicleNumber = data.vehicleNumber || '';
    this.driverName = data.driverName || '';
    this.driverNumber = data.driverNumber || '';
    this.trackingType = data.trackingType || TrackingType.GPS;
    this.consentStatus = data.consentStatus || ConsentStatus.PENDING;
    
    // Trip information
    this.tripInfo = data.tripInfo || '';
    this.expectedDeparture = data.expectedDeparture || '';
    this.expectedArrival = data.expectedArrival || '';
    this.actualDeparture = data.actualDeparture || '';
    this.actualArrival = data.actualArrival || '';
    this.eta = data.eta || '';
    this.distance = data.distance || 0;
    this.currentLocation = data.currentLocation || { lat: 0, lng: 0 };
    
    // Status information
    this.isDelayed = data.isDelayed || false;
    this.delayTime = data.delayTime || '';
    this.statusText = data.statusText || '';
    
    // Load information
    this.loadDetails = data.loadDetails || {
      weight: 0,
      volume: 0,
      packages: 0,
      material: '',
      value: 0,
    };
    
    // Invoice information
    this.invoiceDetails = data.invoiceDetails || {
      invoiceNumber: '',
      invoiceDate: '',
      invoiceAmount: 0,
      gst: 0,
      totalAmount: 0,
    };
    
    // POD information
    this.podStatus = data.podStatus || PODStatus.PENDING;
    this.podSubmittedAt = data.podSubmittedAt || '';
    this.podApprovedAt = data.podApprovedAt || '';
    this.podRejectedAt = data.podRejectedAt || '';
    this.podRejectionReason = data.podRejectionReason || '';
    
    // Documents
    this.documents = data.documents || [];
    
    // Timeline events
    this.timeline = data.timeline || [];
    
    // Alerts
    this.alerts = data.alerts || [];
    
    // Stops (for multi-stop journeys)
    this.stops = data.stops || [];
    
    // Branch information
    this.sourceBranch = data.sourceBranch || '';
    this.destinationBranch = data.destinationBranch || '';
    this.intermediateBranches = data.intermediateBranches || [];
  }
  
  /**
   * Get the current milestone of the journey
   * @returns {string} The current milestone
   */
  getCurrentMilestone() {
    return this.status;
  }
  
  /**
   * Check if the journey is on time
   * @returns {boolean} True if the journey is on time, false otherwise
   */
  isOnTime() {
    return !this.isDelayed;
  }
  
  /**
   * Get the journey duration in hours
   * @returns {number} The journey duration in hours
   */
  getDuration() {
    if (!this.expectedDeparture || !this.expectedArrival) {
      return 0;
    }
    
    const departure = new Date(this.expectedDeparture);
    const arrival = new Date(this.expectedArrival);
    
    return (arrival - departure) / (1000 * 60 * 60);
  }
  
  /**
   * Get the journey progress percentage
   * @returns {number} The journey progress percentage
   */
  getProgressPercentage() {
    const milestones = Object.values(JourneyStatus);
    const currentIndex = milestones.indexOf(this.status);
    
    if (currentIndex === -1) {
      return 0;
    }
    
    return (currentIndex / (milestones.length - 1)) * 100;
  }
  
  /**
   * Get the next milestone in the journey
   * @returns {string|null} The next milestone, or null if the journey is complete
   */
  getNextMilestone() {
    const milestones = Object.values(JourneyStatus);
    const currentIndex = milestones.indexOf(this.status);
    
    if (currentIndex === -1 || currentIndex === milestones.length - 1) {
      return null;
    }
    
    return milestones[currentIndex + 1];
  }
  
  /**
   * Check if the journey has alerts
   * @returns {boolean} True if the journey has alerts, false otherwise
   */
  hasAlerts() {
    return this.alerts.length > 0;
  }
  
  /**
   * Get critical alerts for the journey
   * @returns {Array} Array of critical alerts
   */
  getCriticalAlerts() {
    return this.alerts.filter(alert => alert.severity === AlertSeverity.CRITICAL);
  }
}

/**
 * Alert Model Class
 * Represents an alert in the system
 */
export class Alert {
  constructor(data = {}) {
    this.id = data.id || '';
    this.journeyId = data.journeyId || '';
    this.type = data.type || AlertType.DELAY;
    this.severity = data.severity || AlertSeverity.MEDIUM;
    this.message = data.message || '';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.location = data.location || { lat: 0, lng: 0 };
    this.isResolved = data.isResolved || false;
    this.resolvedAt = data.resolvedAt || '';
    this.resolutionNotes = data.resolutionNotes || '';
    this.ticketId = data.ticketId || '';
  }
}

/**
 * Timeline Event Model Class
 * Represents a timeline event in the system
 */
export class TimelineEvent {
  constructor(data = {}) {
    this.id = data.id || '';
    this.journeyId = data.journeyId || '';
    this.milestone = data.milestone || '';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.location = data.location || { lat: 0, lng: 0 };
    this.notes = data.notes || '';
    this.documents = data.documents || [];
    this.createdBy = data.createdBy || '';
  }
}

/**
 * Stop Model Class
 * Represents a stop in a journey
 */
export class Stop {
  constructor(data = {}) {
    this.id = data.id || '';
    this.journeyId = data.journeyId || '';
    this.type = data.type || 'pickup'; // pickup or delivery
    this.location = data.location || '';
    this.address = data.address || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.pincode = data.pincode || '';
    this.contactPerson = data.contactPerson || '';
    this.contactNumber = data.contactNumber || '';
    this.expectedArrival = data.expectedArrival || '';
    this.actualArrival = data.actualArrival || '';
    this.expectedDeparture = data.expectedDeparture || '';
    this.actualDeparture = data.actualDeparture || '';
    this.status = data.status || 'pending'; // pending, completed, skipped
    this.notes = data.notes || '';
    this.documents = data.documents || [];
  }
}

/**
 * Document Model Class
 * Represents a document in the system
 */
export class Document {
  constructor(data = {}) {
    this.id = data.id || '';
    this.journeyId = data.journeyId || '';
    this.type = data.type || ''; // invoice, pod, driver, vehicle, etc.
    this.name = data.name || '';
    this.url = data.url || '';
    this.mimeType = data.mimeType || '';
    this.size = data.size || 0;
    this.uploadedAt = data.uploadedAt || new Date().toISOString();
    this.uploadedBy = data.uploadedBy || '';
    this.metadata = data.metadata || {};
  }
}
