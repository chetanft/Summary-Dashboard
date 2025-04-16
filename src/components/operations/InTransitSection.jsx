import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import KpiSection from './KpiSection';
import KpiToggle from './KpiToggle';
import StatTile from '../realtime-kpis/StatTile';
import DonutChartComponent from '../charts/DonutChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * In Transit Section component with FTL/PTL toggle
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - In Transit KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const InTransitSection = ({ data, onKPIClick }) => {
  const [activeType, setActiveType] = useState('ftl');
  
  if (!data) return null;
  
  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setActiveType(newType);
    }
  };
  
  // Get the active data based on the selected type
  const activeData = data[activeType];
  if (!activeData || !activeData.kpis) return null;
  
  // Render FTL KPIs
  const renderFtlKpis = () => {
    // Extract KPIs by type
    const deliveredVsInTransit = activeData.kpis.find(kpi => kpi.id === 'delivered-vs-in-transit');
    const tripDelayFlag = activeData.kpis.find(kpi => kpi.id === 'trip-delay-flag');
    const overSpeedAlerts = activeData.kpis.find(kpi => kpi.id === 'over-speed-alerts');
    const routeDeviation = activeData.kpis.find(kpi => kpi.id === 'route-deviation');
    const temperatureBreach = activeData.kpis.find(kpi => kpi.id === 'temperature-breach');
    const nightDrivingTrips = activeData.kpis.find(kpi => kpi.id === 'night-driving-trips');
    
    return (
      <Grid container spacing={2}>
        {/* First column */}
        <Grid item xs={12} md={4}>
          {deliveredVsInTransit && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={deliveredVsInTransit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: deliveredVsInTransit.name,
                  value: `${deliveredVsInTransit.chartData[0].value}%`,
                  subtitle: 'Delivered'
                }}
              />
            </Box>
          )}
        </Grid>
        
        {/* Second column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tripDelayFlag && (
              <StatTile
                title={tripDelayFlag.name}
                value={`${tripDelayFlag.value}${tripDelayFlag.unit}`}
                trend={tripDelayFlag.trend}
                status={tripDelayFlag.status}
                onClick={() => onKPIClick && onKPIClick(tripDelayFlag.id, tripDelayFlag)}
              />
            )}
            {overSpeedAlerts && (
              <StatTile
                title={overSpeedAlerts.name}
                value={`${overSpeedAlerts.value}${overSpeedAlerts.unit}`}
                trend={overSpeedAlerts.trend}
                status={overSpeedAlerts.status}
                onClick={() => onKPIClick && onKPIClick(overSpeedAlerts.id, overSpeedAlerts)}
              />
            )}
            {routeDeviation && (
              <StatTile
                title={routeDeviation.name}
                value={`${routeDeviation.value}${routeDeviation.unit}`}
                trend={routeDeviation.trend}
                status={routeDeviation.status}
                onClick={() => onKPIClick && onKPIClick(routeDeviation.id, routeDeviation)}
              />
            )}
          </Box>
        </Grid>
        
        {/* Third column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {temperatureBreach && (
              <StatTile
                title={temperatureBreach.name}
                value={`${temperatureBreach.value}${temperatureBreach.unit}`}
                trend={temperatureBreach.trend}
                status={temperatureBreach.status}
                onClick={() => onKPIClick && onKPIClick(temperatureBreach.id, temperatureBreach)}
              />
            )}
            {nightDrivingTrips && (
              <StatTile
                title={nightDrivingTrips.name}
                value={`${nightDrivingTrips.value}${nightDrivingTrips.unit}`}
                trend={nightDrivingTrips.trend}
                status={nightDrivingTrips.status}
                onClick={() => onKPIClick && onKPIClick(nightDrivingTrips.id, nightDrivingTrips)}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };
  
  // Render PTL KPIs
  const renderPtlKpis = () => {
    // Extract KPIs by type
    const shipmentsInTransit = activeData.kpis.find(kpi => kpi.id === 'shipments-in-transit');
    const delayFlagsHubToHub = activeData.kpis.find(kpi => kpi.id === 'delay-flags-hub-to-hub');
    const networkUtilisation = activeData.kpis.find(kpi => kpi.id === 'network-utilisation');
    const bagLossOrDamage = activeData.kpis.find(kpi => kpi.id === 'bag-loss-or-damage');
    const waybillNotScanned = activeData.kpis.find(kpi => kpi.id === 'waybill-not-scanned');
    
    return (
      <Grid container spacing={2}>
        {/* First column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {shipmentsInTransit && (
              <StatTile
                title={shipmentsInTransit.name}
                value={shipmentsInTransit.value}
                trend={shipmentsInTransit.trend}
                status={shipmentsInTransit.status}
                onClick={() => onKPIClick && onKPIClick(shipmentsInTransit.id, shipmentsInTransit)}
              />
            )}
            {delayFlagsHubToHub && (
              <StatTile
                title={delayFlagsHubToHub.name}
                value={`${delayFlagsHubToHub.value}${delayFlagsHubToHub.unit}`}
                trend={delayFlagsHubToHub.trend}
                status={delayFlagsHubToHub.status}
                onClick={() => onKPIClick && onKPIClick(delayFlagsHubToHub.id, delayFlagsHubToHub)}
              />
            )}
          </Box>
        </Grid>
        
        {/* Second column */}
        <Grid item xs={12} md={4}>
          {networkUtilisation && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {networkUtilisation.name}
              </Typography>
              <BarChartComponent
                data={networkUtilisation.chartData}
                dataKey="value"
                xAxisKey="hubs"
                color="#1976d2"
                unit={networkUtilisation.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>
        
        {/* Third column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {bagLossOrDamage && (
              <StatTile
                title={bagLossOrDamage.name}
                value={`${bagLossOrDamage.value}${bagLossOrDamage.unit}`}
                trend={bagLossOrDamage.trend}
                status={bagLossOrDamage.status}
                onClick={() => onKPIClick && onKPIClick(bagLossOrDamage.id, bagLossOrDamage)}
              />
            )}
            {waybillNotScanned && (
              <StatTile
                title={waybillNotScanned.name}
                value={`${waybillNotScanned.value}${waybillNotScanned.unit}`}
                trend={waybillNotScanned.trend}
                status={waybillNotScanned.status}
                onClick={() => onKPIClick && onKPIClick(waybillNotScanned.id, waybillNotScanned)}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };
  
  return (
    <KpiSection title={data.title}>
      <KpiToggle activeType={activeType} onChange={handleTypeChange} />
      
      {activeType === 'ftl' ? renderFtlKpis() : renderPtlKpis()}
    </KpiSection>
  );
};

export default InTransitSection;
