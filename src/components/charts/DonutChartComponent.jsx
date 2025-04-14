import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

/**
 * DonutChartComponent for displaying circular metrics
 * @param {Object} props - Component props
 * @param {Array} props.data - Data for the chart (format: [{name: string, value: number, color: string}])
 * @param {number} props.innerRadius - Inner radius of the donut chart (0-100)
 * @param {number} props.outerRadius - Outer radius of the donut chart (innerRadius-100)
 * @param {boolean} props.showLabel - Whether to show labels
 * @param {number} props.height - Height of the chart
 * @returns {JSX.Element} - Donut Chart Component
 */
const DonutChartComponent = ({
  data = [],
  innerRadius = 60,
  outerRadius = 80,
  showLabel = false,
  height = 200,
  centerLabel
}) => {
  // Calculate total value for percentage
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Custom label component for center text
  const renderCenterLabel = ({ viewBox }) => {
    const { cx, cy } = viewBox;
    return centerLabel ? (
      <g>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontWeight: 'bold', fontSize: '24px', fill: '#434F64', fontFamily: 'Inter, sans-serif' }}
        >
          {centerLabel.value}
        </text>
        {centerLabel.label && (
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '12px', fill: '#5F697B', fontFamily: 'Inter, sans-serif' }}
          >
            {centerLabel.label}
          </text>
        )}
      </g>
    ) : null;
  };

  // Custom label for each segment (displays percentage)
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={data[index].color}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={`${innerRadius}%`}
          outerRadius={`${outerRadius}%`}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          label={showLabel ? renderCustomizedLabel : null}
          labelLine={false}
          strokeWidth={0}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {centerLabel && renderCenterLabel({ viewBox: { cx: '50%', cy: '50%' } })}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChartComponent; 