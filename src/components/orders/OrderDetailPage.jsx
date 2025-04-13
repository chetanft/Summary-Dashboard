import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import Layout from '../layout/Layout';
import orderTimelineData from '../../data/orderTimelineData.json';

// Sample order data (in a real app, this would come from an API)
const orderData = {
  "SO: 21424": {
    id: 'SO: 21424',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-MUM',
    tripType: 'FTL',
    stage: 'Planning',
    status: 'In Process',
    trackingId: '',
    deliveryStatus: '25 April, 2025',
    statusColor: 'default',
    details: {
      orderDate: '20 April, 2025',
      origin: 'Amritsar, Punjab',
      destination: 'Mumbai, Maharashtra',
      material: 'Steel Coils',
      weight: '24 Tons',
      vehicle: 'Pending Assignment',
      driver: 'Pending Assignment',
      expectedDelivery: '25 April, 2025',
      currentLocation: 'N/A',
    },
    milestones: {
      current: {
        name: 'Planning',
        status: 'In Process',
        eta: 'Expected completion by 21 April, 2025',
        assignedTo: 'Freight Tiger Operations',
      },
      next: {
        name: 'Indent',
        eta: 'Expected to start by 21 April, 2025',
      }
    },
    generatedIds: {
      'Sales Order': 'SO: 21424',
      'Plan ID': 'Pending',
      'Indent ID': 'Pending',
      'Trip ID': 'Pending',
      'Invoice ID': 'Pending',
    },
    comments: [
      {
        user: 'System',
        text: 'Order created in the system',
        timestamp: '20 April, 2025 10:30 AM',
      },
      {
        user: 'Operations Team',
        text: 'Planning in progress. Vehicle assignment expected by EOD.',
        timestamp: '20 April, 2025 11:45 AM',
      },
    ]
  },
  "SO: 21426": {
    id: 'SO: 21426',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'FTL',
    stage: 'Tracking',
    status: 'In Transit',
    trackingId: 'Trip: 66147250',
    deliveryStatus: 'Delayed by 1 day',
    statusColor: 'error',
    details: {
      orderDate: '18 April, 2025',
      origin: 'Amritsar, Punjab',
      destination: 'Hyderabad, Telangana',
      material: 'Steel Pipes',
      weight: '22 Tons',
      vehicle: 'MH04 AB 1234',
      driver: 'Rajesh Kumar (9876543210)',
      expectedDelivery: '25 April, 2025 (Delayed)',
      currentLocation: 'Nagpur, Maharashtra',
    },
    milestones: {
      current: {
        name: 'Tracking',
        status: 'In Transit',
        eta: 'Expected delivery by 25 April, 2025',
        assignedTo: 'Rajesh Kumar (Driver)',
      },
      next: {
        name: 'ePOD',
        eta: 'Expected by 25 April, 2025',
      }
    },
    generatedIds: {
      'Sales Order': 'SO: 21426',
      'Plan ID': 'PL: 45678',
      'Indent ID': 'IN: 34567',
      'Trip ID': 'Trip: 66147250',
      'Invoice ID': 'Pending',
    },
    comments: [
      {
        user: 'System',
        text: 'Order created in the system',
        timestamp: '18 April, 2025 09:15 AM',
      },
      {
        user: 'Operations Team',
        text: 'Vehicle assigned: MH04 AB 1234',
        timestamp: '19 April, 2025 10:30 AM',
      },
      {
        user: 'Driver',
        text: 'Vehicle loaded and departed from origin',
        timestamp: '20 April, 2025 08:45 AM',
      },
      {
        user: 'System',
        text: 'Delay detected. New ETA: 25 April, 2025',
        timestamp: '22 April, 2025 02:30 PM',
      },
    ]
  }
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the sample data
    setLoading(true);
    setTimeout(() => {
      if (orderData[orderId]) {
        setOrder(orderData[orderId]);
      } else {
        // If we don't have data for this order ID, use the first one as a fallback
        setOrder(orderData[Object.keys(orderData)[0]]);
      }
      setLoading(false);
    }, 500);
  }, [orderId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate('/orders');
  };

  const getStatusChip = (status, color) => {
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: color === 'error' ? '#FFEAEA' : color === 'success' ? '#DFFFE8' : '#F0F1F7',
          color: color === 'error' ? '#FF3533' : color === 'success' ? '#00763D' : '#434F64',
          fontWeight: 600,
          fontSize: '14px',
          borderRadius: '4px',
          height: '24px',
        }}
      />
    );
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography variant="h5">Loading order details...</Typography>
        </Box>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Order not found</Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Back to Orders
          </Button>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Orders
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Order Details: {order.id}
          </Typography>
          <Box>
            {getStatusChip(order.status, order.statusColor)}
          </Box>
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 1, color: '#666' }}>
          {order.consignor} → {order.consignee} | {order.route} | {order.tripType}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="order detail tabs">
          <Tab label="Details" />
          <Tab label="Timeline" />
          <Tab label="Comments" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3 }}>
        {/* Details Tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Basic Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Basic Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Order Date</Typography>
                    <Typography variant="body1">{order.details.orderDate}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Origin</Typography>
                    <Typography variant="body1">{order.details.origin}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Destination</Typography>
                    <Typography variant="body1">{order.details.destination}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Material</Typography>
                    <Typography variant="body1">{order.details.material}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Weight</Typography>
                    <Typography variant="body1">{order.details.weight}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Expected Delivery</Typography>
                    <Typography variant="body1">{order.details.expectedDelivery}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Current Milestone Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Current Milestone: {order.milestones.current.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Typography variant="body1">{order.milestones.current.status}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">ETA</Typography>
                    <Typography variant="body1">{order.milestones.current.eta}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                    <Typography variant="body1">{order.milestones.current.assignedTo}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Next Milestone Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Next Milestone: {order.milestones.next.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Expected Start</Typography>
                    <Typography variant="body1">{order.milestones.next.eta}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Generated IDs */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Generated IDs
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(order.generatedIds).map(([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <Typography variant="body2" color="text.secondary">{key}</Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: value !== 'Pending' ? '#1890FF' : 'text.primary',
                          fontWeight: value !== 'Pending' ? 500 : 400
                        }}
                      >
                        {value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Vehicle & Driver Details (if available) */}
            {order.details.vehicle !== 'Pending Assignment' && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Vehicle & Driver Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" color="text.secondary">Vehicle</Typography>
                      <Typography variant="body1">{order.details.vehicle}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" color="text.secondary">Driver</Typography>
                      <Typography variant="body1">{order.details.driver}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="body2" color="text.secondary">Current Location</Typography>
                      <Typography variant="body1">{order.details.currentLocation}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {/* Timeline Tab */}
        {activeTab === 1 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Order Timeline
            </Typography>
            <Timeline position="alternate">
              {orderTimelineData.timeline.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="text.secondary">
                    {new Date(item.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={index === 0 ? "primary" : "grey"} />
                    {index < orderTimelineData.timeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} sx={{ p: 2, bgcolor: index === 0 ? '#f0f7ff' : 'white' }}>
                      <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                        {item.stage}
                      </Typography>
                      {item.time_taken_hrs && (
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                          Time taken: {item.time_taken_hrs} hours
                        </Typography>
                      )}
                      {item.details && Object.entries(item.details).map(([key, value]) => (
                        <Box key={key} sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">{key}</Typography>
                          <Typography variant="body2">{value}</Typography>
                        </Box>
                      ))}
                      {item.sub_stages && item.sub_stages.map((subStage, subIndex) => (
                        <Box key={subIndex} sx={{ mt: 1, pl: 2, borderLeft: '1px dashed #ccc' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {subStage.status}
                          </Typography>
                          {subStage.duration_hrs && (
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                              Duration: {subStage.duration_hrs} hours
                            </Typography>
                          )}
                          {subStage.details && Object.entries(subStage.details).map(([key, value]) => (
                            <Box key={key} sx={{ mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">{key}</Typography>
                              <Typography variant="body2">{value}</Typography>
                            </Box>
                          ))}
                        </Box>
                      ))}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        )}

        {/* Comments Tab */}
        {activeTab === 2 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Comments & Activity
            </Typography>
            <List>
              {order.comments.map((comment, index) => (
                <ListItem 
                  key={index}
                  alignItems="flex-start"
                  sx={{ 
                    borderLeft: '2px solid #1890FF', 
                    pl: 2,
                    mb: 2,
                    bgcolor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    borderRadius: '4px'
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {comment.user}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comment.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body1"
                        sx={{ display: 'inline', mt: 1 }}
                        component="span"
                      >
                        {comment.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<CommentIcon />}
                sx={{ ml: 'auto' }}
              >
                Add Comment
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Layout>
  );
};

export default OrderDetailPage;
