# Journey Details Data Schema

This document describes the data schema used by the Journey Details page.

## Journey Details

The main data structure for a journey.

```javascript
{
  id: String,                  // Journey ID (e.g., "PB 09 HH6439")
  deliveryTimeframe: {
    days: Number,              // Days until delivery
    minutes: Number            // Minutes until delivery
  },
  shipper: {
    name: String,              // Shipper name
    id: String                 // Shipper ID
  },
  tripStart: {
    date: String,              // ISO date string
    formattedDate: String      // Formatted date string (e.g., "6th Jan 24, 04:00 AM")
  },
  transitTime: {
    days: Number,              // Transit time in days
    hours: Number,             // Transit time in hours
    minutes: Number            // Transit time in minutes
  },
  totalDistance: {
    value: Number,             // Distance value
    unit: String               // Distance unit (e.g., "kms")
  },
  journeyType: String,         // Journey type (e.g., "Round trip")
  stops: Array<Stop>,          // Array of stops
  mapCoordinates: {
    center: [Number, Number],  // Center coordinates [longitude, latitude]
    zoom: Number               // Map zoom level
  }
}
```

## Stop

Represents a stop in the journey.

```javascript
{
  id: String,                  // Stop ID
  journeyId: String,           // Journey ID
  type: String,                // Stop type (e.g., "Origin", "Pickup", "Destination")
  typeCode: String,            // Stop type code (e.g., "OR", "P1", "D")
  sequence: Number,            // Stop sequence number
  location: {
    name: String,              // Location name
    city: String,              // City
    state: String,             // State
    rating: Number             // Location rating (0-5)
  },
  vehicle: {
    number: String,            // Vehicle number
    type: String               // Vehicle type
  },
  driver: {
    name: String               // Driver name
  },
  load: {
    id: String,                // Load ID
    isReturn: Boolean          // Whether this is a return load
  },
  coordinates: [Number, Number] // Coordinates [longitude, latitude]
}
```

## Load

Represents a load in the journey.

```javascript
{
  id: String,                  // Load ID
  isReturn: Boolean            // Whether this is a return load
}
```

## API Responses

### fetchJourneyDetails

Fetches journey details by ID.

**Request:**
```javascript
fetchJourneyDetails(journeyId, forceRefresh = false)
```

**Response:**
```javascript
{
  id: String,                  // Journey ID
  deliveryTimeframe: Object,   // Delivery timeframe
  shipper: Object,             // Shipper information
  tripStart: Object,           // Trip start information
  transitTime: Object,         // Transit time information
  totalDistance: Object,       // Total distance information
  journeyType: String,         // Journey type
  stops: Array,                // Array of stops
  mapCoordinates: Object       // Map coordinates
}
```

### updateJourneyLoad

Updates load information for a specific stop.

**Request:**
```javascript
updateJourneyLoad(journeyId, stopId, loadData)
```

**Request Body:**
```javascript
{
  id: String,                  // New load ID
  isReturn: Boolean            // Whether this is a return load
}
```

**Response:**
```javascript
{
  // Updated journey details
}
```

## Data Validation

### Load ID

- Required
- String
- Cannot be empty

### Return Load

- Optional
- Boolean
- Default: false

## Error Handling

The API may return the following errors:

- **404 Not Found**: Journey or stop not found
- **400 Bad Request**: Invalid load data
- **500 Internal Server Error**: Server error

## Data Flow

1. The `JourneyDetailsPage` component fetches journey details using `fetchJourneyDetails`.
2. The journey details are passed down to child components as props.
3. The `LoadIDCell` component can update load information using `updateJourneyLoad`.
4. Updates are handled with optimistic UI updates to provide a responsive user experience.

## Caching

The journey service implements a caching mechanism to avoid repeated API calls:

- Journey details are cached in memory
- The cache is updated when load information is updated
- The cache can be bypassed by setting `forceRefresh` to `true`

## Example Data

```javascript
{
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
    // Additional stops...
  ],
  mapCoordinates: {
    center: [78.9629, 20.5937],
    zoom: 4
  }
}
```
