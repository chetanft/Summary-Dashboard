import { Box, Typography, Paper } from '@mui/material';

const SecondaryKPI = ({ title, value, target, chartData }) => {
  // Default chart data if none provided
  const defaultChartData = [
    { month: 'Nov', value: 96, color: '#FF3533' },
    { month: 'Dec', value: 140, color: '#838C9D' },
    { month: 'Jan', value: 125, color: '#FF3533' },
    { month: 'Feb', value: 158, color: '#838C9D' },
    { month: 'Mar', value: 144, color: '#838C9D' },
  ];

  const data = chartData || defaultChartData;

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
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          color: '#434F64',
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* Value */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '28px',
          lineHeight: '140%',
          color: '#434F64',
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

      {/* Chart */}
      <Box
        sx={{
          width: '100%',
          height: '120px',
          position: 'relative',
          mt: 1,
          flexGrow: 1,
        }}
      >
        {/* Dashed line */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: '3px',
            left: 0,
            borderBottom: '1px dashed #CED1D7',
          }}
        />

        {/* Bottom line */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            bottom: '20px',
            left: 0,
            borderBottom: '1px dashed #CED1D7',
          }}
        />

        {/* Chart bars */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: '100%',
            width: '100%',
            paddingBottom: '20px',
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                width: '18%',
              }}
            >
              <Box
                sx={{
                  width: '16px',
                  height: `${item.value * 0.5}px`,
                  backgroundColor: item.color,
                  borderRadius: '2px',
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '8px',
                  lineHeight: '140%',
                  color: '#434F64',
                }}
              >
                {item.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default SecondaryKPI;
