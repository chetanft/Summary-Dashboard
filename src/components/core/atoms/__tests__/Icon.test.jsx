import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Icon from '../Icon';
import theme from '../../../../theme/unifiedThemeConfig';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Mock the useIconRegistry hook
jest.mock('../../common/IconRegistry', () => ({
  useIconRegistry: () => ({
    getIcon: (name) => {
      const icons = {
        'Truck': LocalShippingIcon,
        'Default': () => <div data-testid="default-icon">Default Icon</div>
      };
      return icons[name] || icons['Default'];
    }
  })
}));

describe('Icon', () => {
  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders icon correctly', () => {
    renderWithTheme(<Icon name="Truck" />);
    
    // Check if the icon is rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('applies size correctly', () => {
    renderWithTheme(<Icon name="Truck" size={32} />);
    
    // Check if the icon has the correct size
    const icon = document.querySelector('svg');
    expect(icon).toHaveStyle('font-size: 32px');
  });

  test('applies color correctly', () => {
    renderWithTheme(<Icon name="Truck" color="primary" />);
    
    // Check if the icon has the correct color
    const icon = document.querySelector('svg');
    expect(icon).toHaveStyle(`color: ${theme.palette.primary.main}`);
  });

  test('applies text color correctly', () => {
    renderWithTheme(<Icon name="Truck" color="text.secondary" />);
    
    // Check if the icon has the correct color
    const icon = document.querySelector('svg');
    expect(icon).toHaveStyle(`color: ${theme.palette.text.secondary}`);
  });

  test('applies hex color correctly', () => {
    renderWithTheme(<Icon name="Truck" color="#ff0000" />);
    
    // Check if the icon has the correct color
    const icon = document.querySelector('svg');
    expect(icon).toHaveStyle('color: #ff0000');
  });

  test('applies grey color correctly', () => {
    renderWithTheme(<Icon name="Truck" color="grey.500" />);
    
    // Check if the icon has the correct color
    const icon = document.querySelector('svg');
    expect(icon).toHaveStyle(`color: ${theme.palette.grey[500]}`);
  });

  test('handles unknown icon name gracefully', () => {
    console.warn = jest.fn(); // Mock console.warn
    
    renderWithTheme(<Icon name="UnknownIcon" />);
    
    // Check if a warning was logged
    expect(console.warn).toHaveBeenCalledWith('Icon "UnknownIcon" not found in registry');
    
    // Check if the default icon is rendered
    expect(screen.getByTestId('default-icon')).toBeInTheDocument();
  });

  test('passes additional props to the icon component', () => {
    renderWithTheme(<Icon name="Truck" data-testid="truck-icon" />);
    
    // Check if the additional prop was passed
    expect(screen.getByTestId('truck-icon')).toBeInTheDocument();
  });
});
