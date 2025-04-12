import { Box, Typography, Paper, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const HeroKPI = ({ title, data }) => {
  // Sample data for the chart
  const chartData = data?.chartData || [
    { month: 'Nov', value: 210, color: '#FF3533' },
    { month: 'Dec', value: 307, color: '#838C9D' },
    { month: 'Jan', value: 275, color: '#FF3533' },
    { month: 'Feb', value: 348, color: '#838C9D' },
    { month: 'Mar', value: 317, color: '#838C9D' },
  ];

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '32px',
        gap: '24px',
        width: '100%',
        height: '500px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '32px',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '34px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '140%',
              color: '#5F697B',
            }}
          >
            {title || 'Hero KPI'}
          </Typography>
          <Tooltip title={`Compares actual MTD freight spend vs the planned budget for the month. Benchmark: ₹10,00,000`}>
            <InfoOutlinedIcon sx={{ fontSize: 16, color: '#838C9D', cursor: 'pointer' }} />
          </Tooltip>
        </Box>
        <Box
          sx={{
            width: '25px',
            height: '25px',
            backgroundColor: data?.color === 'green' ? '#4CAF50' : data?.color === 'yellow' ? '#FFC107' : '#FF3533',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="svg"
            sx={{ width: 10, height: 10 }}
            viewBox="0 0 10 10"
            fill="#FFFFFF"
          >
            <circle cx="5" cy="5" r="5" fill="#FFFFFF" />
          </Box>
        </Box>
      </Box>

      {/* KPI Data */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          height: '84px',
        }}
      >
        {/* Actual */}
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
            Actual
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '140%',
              color: '#434F64',
            }}
          >
            {data?.actual || 'Span 6'}
          </Typography>
        </Box>

        {/* Projected */}
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
            Projected
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
            {data?.projected || 'Span 6'}
          </Typography>
        </Box>

        {/* Budget */}
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
            Budget
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
            {data?.budget || 'Span 6'}
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          width: '100%',
          height: '436px',
          position: 'relative',
        }}
      >
        {/* Dashed line */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: '50%',
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
            bottom: 0,
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
            height: '100%',
            width: '100%',
            paddingTop: '20px',
            paddingBottom: '30px',
          }}
        >
          {chartData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                width: '18%',
              }}
            >
              <Box
                sx={{
                  width: '46px',
                  height: `${item.value}px`,
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
    </Paper>
  );
};

export default HeroKPI;
