import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const TrendsGraph = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Format date for x-axis
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      
      return (
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            borderRadius: '4px',
            backgroundColor: '#FFF',
            border: '1px solid #E0E0E0',
          }}
        >
          <Box sx={{ mb: 1, fontWeight: 600 }}>{formattedDate}</Box>
          {payload.map((entry, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 0.5,
                color: entry.color,
              }}
            >
              <Box 
                sx={{ 
                  width: 10, 
                  height: 10, 
                  backgroundColor: entry.color, 
                  borderRadius: '50%', 
                  mr: 1 
                }} 
              />
              <Box sx={{ mr: 1 }}>{entry.name}:</Box>
              <Box sx={{ fontWeight: 600 }}>{entry.value}</Box>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '8px',
        height: 400,
        border: '1px solid #E0E0E0',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            tick={{ fontSize: 12, fill: '#5F697B' }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#5F697B' }}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Line
            type="monotone"
            dataKey="indentIssues"
            name="Indent Issues"
            stroke="#FF9800"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="inTransitAlerts"
            name="In-Transit Alerts"
            stroke="#F44336"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="epodIssues"
            name="ePOD Issues"
            stroke="#9C27B0"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TrendsGraph;
