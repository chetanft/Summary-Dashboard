import React from 'react';
import { Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KPIGroupContainer from './KPIGroupContainer';
import StatTile from './StatTile';

const TripsAndOrdersKPI = ({ data, onKPIClick }) => {
  if (!data) return null;
  
  const { activeTrips, ordersInTransit, ordersToDeliver, activeVehicles } = data;
  
  return (
    <KPIGroupContainer
      title="Trips & Orders In Progress"
      description="Live tracking of all active shipments and vehicles"
      icon={<LocalShippingIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Active Trips"
            value={activeTrips.count}
            trend={activeTrips.trend}
            status={activeTrips.status}
            icon="truck"
            onClick={() => onKPIClick && onKPIClick('activeTrips', activeTrips)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Orders in Transit"
            value={ordersInTransit.count}
            trend={ordersInTransit.trend}
            status={ordersInTransit.status}
            icon="order"
            onClick={() => onKPIClick && onKPIClick('ordersInTransit', ordersInTransit)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Orders to Deliver"
            value={ordersToDeliver.count}
            trend={ordersToDeliver.trend}
            status={ordersToDeliver.status}
            icon="order"
            onClick={() => onKPIClick && onKPIClick('ordersToDeliver', ordersToDeliver)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatTile
            title="Active Vehicles"
            value={activeVehicles.count}
            trend={activeVehicles.trend}
            status={activeVehicles.status}
            icon="truck"
            onClick={() => onKPIClick && onKPIClick('activeVehicles', activeVehicles)}
          />
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default TripsAndOrdersKPI;
