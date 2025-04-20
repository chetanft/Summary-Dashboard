import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Divider,
} from '@mui/material';
import Icon from '../common/Icon';
import { formatDate, formatTime } from '../../utils/dateUtils';

// Alert type icons
const alertTypeIcons = {
  'delay': 'Clock',
  'diversion': 'MapPin',
  'long-stoppage': 'Pause',
  'sos': 'AlertOctagon',
  'geofence-breach': 'Map',
};

// Alert type labels
const alertTypeLabels = {
  'delay': 'Delay',
  'diversion': 'Diversion',
  'long-stoppage': 'Long Stoppage',
  'sos': 'SOS',
  'geofence-breach': 'Geofence Breach',
};

// Alert severity colors
const alertSeverityColors = {
  'low': 'info',
  'medium': 'warning',
  'high': 'error',
  'critical': 'error',
};

// Alert severity labels
const alertSeverityLabels = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
  'critical': 'Critical',
};

const JourneyAlerts = ({ journey }) => {
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleOpenResolveDialog = (alert) => {
    setSelectedAlert(alert);
    setResolveDialogOpen(true);
  };

  const handleCloseResolveDialog = () => {
    setResolveDialogOpen(false);
    setSelectedAlert(null);
    setResolutionNotes('');
  };

  const handleResolve = () => {
    // In a real application, this would call an API to resolve the alert
    // For this implementation, we'll just close the dialog
    handleCloseResolveDialog();
  };

  // Sort alerts by timestamp (newest first) and then by severity (critical first)
  const sortedAlerts = [...journey.alerts].sort((a, b) => {
    // First sort by resolved status
    if (a.isResolved !== b.isResolved) {
      return a.isResolved ? 1 : -1;
    }
    
    // Then sort by severity
    const severityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    if (a.severity !== b.severity) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    
    // Finally sort by timestamp (newest first)
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Journey Alerts
      </Typography>
      
      <Paper sx={{ p: 0 }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
          {sortedAlerts.length === 0 ? (
            <ListItem>
              <Box sx={{ py: 3, width: '100%', textAlign: 'center' }}>
                <Icon name="Bell" size={48} sx={{ color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No alerts available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This journey has no alerts or exceptions
                </Typography>
              </Box>
            </ListItem>
          ) : (
            sortedAlerts.map((alert, index) => (
              <React.Fragment key={alert.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: alert.isResolved ? 'action.hover' : 'background.paper',
                    opacity: alert.isResolved ? 0.7 : 1,
                  }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${alertSeverityColors[alert.severity] || 'info'}.light`,
                        color: `${alertSeverityColors[alert.severity] || 'info'}.main`,
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Icon name={alertTypeIcons[alert.type] || 'AlertCircle'} size={20} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {alertTypeLabels[alert.type] || alert.type}
                        </Typography>
                        <Chip
                          label={alertSeverityLabels[alert.severity] || alert.severity}
                          size="small"
                          color={alertSeverityColors[alert.severity] || 'default'}
                        />
                        {alert.isResolved && (
                          <Chip
                            label="Resolved"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.primary" paragraph>
                          {alert.message}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              <Icon name="Calendar" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                              {formatDate(alert.timestamp)} {formatTime(alert.timestamp)}
                            </Typography>
                          </Grid>
                          {alert.location && alert.location.lat && alert.location.lng && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                <Icon name="MapPin" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                Location: {alert.location.lat.toFixed(6)}, {alert.location.lng.toFixed(6)}
                              </Typography>
                            </Grid>
                          )}
                          {alert.isResolved && (
                            <>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">
                                  <Icon name="CheckCircle" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                  Resolved at: {formatDate(alert.resolvedAt)} {formatTime(alert.resolvedAt)}
                                </Typography>
                              </Grid>
                              {alert.resolutionNotes && (
                                <Grid item xs={12}>
                                  <Typography variant="body2" color="text.secondary">
                                    <Icon name="MessageSquare" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                    Resolution: {alert.resolutionNotes}
                                  </Typography>
                                </Grid>
                              )}
                            </>
                          )}
                          {alert.ticketId && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="text.secondary">
                                <Icon name="Ticket" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                Ticket: {alert.ticketId}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                        
                        {!alert.isResolved && (
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Icon name="CheckCircle" size={16} />}
                              onClick={() => handleOpenResolveDialog(alert)}
                            >
                              Resolve Alert
                            </Button>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      {/* Resolve Alert Dialog */}
      <Dialog open={resolveDialogOpen} onClose={handleCloseResolveDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Resolve Alert</DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {alertTypeLabels[selectedAlert.type] || selectedAlert.type} Alert
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedAlert.message}
                  </Typography>
                  <Chip
                    label={alertSeverityLabels[selectedAlert.severity] || selectedAlert.severity}
                    size="small"
                    color={alertSeverityColors[selectedAlert.severity] || 'default'}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Resolution Notes"
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  multiline
                  rows={3}
                  placeholder="Describe how this alert was resolved..."
                  required
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResolveDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleResolve}
            disabled={!resolutionNotes.trim()}
            startIcon={<Icon name="CheckCircle" size={18} />}
            color="success"
          >
            Mark as Resolved
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

JourneyAlerts.propTypes = {
  journey: PropTypes.object.isRequired,
};

export default JourneyAlerts;
