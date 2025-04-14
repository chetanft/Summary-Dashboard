/**
 * Format a number as currency
 * @param {number} value - The value to format
 * @param {string} currency - The currency code (default: 'INR')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, currency = 'INR') => {
  if (value === undefined || value === null) return 'N/A';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};

/**
 * Format a number as percentage
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === undefined || value === null) return 'N/A';

  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a number with commas
 * @param {number} value - The value to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null) return 'N/A';

  return new Intl.NumberFormat('en-IN').format(value);
};

/**
 * Format a large number with abbreviations (K, M, B)
 * @param {number} value - The value to format
 * @returns {string} - Formatted number string with abbreviation
 */
export const formatLargeNumber = (value) => {
  if (value === undefined || value === null) return 'N/A';

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
};

/**
 * Get color based on value comparison with target
 * @param {number} value - The current value
 * @param {number} target - The target value
 * @param {boolean} higherIsBetter - Whether higher values are better (default: true)
 * @returns {string} - Color code ('green', 'yellow', or 'red')
 */
export const getComparisonColor = (value, target, higherIsBetter = true) => {
  if (value === undefined || value === null || target === undefined || target === null) {
    return 'default';
  }

  const ratio = value / target;

  if (higherIsBetter) {
    if (ratio >= 0.95) return 'green';
    if (ratio >= 0.85) return 'yellow';
    return 'red';
  } else {
    if (ratio <= 1.05) return 'green';
    if (ratio <= 1.15) return 'yellow';
    return 'red';
  }
};

/**
 * Get custom tooltip for charts
 * @param {Object} props - The tooltip props
 * @returns {string|null} - Custom tooltip HTML string or null
 */
export const getCustomTooltip = ({ active, payload, label, valuePrefix = '', valueSuffix = '' }) => {
  if (active && payload && payload.length) {
    // Return a simple HTML string that Recharts can render
    const labelStyle = 'margin:0;font-weight:bold;';
    const itemStyle = 'margin:5px 0;';

    let tooltipContent = `
      <div style="background-color:#fff;border:1px solid #ccc;padding:10px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
        <p style="${labelStyle}">${label}</p>
    `;

    payload.forEach(entry => {
      tooltipContent += `
        <p style="${itemStyle};color:${entry.color}">
          ${entry.name}: ${valuePrefix}${entry.value}${valueSuffix}
        </p>
      `;
    });

    tooltipContent += '</div>';

    return tooltipContent;
  }

  return null;
};
