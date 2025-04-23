import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../theme/unifiedThemeConfig';
import JourneyOverviewPanel from '../JourneyOverviewPanel';

// Mock the Icon component
jest.mock('../../../common/Icon', () => {
  return function MockIcon({ name }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  };
});

describe('JourneyOverviewPanel', () => {
  const mockProps = {
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
    }
  };

  it('renders shipper information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Check if the shipper name is displayed
    expect(screen.getByText('Test Shipper')).toBeInTheDocument();

    // Check if the shipper label is displayed
    expect(screen.getByText('Shipper')).toBeInTheDocument();

    // Check if the edit button is displayed
    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(screen.getByTestId('icon-Edit')).toBeInTheDocument();
  });

  it('renders trip start information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Check if the trip start date is displayed
    expect(screen.getByText('1st Jan 24, 00:00 AM')).toBeInTheDocument();

    // Check if the trip start label is displayed
    expect(screen.getByText('Trip starts on')).toBeInTheDocument();
  });

  it('renders transit time information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Check if the transit time is displayed
    expect(screen.getByText('3 days 12 hrs 0 min')).toBeInTheDocument();

    // Check if the transit time label is displayed
    expect(screen.getByText('Standard transit time')).toBeInTheDocument();
  });

  it('renders total distance information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Check if the total distance is displayed
    expect(screen.getByText('1000 kms')).toBeInTheDocument();

    // Check if the total distance label is displayed
    expect(screen.getByText('Total distance')).toBeInTheDocument();
  });

  it('calls handleEditShipper when edit button is clicked', () => {
    // Mock console.log
    const originalConsoleLog = console.log;
    console.log = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Click the edit button
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Check if handleEditShipper was called
    expect(console.log).toHaveBeenCalledWith('Edit shipper clicked');

    // Restore console.log
    console.log = originalConsoleLog;
  });

  it('renders correctly on small screens', () => {
    // Mock the useMediaQuery hook
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider theme={theme}>
        <JourneyOverviewPanel {...mockProps} />
      </ThemeProvider>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Test Shipper')).toBeInTheDocument();
    expect(screen.getByText('1st Jan 24, 00:00 AM')).toBeInTheDocument();
    expect(screen.getByText('3 days 12 hrs 0 min')).toBeInTheDocument();
    expect(screen.getByText('1000 kms')).toBeInTheDocument();

    // Restore matchMedia
    window.matchMedia = originalMatchMedia;
  });
});
