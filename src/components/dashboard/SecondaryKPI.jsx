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
        padding: '32px',
        gap: '28px',
        width: '100%',
        height: '323px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '32px',
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '29px',
          color: '#5F697B',
        }}
      >
        {title}
      </Typography>

      {/* KPI Data and Chart */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          height: '202px',
        }}
      >
        {/* Value and Target */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '202px',
          }}
        >
          {/* Value */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '40px',
                lineHeight: '140%',
                color: '#434F64',
              }}
            >
              {value || 'Value'}
            </Typography>
          </Box>

          {/* Target */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
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
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64',
              }}
            >
              {target || 'Value'}
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box
          sx={{
            width: '350px',
            height: '199px',
            position: 'relative',
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
              borderBottom: '1px dashed #838C9D',
            }}
          />

          {/* Bottom line */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              bottom: '30px',
              left: 0,
              borderBottom: '1px dashed #838C9D',
            }}
          />

          {/* Chart bars */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '169px',
              width: '100%',
              paddingTop: '10px',
              paddingBottom: '30px',
            }}
          >
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  width: '18%',
                }}
              >
                <Box
                  sx={{
                    width: '21px',
                    height: `${item.value * 0.8}px`,
                    backgroundColor: item.color,
                    borderRadius: '2px',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '10px',
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
      </Box>
    </Paper>
  );
};

export default SecondaryKPI;
