import { useRef, useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatLargeNumber, formatCurrency, getCustomTooltip } from '../../utils/chartUtils.jsx';

/**
 * Composite Chart Component for displaying multiple chart types
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {Array} props.bars - Configuration for bar charts
 * @param {Array} props.lines - Configuration for line charts
 * @param {Array} props.areas - Configuration for area charts
 * @param {string} props.xAxisKey - Key for the x-axis values
 * @param {string} props.unit - Unit for the values (e.g., '%', 'INR')
 * @param {boolean} props.showGrid - Whether to show grid lines
 * @param {boolean} props.showLegend - Whether to show the legend
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Composite Chart Component
 */
const CompositeChartComponent = ({
  data,
  bars = [],
  lines = [],
  areas = [],
  xAxisKey = 'name',
  unit = '',
  showGrid = false,
  showLegend = false,
  height = 300
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
        <ComposedChart
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
          {showLegend && <Legend wrapperStyle={{ fontSize: 10 }} />}

          {/* Render areas */}
          {areas.map((area, index) => (
            <Area
              key={`area-${index}`}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name || area.dataKey}
              stroke={area.color}
              fill={area.color}
              fillOpacity={area.fillOpacity || 0.3}
              strokeWidth={2}
              activeDot={{ r: 5, fill: area.color, strokeWidth: 0 }}
            />
          ))}

          {/* Render bars */}
          {bars.map((bar, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={bar.color}
              radius={[2, 2, 0, 0]}
              barSize={containerWidth < 300 ? 10 : 20}
            />
          ))}

          {/* Render lines */}
          {lines.map((line, index) => (
            <Line
              key={`line-${index}`}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              dot={{ r: 3, fill: line.color, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: line.color, strokeWidth: 0 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompositeChartComponent;
