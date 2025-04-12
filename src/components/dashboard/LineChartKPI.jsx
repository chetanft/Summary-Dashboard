import { Box, Typography, Paper } from '@mui/material';

const LineChartKPI = ({ title, value, target }) => {
  // Months for the x-axis
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '32px',
        gap: '12px',
        width: '100%',
        height: '221px',
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
          width: '100%',
        }}
      >
        {title}
      </Typography>

      {/* Value and Target */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '29px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#434F64',
          }}
        >
          {value || 'Value'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
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
            Target:
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
          width: '100%',
          height: '87px',
          position: 'relative',
          marginTop: '10px',
        }}
      >
        {/* Vertical lines */}
        {months.map((month, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '66px',
              left: `${index * 25}%`,
              top: 0,
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          />
        ))}

        {/* Dashed horizontal line */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: '31px',
            left: 0,
            borderBottom: '1px dashed #CED1D7',
          }}
        />

        {/* Green line chart */}
        <Box
          sx={{
            position: 'absolute',
            width: '75%',
            height: '36px',
            left: 0,
            top: '31px',
            background: 'linear-gradient(180deg, #00C638 -442.68%, #FFFFFF 100%)',
            borderRadius: '2px',
          }}
        />

        {/* Red line chart */}
        <Box
          sx={{
            position: 'absolute',
            width: '25%',
            height: '44px',
            right: 0,
            top: '22px',
            background: 'linear-gradient(180deg, #FF3533 -332.48%, #FFFFFF 101.67%)',
            transform: 'matrix(-1, 0, 0, 1, 0, 0)',
            borderRadius: '2px',
          }}
        />

        {/* Month labels */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}
        >
          {months.map((month, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '7.5px',
                lineHeight: '140%',
                color: '#434F64',
                width: '20px',
                textAlign: 'center',
              }}
            >
              {month}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default LineChartKPI;
