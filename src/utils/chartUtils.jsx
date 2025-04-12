/**
 * Utility functions for chart components
 */

/**
 * Formats large numbers with appropriate suffixes (K, M, B)
 * @param {number} value - The number to format
 * @returns {string} - Formatted number with suffix
 */
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined) return 'N/A';
  
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Formats currency values with appropriate symbol and suffixes
 * @param {number} value - The currency value to format
 * @param {string} currency - The currency code (default: 'INR')
 * @returns {string} - Formatted currency value
 */
export const formatCurrency = (value, currency = 'INR') => {
  if (value === null || value === undefined) return 'N/A';
  
  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  
  const symbol = symbols[currency] || '';
  
  return `${symbol}${formatLargeNumber(value)}`;
};

/**
 * Gets color based on performance compared to target
 * @param {number} value - The actual value
 * @param {number} target - The target value
 * @param {boolean} higherIsBetter - Whether higher values are better (default: false)
 * @returns {string} - Color code
 */
export const getPerformanceColor = (value, target, higherIsBetter = false) => {
  if (value === null || value === undefined || target === null || target === undefined) {
    return '#838C9D'; // Neutral gray
  }
  
  // For metrics where higher is better (e.g., OTIF %)
  if (higherIsBetter) {
    if (value >= target) {
      return '#4CAF50'; // Green
    } else if (value >= target * 0.9) {
      return '#FFC107'; // Yellow
    } else {
      return '#FF3533'; // Red
    }
  } 
  // For metrics where lower is better (e.g., Cost per KM)
  else {
    if (value <= target) {
      return '#4CAF50'; // Green
    } else if (value <= target * 1.1) {
      return '#FFC107'; // Yellow
    } else {
      return '#FF3533'; // Red
    }
  }
};

/**
 * Transforms data for a bar chart
 * @param {Array} data - Array of data points
 * @param {string} xKey - Key for x-axis values
 * @param {string} yKey - Key for y-axis values
 * @returns {Array} - Transformed data for bar chart
 */
export const transformBarChartData = (data, xKey, yKey) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => ({
    name: item[xKey],
    value: item[yKey]
  }));
};

/**
 * Transforms data for a line chart
 * @param {Array} data - Array of data points
 * @param {string} xKey - Key for x-axis values
 * @param {Array} yKeys - Array of keys for y-axis values
 * @returns {Array} - Transformed data for line chart
 */
export const transformLineChartData = (data, xKey, yKeys) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => {
    const result = { [xKey]: item[xKey] };
    
    yKeys.forEach(key => {
      result[key] = item[key];
    });
    
    return result;
  });
};

/**
 * Gets custom tooltip content for charts
 * @param {Object} props - Tooltip props from Recharts
 * @returns {JSX.Element} - Custom tooltip component
 */
export const getCustomTooltip = ({ active, payload, label, valuePrefix, valueSuffix }) => {
  if (active && payload && payload.length) {
    const prefix = valuePrefix || '';
    const suffix = valueSuffix || '';
    
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '5px 0', color: entry.color }}>
            {entry.name}: {prefix}{entry.value}{suffix}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

/**
 * Gets chart dimensions based on container size
 * @param {number} containerWidth - Width of the container
 * @param {number} containerHeight - Height of the container
 * @returns {Object} - Chart dimensions
 */
export const getChartDimensions = (containerWidth, containerHeight) => {
  return {
    width: containerWidth || 300,
    height: containerHeight || 200,
    margin: { top: 10, right: 30, left: 0, bottom: 0 }
  };
};
