/**
 * Mock Journey Data
 * This file contains mock data for the Journey module
 */
import {
  JourneyStatus,
  JourneyType,
  JourneyCreationMethod,
  PODStatus,
  AlertType,
  AlertSeverity,
  TrackingType,
  ConsentStatus
} from '../models/JourneyModel';

/**
 * Generate a random date within a range
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {Date} - Random date between start and end
 */
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

/**
 * Generate a random location in India
 * @returns {Object} - Random location with name, lat, and lng
 */
const randomLocation = () => {
  const locations = [
    { name: 'Mumbai', lat: 19.076, lng: 72.877 },
    { name: 'Delhi', lat: 28.704, lng: 77.102 },
    { name: 'Bangalore', lat: 12.972, lng: 77.594 },
    { name: 'Hyderabad', lat: 17.385, lng: 78.487 },
    { name: 'Chennai', lat: 13.083, lng: 80.270 },
    { name: 'Kolkata', lat: 22.573, lng: 88.364 },
    { name: 'Ahmedabad', lat: 23.023, lng: 72.572 },
    { name: 'Pune', lat: 18.520, lng: 73.856 },
    { name: 'Jaipur', lat: 26.913, lng: 75.788 },
    { name: 'Lucknow', lat: 26.847, lng: 80.947 },
  ];
  
  return locations[Math.floor(Math.random() * locations.length)];
};

/**
 * Generate a random vehicle number
 * @returns {string} - Random vehicle number
 */
const randomVehicleNumber = () => {
  const states = ['MH', 'DL', 'KA', 'TN', 'AP', 'GJ', 'UP', 'MP', 'RJ', 'WB'];
  const state = states[Math.floor(Math.random() * states.length)];
  const district = Math.floor(Math.random() * 99) + 1;
  const series = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const number = Math.floor(Math.random() * 9000) + 1000;
  
  return `${state}-${district < 10 ? '0' + district : district} ${series} ${number}`;
};

/**
 * Generate a random phone number
 * @returns {string} - Random phone number
 */
