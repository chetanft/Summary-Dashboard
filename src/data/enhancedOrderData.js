/**
 * Enhanced order data for the TMS Dashboard
 * Includes 30 orders with different stages and statuses
 * Following the updated order flow:
 * 
 * SO Generated → Planning (Trip type decided) → 
 *   FTL Flow: Indent → Tracking (At Loading, In Transit, At Unloading) → ePOD (Pending, Approved, Disputed, Rejected) → Freight Invoicing
 *   PTL Flow: Order Booking → Tracking (Picked up, In Transit, At Destination, Out for delivery, Delivered) → ePOD (Pending, Approved, Rejected, Disputed) → Freight Invoicing (Contracted Bill, Reconciliation, Approved, Dispute Management)
 */

// Helper function to generate random date within the last 30 days
const generateRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to generate random ETA (1-10 days from now)
const generateRandomETA = () => {
  const now = new Date();
  const daysAhead = Math.floor(Math.random() * 10) + 1;
  const date = new Date(now.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to generate random weight based on trip type
const generateRandomWeight = (tripType) => {
  if (tripType === 'FTL') {
    return `${Math.floor(Math.random() * 30) + 40} Ton`; // 40-70 Ton for FTL
  } else {
    return `${Math.floor(Math.random() * 15) + 5} Ton`; // 5-20 Ton for PTL
  }
};

// Helper function to generate random tracking ID based on stage and trip type
const generateTrackingId = (stage, tripType) => {
  const randomId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  switch(stage) {
    case 'Planning':
      return ''; // No tracking ID in planning stage
    case 'Indent':
      return `Indent: ${randomId}`;
    case 'Order Booking':
      return `Ref: ${randomId}`;
    case 'Tracking':
      return tripType === 'FTL' ? `Trip: ${randomId}` : `AWB: ${randomId}`;
    case 'ePOD':
      return `ePOD: ${randomId}`;
    case 'Freight Invoicing':
      return `INV: ${randomId}`;
    default:
      return '';
  }
};

// Helper function to generate random status based on stage and trip type
const generateStatus = (stage, tripType) => {
  const statuses = {
    'Planning': ['In Process'],
    'Indent': ['Published', 'Pending Assignment', 'In Assignment'],
    'Order Booking': ['Created', 'In Assignment', 'Confirmed'],
    'Tracking': {
      'FTL': ['At Loading', 'In Transit', 'At Unloading'],
      'PTL': ['Picked up', 'In Transit', 'At Destination', 'Out for delivery', 'Delivered']
    },
    'ePOD': ['Pending', 'Approved', 'Disputed', 'Rejected'],
    'Freight Invoicing': {
      'FTL': ['Generated', 'Approved', 'Disputed'],
      'PTL': ['Contracted Bill', 'Reconciliation', 'Approved', 'Dispute Management']
    }
  };

  if (stage === 'Tracking' || stage === 'Freight Invoicing') {
    const options = statuses[stage][tripType];
    return options[Math.floor(Math.random() * options.length)];
  } else {
    const options = statuses[stage];
    return options[Math.floor(Math.random() * options.length)];
  }
};

// Helper function to determine if an order is delayed
const isDelayed = () => {
  return Math.random() < 0.3; // 30% chance of being delayed
};

// Generate 30 orders with different stages and statuses
export const enhancedOrderData = Array.from({ length: 30 }, (_, index) => {
  const orderNumber = 21500 + index;
  const orderDate = generateRandomDate();
  
  // Determine stage - distribute orders across different stages
  let stage;
  if (index < 5) {
    stage = 'Planning';
  } else if (index < 10) {
    stage = 'Indent'; // FTL only
  } else if (index < 15) {
    stage = 'Order Booking'; // PTL only
  } else if (index < 20) {
    stage = 'Tracking';
  } else if (index < 25) {
    stage = 'ePOD';
  } else {
    stage = 'Freight Invoicing';
  }
  
  // Determine trip type - for Planning stage, trip type is not yet decided
  let tripType;
  if (stage === 'Planning') {
    tripType = 'Undecided';
  } else if (stage === 'Indent') {
    tripType = 'FTL';
  } else if (stage === 'Order Booking') {
    tripType = 'PTL';
  } else {
    // For other stages, randomly assign FTL or PTL
    tripType = Math.random() < 0.5 ? 'FTL' : 'PTL';
  }
  
  // Generate appropriate status based on stage and trip type
  const status = generateStatus(stage, tripType);
  
  // Determine if order is delayed
  const delayed = isDelayed();
  
  // Generate random consignor and consignee
  const consignors = ['JSW Steel', 'Tata Steel', 'SAIL', 'Jindal Steel', 'Essar Steel'];
  const consignees = ['Star Retailers', 'Metro Distributors', 'City Traders', 'Prime Logistics', 'Global Supplies'];
  const consignor = consignors[Math.floor(Math.random() * consignors.length)];
  const consignee = consignees[Math.floor(Math.random() * consignees.length)];
  
  // Generate random route
  const origins = ['AMRIT', 'MUM', 'DEL', 'CHN', 'KOL'];
  const destinations = ['HYD', 'BLR', 'PUN', 'AHM', 'JAI'];
  const origin = origins[Math.floor(Math.random() * origins.length)];
  const destination = destinations[Math.floor(Math.random() * destinations.length)];
  const route = `${origin}-${destination}`;
  
  // Generate tracking ID
  const trackingId = generateTrackingId(stage, tripType);
  
  // Generate delivery status
  const eta = generateRandomETA();
  let deliveryStatus;
  
  if (delayed) {
    deliveryStatus = {
      type: 'delayed',
      label: 'Delayed by 1 day',
      eta: eta
    };
  } else {
    deliveryStatus = {
      type: 'ontime',
      label: 'On time',
      eta: eta
    };
  }
  
  // Generate order details
  return {
    id: `SO: ${orderNumber}`,
    consignor: consignor,
    consignee: consignee,
    route: route,
    tripType: tripType,
    stage: stage,
    status: status,
    trackingId: trackingId,
    deliveryStatus: deliveryStatus,
    statusColor: delayed ? 'error' : 'success',
    details: {
      weight: generateRandomWeight(tripType),
      orderDate: orderDate,
      origin: origin,
      destination: destination,
      vehicle: (stage === 'Tracking' || stage === 'ePOD') ? `MH ${Math.floor(Math.random() * 100)} JK ${Math.floor(Math.random() * 10000)}` : 'Pending Assignment',
      driver: (stage === 'Tracking' || stage === 'ePOD') ? ['Rajesh Kumar', 'Sunil Sharma', 'Manoj Singh', 'Anil Patel'][Math.floor(Math.random() * 4)] : 'Pending Assignment',
      currentLocation: stage === 'Tracking' ? ['Pune, Maharashtra', 'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka'][Math.floor(Math.random() * 4)] : 'N/A',
      distance: Math.floor(Math.random() * 1000) + 100,
      expectedDelivery: eta,
    },
    milestones: {
      current: {
        status: status,
        assignedTo: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'][Math.floor(Math.random() * 4)],
        eta: `09:${Math.floor(Math.random() * 60)} AM, ${eta}`,
      },
      next: {
        name: stage === 'Planning' ? (Math.random() < 0.5 ? 'Indent' : 'Order Booking') :
             stage === 'Indent' ? 'Tracking' :
             stage === 'Order Booking' ? 'Tracking' :
             stage === 'Tracking' ? 'ePOD' :
             stage === 'ePOD' ? 'Freight Invoicing' : 'Completed',
        eta: `07:${Math.floor(Math.random() * 60)} AM, ${eta}`,
      }
    },
    generatedIds: {
      // For Planning stage
      'Plan ID': (() => {
        // If we're past Planning, always show ID
        if (stage !== 'Planning') {
          return `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
        }
        // If we're in Planning stage, show ID for some orders
        else {
          // 50% chance of having a Plan ID
          return Math.random() < 0.5 ? `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}` : 'Pending';
        }
      })(),

      // For Indent stage (FTL only)
      'Indent ID': (() => {
        // If we're past Indent in FTL flow, always show ID
        if (tripType === 'FTL' && (stage === 'Tracking' || stage === 'ePOD' || stage === 'Freight Invoicing')) {
          return `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
        }
        // If we're in Indent stage, show ID for some orders
        else if (stage === 'Indent') {
          // 70% chance of having an Indent ID
          return Math.random() < 0.7 ? `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}` : 'Pending';
        }
        // Otherwise pending
        else {
          return 'Pending';
        }
      })(),

      // For Order Booking stage (PTL only)
      'Booking ID': (() => {
        // If we're past Order Booking in PTL flow, always show ID
        if (tripType === 'PTL' && (stage === 'Tracking' || stage === 'ePOD' || stage === 'Freight Invoicing')) {
          return `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
        }
        // If we're in Order Booking stage, show ID for some orders
        else if (stage === 'Order Booking') {
          // 70% chance of having a Booking ID
          return Math.random() < 0.7 ? `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}` : 'Pending';
        }
        // Otherwise pending
        else {
          return 'Pending';
        }
      })(),

      // For Tracking stage
      'Trip ID': (() => {
        // If we're past Tracking, always show ID
        if (stage === 'ePOD' || stage === 'Freight Invoicing') {
          return `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
        }
        // If we're in Tracking stage, show ID for some orders
        else if (stage === 'Tracking') {
          // 80% chance of having a Trip ID
          return Math.random() < 0.8 ? `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}` : 'Pending';
        }
        // Otherwise pending
        else {
          return 'Pending';
        }
      })(),

      // For ePOD stage
      'Invoice ID': (() => {
        // If we're past ePOD, always show ID
        if (stage === 'Freight Invoicing') {
          return `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
        }
        // If we're in ePOD stage, show ID for some orders
        else if (stage === 'ePOD') {
          // 60% chance of having an Invoice ID
          return Math.random() < 0.6 ? `${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}` : 'Pending';
        }
        // Otherwise pending
        else {
          return 'Pending';
        }
      })()
    },
    comments: [
      {
        user: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'][Math.floor(Math.random() * 4)],
        timestamp: `${Math.floor(Math.random() * 30) + 1} ${['Jan', 'Feb', 'Mar', 'Apr', 'May'][Math.floor(Math.random() * 5)]} 2024, ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() < 0.5 ? 'AM' : 'PM'}`,
        text: ['Order has been created and is pending planning.', 'Vehicle assignment in progress.', 'Shipment is on the way.', 'Delivery completed successfully.', 'Invoice has been generated.'][Math.floor(Math.random() * 5)],
      },
      {
        user: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'][Math.floor(Math.random() * 4)],
        timestamp: `${Math.floor(Math.random() * 30) + 1} ${['Jan', 'Feb', 'Mar', 'Apr', 'May'][Math.floor(Math.random() * 5)]} 2024, ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() < 0.5 ? 'AM' : 'PM'}`,
        text: ['Expected to be completed by EOD.', 'Customer has been notified.', 'Waiting for confirmation.', 'Documents have been verified.', 'Payment has been processed.'][Math.floor(Math.random() * 5)],
      },
    ],
  };
});
