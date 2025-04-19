import colors from './colors.json';

/**
 * Get a color from the color palette
 * @param {string} path - Path to the color in dot notation (e.g., 'primary.500', 'text.primary')
 * @returns {string} - The color value
 */
export const getColor = (path) => {
  if (!path) return undefined;

  const parts = path.split('.');
  let result = colors;

  for (const part of parts) {
    if (result && result[part] !== undefined) {
      result = result[part];
    } else {
      console.warn(`Color path "${path}" not found in color palette`);
      return undefined;
    }
  }

  return typeof result === 'string' ? result : undefined;
};

/**
 * Get a color with alpha transparency
 * @param {string} path - Path to the color in dot notation
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} - The color with alpha transparency
 */
export const getColorWithAlpha = (path, alpha) => {
  const color = getColor(path);
  if (!color) return undefined;

  // If color is already in rgba format
  if (color.startsWith('rgba')) {
    const parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (parts) {
      return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
    }
    return color;
  }

  // If color is in hex format
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color;
};

/**
 * Get a status color
 * @param {string} status - Status type ('success', 'error', 'warning', 'info')
 * @param {string} variant - Color variant ('main', 'light', 'dark')
 * @returns {string} - The status color
 */
export const getStatusColor = (status, variant = 'main') => {
  return getColor(`status.${status}.${variant}`);
};

/**
 * Get a communication type color
 * @param {string} type - Communication type ('sim', 'gps')
 * @param {string} variant - Color variant ('main', 'light')
 * @returns {string} - The communication type color
 */
export const getCommunicationColor = (type, variant = 'main') => {
  return getColor(`communication.${type.toLowerCase()}.${variant}`);
};

/**
 * Convert a color to a CSS variable
 * @param {string} path - Path to the color in dot notation
 * @returns {string} - The CSS variable
 */
export const toCssVar = (path) => {
  return `var(--color-${path.replace(/\./g, '-')})`;
};

/**
 * Generate CSS variables for all colors
 * @returns {string} - CSS variables
 */
export const generateCssVars = () => {
  const flattenColors = (obj, prefix = '') => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return { ...acc, ...flattenColors(value, newKey) };
      }
      return { ...acc, [newKey]: value };
    }, {});
  };

  const flatColors = flattenColors(colors);
  return Object.entries(flatColors)
    .map(([key, value]) => `  --color-${key}: ${value};`)
    .join('\n');
};

export default {
  getColor,
  getColorWithAlpha,
  getStatusColor,
  getCommunicationColor,
  toCssVar,
  generateCssVars,
  ...colors
};
