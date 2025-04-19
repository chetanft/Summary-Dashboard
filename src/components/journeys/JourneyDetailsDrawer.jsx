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
import {
  Close as CloseIcon,
  LocalShipping as LocalShippingIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Timeline as TimelineIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircle as CheckCircleIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
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
  const getStatusColor = (status) => {
    if (journey.isDelayed) return '#F44336'; // Red for delayed
    return '#4CAF50'; // Green for on time
  };
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 450 },
          maxWidth: '100%',
          p: 0,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Journey Details
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Tab label="Details" value="details" />
        <Tab label="Timeline" value="timeline" />
        <Tab label="Comments" value="comments" />
      </Tabs>
      
      <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 112px)' }}>
        {/* Details Tab */}
        {activeTab === 'details' && (
          <Box>
            <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: '#5F697B', mb: 1 }}>
                    Basic Details
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Trip ID</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {journey.tripId}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={journey.statusText} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                      color: getStatusColor(journey.status),
                      fontWeight: 500,
                    }} 
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Journey ID</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {journey.id}
                    </Typography>
                    <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: 'primary.main' }} />
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Vehicle Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.type}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: '#5F697B', mb: 1 }}>
                    Origin & Destination
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">From</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.from.location}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {journey.from.company}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">To</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.to.location}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {journey.to.company}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: '#5F697B', mb: 1 }}>
                    Vehicle & Trip Details
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Vehicle Info</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.vehicleInfo}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Transporter</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.tripInfo}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Communication</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.communicationType}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Contact</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.contactNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: '#5F697B', mb: 1 }}>
                    Status & ETA
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Vehicle Status</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.vehicleStatus}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Departure Time</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.departureTime}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">ETA</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {journey.eta}
                  </Typography>
                </Grid>
                
                {journey.isDelayed && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Delay</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'error.main' }}>
                      {journey.delayTime}
                    </Typography>
                  </Grid>
                )}
                
                {journey.currentLocation && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Current Location</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
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
                  <Avatar sx={{ width: 32, height: 32 }}>OP</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2">Operations Team</Typography>
                      <Typography variant="caption" color="text.secondary">10:30 AM</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Vehicle has been assigned and is en route to loading point.
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </List>
            
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                value={comment}
                onChange={handleCommentChange}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
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
