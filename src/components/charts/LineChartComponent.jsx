import { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatLargeNumber, formatCurrency, getCustomTooltip } from '../../utils/chartUtils.jsx';

/**
 * Line Chart Component for displaying trend data
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {Array} props.lines - Configuration for each line
 * @param {string} props.xAxisKey - Key for the x-axis values
 * @param {string} props.unit - Unit for the values (e.g., '%', 'INR')
 * @param {boolean} props.showGrid - Whether to show grid lines
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Line Chart Component
 */
const LineChartComponent = ({
  data,
  lines = [{ dataKey: 'value', color: '#FF3533', strokeWidth: 2 }],
  xAxisKey = 'name',
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
        <LineChart
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
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: line.color, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
