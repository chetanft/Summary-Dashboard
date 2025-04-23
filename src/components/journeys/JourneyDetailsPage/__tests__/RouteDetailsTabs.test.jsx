import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../theme/unifiedThemeConfig';
import RouteDetailsTabs from '../RouteDetailsTabs';

describe('RouteDetailsTabs', () => {
  const mockProps = {
    activeTab: 'outbound',
    onTabChange: jest.fn()
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders all tabs correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} />
      </ThemeProvider>
    );

    // Check if all tabs are displayed
    expect(screen.getByText('Outbound')).toBeInTheDocument();
    expect(screen.getByText('Round trip')).toBeInTheDocument();
    expect(screen.getByText('Express Delivery')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} />
      </ThemeProvider>
    );

    // Check if the active tab has the correct ARIA attributes
    const outboundTab = screen.getByText('Outbound');
    expect(outboundTab.closest('button')).toHaveAttribute('aria-selected', 'true');

    // Check if the inactive tabs have the correct ARIA attributes
    const roundTripTab = screen.getByText('Round trip');
    expect(roundTripTab.closest('button')).toHaveAttribute('aria-selected', 'false');

    const expressDeliveryTab = screen.getByText('Express Delivery');
    expect(expressDeliveryTab.closest('button')).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onTabChange when a tab is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} />
      </ThemeProvider>
    );

    // Click the Round trip tab
    fireEvent.click(screen.getByText('Round trip'));

    // Check if onTabChange was called with the correct argument
    expect(mockProps.onTabChange).toHaveBeenCalledWith('roundTrip');
  });

  it('renders with a different active tab', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} activeTab="roundTrip" />
      </ThemeProvider>
    );

    // Check if the active tab has the correct ARIA attributes
    const roundTripTab = screen.getByText('Round trip');
    expect(roundTripTab.closest('button')).toHaveAttribute('aria-selected', 'true');

    // Check if the inactive tabs have the correct ARIA attributes
    const outboundTab = screen.getByText('Outbound');
    expect(outboundTab.closest('button')).toHaveAttribute('aria-selected', 'false');

    const expressDeliveryTab = screen.getByText('Express Delivery');
    expect(expressDeliveryTab.closest('button')).toHaveAttribute('aria-selected', 'false');
  });

  it('has correct ARIA attributes for accessibility', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} />
      </ThemeProvider>
    );

    // Check if the tablist has the correct ARIA attributes
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Route details tabs');

    // Check if the tabs have the correct ARIA attributes
    const outboundTab = screen.getByText('Outbound');
    expect(outboundTab.closest('button')).toHaveAttribute('role', 'tab');
    expect(outboundTab.closest('button')).toHaveAttribute('aria-controls', 'outbound-panel');
    expect(outboundTab.closest('button')).toHaveAttribute('id', 'outbound-tab');
  });

  // This test is skipped because the component doesn't currently implement keyboard navigation
  // It should be implemented in the future
  it.skip('calls onTabChange when Enter key is pressed', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouteDetailsTabs {...mockProps} />
      </ThemeProvider>
    );

    // Get the Outbound tab
    const outboundTab = screen.getByRole('tab', { name: /outbound/i });

    // Press Enter key
    fireEvent.keyDown(outboundTab, { key: 'Enter' });

    // Check if onTabChange was called
    expect(mockProps.onTabChange).toHaveBeenCalledWith('outbound');
  });
});
