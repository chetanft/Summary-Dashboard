import { Box, Typography, Paper, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  LocalShipping as LocalShippingIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const TripTimeline = ({ trip }) => {
  // Get all alerts from the trip
  const allAlerts = [
    ...trip.indentIssues.map(issue => ({ ...issue, stage: 'Indent' })),
    ...trip.inTransitAlerts.map(alert => ({ ...alert, stage: 'In-Transit' })),
    ...trip.epodIssues.map(issue => ({ ...issue, stage: 'ePOD' }))
  ];
  
  // Sort alerts by timestamp
  const sortedAlerts = [...allAlerts].sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  
  // Create timeline steps
  const timelineSteps = [
    {
      label: 'Indent Created',
      description: 'Trip indent was created and assigned',
      timestamp: new Date(trip.timestamp),
      icon: <AssignmentIcon />,
      alerts: trip.indentIssues,
    },
    {
      label: 'In Transit',
      description: 'Vehicle is in transit to destination',
      timestamp: new Date(new Date(trip.timestamp).getTime() + 2 * 60 * 60 * 1000), // 2 hours after indent
      icon: <LocalShippingIcon />,
      alerts: trip.inTransitAlerts,
    },
    {
      label: 'ePOD',
      description: 'Proof of delivery status',
      timestamp: new Date(new Date(trip.timestamp).getTime() + 8 * 60 * 60 * 1000), // 8 hours after indent
      icon: <DescriptionIcon />,
      alerts: trip.epodIssues,
    },
  ];
  
  // Get status icon
  const getStatusIcon = (step) => {
    if (step.alerts.length > 0) {
      return step.alerts.some(alert => alert.status === 'Active') 
        ? <ErrorIcon sx={{ color: '#FF4D4F' }} />
        : <WarningIcon sx={{ color: '#FAAD14' }} />;
    }
    return <CheckCircleIcon sx={{ color: '#52C41A' }} />;
  };
  
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        Trip Timeline
      </Typography>
      
      <Stepper orientation="vertical">
        {timelineSteps.map((step, index) => (
          <Step key={index} active={true} completed={index < 2}>
            <StepLabel
              StepIconComponent={() => getStatusIcon(step)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" sx={{ color: '#5F697B' }}>
                  {step.timestamp.toLocaleString()}
                </Typography>
              </Box>
            </StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ color: '#5F697B', mb: 1 }}>
                {step.description}
              </Typography>
              
              {step.alerts.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Issues:
                  </Typography>
                  
                  {step.alerts.map((alert, alertIndex) => (
                    <Paper
                      key={alertIndex}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        mb: 1,
                        borderRadius: '4px',
                        backgroundColor: alert.status === 'Active' ? '#FFF2F0' : '#FFF7E6',
                        border: `1px solid ${alert.status === 'Active' ? '#FFCCC7' : '#FFE58F'}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {alert.type}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#5F697B' }}>
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" sx={{ color: '#5F697B', display: 'block' }}>
                        {alert.description}
                      </Typography>
                      
                      {alert.action && (
                        <Typography variant="caption" sx={{ color: '#5F697B', display: 'block', mt: 0.5 }}>
                          <strong>Action:</strong> {alert.action}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TripTimeline;
