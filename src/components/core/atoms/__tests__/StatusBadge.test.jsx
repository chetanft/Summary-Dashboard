import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import StatusBadge from '../StatusBadge';
import theme from '../../../../theme/unifiedThemeConfig';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

describe('StatusBadge', () => {
  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders label correctly', () => {
    renderWithTheme(<StatusBadge status="success" label="Completed" />);
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('renders with success status correctly', () => {
    renderWithTheme(<StatusBadge status="success" label="Completed" />);
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle(`background-color: ${theme.palette.success.light}`);
    expect(badge).toHaveStyle(`color: ${theme.palette.success.main}`);
  });

  test('renders with error status correctly', () => {
    renderWithTheme(<StatusBadge status="error" label="Failed" />);
    
    const badge = screen.getByText('Failed').closest('div');
    expect(badge).toHaveStyle(`background-color: ${theme.palette.error.light}`);
    expect(badge).toHaveStyle(`color: ${theme.palette.error.main}`);
  });

  test('renders with warning status correctly', () => {
    renderWithTheme(<StatusBadge status="warning" label="Pending" />);
    
    const badge = screen.getByText('Pending').closest('div');
    expect(badge).toHaveStyle(`background-color: ${theme.palette.warning.light}`);
    expect(badge).toHaveStyle(`color: ${theme.palette.warning.main}`);
  });

  test('renders with default status correctly', () => {
    renderWithTheme(<StatusBadge status="default" label="Unknown" />);
    
    const badge = screen.getByText('Unknown').closest('div');
    expect(badge).toBeInTheDocument();
  });

  test('renders with icon correctly', () => {
    renderWithTheme(
      <StatusBadge 
        status="success" 
        label="Completed" 
        icon={CheckCircleIcon} 
      />
    );
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
    // Check if the icon is rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('applies small size correctly', () => {
    renderWithTheme(<StatusBadge status="success" label="Completed" size="small" />);
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle('padding-top: 0.25rem');
    expect(badge).toHaveStyle('padding-bottom: 0.25rem');
  });

  test('applies medium size correctly', () => {
    renderWithTheme(<StatusBadge status="success" label="Completed" size="medium" />);
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle('padding-top: 0.5rem');
    expect(badge).toHaveStyle('padding-bottom: 0.5rem');
  });

  test('applies large size correctly', () => {
    renderWithTheme(<StatusBadge status="success" label="Completed" size="large" />);
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle('padding-top: 0.75rem');
    expect(badge).toHaveStyle('padding-bottom: 0.75rem');
  });

  test('applies outlined variant correctly', () => {
    renderWithTheme(
      <StatusBadge 
        status="success" 
        label="Completed" 
        variant="outlined" 
      />
    );
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle('background-color: transparent');
    expect(badge).toHaveStyle(`border: 1px solid ${theme.palette.success.main}`);
  });

  test('applies text variant correctly', () => {
    renderWithTheme(
      <StatusBadge 
        status="success" 
        label="Completed" 
        variant="text" 
      />
    );
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle('background-color: transparent');
    expect(badge).not.toHaveStyle('border');
  });

  test('applies contained variant correctly', () => {
    renderWithTheme(
      <StatusBadge 
        status="success" 
        label="Completed" 
        variant="contained" 
      />
    );
    
    const badge = screen.getByText('Completed').closest('div');
    expect(badge).toHaveStyle(`background-color: ${theme.palette.success.light}`);
    expect(badge).not.toHaveStyle('border');
  });

  test('applies custom styles correctly', () => {
    renderWithTheme(
      <StatusBadge 
        status="success" 
        label="Completed" 
        sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
      />
    );
    
    const text = screen.getByText('Completed');
    expect(text).toHaveStyle('font-weight: 500'); // From the component
    expect(text.closest('div')).toHaveStyle('text-transform: uppercase'); // From custom sx
  });
});
