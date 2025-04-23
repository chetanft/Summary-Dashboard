/**
 * Utility functions for handling time ranges in the dashboard
 */

/**
 * Get the month-to-date date range
 * @returns {Object} Object with start and end dates
 */
export const getMonthToDateRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return {
    start: startOfMonth,
    end: now
  };
};

/**
 * Get the last six months date range
 * @returns {Object} Object with start and end dates
 */
export const getLastSixMonthsRange = () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  return {
    start: sixMonthsAgo,
    end: now
  };
};

/**
 * Format a date range for display
 * @param {Object} range - Date range object with start and end dates
 * @returns {Object} Object with formatted start and end date strings
 */
export const formatDateRange = (range) => {
  if (!range || !range.start || !range.end) {
    return { start: '', end: '' };
  }
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return {
    start: formatDate(range.start),
    end: formatDate(range.end)
  };
};

/**
 * Check if a date is within a given range
 * @param {Date} date - The date to check
 * @param {Object} range - Date range object with start and end dates
 * @returns {boolean} True if the date is within the range
 */
export const isDateInRange = (date, range) => {
  if (!date || !range || !range.start || !range.end) {
    return false;
  }
  
  const checkDate = new Date(date);
  return checkDate >= range.start && checkDate <= range.end;
};

/**
 * Generate month labels for the last six months
 * @returns {Array} Array of month labels (e.g., ["Jan", "Feb", ...])
 */
export const getLastSixMonthsLabels = () => {
  const now = new Date();
  const months = [];
  
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now);
    month.setMonth(now.getMonth() - i);
    months.push(month.toLocaleDateString('en-US', { month: 'short' }));
  }
  
  return months;
};

/**
 * Get the time period label for a section
 * @param {string} section - The section name
 * @returns {string} The time period label
 */
export const getTimePeriodLabel = (section) => {
  if (section === 'postDelivery') {
    return 'Last 6 Months';
  } else {
    return 'Month to Date';
  }
};
