import React, { memo, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import only the specific icons you need from Font Awesome
import { 
  faUser, 
  faLock, 
  faEnvelope, 
  faCheck, 
  faTimes, 
  faExclamationTriangle,
  faInfoCircle,
  faChartBar,
  faChartLine,
  faChartPie,
  faTable,
  faCalendar,
  faSearch,
  faFilter,
  faCog,
  faBell,
  faSignOutAlt,
  faHome,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faSave,
  faDownload,
  faUpload,
  faSync,
  faEllipsisV,
  faTruck,
  faBox,
  faBoxes,
  faWarehouse,
  faClipboardCheck,
  faClipboardList,
  faMapMarkerAlt,
  faRoute,
  faShippingFast,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faUserCog,
  faUserShield,
  faUserTie,
  faUsers,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';

// Add all icons to the library
library.add(
  faUser,
  faLock,
  faEnvelope,
  faCheck,
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faChartBar,
  faChartLine,
  faChartPie,
  faTable,
  faCalendar,
  faSearch,
  faFilter,
  faCog,
  faBell,
  faSignOutAlt,
  faHome,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faSave,
  faDownload,
  faUpload,
  faSync,
  faEllipsisV,
  faTruck,
  faBox,
  faBoxes,
  faWarehouse,
  faClipboardCheck,
  faClipboardList,
  faMapMarkerAlt,
  faRoute,
  faShippingFast,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faUserCog,
  faUserShield,
  faUserTie,
  faUsers,
  faUsersCog
);

// Map of icon names to their Font Awesome names
const iconMap = {
  user: 'user',
  lock: 'lock',
  email: 'envelope',
  check: 'check',
  times: 'times',
  warning: 'exclamation-triangle',
  info: 'info-circle',
  barChart: 'chart-bar',
  lineChart: 'chart-line',
  pieChart: 'chart-pie',
  table: 'table',
  calendar: 'calendar',
  search: 'search',
  filter: 'filter',
  settings: 'cog',
  notification: 'bell',
  logout: 'sign-out-alt',
  home: 'home',
  arrowRight: 'arrow-right',
  arrowLeft: 'arrow-left',
  plus: 'plus',
  minus: 'minus',
  edit: 'edit',
  delete: 'trash',
  save: 'save',
  download: 'download',
  upload: 'upload',
  refresh: 'sync',
  more: 'ellipsis-v',
  truck: 'truck',
  box: 'box',
  boxes: 'boxes',
  warehouse: 'warehouse',
  clipboardCheck: 'clipboard-check',
  clipboardList: 'clipboard-list',
  location: 'map-marker-alt',
  route: 'route',
  shipping: 'shipping-fast',
  invoice: 'file-invoice-dollar',
  payment: 'money-bill-wave',
  userSettings: 'user-cog',
  admin: 'user-shield',
  manager: 'user-tie',
  users: 'users',
  userManagement: 'users-cog',
};

/**
 * Optimized Font Awesome Icon component
 * Uses a single library import and renders icons from the library
 * 
 * @param {Object} props - Component props
 * @param {string} props.icon - Icon name from the iconMap or direct Font Awesome name
 * @param {string} props.prefix - Icon prefix (default: 'fas')
 * @returns {React.ReactElement} - Font Awesome Icon component
 */
const OptimizedFontAwesomeIcon = ({ icon, prefix = 'fas', ...props }) => {
  // Get the icon name from the map or use the provided name
  const iconName = iconMap[icon] || icon;
  
  return <FontAwesomeIcon icon={[prefix, iconName]} {...props} />;
};

export default memo(OptimizedFontAwesomeIcon);
