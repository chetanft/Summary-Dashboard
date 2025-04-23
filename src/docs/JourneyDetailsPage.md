# Journey Details Page Documentation

This document provides an overview of the Journey Details page implementation, including component structure, data flow, and usage guidelines.

## Overview

The Journey Details page displays detailed information about a specific journey, including:

- Journey ID and delivery timeframe
- Shipper information, trip timing, and distance
- Route details with stops, vehicles, drivers, and load information
- Interactive map visualization

## Component Structure

The Journey Details page is composed of the following components:

```
JourneyDetailsPage
├── JourneyDetailsHeader
│   └── PrintButton
├── JourneyOverviewPanel
├── RouteDetailsTabs
└── StopsTable
    ├── StopRow
    │   ├── StopTypeIndicator
    │   └── LoadIDCell
    │       └── EditLoadModal
    ├── StopCard (mobile view)
    └── VirtualizedStopsTable (for large datasets)
└── RouteMap
```

## Data Flow

1. The `JourneyDetailsPage` component fetches journey details using the `fetchJourneyDetails` function from the `journeyService`.
2. The journey details are passed down to child components as props.
3. The `LoadIDCell` component can update load information using the `updateJourneyLoad` function.
4. Updates are handled with optimistic UI updates to provide a responsive user experience.

## Features

### Responsive Design

- Desktop view: Table-based layout for stops
- Mobile view: Card-based layout for stops
- Responsive grid for the overview panel
- Adaptive font sizes and spacing

### Performance Optimizations

- Lazy loading for the map component
- Virtualization for large datasets (more than 20 stops)
- Memoization for components to prevent unnecessary re-renders
- Data caching to avoid repeated API calls

### Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus styles for keyboard users
- Semantic HTML structure

### Print Functionality

- Print-friendly version of the journey details
- Custom styling for printed output

## Usage

### Basic Usage

```jsx
import { JourneyDetailsPage } from '../components/journeys';

// The component is typically used with React Router
<Route path="/journey/:journeyId" element={<JourneyDetailsPage />} />
```

### Route Tabs

The route tabs allow users to filter stops based on the journey type:

- **Outbound**: Shows only outbound stops
- **Round trip**: Shows all stops
- **Express Delivery**: Shows express delivery stops

### Editing Load Information

Users can edit load information by clicking the "Edit Load" button in the LoadIDCell component. This opens a modal where they can update the load ID and set whether it's a return load.

## API Integration

The Journey Details page integrates with the following API endpoints:

- `fetchJourneyDetails(journeyId)`: Fetches journey details by ID
- `updateJourneyLoad(journeyId, stopId, loadData)`: Updates load information for a specific stop

## Best Practices

1. **Performance**: For large datasets, the component automatically uses virtualization to maintain performance.
2. **Accessibility**: Ensure all interactive elements have proper ARIA labels and keyboard support.
3. **Responsive Design**: Test the page on different screen sizes to ensure it adapts correctly.
4. **Error Handling**: The page includes error handling for failed API requests.

## Future Enhancements

Potential future enhancements for the Journey Details page:

1. Real-time updates for journey status
2. Integration with a mapping library for interactive maps
3. Timeline visualization for journey progress
4. Document upload and management
5. Integration with tracking systems

## Troubleshooting

### Common Issues

1. **Data not loading**: Check that the journey ID is correct and the API is accessible.
2. **Edit functionality not working**: Ensure the user has the necessary permissions.
3. **Map not displaying**: Check that the map component is properly loaded and configured.

### Debugging

The journey service includes logging for debugging purposes. Check the browser console for messages related to:

- API requests and responses
- Cache hits and misses
- Rendering performance

## Related Components

- `MyJourneysPage`: Lists all journeys and provides navigation to the details page
- `JourneyModel`: Data model for journey information
- `journeyService`: Service for fetching and updating journey data
