import React from 'react';
import PropTypes from 'prop-types';
import { useIconRegistry } from './IconRegistry';

/**
 * Enhanced Icon component that supports both Material UI and Lucide icons
 * with consistent props and styling.
 */
const Icon = ({
  name,
  useMui = false,
  size,
  color,
  strokeWidth,
  className,
  sx = {},
  ...props
}) => {
  const { materialIcons, lucideIcons, iconMapping } = useIconRegistry();

  // For backward compatibility with the old icon naming convention
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Convert size to fontSize for MUI icons
  const muiProps = useMui ? {
    fontSize: size ? (typeof size === 'number' ? 'inherit' : size) : undefined,
    sx: {
      ...(size && typeof size === 'number' ? { fontSize: size } : {}),
      ...(color ? { color } : {}),
      ...sx,
    },
  } : {};

  // Props for Lucide icons
  const lucideProps = !useMui ? {
    size,
    color,
    strokeWidth,
  } : {};

  // If useMui is true, use Material UI icon
  if (useMui) {
    const MuiIconComponent = materialIcons[capitalizedName];
    if (!MuiIconComponent) {
      console.warn(`Material UI Icon "${capitalizedName}" not found in registry`);
      return null;
    }
    return <MuiIconComponent className={className} {...muiProps} {...props} />;
  }

  // Otherwise, use Lucide icon
  // First, check if there's a mapping for this icon name
  const lucideIconName = iconMapping[capitalizedName] || capitalizedName;
  const LucideIconComponent = lucideIcons[lucideIconName];

  if (!LucideIconComponent) {
    console.warn(`Lucide Icon "${lucideIconName}" not found in registry`);
    // Fallback to Material UI icon if Lucide icon is not found
    const FallbackIcon = materialIcons[capitalizedName];
    if (FallbackIcon) {
      return <FallbackIcon className={className} {...muiProps} {...props} />;
    }
    return null;
  }

  return <LucideIconComponent className={className} {...lucideProps} {...props} />;
};

Icon.propTypes = {
  /** Name of the icon */
  name: PropTypes.string.isRequired,
  /** Whether to use Material UI icon instead of Lucide */
  useMui: PropTypes.bool,
  /** Size of the icon (number for pixel value or string for MUI size) */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Color of the icon */
  color: PropTypes.string,
  /** Stroke width for Lucide icons */
  strokeWidth: PropTypes.number,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles (primarily for MUI icons) */
  sx: PropTypes.object,
};

export default Icon;
