import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { useIconRegistry } from '../../common/IconRegistry';

/**
 * Icon component for displaying icons from the icon registry
 * This component standardizes icon usage across the application
 * 
 * @component
 * @example
 * <Icon name="Truck" size={16} color="primary" />
 */
const Icon = ({
  name,
  size = 24,
  color = 'inherit',
  ...props
}) => {
  const theme = useTheme();
  const { getIcon } = useIconRegistry();
  const IconComponent = getIcon(name);
  
  // Get color from theme if it's a theme color
  const getColorFromTheme = (colorName) => {
    if (typeof colorName !== 'string') {
      return colorName;
    }
    
    if (colorName === 'inherit' || colorName === 'disabled' || colorName === 'action') {
      return colorName;
    }
    
    if (colorName.startsWith('#') || colorName.startsWith('rgb')) {
      return colorName;
    }
    
    // Check if it's a theme color
    const themeColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    if (themeColors.includes(colorName)) {
      return theme.palette[colorName].main;
    }
    
    // Check if it's a text color
    const textColors = ['primary', 'secondary', 'disabled'];
    if (textColors.includes(colorName)) {
      return theme.palette.text[colorName];
    }
    
    // Check if it's a grey color
    if (colorName.startsWith('grey.')) {
      const greyLevel = colorName.split('.')[1];
      return theme.palette.grey[greyLevel];
    }
    
    return colorName;
  };
  
  const iconColor = getColorFromTheme(color);
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }
  
  return (
    <IconComponent
      style={{
        fontSize: size,
        color: iconColor,
        ...props.style,
      }}
      {...props}
    />
  );
};

Icon.propTypes = {
  /**
   * Name of the icon in the registry
   */
  name: PropTypes.string.isRequired,
  
  /**
   * Size of the icon in pixels
   */
  size: PropTypes.number,
  
  /**
   * Color of the icon
   * Can be a theme color (primary, secondary, etc.), a text color (text.primary, etc.),
   * a grey color (grey.500, etc.), or a CSS color value (#fff, rgb(255, 255, 255), etc.)
   */
  color: PropTypes.string,
};

export default Icon;
