import { useRef, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatLargeNumber, formatCurrency, getCustomTooltip } from '../../utils/chartUtils.jsx';

/**
 * Area Chart Component for displaying cumulative data
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {Array} props.areas - Configuration for each area
 * @param {string} props.xAxisKey - Key for the x-axis values
 * @param {string} props.unit - Unit for the values (e.g., '%', 'INR')
 * @param {boolean} props.showGrid - Whether to show grid lines
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Area Chart Component
 */
const AreaChartComponent = ({
  data,
  areas = [{ dataKey: 'value', color: '#FF3533', fillOpacity: 0.3 }],
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
      valueSuffix: unit === '%' ? '%' : unit === 'INR/km' ? '/km' : ''
    });
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              fill={area.color}
              fillOpacity={area.fillOpacity || 0.3}
              strokeWidth={2}
              activeDot={{ r: 5, fill: area.color, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
