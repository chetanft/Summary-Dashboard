import React from 'react';
import PropTypes from 'prop-types';
import { useIconRegistry } from './IconRegistry';

/**
 * Enhanced Icon component that uses Material UI icons by default
 * with consistent props and styling.
 */
const Icon = ({
  name,
  useMui = true, // Changed default to true to use Material UI icons
  size,
  color,
  strokeWidth,
  className,
  sx = {},
  ...props
}) => {
  const { materialIcons, iconMapping } = useIconRegistry();

  // For backward compatibility with the old icon naming convention
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Convert size to fontSize for MUI icons
  const muiProps = {
    fontSize: size ? (typeof size === 'number' ? 'inherit' : size) : undefined,
    sx: {
      ...(size && typeof size === 'number' ? { fontSize: size } : {}),
      ...(color ? { color } : {}),
      ...sx,
    },
  };

  // Use Material UI icon
  const MuiIconComponent = materialIcons[capitalizedName];
  if (!MuiIconComponent) {
    console.warn(`Material UI Icon "${capitalizedName}" not found in registry`);
    return null;
  }
  return <MuiIconComponent className={className} {...muiProps} {...props} />;
};

Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,
  /** Whether to use Material UI icon (default: true) */
  useMui: PropTypes.bool,
  /** Size of the icon (number for pixel value or string for MUI size) */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Color of the icon */
  color: PropTypes.string,
  /** Stroke width (not used with Material icons) */
  strokeWidth: PropTypes.number,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for MUI icons */
  sx: PropTypes.object,
};

// Export the hook for direct access to the registry
export { useIconRegistry };

export default Icon;
