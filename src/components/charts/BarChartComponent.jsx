import { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatLargeNumber, formatCurrency, getCustomTooltip } from '../../utils/chartUtils';

/**
 * Bar Chart Component for displaying comparative data
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {string} props.dataKey - Key for the data values
 * @param {string} props.xAxisKey - Key for the x-axis values
 * @param {string} props.color - Color for the bars
 * @param {string} props.unit - Unit for the values (e.g., '%', 'INR')
 * @param {boolean} props.showGrid - Whether to show grid lines
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Bar Chart Component
 */
const BarChartComponent = ({ 
  data, 
  dataKey = 'value', 
  xAxisKey = 'name', 
  color = '#FF3533', 
  unit = '', 
  showGrid = false,
  height = 200
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial width
    updateWidth();

    // Add resize listener
    window.addEventListener('resize', updateWidth);

    // Clean up
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Format tick values based on unit
  const formatTick = (value) => {
    if (unit === 'INR' || unit === '₹') {
      return formatCurrency(value);
    }
    if (value > 1000) {
      return formatLargeNumber(value);
    }
    return value;
  };

  // Custom tooltip content
  const CustomTooltip = (props) => {
    return getCustomTooltip({
      ...props,
      valuePrefix: unit === 'INR' || unit === '₹' ? '₹' : '',
      valueSuffix: unit === '%' ? '%' : ''
    });
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#434F64' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#434F64' }} 
            tickFormatter={formatTick}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={dataKey} 
            fill={color} 
            radius={[2, 2, 0, 0]} 
            barSize={containerWidth < 300 ? 10 : 20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
