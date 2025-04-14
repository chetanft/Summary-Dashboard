import { Box, Typography, Paper, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const HeroKPI = ({ title, data }) => {
  // Sample data for the chart
  const chartData = data?.chartData || [
    { month: '1', value: 0 },
    { month: '7', value: 5 },
    { month: '15', value: 10 },
    { month: '21', value: 15 },
    { month: '30', value: 20 },
  ];

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px',
        gap: '16px',
        width: '100%',
        height: '400px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '140%',
              color: '#5F697B',
            }}
          >
            {title}
          </Typography>
          <Tooltip title="Comparison of budgeted, actual, and projected freight costs" placement="top">
            <InfoOutlinedIcon
              sx={{
                fontSize: '16px',
                color: '#838C9D',
                cursor: 'help',
              }}
            />
          </Tooltip>
        </Box>
        <ArrowOutwardIcon 
          sx={{ 
            fontSize: '16px', 
            color: '#838C9D' 
          }} 
        />
      </Box>

      {/* KPI Values */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mt: 1,
        }}
      >
        {/* Actual */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: '140%',
              color: '#434F64',
            }}
          >
            {data?.actual || '₹ 10 Cr'}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#838C9D',
            }}
          >
            Actual
          </Typography>
        </Box>

        {/* Projected */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: '140%',
              color: '#FF3533',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {data?.projected || '₹ 22 Cr'} <ArrowOutwardIcon sx={{ fontSize: '16px', color: '#FF3533', transform: 'rotate(45deg)', ml: 0.5 }} />
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#838C9D',
            }}
          >
            Projected
          </Typography>
        </Box>

        {/* Budget */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: '140%',
              color: '#434F64',
            }}
          >
            {data?.budget || '₹ 20 cr'}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#838C9D',
            }}
          >
            Budget
          </Typography>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          width: '100%',
          height: '250px',
          mt: 3,
          position: 'relative',
        }}
      >
        {/* Y-axis labels */}
        <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">₹ 30 Cr</Typography>
          <Typography variant="caption" color="text.secondary">₹ 22 Cr</Typography>
          <Typography variant="caption" color="text.secondary">₹ 20 Cr</Typography>
          <Typography variant="caption" color="text.secondary">₹ 10 Cr</Typography>
          <Typography variant="caption" color="text.secondary">₹ 0</Typography>
        </Box>
        
        {/* Chart area */}
        <Box sx={{ 
          ml: 5, 
          height: '100%', 
          width: 'calc(100% - 40px)', 
          position: 'relative',
          borderLeft: '1px dashed #CED1D7',
          borderBottom: '1px dashed #CED1D7',
        }}>
          {/* Horizontal grid lines */}
          <Box sx={{ position: 'absolute', top: '0%', width: '100%', height: '1px', borderTop: '1px dashed #CED1D7' }} />
          <Box sx={{ position: 'absolute', top: '25%', width: '100%', height: '1px', borderTop: '1px dashed #CED1D7' }} />
          <Box sx={{ position: 'absolute', top: '50%', width: '100%', height: '1px', borderTop: '1px dashed #CED1D7' }} />
          <Box sx={{ position: 'absolute', top: '75%', width: '100%', height: '1px', borderTop: '1px dashed #CED1D7' }} />
          
          {/* Budget line (dotted) */}
          <Box sx={{ 
            position: 'absolute', 
            top: '33%', 
            width: '100%', 
            height: '1px', 
            borderTop: '1px dashed #434F64',
            zIndex: 1,
          }} />
          
          {/* Actual line (solid) */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path 
              d={`M 0,${100 - 10/30*100} L ${100/5},${100 - 10/30*100} L ${200/5},${100 - 10/30*100} L ${300/5},${100 - 10/30*100} L ${400/5},${100 - 10/30*100} L ${500/5},${100 - 10/30*100}`} 
              stroke="#AAAAAA" 
              strokeWidth="2" 
              fill="none" 
            />
          </svg>
          
          {/* Projected line (dotted, increasing) */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path 
              d={`M ${300/5},${100 - 10/30*100} L ${400/5},${100 - 15/30*100} L ${500/5},${100 - 22/30*100}`} 
              stroke="#FF3533" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
              fill="none" 
            />
          </svg>
        </Box>
        
        {/* X-axis labels */}
        <Box sx={{ ml: 5, display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">1</Typography>
          <Typography variant="caption" color="text.secondary">7</Typography>
          <Typography variant="caption" color="text.secondary">15</Typography>
          <Typography variant="caption" color="text.secondary">21</Typography>
          <Typography variant="caption" color="text.secondary">30</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>March</Typography>
      </Box>
      
      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 2, backgroundColor: '#AAAAAA' }} />
          <Typography variant="caption" color="text.secondary">Budget</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 2, backgroundColor: '#AAAAAA' }} />
          <Typography variant="caption" color="text.secondary">Projected</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default HeroKPI;
