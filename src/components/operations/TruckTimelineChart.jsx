import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Cell, ReferenceLine 
} from 'recharts';
import { format, parseISO, differenceInMinutes } from 'date-fns';
import { Box, Typography, Paper } from '@mui/material';

/**
 * Truck Timeline Chart component (Gantt-style)
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Truck timeline data
 * @returns {JSX.Element}
 */
const TruckTimelineChart = ({ data }) => {
  // Vehicle type color mapping
  const vehicleColors = {
    "Mini Truck": "#ffbe07",
    "14-ft Truck": "#003c9b",
    "Trailer": "#04bc15",
    "Container": "#939393"
  };

  // Process data for the chart
  const { chartData, timeRange } = useMemo(() => {
    if (!data || data.length === 0) {
      return { chartData: [], timeRange: { min: 0, max: 0 } };
    }

    // Parse dates and sort by gate in time
    const processedData = data
      .map(truck => {
        const gateIn = parseISO(truck.gateInTime);
        const dockIn = parseISO(truck.dockInTime);
        const gateOut = parseISO(truck.gateOutTime);
        
        return {
          ...truck,
          gateIn,
          dockIn,
          gateOut,
          waitingTime: differenceInMinutes(dockIn, gateIn),
          dockTime: differenceInMinutes(gateOut, dockIn),
          totalTime: differenceInMinutes(gateOut, gateIn)
        };
      })
      .sort((a, b) => a.gateIn - b.gateIn);

    // Find min and max times for the x-axis
    const minTime = Math.min(...processedData.map(d => d.gateIn.getTime()));
    const maxTime = Math.max(...processedData.map(d => d.gateOut.getTime()));
    
    // Convert to minutes from the start for the chart
    const startTime = new Date(minTime);
    
    const chartData = processedData.map(truck => {
      const waitingStart = differenceInMinutes(truck.gateIn, startTime);
      const dockStart = differenceInMinutes(truck.dockIn, startTime);
      const gateOutTime = differenceInMinutes(truck.gateOut, startTime);
      
      return {
        truckId: truck.truckId,
        vehicleType: truck.vehicleType,
        waitingStart,
        waitingDuration: truck.waitingTime,
        dockStart,
        dockDuration: truck.dockTime,
        gateOutTime,
        totalTime: truck.totalTime,
        // Store original timestamps for tooltips
        gateInTime: truck.gateInTime,
        dockInTime: truck.dockInTime,
        gateOutTime: truck.gateOutTime,
        // Store formatted times for display
        gateInFormatted: format(truck.gateIn, 'HH:mm'),
        dockInFormatted: format(truck.dockIn, 'HH:mm'),
        gateOutFormatted: format(truck.gateOut, 'HH:mm'),
      };
    });

    // Calculate time range in minutes
    const timeRange = {
      min: 0,
      max: differenceInMinutes(new Date(maxTime), startTime),
      startTime
    };

    return { chartData, timeRange };
  }, [data]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1.5, boxShadow: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {data.truckId} ({data.vehicleType})
          </Typography>
          <Box sx={{ fontSize: '0.875rem', color: '#5F697B' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>Gate In:</span>
              <span style={{ fontWeight: 500, color: '#434F64' }}>{data.gateInFormatted}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>Dock In:</span>
              <span style={{ fontWeight: 500, color: '#434F64' }}>{data.dockInFormatted}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>Gate Out:</span>
              <span style={{ fontWeight: 500, color: '#434F64' }}>{data.gateOutFormatted}</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>Waiting Time:</span>
              <span style={{ fontWeight: 500, color: '#434F64' }}>{data.waitingDuration} min</span>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Dock Time:</span>
              <span style={{ fontWeight: 500, color: '#434F64' }}>{data.dockDuration} min</span>
            </Box>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
        {payload.map((entry, index) => (
          <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: entry.color,
                borderRadius: '2px'
              }}
            />
            <Typography variant="body2" sx={{ color: '#434F64' }}>
              {entry.value}
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: '#e0e0e0',
              borderRadius: '2px'
            }}
          />
          <Typography variant="body2" sx={{ color: '#434F64' }}>
            Waiting Time
          </Typography>
        </Box>
      </Box>
    );
  };

  // Format x-axis ticks (minutes to HH:MM)
  const formatXAxis = (minutes) => {
    if (!timeRange.startTime) return '';
    const time = new Date(timeRange.startTime);
    time.setMinutes(time.getMinutes() + minutes);
    return format(time, 'HH:mm');
  };

  // If no data, show a message
  if (!data || data.length === 0) {
    return (
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No truck timeline data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#434F64', textAlign: 'center' }}>
        Truck Timeline View – From Gate In to Gate Out
      </Typography>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 40 }}
          barSize={20}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis 
            type="number" 
            domain={[0, timeRange.max]} 
            tickFormatter={formatXAxis}
            tickCount={10}
          />
          <YAxis 
            type="category" 
            dataKey="truckId" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          
          {/* Waiting time bars (Gate In to Dock In) */}
          <Bar 
            dataKey="waitingDuration" 
            stackId="a" 
            fill="#e0e0e0" 
            name="Waiting Time"
            radius={[0, 0, 0, 0]}
          />
          
          {/* Dock time bars (Dock In to Gate Out) */}
          <Bar 
            dataKey="dockDuration" 
            stackId="a" 
            name="Vehicle Type"
            radius={[0, 0, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={vehicleColors[entry.vehicleType] || '#777777'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TruckTimelineChart;
