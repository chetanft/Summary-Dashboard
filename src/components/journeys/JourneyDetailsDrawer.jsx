import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Chip,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
  TextField
} from '@mui/material';
import { Badge } from '../../components/core';
import Icon from '../common/Icon';
import JourneyTimeline from './JourneyTimeline';

/**
 * Journey Details Drawer component
 *
 * @param {Object} props - Component props
 * @param {Object} props.journey - Journey data
 * @param {boolean} props.open - Whether the drawer is open
 * @param {Function} props.onClose - Function to close the drawer
 * @returns {JSX.Element}
 */
const JourneyDetailsDrawer = ({ journey, open, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted:', comment);
    setComment('');
  };

  if (!journey) return null;

  // Helper function to get status color
  const getStatusColor = () => {
    if (journey.isDelayed) return '#E53E3E'; // Red for delayed
    return '#38A169'; // Green for on time
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 480 },
          maxWidth: '100%',
          p: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Box sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F7FAFC'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="small"
            sx={{ mr: 1, color: '#718096' }}
            onClick={onClose}
          >
            <Icon name="ChevronLeft" size={20} />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3748' }}>
            Journey Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" sx={{ color: '#718096', mr: 1 }}>
            <Icon name="ChevronRight" size={20} />
          </IconButton>
          <IconButton onClick={onClose} size="small" sx={{ color: '#718096' }}>
            <Icon name="X" size={20} />
          </IconButton>
        </Box>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          borderBottom: '1px solid #E2E8F0',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            color: '#4A5568',
            '&.Mui-selected': {
              color: '#4299E1',
              fontWeight: 600,
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#4299E1',
            height: 3,
          }
        }}
      >
        <Tab label="Details" value="details" />
        <Tab label="Timeline" value="timeline" />
        <Tab label="Comments" value="comments" />
      </Tabs>

      <Box sx={{ p: 3, overflowY: 'auto', height: 'calc(100% - 112px)', backgroundColor: '#F7FAFC' }}>
        {/* Details Tab */}
        {activeTab === 'details' && (
          <Box>
            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#4A5568', mb: 1, fontWeight: 600 }}>
                    Basic Details
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Trip ID</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                      {journey.tripId}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Status</Typography>
                  <Badge
                    label={journey.statusText}
                    status={journey.isDelayed ? 'error' : 'success'}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Journey ID</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                      {journey.id}
                    </Typography>
                    <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: '#4299E1' }} />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Vehicle Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.type}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#4A5568', mb: 1, fontWeight: 600 }}>
                    Origin & Destination
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>From</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.from.location}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>
                    {journey.from.company}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>To</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.to.location}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>
                    {journey.to.company}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#4A5568', mb: 1, fontWeight: 600 }}>
                    Vehicle & Trip Details
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Vehicle Info</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.vehicleInfo}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Transporter</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.tripInfo}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Communication</Typography>
                  <Chip
                    label={journey.communicationType}
                    size="small"
                    sx={{
                      backgroundColor: journey.communicationType === 'SIM' ? '#E6FFFA' : '#F0FFF4',
                      color: journey.communicationType === 'SIM' ? '#319795' : '#38A169',
                      fontWeight: 500,
                      height: '24px',
                      borderRadius: '4px',
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Contact</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.contactNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: '#4A5568', mb: 1, fontWeight: 600 }}>
                    Status & ETA
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Vehicle Status</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.vehicleStatus}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Departure Time</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.departureTime}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>ETA</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                    {journey.eta}
                  </Typography>
                </Grid>

                {journey.isDelayed && (
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Delay</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#E53E3E' }}>
                      {journey.delayTime}
                    </Typography>
                  </Grid>
                )}

                {journey.currentLocation && (
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>Current Location</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#2D3748' }}>
                      {journey.currentLocation}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Box>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <Box>
            <JourneyTimeline journey={journey} />
          </Box>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <Box>
            <List sx={{ mb: 2 }}>
              {/* Sample comments - would come from journey data */}
              <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#4299E1' }}>OP</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ color: '#2D3748', fontWeight: 600 }}>Operations Team</Typography>
                      <Typography variant="caption" sx={{ color: '#718096' }}>10:30 AM</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ mt: 0.5, color: '#4A5568' }}>
                      Vehicle has been assigned and is en route to loading point.
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" sx={{ borderColor: '#E2E8F0' }} />
            </List>

            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                value={comment}
                onChange={handleCommentChange}
                sx={{
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '& fieldset': {
                      borderColor: '#E2E8F0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CBD5E0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4299E1',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  bgcolor: '#4299E1',
                  '&:hover': {
                    bgcolor: '#3182CE',
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default JourneyDetailsDrawer;