const randomPhoneNumber = () => {
  return `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

/**
 * Generate a random name
 * @returns {string} - Random name
 */
const randomName = () => {
  const firstNames = ['Raj', 'Amit', 'Sunil', 'Rahul', 'Vikram', 'Anil', 'Sanjay', 'Priya', 'Neha', 'Anjali'];
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Joshi', 'Mehta', 'Shah', 'Verma', 'Reddy'];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

/**
 * Generate a random company name
 * @returns {string} - Random company name
 */
const randomCompany = () => {
  const companies = [
    'Tata Motors',
    'Reliance Industries',
    'Infosys',
    'Wipro',
    'Mahindra & Mahindra',
    'Bajaj Auto',
    'Hindustan Unilever',
    'ITC Limited',
    'HDFC Bank',
    'ICICI Bank',
  ];
  
  return companies[Math.floor(Math.random() * companies.length)];
};

/**
 * Generate a random branch ID
 * @returns {string} - Random branch ID
 */
const randomBranchId = () => {
  const branches = ['BR001', 'BR002', 'BR003', 'BR004', 'BR005', 'BR006', 'BR007', 'BR008', 'BR009', 'BR010'];
  
  return branches[Math.floor(Math.random() * branches.length)];
};

/**
 * Generate a random journey status
 * @returns {string} - Random journey status
 */
const randomJourneyStatus = () => {
  const statuses = Object.values(JourneyStatus);
  
  return statuses[Math.floor(Math.random() * statuses.length)];
};

/**
 * Generate a random journey type
 * @returns {string} - Random journey type
 */
const randomJourneyType = () => {
  return Math.random() > 0.3 ? JourneyType.FTL : JourneyType.PTL;
};

/**
 * Generate a random journey creation method
 * @returns {string} - Random journey creation method
 */
const randomCreationMethod = () => {
  const methods = Object.values(JourneyCreationMethod);
  
  return methods[Math.floor(Math.random() * methods.length)];
};

/**
 * Generate a random tracking type
 * @returns {string} - Random tracking type
 */
const randomTrackingType = () => {
  const types = Object.values(TrackingType);
  
  return types[Math.floor(Math.random() * types.length)];
};

/**
 * Generate a random consent status
 * @returns {string} - Random consent status
 */
const randomConsentStatus = () => {
  const statuses = Object.values(ConsentStatus);
  
  return statuses[Math.floor(Math.random() * statuses.length)];
};

/**
 * Generate a random POD status
 * @returns {string} - Random POD status
 */
const randomPODStatus = () => {
  const statuses = Object.values(PODStatus);
  
  return statuses[Math.floor(Math.random() * statuses.length)];
};

/**
 * Generate a random alert type
 * @returns {string} - Random alert type
 */
const randomAlertType = () => {
  const types = Object.values(AlertType);
  
  return types[Math.floor(Math.random() * types.length)];
};

/**
 * Generate a random alert severity
 * @returns {string} - Random alert severity
 */
const randomAlertSeverity = () => {
  const severities = Object.values(AlertSeverity);
  
  return severities[Math.floor(Math.random() * severities.length)];
};

/**
 * Generate a random boolean with a given probability
 * @param {number} probability - Probability of true (0-1)
 * @returns {boolean} - Random boolean
 */
const randomBoolean = (probability = 0.5) => {
  return Math.random() < probability;
};

/**
 * Generate a random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a random document
 * @param {string} journeyId - Journey ID
 * @param {string} type - Document type
 * @returns {Object} - Random document
 */
const generateRandomDocument = (journeyId, type) => {
  const id = `DOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const types = ['invoice', 'pod', 'driver', 'vehicle', 'load', 'other'];
  const docType = type || types[Math.floor(Math.random() * types.length)];
  
  return {
    id,
    journeyId,
    type: docType,
    name: `${docType}_${id}.pdf`,
    url: `https://example.com/documents/${id}.pdf`,
    mimeType: 'application/pdf',
    size: randomNumber(100000, 5000000),
    uploadedAt: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    uploadedBy: randomName(),
    metadata: {},
  };
};

/**
 * Generate a random timeline event
 * @param {string} journeyId - Journey ID
 * @param {string} milestone - Event milestone
 * @returns {Object} - Random timeline event
 */
const generateRandomTimelineEvent = (journeyId, milestone) => {
  const id = `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const location = randomLocation();
  
  return {
    id,
    journeyId,
    milestone,
    timestamp: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    location: { lat: location.lat, lng: location.lng },
    notes: `${milestone} event at ${location.name}`,
    documents: randomBoolean(0.3) ? [generateRandomDocument(journeyId, 'event')] : [],
    createdBy: randomName(),
  };
};

/**
 * Generate a random alert
 * @param {string} journeyId - Journey ID
 * @returns {Object} - Random alert
 */
const generateRandomAlert = (journeyId) => {
  const id = `ALT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const type = randomAlertType();
  const severity = randomAlertSeverity();
  const location = randomLocation();
  const isResolved = randomBoolean(0.7);
  
  return {
    id,
    journeyId,
    type,
    severity,
    message: `${type} alert at ${location.name}`,
    timestamp: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    location: { lat: location.lat, lng: location.lng },
    isResolved,
    resolvedAt: isResolved ? randomDate(new Date(2023, 0, 1), new Date()).toISOString() : '',
    resolutionNotes: isResolved ? 'Alert resolved' : '',
    ticketId: isResolved ? `TKT-${Math.floor(Math.random() * 10000)}` : '',
  };
};

/**
 * Generate a random stop
 * @param {string} journeyId - Journey ID
 * @param {string} type - Stop type
 * @returns {Object} - Random stop
 */
