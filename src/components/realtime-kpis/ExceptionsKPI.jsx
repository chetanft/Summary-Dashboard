import React from 'react';
import { Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import KPIGroupContainer from './KPIGroupContainer';
import StatTile from './StatTile';

const ExceptionsKPI = ({ data, onKPIClick }) => {
  if (!data) return null;
  
  const { exceptionFlags, gateInPending, epodNotUploaded } = data;
  
  return (
    <KPIGroupContainer
      title="Exceptions & Process Flags"
      description="Critical issues requiring immediate attention"
      icon={<ErrorIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="Exception Flags"
            value={exceptionFlags.count}
            trend={exceptionFlags.trend}
            status={exceptionFlags.status}
            icon="error"
            onClick={() => onKPIClick && onKPIClick('exceptionFlags', exceptionFlags)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="Gate-In Pending"
            value={gateInPending.count}
            trend={gateInPending.trend}
            status={gateInPending.status}
            icon="error"
            onClick={() => onKPIClick && onKPIClick('gateInPending', gateInPending)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatTile
            title="ePOD Not Uploaded"
            value={epodNotUploaded.count}
            trend={epodNotUploaded.trend}
            status={epodNotUploaded.status}
            icon="error"
            onClick={() => onKPIClick && onKPIClick('epodNotUploaded', epodNotUploaded)}
          />
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default ExceptionsKPI;
