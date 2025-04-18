import { Box, Typography, Paper, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LineChartComponent from '../charts/LineChartComponent';
import { formatCurrency } from '../../utils/chartUtils.jsx';

const EnhancedSecondaryKPI = ({ title, value, target, color, unit, trend }) => {
  // Transform trend data for the line chart
  const transformedTrendData = trend?.map((value, index) => {
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    return {
      name: months[index % months.length],
      value: value
    };
  }) || [];

  // Function to get tooltip text based on KPI title
  const getTooltipText = (kpiTitle) => {
    const tooltips = {
      'Freight Cost per KM': 'Average freight cost incurred per km shipped. Target: ₹5/km',
      'Vehicle Utilization': 'Utilization rate of fleet vehicles available vs used. Target: 85%',
      'OTIF %': 'Percentage of deliveries that were completed on time and with full order quantity. Target: ≥ 95%',
      'Placement Efficiency': 'Percentage of indent requests that were successfully placed with transporters. Target: ≥ 90%',
      'KPI 2A': 'Secondary KPI description with benchmark information',
      'KPI 3A': 'Secondary KPI description with benchmark information',
      'KPI 3B': 'Secondary KPI description with benchmark information',
      'KPI 3C': 'Secondary KPI description with benchmark information',
    };

    return tooltips[kpiTitle] || 'KPI description';
  };

  // Format value based on unit
  const formatValue = (val) => {
    if (val === undefined || val === null) return 'N/A';

    if (unit === 'INR' || unit === '₹') {
      return formatCurrency(val, 'INR');
    } else if (unit === '%') {
      return `${val}%`;
    } else if (unit === 'INR/km') {
      return `₹${val}/km`;
    }

    return val;
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px',
        gap: '16px',
        width: '100%',
        height: '240px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
      }}
    >
      {/* Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            color: '#434F64',
          }}
        >
          {title}
        </Typography>
        <Tooltip title={getTooltipText(title)}>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: '#838C9D', cursor: 'pointer' }} />
        </Tooltip>
      </Box>

      {/* Value */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '28px',
          lineHeight: '140%',
          color: color === 'green' ? '#4CAF50' : color === 'yellow' ? '#FFC107' : color === 'red' ? '#FF3533' : '#434F64',
          mt: -1,
        }}
      >
        {value !== undefined && value !== null ? formatValue(value) : 'N/A'}
      </Typography>

      {/* Target */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px',
          mt: -1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '140%',
            color: '#5F697B',
          }}
        >
          Target
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '140%',
            color: '#434F64',
          }}
        >
          {target !== undefined && target !== null ? formatValue(target) : 'N/A'}
        </Typography>
      </Box>

      {/* Enhanced Chart */}
      <Box
        sx={{
          width: '100%',
          height: '120px',
          mt: 1,
          flexGrow: 1,
        }}
      >
        <LineChartComponent
          data={transformedTrendData}
          lines={[{ dataKey: 'value', color: color === 'green' ? '#4CAF50' : color === 'yellow' ? '#FFC107' : '#FF3533' }]}
          xAxisKey="name"
          unit={unit}
          height={100}
        />
      </Box>
    </Paper>
  );
};

export default EnhancedSecondaryKPI;
