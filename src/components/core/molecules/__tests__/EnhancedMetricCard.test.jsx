import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import EnhancedMetricCard from '../EnhancedMetricCard';
import theme from '../../../../theme/unifiedThemeConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Mock the TrendIndicator component
jest.mock('../../atoms/TrendIndicator', () => {
  return function MockTrendIndicator({ value }) {
    return <div data-testid="trend-indicator">{value}%</div>;
  };
});

describe('EnhancedMetricCard', () => {
  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders title and value correctly', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
      />
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('1,234.56')).toBeInTheDocument();
  });

  test('formats currency value correctly', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        format="currency"
      />
    );

    expect(screen.getByText('₹1,235')).toBeInTheDocument();
  });

  test('formats percentage value correctly', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Completion Rate"
        value={85.5}
        format="percentage"
      />
    );

    expect(screen.getByText('85.5%')).toBeInTheDocument();
  });

  test('displays trend indicator when trend is provided', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        trend={5.2}
      />
    );

    expect(screen.getByTestId('trend-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('trend-indicator')).toHaveTextContent('5.2%');
  });

  test('displays icon when provided', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        icon={AttachMoneyIcon}
      />
    );

    // Check if the icon is rendered
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Revenue').closest('div'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls onDrillDown when drill down button is clicked', () => {
    const handleDrillDown = jest.fn();
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        onDrillDown={handleDrillDown}
      />
    );

    // Find and click the drill down button
    const drillDownButton = document.querySelector('button');
    fireEvent.click(drillDownButton);
    expect(handleDrillDown).toHaveBeenCalledTimes(1);
  });

  test('displays secondary value when provided', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Delivery Time"
        value={3.5}
        secondaryValue="days"
      />
    );

    expect(screen.getByText('days')).toBeInTheDocument();
  });

  test('displays tooltip when provided', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        tooltip="Total revenue for the current month"
      />
    );

    // Check if the tooltip icon is rendered
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  test('applies variant styles correctly', () => {
    const { rerender } = renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        variant="outlined"
      />
    );

    // Check if the outlined variant has a border
    const card = screen.getByText('Revenue').closest('div').parentElement;
    expect(card).toHaveStyle('border: 1px solid');

    // Rerender with elevated variant
    rerender(
      <ThemeProvider theme={theme}>
        <EnhancedMetricCard
          title="Revenue"
          value={1234.56}
          variant="elevated"
        />
      </ThemeProvider>
    );

    // Check if the elevated variant has a box shadow
    const elevatedCard = screen.getByText('Revenue').closest('div').parentElement;
    expect(elevatedCard).toHaveStyle('box-shadow');
  });

  test('applies size styles correctly', () => {
    const { rerender } = renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        size="small"
      />
    );

    // Check if the small size has smaller padding
    const smallCard = screen.getByText('Revenue').closest('div').parentElement;
    
    // Rerender with large size
    rerender(
      <ThemeProvider theme={theme}>
        <EnhancedMetricCard
          title="Revenue"
          value={1234.56}
          size="large"
        />
      </ThemeProvider>
    );

    // Check if the large size has larger padding
    const largeCard = screen.getByText('Revenue').closest('div').parentElement;
    
    // Compare the padding between small and large
    expect(smallCard.style.padding).not.toEqual(largeCard.style.padding);
  });

  test('displays chart when provided', () => {
    const chartComponent = <div data-testid="chart">Chart</div>;
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        chart={chartComponent}
      />
    );

    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  test('displays note when provided', () => {
    renderWithTheme(
      <EnhancedMetricCard
        title="Revenue"
        value={1234.56}
        note="Data from last 30 days"
      />
    );

    expect(screen.getByText('Data from last 30 days')).toBeInTheDocument();
  });
});
