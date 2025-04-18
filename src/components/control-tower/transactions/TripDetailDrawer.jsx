import { useState } from 'react';
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
  Send as SendIcon
} from '@mui/icons-material';
import TripTimeline from './TripTimeline';

const TripDetailDrawer = ({ trip, open, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
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
  
  // Get all alerts from the trip
  const allAlerts = [
    ...trip.indentIssues.map(issue => ({ ...issue, stage: 'Indent' })),
    ...trip.inTransitAlerts.map(alert => ({ ...alert, stage: 'In-Transit' })),
    ...trip.epodIssues.map(issue => ({ ...issue, stage: 'ePOD' }))
  ];
  
  // Sort alerts by timestamp
  const sortedAlerts = [...allAlerts].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#52C41A';
      case 'Delayed':
        return '#FF4D4F';
      case 'In Transit':
        return '#1890FF';
      default:
        return '#5F697B';
    }
  };
  
  // Get stage color
  const getStageColor = (stage) => {
    switch (stage) {
      case 'Indent':
        return '#FF9800';
      case 'In-Transit':
        return '#F44336';
      case 'ePOD':
        return '#9C27B0';
      default:
        return '#5F697B';
    }
  };
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          maxWidth: '100%',
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Trip Details</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Trip Info */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalShippingIcon sx={{ mr: 1, color: '#5F697B' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {trip.vehicleNumber}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              Trip ID
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {trip.tripId}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              LSP
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {trip.lspName}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              Status
            </Typography>
            <Chip 
              label={trip.currentStatus} 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                color: getStatusColor(trip.currentStatus),
                fontWeight: 500,
              }} 
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              Trip Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {trip.tripType}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              Lane
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {trip.lane}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" sx={{ color: '#5F697B' }}>
              Date
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {new Date(trip.timestamp).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
            },
          }}
        >
          <Tab label="Info" value="info" />
          <Tab label="Timeline" value="timeline" />
          <Tab label="Comments" value="comments" />
        </Tabs>
      </Box>
      
      {/* Tab Content */}
      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        {/* Info Tab */}
        {activeTab === 'info' && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Exceptions ({allAlerts.length})
            </Typography>
            
            {allAlerts.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  backgroundColor: '#F6FFED',
                  border: '1px solid #B7EB8F',
                  mb: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#52C41A', mr: 1 }} />
                  <Typography variant="body2" sx={{ color: '#52C41A', fontWeight: 500 }}>
                    No exceptions found for this trip.
                  </Typography>
                </Box>
              </Paper>
            ) : (
              <List sx={{ mb: 3 }}>
                {sortedAlerts.map((alert, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Chip 
                        label={alert.stage} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                          color: getStageColor(alert.stage),
                          fontWeight: 500,
                        }} 
                      />
                      <Chip 
                        label={alert.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: alert.status === 'Active' ? '#FFF2F0' : '#F6FFED', 
                          color: alert.status === 'Active' ? '#FF4D4F' : '#52C41A',
                          fontWeight: 500,
                        }} 
                      />
                    </Box>
                    
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      {alert.type}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: '#5F697B', mb: 1 }}>
                      {alert.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#5F697B' }}>
                        {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                      
                      {alert.action && (
                        <Typography variant="caption" sx={{ color: '#5F697B' }}>
                          <strong>Action:</strong> {alert.action}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Trip Details
            </Typography>
            
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '8px',
                border: '1px solid #E0E0E0',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#5F697B' }}>
                    Vehicle Type
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {trip.vehicleType}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#5F697B' }}>
                    Escalation Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {trip.escalationStatus}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#5F697B' }}>
                    Delay Duration
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 500,
                      color: trip.delayDuration > 0 ? '#FF4D4F' : '#52C41A',
                    }}
                  >
                    {trip.delayDuration > 0 ? `${trip.delayDuration} hrs` : 'On Time'}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: '#5F697B' }}>
                    Action Taken
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {trip.actionTaken}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
        
        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <Box>
            <TripTimeline trip={trip} />
          </Box>
        )}
        
        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Comments & Updates
            </Typography>
            
            <List sx={{ mb: 3 }}>
              {/* Sample comments */}
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#1890FF' }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        John Doe
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#5F697B' }}>
                        2 hours ago
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
                      Called the driver to check on the delay. Driver reported traffic congestion.
                    </Typography>
                  }
                />
              </ListItem>
              
              <Divider component="li" />
              
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#722ED1' }}>
                    <BusinessIcon fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        System
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#5F697B' }}>
                        5 hours ago
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
                      Escalated to Level 1 due to route deviation detected.
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                value={comment}
                onChange={handleCommentChange}
                multiline
                rows={2}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={!comment.trim()}
                onClick={handleCommentSubmit}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default TripDetailDrawer;
