import { useRef, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { formatLargeNumber, formatCurrency, getCustomTooltip } from '../../utils/chartUtils.jsx';

/**
 * Bar Group Chart Component for displaying regional metrics
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {Array} props.bars - Configuration for each bar group
 * @param {string} props.xAxisKey - Key for the x-axis values
 * @param {string} props.unit - Unit for the values (e.g., '%', 'INR')
 * @param {boolean} props.showGrid - Whether to show grid lines
 * @param {boolean} props.showLegend - Whether to show legend
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Bar Group Chart Component
 */
const BarGroupChartComponent = ({
  data,
  bars = [{ dataKey: 'value', color: '#FF3533' }],
  xAxisKey = 'name',
  unit = '',
  showGrid = false,
  showLegend = false,
  height = 200,
  barGap = 0,
  barSize = 30,
  targetLine
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);

  // Calculate responsive values based on container width
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        if (!entries || !entries[0]) return;
        const width = entries[0].contentRect.width;
        setContainerWidth(width);
      });

      resizeObserver.observe(containerRef.current);
      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }
  }, [containerRef]);

  // Format the tooltip value based on unit
  const formatTooltipValue = (value) => {
    if (value === null || value === undefined) return 'N/A';

    if (unit === '%') {
      return `${value}%`;
    } else if (unit === 'INR' || unit === '₹') {
      return formatCurrency(value, 'INR');
    } else if (unit === 'days' || unit === 'day') {
      return `${value} days`;
    }
    
    return formatLargeNumber(value);
  };

  // Format the y-axis tick label
  const formatTick = (value) => {
    if (value === null || value === undefined) return '';

    if (unit === '%') {
      return `${value}%`;
    } else if (unit === 'INR' || unit === '₹') {
      return `₹${formatLargeNumber(value)}`;
    } else if (value >= 1000) {
      return formatLargeNumber(value);
    }
    
    return value;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          style={{ 
            backgroundColor: '#fff', 
            padding: '8px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`value-${index}`} style={{ margin: 0, color: entry.color }}>
              {entry.name}: {formatTooltipValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Determine if color is per bar or per data point
  const isColorPerPoint = bars.some(bar => Array.isArray(bar.colors));

  return (
    <div ref={containerRef} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          barGap={barGap}
          barSize={barSize}
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
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 10 }} />}
          
          {bars.map((bar, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey={bar.dataKey}
              name={bar.name || bar.dataKey}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
            >
              {isColorPerPoint && data.map((entry, i) => (
                <Cell 
                  key={`cell-${i}`} 
                  fill={bar.colors && bar.colors[i] ? bar.colors[i] : bar.color} 
                />
              ))}
            </Bar>
          ))}
          
          {targetLine && (
            <line
              x1="0%"
              y1={targetLine.y}
              x2="100%"
              y2={targetLine.y}
              stroke={targetLine.color || "#4CAF50"}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGroupChartComponent; 