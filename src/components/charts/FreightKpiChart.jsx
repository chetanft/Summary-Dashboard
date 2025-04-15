import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { formatCurrency, formatDate, getProjectedColor, getProjectedArrow } from '../../utils/chartUtils';
import FreightChartTooltip from './FreightChartTooltip';
import { fullMonthData } from '../../data/freightKpiData';

/**
 * Freight KPI Chart Component
 * Displays budget vs actual vs projected freight spend
 */
const FreightKpiChart = ({ data = fullMonthData }) => {
  // Prepare chart data
  const chartData = useMemo(() => {
    // Combine actual and projected data
    const combinedData = [...data.actual];
    
    // Add budget and projected values to actual data points
    combinedData.forEach(point => {
      point.budget = data.budgetValue;
      point.projected = null; // Will be null for actual data points
    });
    
    // Add projected data points
    data.projected.forEach(point => {
      combinedData.push({
        date: point.date,
        value: null, // Will be null for projected data points
        budget: data.budgetValue,
        projected: point.value
      });
    });
    
    // Sort by date
    combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return combinedData;
  }, [data]);

  // Format dates for x-axis
  const formatXAxis = (dateStr) => {
    return formatDate(dateStr);
  };

  // Format values for y-axis
  const formatYAxis = (value) => {
    return formatCurrency(value, 'INR', true);
  };

  // Get the current actual value (last actual data point)
  const currentActualValue = data.actual[data.actual.length - 1].value;
  
  // Get colors and indicators
  const projectedColor = getProjectedColor(data.projectedValue, data.budgetValue);
  const projectedArrow = getProjectedArrow(data.projectedValue, data.budgetValue);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Budgeted vs Actual vs Projected Freight
        </Typography>
        
        {/* Top KPIs */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Actual
              </Typography>
              <Typography variant="h5">
                {formatCurrency(currentActualValue, 'INR', true)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Projected
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ color: projectedColor }}
              >
                {formatCurrency(data.projectedValue, 'INR', true)} {projectedArrow}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>
              <Typography variant="h5">
                {formatCurrency(data.budgetValue, 'INR', true)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {/* Chart */}
        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              
              <YAxis 
                tickFormatter={formatYAxis}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              
              <Tooltip content={<FreightChartTooltip />} />
              
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="line"
                iconSize={10}
              />
              
              {/* Budget Line (Green dashed) */}
              <Line
                type="monotone"
                dataKey="budget"
                stroke="#00C638"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
                name="Budget"
              />
              
              {/* Projected Line (Red dotted) */}
              <Line
                type="monotone"
                dataKey="projected"
                stroke="#FF3533"
                strokeWidth={2}
                strokeDasharray="2 2"
                dot={false}
                activeDot={{ r: 6 }}
                name="Projected"
                connectNulls
              />
              
              {/* Actual Area (Black line with grey fill) */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#000000"
                strokeWidth={2}
                fill="#E0E0E0"
                fillOpacity={0.6}
                activeDot={{ r: 6 }}
                name="Actual"
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FreightKpiChart;
