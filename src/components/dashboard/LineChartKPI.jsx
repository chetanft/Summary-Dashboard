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
        padding: '24px',
        gap: '12px',
        width: '100%',
        height: '180px',
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
          mt: -1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            color: '#434F64',
          }}
        >
          {value || 'Value'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#5F697B',
            }}
          >
            Target:
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '16px',
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
          height: '80px',
          position: 'relative',
          marginTop: '8px',
          flexGrow: 1,
        }}
      >
        {/* Vertical lines */}
        {months.map((monthLabel, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '60px',
              left: `${index * 25}%`,
              top: 0,
              borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          />
        ))}

        {/* Dashed horizontal line */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: '30px',
            left: 0,
            borderBottom: '1px dashed #CED1D7',
          }}
        />

        {/* Green line chart */}
        <Box
          sx={{
            position: 'absolute',
            width: '75%',
            height: '30px',
            left: 0,
            top: '30px',
            background: 'linear-gradient(180deg, #00C638 -442.68%, #FFFFFF 100%)',
            borderRadius: '2px',
          }}
        />

        {/* Red line chart */}
        <Box
          sx={{
            position: 'absolute',
            width: '25%',
            height: '40px',
            right: 0,
            top: '20px',
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
          {months.map((monthLabel, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '8px',
                lineHeight: '140%',
                color: '#434F64',
                width: '20px',
                textAlign: 'center',
              }}
            >
              {monthLabel}
            </Typography>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default LineChartKPI;
