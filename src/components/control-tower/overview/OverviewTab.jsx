import { useState } from 'react';
import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { useControlTower } from '../../../context/ControlTowerContext';
import SummaryCard from './SummaryCard';
import TrendsGraph from './TrendsGraph';
import KPIMetricCard from './KPIMetricCard';
import FailingKPISection from './FailingKPISection';

const OverviewTab = () => {
  const { 
    kpiData, 
    trendData, 
    timeRange, 
    toggleTimeRange, 
    loading, 
    error 
  } = useControlTower();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="Indent Issues" 
            count={15} 
            percentage={12.5} 
            trend={2.3} 
            issues={['Delayed placement', 'RC/PAN mismatch', 'Unapproved 3rd-party vehicle']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="In-Transit Alerts" 
            count={28} 
            percentage={23.3} 
            trend={-1.5} 
            issues={['Long stoppage', 'Route deviation', 'Diversion', 'GPS tracking failure']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard 
            title="ePOD Issues" 
            count={10} 
            percentage={8.3} 
            trend={0.8} 
            issues={['Late POD upload', 'Rejected POD', 'Missing proof', 'Disputes']}
          />
        </Grid>
      </Grid>

      {/* Trends Graph */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Trends
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={toggleTimeRange}
            sx={{ 
              textTransform: 'none',
              borderColor: '#E0E0E0',
              color: '#434F64',
              '&:hover': {
                borderColor: '#0066FF',
                backgroundColor: 'transparent',
              }
            }}
          >
            {timeRange === '7d' ? '7-Day View' : '30-Day View'}
          </Button>
        </Box>
        <TrendsGraph data={trendData} />
      </Box>

      {/* KPI Metrics */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        KPI Metrics
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPIMetricCard 
            title="% Trips with Exceptions" 
            value={kpiData.tripsWithExceptions.value} 
            trend={kpiData.tripsWithExceptions.trend} 
            suffix="%" 
            negative={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIMetricCard 
            title="Avg Delay Duration" 
            value={kpiData.avgDelayDuration.value} 
            trend={kpiData.avgDelayDuration.trend} 
            suffix=" hrs" 
            negative={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIMetricCard 
            title="Escalation Rate" 
            value={kpiData.escalationRate.value} 
            trend={kpiData.escalationRate.trend} 
            suffix="%" 
            negative={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIMetricCard 
            title="On-time Delivery %" 
            value={kpiData.onTimeDelivery.value} 
            trend={kpiData.onTimeDelivery.trend} 
            suffix="%" 
            negative={false}
          />
        </Grid>
      </Grid>

      {/* Failing KPIs */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Failing KPIs (What Went Wrong)
      </Typography>
      
      {/* Delayed Execution */}
      <FailingKPISection 
        title="Delayed Execution" 
        kpis={[
          { 
            title: '% of Trips Delayed In Transit', 
            value: kpiData.delayedExecution.tripsDelayedInTransit.value, 
            trend: kpiData.delayedExecution.tripsDelayedInTransit.trend,
            description: 'Trips that exceeded expected transit time.'
          },
          { 
            title: '% of Trips with Detention at Origin', 
            value: kpiData.delayedExecution.tripsWithDetentionAtOrigin.value, 
            trend: kpiData.delayedExecution.tripsWithDetentionAtOrigin.trend,
            description: 'Delays before dispatch due to loading hold-ups or coordination failure.'
          },
          { 
            title: '% of Trips with Detention at Destination', 
            value: kpiData.delayedExecution.tripsWithDetentionAtDestination.value, 
            trend: kpiData.delayedExecution.tripsWithDetentionAtDestination.trend,
            description: 'Unloading delays causing vehicle idle time.'
          },
          { 
            title: '% of Trips with Long Stoppage (>6/12/24 hrs)', 
            value: kpiData.delayedExecution.tripsWithLongStoppage.value, 
            trend: kpiData.delayedExecution.tripsWithLongStoppage.trend,
            description: 'Unexpected halts en route affecting delivery timelines.'
          },
        ]}
      />
      
      {/* Non-Compliant or Untracked Movement */}
      <FailingKPISection 
        title="Non-Compliant or Untracked Movement" 
        kpis={[
          { 
            title: '% of Trips with Route Deviation', 
            value: kpiData.nonCompliantMovement.tripsWithRouteDeviation.value, 
            trend: kpiData.nonCompliantMovement.tripsWithRouteDeviation.trend,
            description: 'Driver left the planned route without approval.'
          },
          { 
            title: '% of Trips with Diversion', 
            value: kpiData.nonCompliantMovement.tripsWithDiversion.value, 
            trend: kpiData.nonCompliantMovement.tripsWithDiversion.trend,
            description: 'Trips went to an unintended location, posing compliance risk.'
          },
          { 
            title: '% of Trips with E-Waybill Expiry', 
            value: kpiData.nonCompliantMovement.tripsWithEWaybillExpiry.value, 
            trend: kpiData.nonCompliantMovement.tripsWithEWaybillExpiry.trend,
            description: 'Shipments moved with expired documents.'
          },
          { 
            title: '% of Trips Not Tracked (GPS/SIM Failure)', 
            value: kpiData.nonCompliantMovement.tripsNotTracked.value, 
            trend: kpiData.nonCompliantMovement.tripsNotTracked.trend,
            description: 'No visibility during the journey, increasing risk.'
          },
          { 
            title: '% of Trips with Driver Change Not Captured', 
            value: kpiData.nonCompliantMovement.tripsWithDriverChangeNotCaptured.value, 
            trend: kpiData.nonCompliantMovement.tripsWithDriverChangeNotCaptured.trend,
            description: 'Driver changed mid-trip but not updated in system, impacting tracking.'
          },
        ]}
      />
      
      {/* Failure in Closure & Compliance */}
      <FailingKPISection 
        title="Failure in Closure & Compliance" 
        kpis={[
          { 
            title: '% of Trips Not Auto Closed', 
            value: kpiData.failureInClosure.tripsNotAutoClosed.value, 
            trend: kpiData.failureInClosure.tripsNotAutoClosed.trend,
            description: 'System failed to recognize delivery, possibly due to tracking or geo issues.'
          },
          { 
            title: '% of PODs Delayed or Rejected', 
            value: kpiData.failureInClosure.podsDelayedOrRejected.value, 
            trend: kpiData.failureInClosure.podsDelayedOrRejected.trend,
            description: 'Proof of delivery not submitted on time or with errors.'
          },
          { 
            title: '% of Trips with Multiple Escalations', 
            value: kpiData.failureInClosure.tripsWithMultipleEscalations.value, 
            trend: kpiData.failureInClosure.tripsWithMultipleEscalations.trend,
            description: 'Trips that faced 2 or more issues: delays, stoppages, FO non-response.'
          },
          { 
            title: '% of Critical Incidents (Breakdowns / Accidents / Seizures)', 
            value: kpiData.failureInClosure.criticalIncidents.value, 
            trend: kpiData.failureInClosure.criticalIncidents.trend,
            description: 'Operational emergencies causing delays and risk exposure.'
          },
        ]}
      />
    </Box>
  );
};

export default OverviewTab;
