import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * Sparkline Chart Component for compact trend display
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart
 * @param {string} props.dataKey - Key for the data values
 * @param {string} props.color - Color for the line
 * @param {number} props.height - Height of the chart
 * @param {number} props.width - Width of the chart
 * @returns {JSX.Element} - Sparkline Chart Component
 */
const SparklineChart = ({ 
  data, 
  dataKey = 'value', 
  color = '#FF3533', 
  height = 30, 
  width = 100 
}) => {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;
