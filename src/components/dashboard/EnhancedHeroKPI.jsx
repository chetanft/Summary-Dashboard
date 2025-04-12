import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import BarChartComponent from '../charts/BarChartComponent';
import { formatCurrency } from '../../utils/chartUtils';

const EnhancedHeroKPI = ({ title, data, onDrillDown }) => {
  // Transform chart data for the bar chart
  const transformedChartData = data?.chartData?.map(item => ({
    name: item.month,
    value: item.value,
    color: item.color
  })) || [];

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px',
        gap: '16px',
        width: '100%',
        height: '500px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #F0F1F7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
        cursor: onDrillDown ? 'pointer' : 'default',
        '&:hover': onDrillDown ? {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out'
        } : {},
      }}
      onClick={onDrillDown ? () => onDrillDown({
        id: 'freight_budget_actual',
        title: title || 'Budgeted Freight vs Actual',
        unit: 'INR'
      }) : undefined}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '140%',
              color: '#434F64',
            }}
          >
            {title || 'Hero KPI'}
          </Typography>
          <Tooltip title={`Compares actual MTD freight spend vs the planned budget for the month. Benchmark: ₹10,00,000`}>
            <InfoOutlinedIcon sx={{ fontSize: 16, color: '#838C9D', cursor: 'pointer' }} />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {onDrillDown && (
            <Tooltip title="View regional breakdown">
              <IconButton
                size="small"
                onClick={() => onDrillDown({
                  id: 'freight_budget_actual',
                  title: title || 'Budgeted Freight vs Actual',
                  unit: 'INR'
                })}
                sx={{ mr: 1 }}
              >
                <ZoomInIcon sx={{ fontSize: 18, color: '#838C9D' }} />
              </IconButton>
            </Tooltip>
          )}
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: data?.color === 'green' ? '#4CAF50' : data?.color === 'yellow' ? '#FFC107' : '#FF3533',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="svg"
              sx={{ width: 8, height: 8 }}
              viewBox="0 0 10 10"
              fill="#FFFFFF"
            >
              <circle cx="5" cy="5" r="5" fill="#FFFFFF" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* KPI Data */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#5F697B',
            mb: 0.5,
          }}
        >
          Actual
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '140%',
            color: '#434F64',
          }}
        >
          {data?.formattedActual || 'N/A'}
        </Typography>
      </Box>

      {/* Projected/Budget Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          gap: '24px',
          mt: -1,
        }}
      >
        {/* Projected */}
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
              lineHeight: '140%',
              color: '#5F697B',
            }}
          >
            Projected/
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
            {data?.formattedProjected || 'N/A'}
          </Typography>
        </Box>

        {/* Budget */}
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
              lineHeight: '140%',
              color: '#5F697B',
            }}
          >
            Budget/
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
            {data?.formattedBudget || 'N/A'}
          </Typography>
        </Box>
      </Box>

      {/* Enhanced Chart */}
      <Box
        sx={{
          width: '100%',
          height: '300px',
          mt: 2,
          flexGrow: 1,
        }}
      >
        <BarChartComponent
          data={transformedChartData}
          dataKey="value"
          xAxisKey="name"
          color="#FF3533"
          unit="INR"
          showGrid={true}
          height={280}
        />
      </Box>
    </Paper>
  );
};

export default EnhancedHeroKPI;
