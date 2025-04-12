import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Chip, 
  Button, 
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { alertTypes, alertSeverities, alertStatuses } from '../../data/alertData';

const AlertDetailsPane = ({ alert, onClose, onPrevious, onNext }) => {
  if (!alert) return null;

  const getSeverityChipColor = (severity) => {
    const severityObj = alertSeverities.find(s => s.id === severity);
    return severityObj ? severityObj.color : '#757575';
  };

  const getTypeChipColor = (type) => {
    const typeObj = alertTypes.find(t => t.id === type);
    return typeObj ? typeObj.color : '#757575';
  };

  const getStatusChipColor = (status) => {
    const statusObj = alertStatuses.find(s => s.id === status);
    return statusObj ? statusObj.color : '#757575';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon fontSize="large" sx={{ color: getSeverityChipColor(severity) }} />;
      case 'high':
        return <WarningAmberIcon fontSize="large" sx={{ color: getSeverityChipColor(severity) }} />;
      case 'medium':
        return <WarningAmberIcon fontSize="large" sx={{ color: getSeverityChipColor(severity) }} />;
      case 'low':
        return <WarningAmberIcon fontSize="large" sx={{ color: getSeverityChipColor(severity) }} />;
      default:
        return <WarningAmberIcon fontSize="large" sx={{ color: '#757575' }} />;
    }
  };

  const handleActionClick = (actionType) => {
    console.log(`Action ${actionType} clicked for alert ${alert.id}`);
    // In a real application, this would update the alert status
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      right: 0,
      bottom: 0,
      width: '700px', 
      height: '100vh', 
      bgcolor: 'background.paper',
      boxShadow: 3,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6">Alert Details</Typography>
        <Box>
          <IconButton onClick={onPrevious} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={onNext} size="small">
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        {/* Alert Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {getSeverityIcon(alert.severity)}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5">{alert.title}</Typography>
            <Typography variant="body1" color="text.secondary">{alert.id}</Typography>
          </Box>
        </Box>

        {/* Alert Status */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">Severity</Typography>
              <Chip 
                label={alertSeverities.find(s => s.id === alert.severity)?.label || alert.severity}
                size="small"
                sx={{ 
                  bgcolor: getSeverityChipColor(alert.severity),
                  color: 'white',
                  fontWeight: 'bold',
                  mt: 1
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">Type</Typography>
              <Chip 
                label={alertTypes.find(t => t.id === alert.type)?.label || alert.type}
                size="small"
                sx={{ 
                  bgcolor: getTypeChipColor(alert.type),
                  color: 'white',
                  fontWeight: 'bold',
                  mt: 1
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip 
                label={alertStatuses.find(s => s.id === alert.status)?.label || alert.status}
                size="small"
                sx={{ 
                  bgcolor: getStatusChipColor(alert.status),
                  color: 'white',
                  fontWeight: 'bold',
                  mt: 1
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Alert Description */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Description</Typography>
          <Typography variant="body1">{alert.description}</Typography>
        </Paper>

        {/* Alert Details */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Details</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Created At" 
                secondary={formatDate(alert.createdAt)} 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Updated At" 
                secondary={formatDate(alert.updatedAt)} 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Assigned To" 
                secondary={alert.assignedTo || 'Unassigned'} 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Related Order" 
                secondary={alert.relatedOrderId} 
              />
            </ListItem>
          </List>
        </Paper>

        {/* Actions */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {alert.actions.map(action => {
              const isCompleted = action.status === 'completed';
              return (
                <Button
                  key={action.id}
                  variant={isCompleted ? "outlined" : "contained"}
                  color={action.type === 'acknowledge' ? "primary" : "success"}
                  disabled={isCompleted}
                  startIcon={isCompleted ? <CheckCircleIcon /> : null}
                  onClick={() => handleActionClick(action.type)}
                >
                  {action.label}
                </Button>
              );
            })}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AlertDetailsPane;