const generateRandomStop = (journeyId, type) => {
  const id = `STP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const location = randomLocation();
  const status = randomBoolean(0.7) ? 'completed' : 'pending';
  
  return {
    id,
    journeyId,
    type: type || (randomBoolean() ? 'pickup' : 'delivery'),
    location: location.name,
    address: `123 Main St, ${location.name}`,
    city: location.name,
    state: 'Maharashtra',
    pincode: `${randomNumber(100000, 999999)}`,
    contactPerson: randomName(),
    contactNumber: randomPhoneNumber(),
    expectedArrival: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    actualArrival: status === 'completed' ? randomDate(new Date(2023, 0, 1), new Date()).toISOString() : '',
    expectedDeparture: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    actualDeparture: status === 'completed' ? randomDate(new Date(2023, 0, 1), new Date()).toISOString() : '',
    status,
    notes: `${type} stop at ${location.name}`,
    documents: randomBoolean(0.3) ? [generateRandomDocument(journeyId, 'stop')] : [],
  };
};

/**
 * Generate a random journey
 * @returns {Object} - Random journey
 */
const generateRandomJourney = () => {
  const id = `JRN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const tripId = `TRIP-${Math.floor(Math.random() * 10000)}`;
  const type = randomJourneyType();
  const status = randomJourneyStatus();
  const creationMethod = randomCreationMethod();
  const createdAt = randomDate(new Date(2023, 0, 1), new Date()).toISOString();
  const updatedAt = randomDate(new Date(createdAt), new Date()).toISOString();
  
  const fromLocation = randomLocation();
  const toLocation = randomLocation();
  
  const from = {
    location: fromLocation.name,
    company: randomCompany(),
    address: `123 Main St, ${fromLocation.name}`,
    city: fromLocation.name,
    state: 'Maharashtra',
    pincode: `${randomNumber(100000, 999999)}`,
    contactPerson: randomName(),
    contactNumber: randomPhoneNumber(),
    branchId: randomBranchId(),
  };
  
  const to = {
    location: toLocation.name,
    company: randomCompany(),
    address: `456 Oak St, ${toLocation.name}`,
    city: toLocation.name,
    state: 'Maharashtra',
    pincode: `${randomNumber(100000, 999999)}`,
    contactPerson: randomName(),
    contactNumber: randomPhoneNumber(),
    branchId: randomBranchId(),
  };
  
  const vehicleInfo = `${randomBoolean() ? 'Truck' : 'Container'} ${randomNumber(10, 40)} ft`;
  const vehicleNumber = randomVehicleNumber();
  const driverName = randomName();
  const driverNumber = randomPhoneNumber();
  const trackingType = randomTrackingType();
  const consentStatus = randomConsentStatus();
  
  const expectedDeparture = randomDate(new Date(2023, 0, 1), new Date()).toISOString();
  const expectedArrival = randomDate(new Date(expectedDeparture), new Date()).toISOString();
  const actualDeparture = status !== JourneyStatus.PLANNED ? randomDate(new Date(expectedDeparture), new Date()).toISOString() : '';
  const actualArrival = status === JourneyStatus.DELIVERED ? randomDate(new Date(actualDeparture), new Date()).toISOString() : '';
  const eta = status === JourneyStatus.IN_TRANSIT ? randomDate(new Date(), new Date(new Date().getTime() + 86400000)).toISOString() : '';
  
  const distance = randomNumber(100, 1500);
  const currentLocation = {
    lat: fromLocation.lat + (toLocation.lat - fromLocation.lat) * Math.random(),
    lng: fromLocation.lng + (toLocation.lng - fromLocation.lng) * Math.random(),
  };
  
  const isDelayed = randomBoolean(0.3);
  const delayTime = isDelayed ? `${randomNumber(1, 24)} hours` : '';
  const statusText = isDelayed ? 'Delayed' : 'On Time';
  
  const loadDetails = {
    weight: randomNumber(1000, 30000),
    volume: randomNumber(10, 100),
    packages: randomNumber(10, 1000),
    material: randomBoolean() ? 'Electronics' : 'Textiles',
    value: randomNumber(100000, 10000000),
  };
  
  const invoiceDetails = {
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    invoiceDate: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    invoiceAmount: randomNumber(10000, 100000),
    gst: randomNumber(1000, 10000),
    totalAmount: randomNumber(11000, 110000),
  };
  
  const podStatus = randomPODStatus();
  const podSubmittedAt = podStatus !== PODStatus.PENDING ? randomDate(new Date(actualArrival || expectedArrival), new Date()).toISOString() : '';
  const podApprovedAt = podStatus === PODStatus.APPROVED ? randomDate(new Date(podSubmittedAt), new Date()).toISOString() : '';
  const podRejectedAt = podStatus === PODStatus.REJECTED ? randomDate(new Date(podSubmittedAt), new Date()).toISOString() : '';
  const podRejectionReason = podStatus === PODStatus.REJECTED ? 'Documents incomplete' : '';
  
  const documents = Array(randomNumber(0, 5)).fill().map(() => generateRandomDocument(id));
  
  const timeline = [
    generateRandomTimelineEvent(id, 'journey-created'),
    ...(status !== JourneyStatus.PLANNED ? [generateRandomTimelineEvent(id, 'journey-started')] : []),
    ...(status === JourneyStatus.AT_LOADING ? [generateRandomTimelineEvent(id, 'at-loading')] : []),
    ...(status === JourneyStatus.IN_TRANSIT || status === JourneyStatus.AT_UNLOADING || status === JourneyStatus.DELIVERED ? [generateRandomTimelineEvent(id, 'in-transit')] : []),
    ...(status === JourneyStatus.AT_UNLOADING || status === JourneyStatus.DELIVERED ? [generateRandomTimelineEvent(id, 'at-unloading')] : []),
    ...(status === JourneyStatus.DELIVERED ? [generateRandomTimelineEvent(id, 'delivered')] : []),
    ...(podStatus !== PODStatus.PENDING ? [generateRandomTimelineEvent(id, 'pod-submitted')] : []),
    ...(podStatus === PODStatus.APPROVED ? [generateRandomTimelineEvent(id, 'pod-approved')] : []),
    ...(podStatus === PODStatus.REJECTED ? [generateRandomTimelineEvent(id, 'pod-rejected')] : []),
  ];
  
  const alerts = Array(randomNumber(0, 3)).fill().map(() => generateRandomAlert(id));
  
  const stops = [
    generateRandomStop(id, 'pickup'),
    ...(type === JourneyType.PTL ? Array(randomNumber(1, 3)).fill().map(() => generateRandomStop(id)) : []),
    generateRandomStop(id, 'delivery'),
  ];
  
  const sourceBranch = from.branchId;
  const destinationBranch = to.branchId;
  const intermediateBranches = stops.slice(1, -1).map(stop => randomBranchId());
  
  return {
    id,
    tripId,
    type,
    status,
    creationMethod,
    createdAt,
    updatedAt,
    from,
    to,
    vehicleInfo,
    vehicleNumber,
    driverName,
    driverNumber,
    trackingType,
    consentStatus,
    tripInfo: `${from.location} to ${to.location}`,
    expectedDeparture,
    expectedArrival,
    actualDeparture,
    actualArrival,
    eta,
    distance,
    currentLocation,
    isDelayed,
    delayTime,
    statusText,
    loadDetails,
    invoiceDetails,
    podStatus,
    podSubmittedAt,
    podApprovedAt,
    podRejectedAt,
    podRejectionReason,
    documents,
    timeline,
    alerts,
    stops,
    sourceBranch,
    destinationBranch,
    intermediateBranches,
  };
};

// Generate 50 random journeys
export const mockJourneys = Array(50).fill().map(generateRandomJourney);
