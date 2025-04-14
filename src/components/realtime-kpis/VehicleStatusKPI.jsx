import React from 'react';
import { Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KPIGroupContainer from './KPIGroupContainer';
import StatTile from './StatTile';

const VehicleStatusKPI = ({ data, onKPIClick }) => {
  if (!data) return null;
  
  const { atLoadingPoint, atUnloadingPoint, atTransferStops } = data;
  
  return (
    <KPIGroupContainer
      title="Vehicle Status Locations"
      description="Current location status of all vehicles in the network"
      icon={<LocationOnIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="At Loading Point"
            value={atLoadingPoint.count}
            trend={atLoadingPoint.trend}
            status={atLoadingPoint.status}
            icon="location"
            onClick={() => onKPIClick && onKPIClick('atLoadingPoint', atLoadingPoint)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="At Unloading Point"
            value={atUnloadingPoint.count}
            trend={atUnloadingPoint.trend}
            status={atUnloadingPoint.status}
            icon="location"
            onClick={() => onKPIClick && onKPIClick('atUnloadingPoint', atUnloadingPoint)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="At Transfer Stops"
            value={atTransferStops.count}
            trend={atTransferStops.trend}
            status={atTransferStops.status}
            icon="location"
            onClick={() => onKPIClick && onKPIClick('atTransferStops', atTransferStops)}
          />
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default VehicleStatusKPI;
