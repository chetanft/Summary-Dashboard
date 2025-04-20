/**
 * Utility functions for working with icons
 */

/**
 * Dynamically imports a Lucide icon
 * @param {string} iconName - The name of the icon to import
 * @returns {Promise<Object>} - A promise that resolves to the icon component
 */
export const importLucideIcon = async (iconName) => {
  try {
    // Dynamic import with code splitting
    // eslint-disable-next-line import/no-dynamic-require
    return await import(/* @vite-ignore */ `lucide-react/dist/esm/icons/${iconName}`);
  } catch (error) {
    console.error(`Failed to load icon: ${iconName}`, error);
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
  commonIconNames.forEach(iconName => {
    // Use low priority to avoid blocking other resources
    // eslint-disable-next-line import/no-dynamic-require
    import(/* @vite-ignore */ `lucide-react/dist/esm/icons/${iconName}`);
  });
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
