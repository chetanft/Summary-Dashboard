/**
 * @jest-environment jsdom
 */

// Import setup file
import './setupTests';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../theme/unifiedThemeConfig';
import JourneyDetailsPage from '../index';
import { fetchJourneyDetails } from '../../../../services/journeyService';

// Mock the journeyService
jest.mock('../../../../services/journeyService', () => ({
  fetchJourneyDetails: jest.fn()
}));

// Mock the Layout component
jest.mock('../../../layout/Layout', () => {
  return ({ children }) => <div data-testid="layout">{children}</div>;
});

// Mock the lazy-loaded RouteMap component
jest.mock('../RouteMap', () => {
  return function MockRouteMap() {
    return <div data-testid="route-map">Route Map</div>;
  };
});

describe('JourneyDetailsPage', () => {
  const mockJourneyDetails = {
    id: 'TEST-123',
    deliveryTimeframe: {
      days: 2,
      minutes: 30
    },
    shipper: {
      name: 'Test Shipper',
      id: 'TS001'
    },
    tripStart: {
      date: '2024-01-01T00:00:00Z',
      formattedDate: '1st Jan 24, 00:00 AM'
    },
    transitTime: {
      days: 3,
      hours: 12,
      minutes: 0
    },
    totalDistance: {
      value: 1000,
      unit: 'kms'
    },
    journeyType: 'Round trip',
    stops: [
      {
        id: 'stop-1',
        journeyId: 'TEST-123',
        type: 'Origin',
        typeCode: 'OR',
        sequence: 1,
        location: {
          name: 'Test Origin',
          city: 'Test City',
          state: 'Test State'
        },
        vehicle: {
          number: 'TEST-V-001',
          type: 'Truck'
        },
        driver: {
          name: 'Test Driver'
        },
        load: {
          id: 'TEST-L-001'
        }
      },
      {
        id: 'stop-2',
        journeyId: 'TEST-123',
        type: 'Destination',
        typeCode: 'D',
        sequence: 2,
        location: {
          name: 'Test Destination',
          city: 'Test City 2',
          state: 'Test State 2'
        },
        vehicle: {
          number: 'TEST-V-001',
          type: 'Truck'
        },
        driver: {
          name: 'Test Driver'
        },
        load: {
          id: 'TEST-L-001'
        }
      }
    ],
    mapCoordinates: {
      center: [0, 0],
      zoom: 5
    }
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock the fetchJourneyDetails function
    fetchJourneyDetails.mockResolvedValue(mockJourneyDetails);
  });

  it('renders loading skeleton initially', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/journey/TEST-123']}>
          <Routes>
            <Route path="/journey/:journeyId" element={<JourneyDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Check if the layout is rendered
    expect(screen.getByTestId('layout')).toBeInTheDocument();

    // The skeleton should be rendered while loading
    expect(fetchJourneyDetails).toHaveBeenCalledWith('TEST-123');
  });

  it('renders journey details after loading', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/journey/TEST-123']}>
          <Routes>
            <Route path="/journey/:journeyId" element={<JourneyDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Wait for the journey details to load
    await waitFor(() => {
      expect(fetchJourneyDetails).toHaveBeenCalledWith('TEST-123');
    });

    // Check if the journey ID is displayed
    await waitFor(() => {
      expect(screen.getByText('TEST-123')).toBeInTheDocument();
    });

    // Check if the shipper name is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Shipper')).toBeInTheDocument();
    });

    // Check if the delivery timeframe is displayed
    await waitFor(() => {
      expect(screen.getByText(/in 2 days 30 min/i)).toBeInTheDocument();
    });
  });

  it('renders error message when journey details fail to load', async () => {
    // Mock the fetchJourneyDetails function to reject
    fetchJourneyDetails.mockRejectedValue(new Error('Failed to fetch journey details'));

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/journey/TEST-123']}>
          <Routes>
            <Route path="/journey/:journeyId" element={<JourneyDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to load journey details/i)).toBeInTheDocument();
    });
  });

  it('filters stops based on active tab', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/journey/TEST-123']}>
          <Routes>
            <Route path="/journey/:journeyId" element={<JourneyDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Wait for the journey details to load
    await waitFor(() => {
      expect(fetchJourneyDetails).toHaveBeenCalledWith('TEST-123');
    });

    // Check if the origin stop is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Origin')).toBeInTheDocument();
    });

    // Check if the destination stop is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Destination')).toBeInTheDocument();
    });
  });
});
