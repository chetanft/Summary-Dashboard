import { Box, Paper, Typography, Tooltip } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

const KPIMetricCard = ({ title, value, trend, suffix = '', negative = false }) => {
  const isPositiveTrend = trend >= 0;
  
  // For negative KPIs (like exceptions), up is bad
  // For positive KPIs (like on-time delivery), up is good
  const trendColor = negative
    ? (isPositiveTrend ? '#FF4D4F' : '#52C41A')
    : (isPositiveTrend ? '#52C41A' : '#FF4D4F');

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '8px',
        height: '100%',
        border: '1px solid #E0E0E0',
      }}
    >
      <Tooltip title={title} arrow>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 500, 
            mb: 1.5, 
            color: '#5F697B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Tooltip>
      
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: negative && value > 10 ? '#FF4D4F' : '#434F64',
            mr: 1 
          }}
        >
          {value}{suffix}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isPositiveTrend ? (
            <ArrowUpwardIcon sx={{ fontSize: 16, color: trendColor }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 16, color: trendColor }} />
          )}
          <Typography variant="body2" sx={{ color: trendColor }}>
            {Math.abs(trend)}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default KPIMetricCard;
