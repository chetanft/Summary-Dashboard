import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import KpiSection from './KpiSection';
import KpiToggle from './KpiToggle';
import StatTile from '../realtime-kpis/StatTile';
import DonutChartComponent from '../charts/DonutChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import DockOccupancyHeatmap from './DockOccupancyHeatmap';
import { fetchDockOccupancyData } from '../../services/operationsService';

/**
 * Pre Dispatch Section component with FTL/PTL toggle
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Pre Dispatch KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PreDispatchSection = ({ data, onKPIClick }) => {
  const [activeType, setActiveType] = useState('ftl');
  const [dockData, setDockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dock occupancy data
  useEffect(() => {
    const loadDockData = async () => {
      try {
        setLoading(true);
        const result = await fetchDockOccupancyData();
        setDockData(result);
        setError(null);
      } catch (err) {
        console.error('Error loading dock occupancy data:', err);
        setError('Failed to load dock occupancy data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDockData();
  }, []);

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
    const indentStatus = activeData.kpis.find(kpi => kpi.id === 'indent-status');
    const acceptedSplit = activeData.kpis.find(kpi => kpi.id === 'accepted-split');
    const vehicleAssignmentPending = activeData.kpis.find(kpi => kpi.id === 'vehicle-assignment-pending');
    const vehicleReportingPending = activeData.kpis.find(kpi => kpi.id === 'vehicle-reporting-pending');
    const activePreTransits = activeData.kpis.find(kpi => kpi.id === 'active-pre-transits');
    const delayForFulfilment = activeData.kpis.find(kpi => kpi.id === 'delay-for-fulfilment');
    const avgLoadingTat = activeData.kpis.find(kpi => kpi.id === 'avg-loading-tat');
    const yardOccupancy = activeData.kpis.find(kpi => kpi.id === 'yard-occupancy');
    const dockUtilisation = activeData.kpis.find(kpi => kpi.id === 'dock-utilisation');

    return (
      <Grid container spacing={2} sx={{flexDirection: 'column'}}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
            Indent & Pre Transit
          </Typography>
        </Grid>

        {/* First row */}
        <Grid item xs={12} md={4}>
          {indentStatus && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={indentStatus.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: indentStatus.name,
                  value: `${indentStatus.chartData[0].value}%`,
                  subtitle: 'Accepted'
                }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {acceptedSplit && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={acceptedSplit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: acceptedSplit.name,
                  value: `${acceptedSplit.chartData[0].value}%`,
                  subtitle: 'Reporting'
                }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activePreTransits && (
              <StatTile
                title={activePreTransits.name}
                value={activePreTransits.value}
                trend={activePreTransits.trend}
                status={activePreTransits.status}
                onClick={() => onKPIClick && onKPIClick(activePreTransits.id, activePreTransits)}
              />
            )}
            {delayForFulfilment && (
              <StatTile
                title={delayForFulfilment.name}
                value={`${delayForFulfilment.value} ${delayForFulfilment.unit}`}
                trend={delayForFulfilment.trend}
                status={delayForFulfilment.status}
                onClick={() => onKPIClick && onKPIClick(delayForFulfilment.id, delayForFulfilment)}
              />
            )}
          </Box>
        </Grid>

        {/* Second row */}
        <Grid item xs={12} md={6}>
          {vehicleAssignmentPending && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {vehicleAssignmentPending.name}
              </Typography>
              <BarChartComponent
                data={vehicleAssignmentPending.chartData}
                dataKey="value"
                xAxisKey="bucket"
                color="#1976d2"
                unit={vehicleAssignmentPending.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {vehicleReportingPending && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {vehicleReportingPending.name}
              </Typography>
              <BarChartComponent
                data={vehicleReportingPending.chartData}
                dataKey="value"
                xAxisKey="bucket"
                color="#4CAF50"
                unit={vehicleReportingPending.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, fontWeight: 600, color: '#434F64' }}>
            At Loading (Yard, Dock, TAT)
          </Typography>
        </Grid>

        {/* Third row */}
        <Grid item xs={12} md={6}>
          {avgLoadingTat && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {avgLoadingTat.name}
              </Typography>
              <BarChartComponent
                data={avgLoadingTat.chartData}
                dataKey="value"
                xAxisKey="plant"
                color="#9C27B0"
                unit={avgLoadingTat.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {yardOccupancy && (
              <StatTile
                title={yardOccupancy.name}
                value={`${yardOccupancy.value} ${yardOccupancy.unit}`}
                trend={yardOccupancy.trend}
                status={yardOccupancy.status}
                onClick={() => onKPIClick && onKPIClick(yardOccupancy.id, yardOccupancy)}
              />
            )}
            {dockUtilisation && (
              <StatTile
                title={dockUtilisation.name}
                value={`${dockUtilisation.value}${dockUtilisation.unit}`}
                trend={dockUtilisation.trend}
                status={dockUtilisation.status}
                onClick={() => onKPIClick && onKPIClick(dockUtilisation.id, dockUtilisation)}
              />
            )}
          </Box>
        </Grid>

        {/* Dock Occupancy Heatmap */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, fontWeight: 600, color: '#434F64' }}>
            Dock Occupancy Heatmap
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : dockData ? (
              <DockOccupancyHeatmap data={dockData} />
            ) : (
              <Alert severity="info">No dock occupancy data available</Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };

  // Render PTL KPIs
  const renderPtlKpis = () => {
    // Extract KPIs by type
    const indentStatus = activeData.kpis.find(kpi => kpi.id === 'ptl-indent-status');
    const pickupAllocationDelay = activeData.kpis.find(kpi => kpi.id === 'pickup-allocation-delay');
    const hubReportingSlaBreach = activeData.kpis.find(kpi => kpi.id === 'hub-reporting-sla-breach');
    const bagsAwaitingPickup = activeData.kpis.find(kpi => kpi.id === 'bags-awaiting-pickup');
    const pickupSlaBreached = activeData.kpis.find(kpi => kpi.id === 'pickup-sla-breached');

    return (
      <Grid container spacing={2}>
        {/* First row */}
        <Grid item xs={12} md={4}>
          {indentStatus && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={indentStatus.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: indentStatus.name,
                  value: `${indentStatus.chartData[0].value}%`,
                  subtitle: 'Accepted'
                }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {pickupAllocationDelay && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {pickupAllocationDelay.name}
              </Typography>
              <BarChartComponent
                data={pickupAllocationDelay.chartData}
                dataKey="value"
                xAxisKey="bucket"
                color="#1976d2"
                unit={pickupAllocationDelay.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {hubReportingSlaBreach && (
              <StatTile
                title={hubReportingSlaBreach.name}
                value={`${hubReportingSlaBreach.value}${hubReportingSlaBreach.unit}`}
                trend={hubReportingSlaBreach.trend}
                status={hubReportingSlaBreach.status}
                onClick={() => onKPIClick && onKPIClick(hubReportingSlaBreach.id, hubReportingSlaBreach)}
              />
            )}
            {bagsAwaitingPickup && (
              <StatTile
                title={bagsAwaitingPickup.name}
                value={`${bagsAwaitingPickup.value} ${bagsAwaitingPickup.unit}`}
                trend={bagsAwaitingPickup.trend}
                status={bagsAwaitingPickup.status}
                onClick={() => onKPIClick && onKPIClick(bagsAwaitingPickup.id, bagsAwaitingPickup)}
              />
            )}
            {pickupSlaBreached && (
              <StatTile
                title={pickupSlaBreached.name}
                value={`${pickupSlaBreached.value}${pickupSlaBreached.unit}`}
                trend={pickupSlaBreached.trend}
                status={pickupSlaBreached.status}
                onClick={() => onKPIClick && onKPIClick(pickupSlaBreached.id, pickupSlaBreached)}
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

export default PreDispatchSection;
