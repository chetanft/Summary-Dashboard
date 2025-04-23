# Journey Details Component API

This document provides detailed API documentation for the components used in the Journey Details page.

## JourneyDetailsPage

The main container component for the Journey Details page.

### Props

None - The component uses React Router to get the journey ID from the URL parameters.

### State

| Name | Type | Description |
|------|------|-------------|
| `journeyDetails` | Object | The journey details fetched from the API |
| `loading` | Boolean | Whether the journey details are being loaded |
| `error` | String | Error message if the journey details failed to load |
| `activeTab` | String | The currently active route tab |

### Methods

| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `handleBackClick` | None | None | Navigates back to the journeys list |
| `handleTabChange` | `tab` (String) | None | Changes the active route tab |

## JourneyDetailsHeader

Displays the journey ID, delivery timeframe, and navigation controls.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyId` | String | Yes | The ID of the journey |
| `deliveryTimeframe` | Object | Yes | Object with `days` and `minutes` properties |
| `onBackClick` | Function | Yes | Function to handle back button click |
| `journeyDetails` | Object | Yes | Full journey details for printing |

## JourneyOverviewPanel

Displays shipper information, trip timing, and distance.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shipper` | Object | Yes | Object with `name` and `id` properties |
| `tripStart` | Object | Yes | Object with `date` and `formattedDate` properties |
| `transitTime` | Object | Yes | Object with `days`, `hours`, and `minutes` properties |
| `totalDistance` | Object | Yes | Object with `value` and `unit` properties |

## RouteDetailsTabs

Displays tabs for different journey types.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `activeTab` | String | Yes | The currently active tab |
| `onTabChange` | Function | Yes | Function to handle tab change |

## StopsTable

Displays a table of journey stops.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stops` | Array | Yes | Array of stop objects |

### Behavior

- Uses a card layout on mobile devices
- Uses virtualization for large datasets (more than 20 stops)
- Uses a standard table for smaller datasets on desktop

## StopRow

Displays a row in the stops table.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stop` | Object | Yes | Stop object with location, vehicle, driver, and load information |

## StopCard

Mobile-friendly card view for stops.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stop` | Object | Yes | Stop object with location, vehicle, driver, and load information |

## StopTypeIndicator

Displays a circular indicator with a code for the stop type.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | String | Yes | Stop type (e.g., "Origin", "Pickup", "Destination") |
| `code` | String | Yes | Stop type code (e.g., "OR", "P1", "D") |

## LoadIDCell

Displays a load ID with an edit button.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loadId` | String | Yes | Load ID |
| `isReturn` | Boolean | No | Whether this is a return load |
| `stopId` | String | No | Stop ID |
| `journeyId` | String | No | Journey ID |

### State

| Name | Type | Description |
|------|------|-------------|
| `isModalOpen` | Boolean | Whether the edit modal is open |
| `currentLoadId` | String | The current load ID (for optimistic updates) |
| `currentIsReturn` | Boolean | Whether this is a return load (for optimistic updates) |
| `isUpdating` | Boolean | Whether the load information is being updated |
| `snackbar` | Object | Snackbar state with `open`, `message`, and `severity` properties |

### Methods

| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `handleEditLoad` | None | None | Opens the edit modal |
| `handleCloseModal` | None | None | Closes the edit modal |
| `handleSaveLoad` | `newLoadData` (Object) | Promise | Saves the new load data |
| `handleCloseSnackbar` | None | None | Closes the snackbar |

## EditLoadModal

Modal for editing load information.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `open` | Boolean | Yes | Whether the modal is open |
| `onClose` | Function | Yes | Function to close the modal |
| `loadId` | String | Yes | Current load ID |
| `isReturn` | Boolean | No | Whether this is a return load |
| `onSave` | Function | Yes | Function to save changes |

### State

| Name | Type | Description |
|------|------|-------------|
| `newLoadId` | String | The new load ID |
| `newIsReturn` | Boolean | Whether this is a return load |
| `loading` | Boolean | Whether the save operation is in progress |
| `error` | String | Error message if the save operation failed |

### Methods

| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `handleSave` | None | None | Validates and saves the changes |
| `handleClose` | None | None | Resets the form and closes the modal |

## RouteMap

Displays a map with the journey route and stops.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stops` | Array | Yes | Array of stop objects |
| `center` | Array | No | Center coordinates [longitude, latitude] |
| `zoom` | Number | No | Map zoom level |

## PrintButton

Button to print the journey details.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyDetails` | Object | Yes | Journey details object |

### Methods

| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `handlePrint` | None | None | Opens a new window with a print-friendly version of the journey details |

## VirtualizedStopsTable

Uses virtualization for better performance with large datasets.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `stops` | Array | Yes | Array of stop objects |

## Rating

Displays a star rating.

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | Number | Yes | Rating value (0-5) |
| `size` | String | No | Size of the stars ('small', 'medium', 'large') |
| `readOnly` | Boolean | No | Whether the rating is read-only |
