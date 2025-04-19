// Journey data model for My Journeys page
export const journeyData = [
  {
    id: 'J001',
    tripId: 'TR12345',
    type: 'FTL',
    status: 'en-route-to-loading',
    statusText: 'En Route to Loading',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6439',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'Vehicle Assigned',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J002',
    tripId: 'TR12346',
    type: 'FTL',
    status: 'en-route-to-loading',
    statusText: 'En Route to Loading',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Navi Mumbai, MH',
      company: 'CVT Plant'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Jai Sri Ram'
    },
    vehicleInfo: 'KA12 AS 3421',
    tripInfo: 'Laal Kamal Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'Vehicle Assigned',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J003',
    tripId: 'TR12347',
    type: 'FTL',
    status: 'in-transit',
    statusText: 'In Transit',
    isDelayed: true,
    eta: '12:30 pm, 12 Aug',
    delayTime: '2 hr',
    from: {
      location: 'Navi Mumbai, MH',
      company: 'CVT Plant'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: 'KA12 AS 3422',
    tripInfo: 'Laal Kamal Transporter',
    contactNumber: '84973-47593',
    communicationType: 'GPS',
    vehicleStatus: 'In Transit',
    departureTime: '09:00 AM, 12 Aug',
    currentLocation: 'Ambala, Haryana'
  },
  {
    id: 'J004',
    tripId: 'TR12348',
    type: 'FTL',
    status: 'in-transit',
    statusText: 'In Transit',
    isDelayed: true,
    eta: '12:30 pm, 12 Aug',
    delayTime: '2 hr',
    from: {
      location: 'Navi Mumbai, MH',
      company: 'CVT Plant'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: 'KA12 AS 3423',
    tripInfo: 'Laal Kamal Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'In Transit',
    departureTime: '09:00 AM, 12 Aug',
    currentLocation: 'Ambala, Haryana'
  },
  {
    id: 'J005',
    tripId: 'TR12349',
    type: 'FTL',
    status: 'in-transit',
    statusText: 'In Transit',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Navi Mumbai, MH',
      company: 'CVT Plant'
    },
    to: {
      location: 'Siddipet, Telangana',
      company: 'Jai Sri Ram'
    },
    vehicleInfo: 'KA12 AS 3424',
    tripInfo: 'Laal Kamal Transporter',
    contactNumber: '84973-47593',
    communicationType: 'GPS',
    vehicleStatus: 'In Transit',
    departureTime: '09:00 AM, 12 Aug',
    currentLocation: 'Ambala, Haryana'
  },
  {
    id: 'J006',
    tripId: 'TR12350',
    type: 'FTL',
    status: 'in-transit',
    statusText: 'In Transit',
    isDelayed: true,
    eta: '12:30 pm, 12 Aug',
    delayTime: '3 hr',
    from: {
      location: 'Navi Mumbai, MH',
      company: 'CVT Plant'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: 'KA12 AS 3423',
    tripInfo: 'Laal Kamal Transporter',
    contactNumber: '+91 84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'In Transit',
    departureTime: '09:00 AM, 12 Aug',
    currentLocation: 'Ambala, Haryana'
  },
  {
    id: 'J007',
    tripId: 'TR12351',
    type: 'FTL',
    status: 'planned',
    statusText: 'Planned',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6440',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'Vehicle Assigned',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J008',
    tripId: 'TR12352',
    type: 'FTL',
    status: 'at-loading',
    statusText: 'At Loading',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6441',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'At Loading',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J009',
    tripId: 'TR12353',
    type: 'FTL',
    status: 'at-unloading',
    statusText: 'At Unloading',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6442',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'At Unloading',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J010',
    tripId: 'TR12354',
    type: 'FTL',
    status: 'in-return',
    statusText: 'In Return',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6443',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'In Return',
    departureTime: '09:00 AM, 12 Aug'
  },
  {
    id: 'J011',
    tripId: 'TR12355',
    type: 'FTL',
    status: 'delivered',
    statusText: 'Delivered',
    isDelayed: false,
    eta: '12:30 pm, 12 Aug',
    delayTime: '',
    from: {
      location: 'Amritsar, PB',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Maharashtra',
      company: 'Maa kashi Distributors'
    },
    vehicleInfo: 'PB09 HH 6444',
    tripInfo: 'Vortex Transporter',
    contactNumber: '84973-47593',
    communicationType: 'SIM',
    vehicleStatus: 'Delivered',
    departureTime: '09:00 AM, 12 Aug'
  }
];

// Get journey count by status
export const getJourneyCountByStatus = (status) => {
  return journeyData.filter(journey => journey.status === status).length;
};

// Get all consignees for filter dropdown
export const getAllConsignees = () => {
  const consignees = new Set();
  journeyData.forEach(journey => {
    consignees.add(journey.to.company);
  });
  return Array.from(consignees);
};
