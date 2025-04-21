import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import TrendIndicator from '../TrendIndicator';
import theme from '../../../../theme/unifiedThemeConfig';

describe('TrendIndicator', () => {
  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders positive trend correctly', () => {
    renderWithTheme(<TrendIndicator value={5.2} />);
    
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    // Check if the up arrow icon is rendered
    const upArrowIcon = document.querySelector('svg');
    expect(upArrowIcon).toBeInTheDocument();
  });

  test('renders negative trend correctly', () => {
    renderWithTheme(<TrendIndicator value={-3.1} />);
    
    expect(screen.getByText('3.1%')).toBeInTheDocument(); // Absolute value
    // Check if the down arrow icon is rendered
    const downArrowIcon = document.querySelector('svg');
    expect(downArrowIcon).toBeInTheDocument();
  });

  test('renders neutral trend correctly', () => {
    renderWithTheme(<TrendIndicator value={0} />);
    
    expect(screen.getByText('No change')).toBeInTheDocument();
    // No arrow icon should be rendered for neutral trend
    const arrowIcon = document.querySelector('svg');
    expect(arrowIcon).not.toBeInTheDocument();
  });

  test('applies inverse styling for positive trend', () => {
    renderWithTheme(<TrendIndicator value={5.2} inverse={true} />);
    
    // In inverse mode, positive trend should have error color
    const trendText = screen.getByText('5.2%');
    expect(trendText).toHaveStyle(`color: ${theme.palette.error.main}`);
  });

  test('applies inverse styling for negative trend', () => {
    renderWithTheme(<TrendIndicator value={-3.1} inverse={true} />);
    
    // In inverse mode, negative trend should have success color
    const trendText = screen.getByText('3.1%');
    expect(trendText).toHaveStyle(`color: ${theme.palette.success.main}`);
  });

  test('hides icon when showIcon is false', () => {
    renderWithTheme(<TrendIndicator value={5.2} showIcon={false} />);
    
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    // No arrow icon should be rendered when showIcon is false
    const arrowIcon = document.querySelector('svg');
    expect(arrowIcon).not.toBeInTheDocument();
  });

  test('applies small size correctly', () => {
    renderWithTheme(<TrendIndicator value={5.2} size="small" />);
    
    const trendText = screen.getByText('5.2%');
    expect(trendText).toHaveStyle('font-size: 0.75rem');
  });

  test('applies medium size correctly', () => {
    renderWithTheme(<TrendIndicator value={5.2} size="medium" />);
    
    const trendText = screen.getByText('5.2%');
    expect(trendText).toHaveStyle('font-size: 0.875rem');
  });

  test('applies large size correctly', () => {
    renderWithTheme(<TrendIndicator value={5.2} size="large" />);
    
    const trendText = screen.getByText('5.2%');
    expect(trendText).toHaveStyle('font-size: 1rem');
  });
});
