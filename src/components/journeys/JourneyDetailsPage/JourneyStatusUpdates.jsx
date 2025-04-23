import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress
} from '@mui/material';
import Icon from '../../common/Icon';
import { addJourneyStatusUpdate } from '../../../services/journeyService';

/**
 * Journey Status Updates component
 * Displays and allows updating the journey status
 *
 * @param {Object} props - Component props
 * @param {string} props.journeyId - Journey ID
 * @param {Array} props.statusUpdates - Array of status update objects
 * @param {Function} props.onStatusUpdate - Function to handle status update
 * @returns {JSX.Element}
 */
const JourneyStatusUpdates = ({ journeyId, statusUpdates = [], onStatusUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Status options
  const statusOptions = [
    { value: 'LOADING_STARTED', label: 'Loading Started', color: 'primary' },
    { value: 'LOADING_COMPLETED', label: 'Loading Completed', color: 'primary' },
    { value: 'IN_TRANSIT', label: 'In Transit', color: 'info' },
    { value: 'ARRIVED_AT_DESTINATION', label: 'Arrived at Destination', color: 'warning' },
    { value: 'UNLOADING_STARTED', label: 'Unloading Started', color: 'warning' },
    { value: 'UNLOADING_COMPLETED', label: 'Unloading Completed', color: 'success' },
    { value: 'RETURN_STARTED', label: 'Return Started', color: 'info' },
    { value: 'DELIVERED', label: 'Delivered', color: 'success' },
    { value: 'DELAYED', label: 'Delayed', color: 'error' },
    { value: 'ISSUE_REPORTED', label: 'Issue Reported', color: 'error' }
  ];

  // Get status label and color
  const getStatusInfo = (statusValue) => {
    const status = statusOptions.find(option => option.value === statusValue);
    return status || { label: statusValue, color: 'default' };
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Handle dialog open
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setNewStatus('');
    setStatusNote('');
    setError('');
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  // Handle note change
  const handleNoteChange = (event) => {
    setStatusNote(event.target.value);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!newStatus) {
      setError('Please select a status');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const statusUpdate = {
        status: newStatus,
        note: statusNote,
        timestamp: new Date().toISOString()
      };

      await addJourneyStatusUpdate(journeyId, statusUpdate);

      // Call the onStatusUpdate callback with the new status update
      onStatusUpdate([...statusUpdates, statusUpdate]);

      // Close the dialog
      handleCloseDialog();
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        mb: 3
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'background.light'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Status Updates
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon name="Plus" size={16} />}
          onClick={handleOpenDialog}
        >
          Add Update
        </Button>
      </Box>

      <Divider />

      <List sx={{ p: 0 }}>
        {statusUpdates.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="No status updates yet"
              secondary="Add a status update to track the journey progress"
              primaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ) : (
          statusUpdates.map((update, index) => {
            const statusInfo = getStatusInfo(update.status);

            return (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 3
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bgcolor: `${statusInfo.color}.main`,
                        mr: 2
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                          {statusInfo.label}
                        </Typography>

                        <Chip
                          label={formatDate(update.timestamp)}
                          size="small"
                          variant="outlined"
                          sx={{ height: '20px', fontSize: '0.75rem' }}
                        />
                      </Box>
                    }
                    secondary={update.note}
                  />
                </ListItem>

                {index < statusUpdates.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })
        )}
      </List>

      {/* Add Status Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Status Update
          <IconButton onClick={handleCloseDialog} aria-label="close">
            <Icon name="X" size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={newStatus}
              label="Status"
              onChange={handleStatusChange}
              disabled={isSubmitting}
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        bgcolor: `${option.color}.main`,
                        mr: 1
                      }}
                    />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Notes"
            multiline
            rows={4}
            value={statusNote}
            onChange={handleNoteChange}
            fullWidth
            disabled={isSubmitting}
            placeholder="Add any additional information about this status update"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            color="inherit"
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmitting || !newStatus}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

JourneyStatusUpdates.propTypes = {
  journeyId: PropTypes.string.isRequired,
  statusUpdates: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      note: PropTypes.string,
      timestamp: PropTypes.string.isRequired
    })
  ),
  onStatusUpdate: PropTypes.func.isRequired
};

export default JourneyStatusUpdates;
