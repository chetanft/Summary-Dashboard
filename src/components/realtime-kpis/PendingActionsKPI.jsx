import React from 'react';
import { Grid } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import KPIGroupContainer from './KPIGroupContainer';
import StatTile from './StatTile';

const PendingActionsKPI = ({ data, onKPIClick }) => {
  if (!data) return null;
  
  const { unassignedOrders, notPickedUpOrders, delayedOrders, delayAlerts } = data;
  
  return (
    <KPIGroupContainer
      title="Pending Actions"
      description="Orders and alerts requiring immediate attention"
      icon={<AssignmentLateIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Unassigned Orders"
            value={unassignedOrders.count}
            trend={unassignedOrders.trend}
            status={unassignedOrders.status}
            icon="order"
            onClick={() => onKPIClick && onKPIClick('unassignedOrders', unassignedOrders)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Not Picked Up"
            value={notPickedUpOrders.count}
            trend={notPickedUpOrders.trend}
            status={notPickedUpOrders.status}
            icon="order"
            onClick={() => onKPIClick && onKPIClick('notPickedUpOrders', notPickedUpOrders)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Delayed Orders"
            value={delayedOrders.count}
            trend={delayedOrders.trend}
            status={delayedOrders.status}
            icon="alert"
            onClick={() => onKPIClick && onKPIClick('delayedOrders', delayedOrders)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Delay Alerts"
            value={delayAlerts.count}
            trend={delayAlerts.trend}
            status={delayAlerts.status}
            icon="alert"
            onClick={() => onKPIClick && onKPIClick('delayAlerts', delayAlerts)}
          />
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default PendingActionsKPI;
