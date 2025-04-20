/**
 * Utility functions for working with icons
 */

/**
 * Dynamically imports a Lucide icon
 * @param {string} iconName - The name of the icon to import
 * @returns {Promise<Object>} - A promise that resolves to the icon component
 */
export const importLucideIcon = async (iconName) => {
  if (!iconName) {
    console.warn('No icon name provided to importLucideIcon');
    return null;
  }

  try {
    // Use Function constructor to avoid Vite/Rollup from analyzing this import
    // This is a workaround for the Netlify build issue
    const dynamicImport = new Function('iconName', 'return import("lucide-react/dist/esm/icons/" + iconName)');

    // Then try to import the specific icon
    return await dynamicImport(iconName).catch(() => null);
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error);
    return null;
  }
};

/**
 * Common icon names used throughout the application
 * This helps with tree-shaking and bundle optimization
 */
export const commonIconNames = [
  // Navigation icons
  'Menu',
  'Home',
  'LayoutDashboard',
  'Settings',
  'User',
  'Users',
  'LogOut',
  'ChevronLeft',
  'ChevronRight',
  'ChevronDown',
  'ChevronUp',

  // Action icons
  'Plus',
  'Minus',
  'Edit',
  'Trash2',
  'Save',
  'Download',
  'Upload',
  'Share',
  'Search',
  'Filter',
  'RefreshCw',
  'X',

  // Status icons
  'CheckCircle',
  'AlertCircle',
  'AlertTriangle',
  'Info',
  'HelpCircle',
  'Clock',

  // Domain-specific icons
  'Truck',
  'Package',
  'PackageOpen',
  'Warehouse',
  'Map',
  'MapPin',
  'Calendar',
  'FileText',
  'ClipboardList',
  'Receipt',
  'DollarSign',
  'BarChart',
  'PieChart',
  'LineChart',

  // Notification icons
  'Bell',
  'Mail',
  'MessageSquare',

  // Misc icons
  'Eye',
  'EyeOff',
  'Lock',
  'Unlock',
  'Star',
  'Heart',
  'Circle',
  'ArrowRight',
  'ArrowLeft',
  'ExternalLink',
];

/**
 * Preloads common icons for faster rendering
 * Call this function during app initialization
 */
export const preloadCommonIcons = () => {
  try {
    // Use Function constructor to avoid Vite/Rollup from analyzing this import
    const dynamicImport = new Function('iconName', 'return import("lucide-react/dist/esm/icons/" + iconName)');

    commonIconNames.forEach(iconName => {
      // Use low priority to avoid blocking other resources
      dynamicImport(iconName).catch(error => {
        // Silently fail individual icon loading
        console.debug(`Failed to preload icon: ${iconName}`, error);
      });
    });
  } catch (error) {
    // Catch any errors during preloading
    console.warn('Failed to preload icons:', error);
  }
};

/**
 * Gets the appropriate icon name based on the context
 * @param {string} context - The context in which the icon is used
 * @param {string} action - The action associated with the icon
 * @returns {string} - The name of the icon to use
 */
export const getContextualIcon = (context, action) => {
  const iconMap = {
    order: {
      create: 'ClipboardPlus',
      view: 'ClipboardList',
      edit: 'ClipboardEdit',
      delete: 'ClipboardX',
    },
    shipment: {
      create: 'PackagePlus',
      view: 'Package',
      track: 'Truck',
      deliver: 'PackageCheck',
    },
    user: {
      create: 'UserPlus',
      view: 'User',
      edit: 'UserCog',
      delete: 'UserMinus',
    },
    document: {
      create: 'FilePlus',
      view: 'FileText',
      edit: 'FileEdit',
      delete: 'FileX',
    },
    payment: {
      create: 'DollarSign',
      view: 'CreditCard',
      process: 'Receipt',
      refund: 'ReceiptRefund',
    },
  };

  return iconMap[context]?.[action] || 'Circle';
};
