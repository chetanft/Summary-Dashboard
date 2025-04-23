/**
 * Date utility functions for formatting dates and times
 */

/**
 * Get month-to-date date range
 *
 * @returns {Object} - Date range { start, end }
 */
export const getMonthToDateRange = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return {
    start: firstDayOfMonth,
    end: today
  };
};

/**
 * Get last six months date range
 *
 * @returns {Object} - Date range { start, end }
 */
export const getLastSixMonthsRange = () => {
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  return {
    start: sixMonthsAgo,
    end: today
  };
};

/**
 * Filter data by date range
 *
 * @param {Array} data - Data to filter
 * @param {Object} dateRange - Date range { start, end }
 * @param {string} dateField - Field name containing the date
 * @returns {Array} - Filtered data
 */
export const filterDataByDateRange = (data, dateRange, dateField = 'date') => {
  if (!data || !Array.isArray(data)) return data;

  return data.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= dateRange.start && itemDate <= dateRange.end;
  });
};

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string (e.g., "Jan 15, 2023")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date string to a time format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted time string (e.g., "14:30")
 */
export const formatTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format a date string to a datetime format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted datetime string (e.g., "Jan 15, 2023, 14:30")
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format a file size in bytes to a human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Calculate the time difference between two dates
 * @param {string} startDate - ISO date string for the start date
 * @param {string} endDate - ISO date string for the end date
 * @returns {string} - Formatted time difference (e.g., "2 hours 30 minutes")
 */
export const getTimeDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return '';

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if the dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return '';
  }

  const diffMs = end - start;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs === 0) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  }

  return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
};

/**
 * Get the relative time from now
 * @param {string} dateString - ISO date string
 * @returns {string} - Relative time (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diffMs = date - now;
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHrs = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHrs / 24);

  if (diffSecs < 0) {
    // Past
    if (diffSecs > -60) return 'just now';
    if (diffMins > -60) return `${Math.abs(diffMins)} minute${Math.abs(diffMins) !== 1 ? 's' : ''} ago`;
    if (diffHrs > -24) return `${Math.abs(diffHrs)} hour${Math.abs(diffHrs) !== 1 ? 's' : ''} ago`;
    if (diffDays > -7) return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
    return formatDate(dateString);
  } else {
    // Future
    if (diffSecs < 60) return 'in a few seconds';
    if (diffMins < 60) return `in ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    if (diffHrs < 24) return `in ${diffHrs} hour${diffHrs !== 1 ? 's' : ''}`;
    if (diffDays < 7) return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    return `on ${formatDate(dateString)}`;
  }
};
