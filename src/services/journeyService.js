/**
 * Journey Service - Provides API services for journey operations
 */
import { Journey, Alert, TimelineEvent, Stop, Document } from '../models/JourneyModel';
import { mockJourneys } from '../data/mockJourneyData';

// Mock journey details data for the new journey details page
const mockJourneyDetails = {
  id: "PB 09 HH6439",
  deliveryTimeframe: {
    days: 2,
    minutes: 20
  },
  shipper: {
    name: "MDC Labs LTD",
    id: "MDC001"
  },
  tripStart: {
    date: "2024-01-06T04:00:00Z",
    formattedDate: "6th Jan 24, 04:00 AM"
  },
  transitTime: {
    days: 3,
    hours: 12,
    minutes: 40
  },
  totalDistance: {
    value: 1020,
    unit: "kms"
  },
  journeyType: "Round trip",
  stops: [
    {
      id: "stop-1",
      journeyId: "PB 09 HH6439",
      type: "Origin",
      typeCode: "OR",
      sequence: 1,
      location: {
        name: "MDC Labs ltd",
        city: "Amritsar",
        state: "Punjab",
        rating: 3.5
      },
      vehicle: {
        number: "AP 12K 1234",
        type: "Truck"
      },
      driver: {
        name: "Rajesh Kumar"
      },
      load: {
        id: "457283924"
      },
      coordinates: [74.8723, 31.6340]
    },
    {
      id: "stop-2",
      journeyId: "PB 09 HH6439",
      type: "Pickup",
      typeCode: "P1",
      sequence: 2,
      location: {
        name: "MDC Jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        rating: 3.8
      },
      vehicle: {
        number: "AP 12K 1234",
        type: "Truck"
      },
      driver: {
        name: "Rajesh Kumar"
      },
      load: {
        id: "457283924"
      },
      coordinates: [75.7873, 26.9124]
    },
    {
      id: "stop-3",
      journeyId: "PB 09 HH6439",
      type: "Transfer",
      typeCode: "T",
      sequence: 3,
      location: {
        name: "Ahmedabad",
        city: "Ahmedabad",
        state: "Gujarat"
      },
      vehicle: {
        number: "MH 12P 3872",
        type: "Truck"
      },
      driver: {
        name: "Mukesh"
      },
      load: {
        id: "457283924"
      },
      coordinates: [72.5714, 23.0225]
    },
    {
      id: "stop-4",
      journeyId: "PB 09 HH6439",
      type: "Destination",
      typeCode: "D",
      sequence: 4,
      location: {
        name: "CVT plant",
        city: "Mumbai",
        state: "Maharashtra",
        rating: 4.9
      },
      vehicle: {
        number: "MH 12P 3872",
        type: "Truck"
      },
      driver: {
        name: "Mukesh"
      },
      load: {
        id: "457283924"
      },
      coordinates: [72.8777, 19.0760]
    },
    {
      id: "stop-5",
      journeyId: "PB 09 HH6439",
      type: "Return Pickup",
      typeCode: "RP",
      sequence: 5,
      location: {
        name: "MDC Jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        rating: 3.8
      },
      vehicle: {
        number: "MH 12P 3872",
        type: "Truck"
      },
      driver: {
        name: "Mukesh"
      },
      load: {
        id: "457283924",
        isReturn: true
      },
      coordinates: [75.7873, 26.9124]
    },
    {
      id: "stop-6",
      journeyId: "PB 09 HH6439",
      type: "Return Origin",
      typeCode: "OR",
      sequence: 6,
      location: {
        name: "MDC Labs ltd",
        city: "Amritsar",
        state: "Punjab",
        rating: 3.5
      },
      vehicle: {
        number: "MH 12P 3872",
        type: "Truck"
      },
      driver: {
        name: "Mukesh"
      },
      load: {
        id: "457283924",
        isReturn: true
      },
      coordinates: [74.8723, 31.6340]
    }
  ],
  mapCoordinates: {
    center: [78.9629, 20.5937],
    zoom: 4
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all journeys with optional filtering
 * @param {Object} filters - Filters to apply to the journeys
 * @returns {Promise<Array>} - Promise that resolves to an array of journeys
 */
export const getJourneys = async (filters = {}) => {
  // Simulate API delay
  await delay(500);

  // Start with all journeys
  let filteredJourneys = [...mockJourneys];

  // Apply filters
  if (filters.type) {
    filteredJourneys = filteredJourneys.filter(journey => journey.type === filters.type);
  }

  if (filters.status) {
    filteredJourneys = filteredJourneys.filter(journey => journey.status === filters.status);
  }

  if (filters.sourceBranch) {
    filteredJourneys = filteredJourneys.filter(journey => journey.sourceBranch === filters.sourceBranch);
  }

  if (filters.destinationBranch) {
    filteredJourneys = filteredJourneys.filter(journey => journey.destinationBranch === filters.destinationBranch);
  }

  if (filters.fromDate) {
    const fromDate = new Date(filters.fromDate);
    filteredJourneys = filteredJourneys.filter(journey => new Date(journey.createdAt) >= fromDate);
  }

  if (filters.toDate) {
    const toDate = new Date(filters.toDate);
    filteredJourneys = filteredJourneys.filter(journey => new Date(journey.createdAt) <= toDate);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredJourneys = filteredJourneys.filter(journey =>
      journey.id.toLowerCase().includes(searchTerm) ||
      journey.tripId.toLowerCase().includes(searchTerm) ||
      journey.vehicleNumber.toLowerCase().includes(searchTerm) ||
      journey.driverName.toLowerCase().includes(searchTerm) ||
      journey.from.location.toLowerCase().includes(searchTerm) ||
      journey.to.location.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;

    filteredJourneys.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  } else {
    // Default sort by createdAt (newest first)
    filteredJourneys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Apply pagination
  if (filters.page && filters.limit) {
    const page = parseInt(filters.page);
    const limit = parseInt(filters.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    filteredJourneys = filteredJourneys.slice(startIndex, endIndex);
  }

  // Convert to Journey objects
  return filteredJourneys.map(journey => new Journey(journey));
};

/**
 * Get a journey by ID
 * @param {string} id - The ID of the journey to get
 * @returns {Promise<Journey>} - Promise that resolves to a journey
 */
export const getJourneyById = async (id) => {
  // Simulate API delay
  await delay(300);

  const journey = mockJourneys.find(journey => journey.id === id);

  if (!journey) {
    throw new Error(`Journey with ID ${id} not found`);
  }

  return new Journey(journey);
};

/**
 * Create a new journey
 * @param {Object} journeyData - The data for the new journey
 * @returns {Promise<Journey>} - Promise that resolves to the created journey
 */
export const createJourney = async (journeyData) => {
  // Simulate API delay
  await delay(700);

  // Create a new journey with a unique ID
  const newJourney = new Journey({
    ...journeyData,
    id: `JRN-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // In a real app, we would save this to the backend
  // For now, we'll just return the new journey
  return newJourney;
};

/**
 * Update a journey
 * @param {string} id - The ID of the journey to update
 * @param {Object} journeyData - The updated data for the journey
 * @returns {Promise<Journey>} - Promise that resolves to the updated journey
 */
export const updateJourney = async (id, journeyData) => {
  // Simulate API delay
  await delay(500);

  const journeyIndex = mockJourneys.findIndex(journey => journey.id === id);

  if (journeyIndex === -1) {
    throw new Error(`Journey with ID ${id} not found`);
  }

  // Update the journey
  const updatedJourney = {
    ...mockJourneys[journeyIndex],
    ...journeyData,
    updatedAt: new Date().toISOString(),
  };

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated journey
  return new Journey(updatedJourney);
};

/**
 * Delete a journey
 * @param {string} id - The ID of the journey to delete
 * @returns {Promise<boolean>} - Promise that resolves to true if the journey was deleted
 */
export const deleteJourney = async (id) => {
  // Simulate API delay
  await delay(500);

  const journeyIndex = mockJourneys.findIndex(journey => journey.id === id);

  if (journeyIndex === -1) {
    throw new Error(`Journey with ID ${id} not found`);
  }

  // In a real app, we would delete this from the backend
  // For now, we'll just return true
  return true;
};

/**
 * Get alerts for a journey
 * @param {string} journeyId - The ID of the journey to get alerts for
 * @returns {Promise<Array>} - Promise that resolves to an array of alerts
 */
export const getJourneyAlerts = async (journeyId) => {
  // Simulate API delay
  await delay(300);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  return journey.alerts.map(alert => new Alert(alert));
};

/**
 * Get timeline events for a journey
 * @param {string} journeyId - The ID of the journey to get timeline events for
 * @returns {Promise<Array>} - Promise that resolves to an array of timeline events
 */
export const getJourneyTimeline = async (journeyId) => {
  // Simulate API delay
  await delay(300);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  return journey.timeline.map(event => new TimelineEvent(event));
};

/**
 * Get stops for a journey
 * @param {string} journeyId - The ID of the journey to get stops for
 * @returns {Promise<Array>} - Promise that resolves to an array of stops
 */
export const getJourneyStops = async (journeyId) => {
  // Simulate API delay
  await delay(300);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  return journey.stops.map(stop => new Stop(stop));
};

/**
 * Get documents for a journey
 * @param {string} journeyId - The ID of the journey to get documents for
 * @returns {Promise<Array>} - Promise that resolves to an array of documents
 */
export const getJourneyDocuments = async (journeyId) => {
  // Simulate API delay
  await delay(300);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  return journey.documents.map(document => new Document(document));
};

/**
 * Upload a document for a journey
 * @param {string} journeyId - The ID of the journey to upload a document for
 * @param {File} file - The file to upload
 * @param {string} type - The type of document
 * @param {Object} metadata - Additional metadata for the document
 * @returns {Promise<Document>} - Promise that resolves to the uploaded document
 */
export const uploadJourneyDocument = async (journeyId, file, type, metadata = {}) => {
  // Simulate API delay
  await delay(1000);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  // Create a new document
  const newDocument = new Document({
    id: `DOC-${Date.now()}`,
    journeyId,
    type,
    name: file.name,
    url: URL.createObjectURL(file), // In a real app, this would be a URL to the uploaded file
    mimeType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    uploadedBy: 'current-user', // In a real app, this would be the current user
    metadata,
  });

  // In a real app, we would save this to the backend
  // For now, we'll just return the new document
  return newDocument;
};

/**
 * Update journey status
 * @param {string} journeyId - The ID of the journey to update
 * @param {string} status - The new status
 * @param {Object} data - Additional data for the status update
 * @returns {Promise<Journey>} - Promise that resolves to the updated journey
 */
export const updateJourneyStatus = async (journeyId, status, data = {}) => {
  // Simulate API delay
  await delay(500);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  // Create a timeline event for the status update
  const timelineEvent = new TimelineEvent({
    id: `EVT-${Date.now()}`,
    journeyId,
    milestone: status,
    timestamp: new Date().toISOString(),
    location: data.location || journey.currentLocation,
    notes: data.notes || '',
    documents: data.documents || [],
    createdBy: 'current-user', // In a real app, this would be the current user
  });

  // Update the journey
  const updatedJourney = {
    ...journey,
    status,
    updatedAt: new Date().toISOString(),
    timeline: [...journey.timeline, timelineEvent],
    ...data,
  };

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated journey
  return new Journey(updatedJourney);
};

/**
 * Submit POD for a journey
 * @param {string} journeyId - The ID of the journey to submit POD for
 * @param {Array} documents - The POD documents
 * @param {string} notes - Additional notes for the POD submission
 * @returns {Promise<Journey>} - Promise that resolves to the updated journey
 */
export const submitJourneyPOD = async (journeyId, documents, notes = '') => {
  // Simulate API delay
  await delay(700);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  // Update the journey
  const updatedJourney = {
    ...journey,
    podStatus: 'submitted',
    podSubmittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    documents: [...journey.documents, ...documents],
  };

  // Create a timeline event for the POD submission
  const timelineEvent = new TimelineEvent({
    id: `EVT-${Date.now()}`,
    journeyId,
    milestone: 'pod-submitted',
    timestamp: new Date().toISOString(),
    notes,
    documents: documents.map(doc => doc.id),
    createdBy: 'current-user', // In a real app, this would be the current user
  });

  updatedJourney.timeline = [...journey.timeline, timelineEvent];

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated journey
  return new Journey(updatedJourney);
};

/**
 * Approve POD for a journey
 * @param {string} journeyId - The ID of the journey to approve POD for
 * @param {string} notes - Additional notes for the POD approval
 * @returns {Promise<Journey>} - Promise that resolves to the updated journey
 */
export const approveJourneyPOD = async (journeyId, notes = '') => {
  // Simulate API delay
  await delay(500);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  if (journey.podStatus !== 'submitted') {
    throw new Error('POD must be submitted before it can be approved');
  }

  // Update the journey
  const updatedJourney = {
    ...journey,
    podStatus: 'approved',
    podApprovedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Create a timeline event for the POD approval
  const timelineEvent = new TimelineEvent({
    id: `EVT-${Date.now()}`,
    journeyId,
    milestone: 'pod-approved',
    timestamp: new Date().toISOString(),
    notes,
    createdBy: 'current-user', // In a real app, this would be the current user
  });

  updatedJourney.timeline = [...journey.timeline, timelineEvent];

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated journey
  return new Journey(updatedJourney);
};

/**
 * Reject POD for a journey
 * @param {string} journeyId - The ID of the journey to reject POD for
 * @param {string} reason - The reason for the POD rejection
 * @returns {Promise<Journey>} - Promise that resolves to the updated journey
 */
export const rejectJourneyPOD = async (journeyId, reason = '') => {
  // Simulate API delay
  await delay(500);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  if (journey.podStatus !== 'submitted') {
    throw new Error('POD must be submitted before it can be rejected');
  }

  // Update the journey
  const updatedJourney = {
    ...journey,
    podStatus: 'rejected',
    podRejectedAt: new Date().toISOString(),
    podRejectionReason: reason,
    updatedAt: new Date().toISOString(),
  };

  // Create a timeline event for the POD rejection
  const timelineEvent = new TimelineEvent({
    id: `EVT-${Date.now()}`,
    journeyId,
    milestone: 'pod-rejected',
    timestamp: new Date().toISOString(),
    notes: reason,
    createdBy: 'current-user', // In a real app, this would be the current user
  });

  updatedJourney.timeline = [...journey.timeline, timelineEvent];

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated journey
  return new Journey(updatedJourney);
};

/**
 * Create an alert for a journey
 * @param {string} journeyId - The ID of the journey to create an alert for
 * @param {Object} alertData - The data for the new alert
 * @returns {Promise<Alert>} - Promise that resolves to the created alert
 */
export const createJourneyAlert = async (journeyId, alertData) => {
  // Simulate API delay
  await delay(500);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  // Create a new alert
  const newAlert = new Alert({
    ...alertData,
    id: `ALT-${Date.now()}`,
    journeyId,
    timestamp: new Date().toISOString(),
  });

  // In a real app, we would save this to the backend
  // For now, we'll just return the new alert
  return newAlert;
};

/**
 * Resolve an alert for a journey
 * @param {string} journeyId - The ID of the journey
 * @param {string} alertId - The ID of the alert to resolve
 * @param {string} notes - Additional notes for the alert resolution
 * @returns {Promise<Alert>} - Promise that resolves to the updated alert
 */
export const resolveJourneyAlert = async (journeyId, alertId, notes = '') => {
  // Simulate API delay
  await delay(500);

  const journey = mockJourneys.find(journey => journey.id === journeyId);

  if (!journey) {
    throw new Error(`Journey with ID ${journeyId} not found`);
  }

  const alertIndex = journey.alerts.findIndex(alert => alert.id === alertId);

  if (alertIndex === -1) {
    throw new Error(`Alert with ID ${alertId} not found for journey ${journeyId}`);
  }

  // Update the alert
  const updatedAlert = {
    ...journey.alerts[alertIndex],
    isResolved: true,
    resolvedAt: new Date().toISOString(),
    resolutionNotes: notes,
  };

  // In a real app, we would save this to the backend
  // For now, we'll just return the updated alert
  return new Alert(updatedAlert);
};

/**
 * Get journey statistics
 * @param {Object} filters - Filters to apply to the statistics
 * @returns {Promise<Object>} - Promise that resolves to journey statistics
 */
export const getJourneyStatistics = async (filters = {}) => {
  // Simulate API delay
  await delay(700);

  // Get filtered journeys
  const journeys = await getJourneys(filters);

  // Calculate statistics
  const totalJourneys = journeys.length;
  const completedJourneys = journeys.filter(journey => journey.status === 'delivered').length;
  const inTransitJourneys = journeys.filter(journey => journey.status === 'in-transit').length;
  const delayedJourneys = journeys.filter(journey => journey.isDelayed).length;
  const onTimePercentage = totalJourneys > 0 ? ((totalJourneys - delayedJourneys) / totalJourneys) * 100 : 0;

  // Calculate average journey duration
  let totalDuration = 0;
  let journeysWithDuration = 0;

  journeys.forEach(journey => {
    if (journey.expectedDeparture && journey.expectedArrival) {
      totalDuration += journey.getDuration();
      journeysWithDuration++;
    }
  });

  const averageDuration = journeysWithDuration > 0 ? totalDuration / journeysWithDuration : 0;

  // Count journeys by type
  const journeysByType = {
    ftl: journeys.filter(journey => journey.type === 'ftl').length,
    ptl: journeys.filter(journey => journey.type === 'ptl').length,
  };

  // Count journeys by status
  const journeysByStatus = {};
  journeys.forEach(journey => {
    if (!journeysByStatus[journey.status]) {
      journeysByStatus[journey.status] = 0;
    }
    journeysByStatus[journey.status]++;
  });

  // Count alerts by type
  const alertsByType = {};
  journeys.forEach(journey => {
    journey.alerts.forEach(alert => {
      if (!alertsByType[alert.type]) {
        alertsByType[alert.type] = 0;
      }
      alertsByType[alert.type]++;
    });
  });

  return {
    totalJourneys,
    completedJourneys,
    inTransitJourneys,
    delayedJourneys,
    onTimePercentage,
    averageDuration,
    journeysByType,
    journeysByStatus,
    alertsByType,
  };
};

/**
 * Get journey KPIs
 * @param {Object} filters - Filters to apply to the KPIs
 * @returns {Promise<Object>} - Promise that resolves to journey KPIs
 */
export const getJourneyKPIs = async (filters = {}) => {
  // Simulate API delay
  await delay(500);

  // Get statistics
  const statistics = await getJourneyStatistics(filters);

  // Calculate KPIs
  return {
    totalJourneys: {
      value: statistics.totalJourneys,
      trend: 0.05, // 5% increase (in a real app, this would be calculated)
    },
    onTimeDelivery: {
      value: statistics.onTimePercentage.toFixed(1),
      trend: 0.02, // 2% increase
    },
    averageDuration: {
      value: statistics.averageDuration.toFixed(1),
      trend: -0.01, // 1% decrease (improvement)
    },
    activeAlerts: {
      value: statistics.delayedJourneys,
      trend: 0.1, // 10% increase (negative)
    },
  };
};

// Cache for journey details to avoid repeated fetches
const journeyDetailsCache = new Map();

// Add status updates and documents to the mock data
mockJourneyDetails.statusUpdates = [
  {
    status: 'LOADING_STARTED',
    note: 'Driver arrived at origin facility',
    timestamp: '2024-01-06T04:30:00Z'
  },
  {
    status: 'LOADING_COMPLETED',
    note: 'All cargo loaded and secured',
    timestamp: '2024-01-06T06:15:00Z'
  },
  {
    status: 'IN_TRANSIT',
    note: 'Vehicle departed origin facility',
    timestamp: '2024-01-06T06:30:00Z'
  }
];

mockJourneyDetails.documents = [
  {
    id: 'doc-1',
    name: 'Bill of Lading',
    type: 'BOL',
    fileName: 'bill_of_lading_457283924.pdf',
    fileSize: 1258291,
    uploadDate: '2024-01-06T03:45:00Z',
    url: '#'
  },
  {
    id: 'doc-2',
    name: 'Shipping Invoice',
    type: 'INVOICE',
    fileName: 'invoice_MDC_457283924.pdf',
    fileSize: 982145,
    uploadDate: '2024-01-06T03:50:00Z',
    url: '#'
  }
];

/**
 * Fetch journey details by ID for the new journey details page
 * This is separate from getJourneyById to support the new UI design
 *
 * @param {string} journeyId - Journey ID
 * @param {boolean} forceRefresh - Whether to force a refresh from the server
 * @returns {Promise<Object>} - Journey details
 */
export const fetchJourneyDetails = async (journeyId, forceRefresh = false) => {
  // Check cache first if not forcing refresh
  if (!forceRefresh && journeyDetailsCache.has(journeyId)) {
    console.log('Using cached journey details for:', journeyId);
    return journeyDetailsCache.get(journeyId);
  }

  // Simulate API delay
  await delay(1000);

  // In a real application, this would fetch data from an API
  // For now, we'll return mock data
  const journeyDetails = { ...mockJourneyDetails, id: journeyId };

  // Store in cache
  journeyDetailsCache.set(journeyId, journeyDetails);

  return journeyDetails;
};

/**
 * Update journey load information
 *
 * @param {string} journeyId - Journey ID
 * @param {string} stopId - Stop ID
 * @param {Object} loadData - Updated load data
 * @returns {Promise<Object>} - Updated journey details
 */
export const updateJourneyLoad = async (journeyId, stopId, loadData) => {
  // Simulate API delay
  await delay(500);

  // Get the current journey details (from cache if available)
  let journeyToUpdate;

  if (journeyDetailsCache.has(journeyId)) {
    journeyToUpdate = { ...journeyDetailsCache.get(journeyId) };
  } else {
    journeyToUpdate = { ...mockJourneyDetails };
  }

  // Find and update the stop
  journeyToUpdate.stops = journeyToUpdate.stops.map(stop => {
    if (stop.id === stopId) {
      return {
        ...stop,
        load: {
          ...stop.load,
          ...loadData
        }
      };
    }
    return stop;
  });

  // Update the cache
  journeyDetailsCache.set(journeyId, journeyToUpdate);

  return journeyToUpdate;
};

/**
 * Add journey status update
 *
 * @param {string} journeyId - Journey ID
 * @param {Object} statusUpdate - Status update object
 * @returns {Promise<Object>} - Updated journey details
 */
export const addJourneyStatusUpdate = async (journeyId, statusUpdate) => {
  // Simulate API delay
  await delay(500);

  // Get the current journey details (from cache if available)
  let journeyToUpdate;

  if (journeyDetailsCache.has(journeyId)) {
    journeyToUpdate = { ...journeyDetailsCache.get(journeyId) };
  } else {
    journeyToUpdate = { ...mockJourneyDetails };
  }

  // Add the status update
  journeyToUpdate.statusUpdates = [
    ...(journeyToUpdate.statusUpdates || []),
    statusUpdate
  ];

  // Sort status updates by timestamp (newest first)
  journeyToUpdate.statusUpdates.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  // Update the cache
  journeyDetailsCache.set(journeyId, journeyToUpdate);

  return journeyToUpdate;
};

/**
 * Add document to journey details
 *
 * @param {string} journeyId - Journey ID
 * @param {Object} document - Document object
 * @returns {Promise<Object>} - Updated journey details
 */
export const addJourneyDocument = async (journeyId, document) => {
  // Simulate API delay
  await delay(1000);

  // Get the current journey details (from cache if available)
  let journeyToUpdate;

  if (journeyDetailsCache.has(journeyId)) {
    journeyToUpdate = { ...journeyDetailsCache.get(journeyId) };
  } else {
    journeyToUpdate = { ...mockJourneyDetails };
  }

  // Add the document
  journeyToUpdate.documents = [
    ...(journeyToUpdate.documents || []),
    document
  ];

  // Update the cache
  journeyDetailsCache.set(journeyId, journeyToUpdate);

  return journeyToUpdate;
};

/**
 * Delete journey document
 *
 * @param {string} journeyId - Journey ID
 * @param {string} documentId - Document ID
 * @returns {Promise<Object>} - Updated journey details
 */
export const deleteJourneyDocument = async (journeyId, documentId) => {
  // Simulate API delay
  await delay(500);

  // Get the current journey details (from cache if available)
  let journeyToUpdate;

  if (journeyDetailsCache.has(journeyId)) {
    journeyToUpdate = { ...journeyDetailsCache.get(journeyId) };
  } else {
    journeyToUpdate = { ...mockJourneyDetails };
  }

  // Remove the document
  journeyToUpdate.documents = journeyToUpdate.documents.filter(doc => doc.id !== documentId);

  // Update the cache
  journeyDetailsCache.set(journeyId, journeyToUpdate);

  return journeyToUpdate;
};
