import { Box, Paper, Typography, Chip, Tooltip } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

const SummaryCard = ({ title, count, percentage, trend, issues }) => {
  const isPositiveTrend = trend >= 0;
  const trendColor = title === 'In-Transit Alerts' || title === 'Indent Issues' || title === 'ePOD Issues'
    ? (isPositiveTrend ? '#FF4D4F' : '#52C41A')  // For negative KPIs, up is bad
    : (isPositiveTrend ? '#52C41A' : '#FF4D4F');  // For positive KPIs, up is good

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '8px',
        height: '100%',
        border: '1px solid #E0E0E0',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#434F64' }}>
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#434F64', mr: 1 }}>
          {count}
        </Typography>
        <Typography variant="body1" sx={{ color: '#5F697B', mr: 1 }}>
          ({percentage}%)
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
      
      <Typography variant="body2" sx={{ color: '#5F697B', mb: 1 }}>
        Top Issues:
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {issues.map((issue, index) => (
          <Tooltip key={index} title={issue} arrow>
            <Chip
              label={issue.length > 15 ? `${issue.substring(0, 15)}...` : issue}
              size="small"
              sx={{
                backgroundColor: '#F5F5F5',
                color: '#434F64',
                fontSize: '12px',
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
};

export default SummaryCard;
