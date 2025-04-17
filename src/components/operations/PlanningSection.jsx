import React from 'react';
import { Grid, Box } from '@mui/material';
import KpiSection from './KpiSection';
import StatTile from '../realtime-kpis/StatTile';
import DonutChartComponent from '../charts/DonutChartComponent';
import LineChartComponent from '../charts/LineChartComponent';

/**
 * Planning Section component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Planning KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PlanningSection = ({ data, onKPIClick }) => {
  if (!data || !data.kpis) return null;

  // Extract KPIs by type
  const ordersCreated = data.kpis.find(kpi => kpi.id === 'orders-created');
  const ordersAssigned = data.kpis.find(kpi => kpi.id === 'orders-assigned');
  const orderTripMatchRate = data.kpis.find(kpi => kpi.id === 'order-trip-match-rate');
  const tripCreationTrend = data.kpis.find(kpi => kpi.id === 'trip-creation-trend');

  return (
    <KpiSection title={data.title}>
      <Grid container spacing={2} sx={{flexDirection: 'column'}}>
        {/* First column */}
        <Grid item xs={12} md={4} sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
          {ordersCreated && (
            <StatTile
              title={ordersCreated.name}
              value={ordersCreated.value}
              trend={ordersCreated.trend}
              status={ordersCreated.status}
              onClick={() => onKPIClick && onKPIClick(ordersCreated.id, ordersCreated)}
              sx={{ width: '50%', mb: 2 }}
            />
          )}
          {orderTripMatchRate && (
            <StatTile
              title={orderTripMatchRate.name}
              value={`${orderTripMatchRate.value}${orderTripMatchRate.unit}`}
              trend={orderTripMatchRate.trend}
              status={orderTripMatchRate.status}
              onClick={() => onKPIClick && onKPIClick(orderTripMatchRate.id, orderTripMatchRate)}
            />
          )}
        </Grid>

        {/* Second column */}
        <Grid item xs={12} md={4}>
          {ordersAssigned && (
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={ordersAssigned.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: ordersAssigned.name,
                  value: `${ordersAssigned.chartData[0].value}%`,
                  subtitle: 'Assigned'
                }}
              />
            </Box>
          )}
        </Grid>

        {/* Third column */}
        <Grid item xs={12} md={4}>
          {tripCreationTrend && (
            <Box sx={{ height: '250px' }}>
              <LineChartComponent
                data={tripCreationTrend.chartData}
                lines={[{ dataKey: 'value', color: '#1976d2', strokeWidth: 2 }]}
                xAxisKey="date"
                unit={tripCreationTrend.metadata?.unit || ''}
                showGrid={true}
                height="100%"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </KpiSection>
  );
};

export default PlanningSection;
