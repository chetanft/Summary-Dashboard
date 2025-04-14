import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const SecondaryKPI = ({
  title,
  value,
  target,
  chartData,
  color = 'primary',
  chartType = 'bar',
  note,
  additionalInfo,
  onDrillDown
}) => {
  // Default chart data if none provided
  const defaultLineChartData = [
    { day: '1', value: 86 },
    { day: '7', value: 92 },
    { day: '15', value: 88 },
    { day: '21', value: 90 },
    { day: '30', value: 84 },
  ];

  const defaultBarChartData = [
    { region: 'North', value: 75, color: '#FF3533' },
    { region: 'South', value: 76, color: '#FF3533' },
    { region: 'East', value: 72, color: '#FF3533' },
    { region: 'West', value: 92, color: '#4CAF50' },
    { region: 'Central', value: 94, color: '#4CAF50' },
  ];

  const data = chartData ||
    (chartType === 'line' ? defaultLineChartData :
     chartType === 'bar' ? defaultBarChartData : []);

  // Function to get tooltip text based on KPI title
  const getTooltipText = (kpiTitle) => {
    const tooltips = {
      'Freight cost per KM': 'Average freight cost incurred per km shipped. Target: ₹100/km',
      'Vehicle Utilisation': 'Utilization rate of fleet vehicles available vs used. Target: 96%',
      'OTIF': 'Percentage of deliveries that were completed on time and with full order quantity. Target: 98%',
      'Placement Efficiency': 'Percentage of indent requests that were successfully placed with transporters. Target: 96%',
      'Order to Delivery Time': 'Average time from order creation to delivery completion. Target: 3 days',
      'Delayed Delivery %': 'Percentage of deliveries that were delayed. Target: 2%',
      'Pending Dispatched': 'Percentage of orders that are pending dispatch. Target: 10%',
      'Delivered vs Running Delayed': 'Comparison of delivered orders vs currently delayed orders. Target: 10% for delayed',
    };

    return tooltips[kpiTitle] || 'KPI description';
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
        height: chartType === 'line' ? (note ? '190px' : '400px') : '300px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
        cursor: onDrillDown ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s ease',
        '&:hover': onDrillDown ? {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        } : {},
      }}
      onClick={() => onDrillDown && onDrillDown({ id: title.toLowerCase().replace(/\s+/g, '_'), title, unit: title.includes('%') ? '%' : '' })}
    >
      {/* Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
        {onDrillDown && (
          <Tooltip title="View details">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDrillDown({ id: title.toLowerCase().replace(/\s+/g, '_'), title, unit: title.includes('%') ? '%' : '' });
              }}
              sx={{ color: '#434F64' }}
            >
              <OpenInFullIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
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
        {value || 'Value'}
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
          {target || 'Value'}
        </Typography>
      </Box>

      {/* Note if provided */}
      {note && (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#838C9D',
            fontStyle: 'italic',
            mt: 1,
          }}
        >
          {note}
        </Typography>
      )}

      {/* Chart based on chartType */}
      {chartType === 'line' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: note ? '100px' : '180px',
            position: 'relative',
            mt: 2,
            flexGrow: 1,
          }}
        >
          {/* Y-axis labels */}
          <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">100%</Typography>
            <Typography variant="caption" color="text.secondary">95%</Typography>
            <Typography variant="caption" color="text.secondary">85%</Typography>
            <Typography variant="caption" color="text.secondary">50%</Typography>
            <Typography variant="caption" color="text.secondary">0%</Typography>
          </Box>

          {/* Chart area with pink background */}
          <Box sx={{
            ml: 5,
            height: '100%',
            width: 'calc(100% - 40px)',
            backgroundColor: '#FFF0F0',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Target line */}
            <Box sx={{
              position: 'absolute',
              top: '20%',
              width: '100%',
              height: '1px',
              backgroundColor: '#FF0000',
              borderStyle: 'dashed'
            }} />

            {/* Line chart */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={data.map((point, index) =>
                  `${(index / (data.length - 1)) * 100},${100 - (point.value / 100) * 100}`
                ).join(' ')}
                fill="none"
                stroke="#FF0000"
                strokeWidth="2"
              />
            </svg>
          </Box>

          {/* X-axis labels */}
          <Box sx={{ ml: 5, display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            {data.map((item, index) => (
              <Typography key={index} variant="caption" color="text.secondary">{item.day}</Typography>
            ))}
          </Box>
        </Box>
      )}

      {chartType === 'bar' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '150px',
            mt: 2,
            flexGrow: 1,
          }}
        >
          {/* Bars */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '120px', alignItems: 'flex-end' }}>
            {data.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${100 / data.length}%` }}>
                <Box
                  sx={{
                    width: '80%',
                    height: `${item.value}%`,
                    backgroundColor: item.color || (color === 'error' ? '#FF3533' : '#4CAF50'),
                    borderRadius: '4px 4px 0 0',
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  {item.region}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {chartType === 'donut' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '150px',
            mt: 2,
            position: 'relative',
            flexGrow: 1,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={color === 'error' ? '#FF3533' : color === 'success' ? '#4CAF50' : '#2196F3'}
              strokeWidth="20"
              strokeDasharray={`${parseInt(value) * 2.51} ${(100 - parseInt(value)) * 2.51}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          {additionalInfo && (
            <Typography
              sx={{
                position: 'absolute',
                fontSize: '14px',
                color: '#838C9D',
                bottom: '10px'
              }}
            >
              {additionalInfo}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default SecondaryKPI;
