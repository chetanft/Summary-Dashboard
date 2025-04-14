import { useState } from 'react';
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
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
// Import Timeline components from @mui/lab explicitly
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `order-tab-${index}`,
    'aria-controls': `order-tabpanel-${index}`,
  };
}

const OrderDetailsPane = ({ order, onClose, onPrevious, onNext }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to determine if a stage should be shown in the timeline
  const shouldShowStage = (stageName) => {
    // Define stage orders based on trip type
    const ftlStageOrder = [
      'SO Generated',
      'Planning',
      'Indent',
      'Tracking',
      'ePOD',
      'Freight Invoicing'
    ];

    const ptlStageOrder = [
      'SO Generated',
      'Planning',
      'Order Booking',
      'Tracking',
      'ePOD',
      'Freight Invoicing'
    ];

    // Select the appropriate stage order based on trip type
    const stageOrder = order.tripType === 'PTL' ? ptlStageOrder : ftlStageOrder;

    // Handle special case for Planning stage (trip type not yet decided)
    if (order.stage === 'Planning' && stageName === 'Planning') {
      return true;
    }

    // For stages after Planning, check if the stage is in the correct flow
    if (stageName !== 'SO Generated' && stageName !== 'Planning') {
      // If we're in FTL flow, don't show PTL-specific stages
      if (order.tripType === 'FTL' && stageName === 'Order Booking') {
        return false;
      }

      // If we're in PTL flow, don't show FTL-specific stages
      if (order.tripType === 'PTL' && stageName === 'Indent') {
        return false;
      }
    }

    const currentStageIndex = stageOrder.indexOf(order.stage);
    const stageIndex = stageOrder.indexOf(stageName);

    // Show the stage if it's before or equal to the current stage
    return stageIndex <= currentStageIndex && stageIndex !== -1;
  };

  // Function to determine if a stage is the current stage
  const isCurrentStage = (stageName) => {
    return stageName === order.stage;
  };

  // Function to get the appropriate ID for a stage
  const getStageId = (stageName) => {
    switch(stageName) {
      case 'SO Generated':
        return order.id;
      case 'Planning':
        return order.generatedIds && order.generatedIds['Plan ID'] !== 'Pending' ?
               `Plan ID: ${order.generatedIds['Plan ID']}` :
               order.id;
      case 'Indent': // FTL only
        return order.generatedIds && order.generatedIds['Indent ID'] !== 'Pending' ?
               `Indent ID: ${order.generatedIds['Indent ID']}` :
               'Pending';
      case 'Order Booking': // PTL only
        return order.generatedIds && order.generatedIds['Booking ID'] !== 'Pending' ?
               `Booking ID: ${order.generatedIds['Booking ID']}` :
               'Pending';
      case 'Tracking':
        // Different tracking IDs for FTL and PTL
        if (order.tripType === 'FTL') {
          return order.generatedIds && order.generatedIds['Trip ID'] !== 'Pending' ?
                 `Trip ID: ${order.generatedIds['Trip ID']}` :
                 'Pending';
        } else {
          return order.trackingId || 'Pending';
        }
      case 'ePOD':
        return order.generatedIds && order.generatedIds['Invoice ID'] !== 'Pending' ?
               `ePOD ID: ${order.generatedIds['Invoice ID']}` :
               'Pending';
      case 'Freight Invoicing':
        return order.generatedIds && order.generatedIds['Invoice ID'] !== 'Pending' ?
               `Invoice ID: ${order.generatedIds['Invoice ID']}` :
               'Pending';
      default:
        return 'Pending';
    }
  };

  // Generate timeline data based on the current order
  const generateTimelineData = (order) => {
    if (!order) return { timeline: [] };

    const timeline = [];

    // Create a date for the order (in a real app, this would come from the order data)
    let orderDate = new Date(order.details.orderDate);
    if (isNaN(orderDate.getTime())) {
      // If the date is invalid, use current date
      orderDate = new Date();
    }

    // Add Sales Order stage
    timeline.push({
      stage: 'SO Generated',
      timestamp: orderDate.toISOString(),
      details: {
        'SO Number': order.id,
        'Order Date': order.details.orderDate,
        'Origin': order.details.origin,
        'Destination': order.details.destination
      }
    });

    // Define the stage order and map stages to their corresponding IDs in generatedIds
    const stageMapping = [
      { stage: 'Planning', idKey: 'Plan ID' },
      { stage: 'Indent', idKey: 'Indent ID' },
      { stage: 'Tracking', idKey: 'Trip ID' },
      { stage: 'ePOD', idKey: 'Invoice ID' },
      { stage: 'Completed', idKey: null }
    ];

    // Find the current stage index
    const currentStageIndex = stageMapping.findIndex(item => item.stage === order.stage);

    // Add all stages up to and including the current stage
    for (let i = 0; i <= currentStageIndex && i < stageMapping.length; i++) {
      const { stage: stageName, idKey } = stageMapping[i];

      // Create a date for this stage (in a real app, this would be more accurate)
      const stageDate = new Date(orderDate);
      stageDate.setHours(stageDate.getHours() + (i * 24)); // Add days for each stage

      const stageData = {
        stage: stageName,
        timestamp: stageDate.toISOString(),
        time_taken_hrs: i === currentStageIndex ? null : Math.floor(Math.random() * 10) + 1, // Only completed stages have time taken
        sub_stages: []
      };

      // Add sub-stages based on whether this is the current stage or a completed stage
      if (i === currentStageIndex) {
        // Current stage - add milestone details from the order
        stageData.sub_stages.push({
          status: order.milestones.current.status,
          details: {
            'Assigned To': order.milestones.current.assignedTo,
            'ETA': order.milestones.current.eta
          }
        });

        // Add vehicle and driver details if available
        if (order.details.vehicle && order.details.vehicle !== 'Pending Assignment') {
          stageData.sub_stages.push({
            status: 'Vehicle Assigned',
            details: {
              'Vehicle': order.details.vehicle,
              'Driver': order.details.driver
            }
          });
        }

        // Add current location if available
        if (order.details.currentLocation && order.details.currentLocation !== 'N/A') {
          stageData.sub_stages.push({
            status: 'Current Location',
            details: {
              'Location': order.details.currentLocation
            }
          });
        }
      } else {
        // Completed stages
        stageData.sub_stages.push({
          status: 'Completed',
          duration_hrs: Math.floor(Math.random() * 5) + 1
        });
      }

      // Add generated ID if available for this stage
      if (idKey && order.generatedIds) {
        // For completed stages (before current stage), always show an ID
        if (i < currentStageIndex) {
          // This is a completed stage, so it should have an ID
          let idValue;
          switch(idKey) {
            case 'Plan ID':
              idValue = '84975345';
              break;
            case 'Indent ID':
              idValue = '76543210';
              break;
            case 'Trip ID':
              idValue = '98765432';
              break;
            case 'Invoice ID':
              idValue = '12345678';
              break;
            default:
              idValue = 'ID-' + Math.floor(Math.random() * 10000000);
          }

          stageData.sub_stages.push({
            status: `${idKey} Generated`,
            details: {
              [idKey]: idValue
            }
          });
        }
        // For current stage, show ID if it's available (not 'Pending')
        else if (i === currentStageIndex && order.generatedIds[idKey] && order.generatedIds[idKey] !== 'Pending') {
          stageData.sub_stages.push({
            status: `${idKey} Generated`,
            details: {
              [idKey]: order.generatedIds[idKey]
            }
          });
        }
      }

      timeline.push(stageData);
    }

    // Add next stage if there is one
    if (currentStageIndex < stageMapping.length - 1) {
      const nextStage = stageMapping[currentStageIndex + 1];
      const nextStageDate = new Date(orderDate);
      nextStageDate.setHours(nextStageDate.getHours() + ((currentStageIndex + 1) * 24));

      timeline.push({
        stage: nextStage.stage,
        timestamp: nextStageDate.toISOString(),
        status: 'Upcoming',
        sub_stages: [{
          status: 'Pending',
          details: {
            'Expected Start': order.milestones.next.eta
          }
        }]
      });
    }

    return { timeline };
  };

  if (!order) {
    return null;
  }

  // Generate timeline data
  const timelineData = generateTimelineData(order);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '500px',
        height: '100vh',
        bgcolor: 'background.paper',
        boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#f5f5f5'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {order.stage === 'Tracking' ? 'Invoice Details' : 'Order Details'}
        </Typography>
        <Box>
          <IconButton onClick={onPrevious} size="small" sx={{ mr: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={onNext} size="small" sx={{ mr: 1 }}>
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="order details tabs">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Timeline" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {/* Details Tab */}
        <TabPanel value={tabValue} index={0}>
          <Stack spacing={3}>
            {/* Basic Order Info */}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">SO Number</Typography>
                  <Typography variant="body1" fontWeight="bold">{order.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Total weight</Typography>
                  <Typography variant="body1">{order.details.weight}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">No. of DOs</Typography>
                  <Typography variant="body1">1</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">No. of SKUs</Typography>
                  <Typography variant="body1">20</Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Cost and Date */}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Total Cost</Typography>
                  <Typography variant="body1">₹ 5,00,000</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Created at</Typography>
                  <Typography variant="body1">3 PM, 10 Feb 24</Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Status */}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip
                    label={order.status === "In Transit" ? "In Transit" : "On time"}
                    size="small"
                    sx={{
                      bgcolor: order.status === "In Transit" ? '#FFEAEA' : '#DFFFE8',
                      color: order.status === "In Transit" ? '#FF3533' : '#00763D',
                      fontWeight: 600,
                      mt: 0.5
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* ETA and Milestones */}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">ETA</Typography>
                  <Typography variant="body1">{order.milestones.current.eta}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">STA</Typography>
                  <Typography variant="body1">06:14 AM, 11 Mar 23</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Next Milestone</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    {order.milestones.next.name}
                    <ArrowForwardIcon sx={{ mx: 1, fontSize: 16 }} />
                    {order.milestones.next.eta}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Sender Information */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Sender</Typography>
              <Typography variant="body1">{order.consignor}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, Amritsar, Punjab
              </Typography>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    someemailaddress@somemail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    84973-47593
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* Ship To Information */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Ship To</Typography>
              <Typography variant="body1">{order.consignee}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001
              </Typography>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    someemailaddress@somemail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    84973-47593
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* Bill To Information */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Bill To</Typography>
              <Typography variant="body1">{order.consignee}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001
              </Typography>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    someemailaddress@somemail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    84973-47593
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* IDs */}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Planning ID</Typography>
                  <Typography variant="body1" color="primary">
                    {(() => {
                      // Show ID for completed Planning stage or if we're past Planning
                      if (order.stage !== 'Planning') {
                        return '84975345';
                      }
                      // For current Planning stage, show ID if it's been generated
                      else if (order.generatedIds && order.generatedIds['Plan ID'] && order.generatedIds['Plan ID'] !== 'Pending') {
                        return order.generatedIds['Plan ID'];
                      }
                      // Otherwise show dash
                      return '-';
                    })()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Indent ID</Typography>
                  <Typography variant="body1" color="primary">
                    {(() => {
                      // Show ID if we're past Indent stage
                      if (order.stage !== 'Planning' && order.stage !== 'Indent') {
                        return '76543210';
                      }
                      // For current Indent stage, show ID if it's been generated
                      else if (order.stage === 'Indent' && order.generatedIds && order.generatedIds['Indent ID'] && order.generatedIds['Indent ID'] !== 'Pending') {
                        return order.generatedIds['Indent ID'];
                      }
                      // Otherwise show dash
                      return '-';
                    })()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Journey ID</Typography>
                  <Typography variant="body1" color="primary">
                    {(() => {
                      // Show ID if we're past Tracking stage
                      if (order.stage !== 'Planning' && order.stage !== 'Indent' && order.stage !== 'Tracking') {
                        return '98765432';
                      }
                      // For current Tracking stage, show ID if it's been generated
                      else if (order.stage === 'Tracking' && order.generatedIds && order.generatedIds['Trip ID'] && order.generatedIds['Trip ID'] !== 'Pending') {
                        return order.generatedIds['Trip ID'];
                      }
                      // Otherwise show dash
                      return '-';
                    })()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">ePOD ID</Typography>
                  <Typography variant="body1" color="primary">
                    {(() => {
                      // Show ID if we're past ePOD stage
                      if (order.stage !== 'Planning' && order.stage !== 'Indent' && order.stage !== 'Tracking' && order.stage !== 'ePOD') {
                        return '12345678';
                      }
                      // For current ePOD stage, show ID if it's been generated
                      else if (order.stage === 'ePOD' && order.generatedIds && order.generatedIds['Invoice ID'] && order.generatedIds['Invoice ID'] !== 'Pending') {
                        return order.generatedIds['Invoice ID'];
                      }
                      // Otherwise show dash
                      return '-';
                    })()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </TabPanel>

        {/* Timeline Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ position: 'relative', pl: 2, pr: 2, height: 'calc(100vh - 180px)', overflow: 'auto' }}>
            {/* Date Headers */}
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
            </Box>

            {/* Timeline Container */}
            <Box sx={{ position: 'relative' }}>
              {/* Vertical Line */}
              <Box sx={{
                position: 'absolute',
                left: '20px',
                top: '0',
                bottom: '0',
                width: '2px',
                bgcolor: '#E0E0E0',
                zIndex: 0
              }} />

              {/* Timeline Items */}
              <Box>
                {/* SO Generated - Always shown */}
                <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                  {/* Timeline Dot */}
                  <Box sx={{
                    width: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Box sx={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      bgcolor: '#1890FF',
                      border: '3px solid #fff',
                      boxShadow: '0 0 0 2px #1890FF'
                    }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">SO Generated</Typography>
                      <Typography variant="body2" color="text.secondary">01:00:34 AM</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>{order.id}</Typography>
                  </Box>
                </Box>

                {/* Planning - Show if order stage is Planning or later */}
                {(order.stage === 'Planning' ||
                  order.stage === 'Indent' ||
                  order.stage === 'Tracking' ||
                  order.stage === 'ePOD' ||
                  order.stage === 'Freight Invoicing') && (
                  <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                    {/* Timeline Dot */}
                    <Box sx={{
                      width: '40px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Box sx={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        bgcolor: order.stage === 'Planning' ? '#1890FF' : '#1890FF',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 2px #1890FF'
                      }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Planning</Typography>
                        <Typography variant="body2" color="text.secondary">Time taken: 2 hrs</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {order.generatedIds && order.generatedIds['Plan ID'] !== 'Pending' ?
                          `Plan ID: ${order.generatedIds['Plan ID']}` :
                          order.id}
                      </Typography>

                      {/* Sub-items */}
                      <Box sx={{ mt: 2 }}>
                        {/* In Process */}
                        <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                          <Box sx={{
                            width: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body1">In Process</Typography>
                              <Typography variant="body2" color="text.secondary">Runtime: 2 hr</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">Weight: {order.details.weight}</Typography>
                          </Box>
                        </Box>

                        {/* Plan Generated - Only show if Plan ID is available */}
                        {order.generatedIds && order.generatedIds['Plan ID'] !== 'Pending' && (
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Plan generated</Typography>
                                <Typography variant="body2" color="text.secondary">01:00:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Plan ID: {order.generatedIds['Plan ID']}</Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Indent - Show if order stage is Indent or later */}
                {(order.stage === 'Indent' ||
                  order.stage === 'Tracking' ||
                  order.stage === 'ePOD' ||
                  order.stage === 'Freight Invoicing') && (
                  <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                    {/* Timeline Dot */}
                    <Box sx={{
                      width: '40px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Box sx={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        bgcolor: order.stage === 'Indent' ? '#1890FF' : '#1890FF',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 2px #1890FF'
                      }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Indent</Typography>
                        <Typography variant="body2" color="text.secondary">Time taken: 12 hrs</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {order.generatedIds && order.generatedIds['Indent ID'] !== 'Pending' ?
                          `Indent ID: ${order.generatedIds['Indent ID']}` :
                          'Indent ID: Pending'}
                      </Typography>

                      {/* Sub-items */}
                      <Box sx={{ mt: 2 }}>
                        {/* Published */}
                        <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                          <Box sx={{
                            width: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body1">Published</Typography>
                              <Typography variant="body2" color="text.secondary">09:30:34 AM</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">Acceptance deadline: 05:45 AM, 25 April 2023</Typography>
                            <Typography variant="body2" color="text.secondary">Published To: Safe and Express Transporters</Typography>
                          </Box>
                        </Box>

                        {/* Pending Assignment */}
                        <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                          <Box sx={{
                            width: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body1">Pending Assignment</Typography>
                              <Typography variant="body2" color="text.secondary">Time taken: 2 hrs</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">Start: 09:30:34 AM</Typography>
                            <Typography variant="body2" color="text.secondary">End: 11:34 AM</Typography>
                          </Box>
                        </Box>

                        {/* In Assignment - Only show if we're past Indent stage or Indent ID is available */}
                        {(order.stage !== 'Indent' || (order.generatedIds && order.generatedIds['Indent ID'] !== 'Pending')) && (
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">In Assignment</Typography>
                                <Typography variant="body2" color="text.secondary">Time taken: 4 hrs</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Start: 09:30:34 AM</Typography>
                              <Typography variant="body2" color="text.secondary">End: 11:34 AM</Typography>
                            </Box>
                          </Box>
                        )}

                        {/* Reporting - Only show if we're past Indent stage or Indent ID is available */}
                        {(order.stage !== 'Indent' || (order.generatedIds && order.generatedIds['Indent ID'] !== 'Pending')) && (
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Reporting</Typography>
                                <Typography variant="body2" color="text.secondary">Reported On: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Vehicle No: {order.details.vehicle !== 'Pending Assignment' ? order.details.vehicle : 'AP 02 1234'}</Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Tracking - Show if order stage is Tracking or later */}
                {(order.stage === 'Tracking' ||
                  order.stage === 'ePOD' ||
                  order.stage === 'Freight Invoicing') && (
                  <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                    {/* Timeline Dot */}
                    <Box sx={{
                      width: '40px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Box sx={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        bgcolor: order.stage === 'Tracking' ? '#1890FF' : '#1890FF',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 2px #1890FF'
                      }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">Tracking</Typography>
                        <Typography variant="body2" color="text.secondary">Time taken: 3 days</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {order.trackingId || 'Tracking ID: Pending'}
                      </Typography>

                      {/* Sub-items - Different for FTL and PTL */}
                      <Box sx={{ mt: 2 }}>
                        {/* FTL Tracking Statuses */}
                        {order.tripType === 'FTL' && (
                          <>
                            {/* At Loading */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">At Loading</Typography>
                                  <Typography variant="body2" color="text.secondary">ETA: 2 hr</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Location: {order.details.origin}</Typography>
                                {order.status === 'Delayed' && (
                                  <Typography variant="body2" color="text.secondary" sx={{ color: '#FF3533' }}>Delayed by 30 min</Typography>
                                )}
                              </Box>
                            </Box>

                            {/* In Transit */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">In Transit</Typography>
                                  <Typography variant="body2" color="text.secondary">Runtime: 2 hr</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Distance traveled: {order.details.distance || '123'} km</Typography>
                                {order.status === 'Delayed' && (
                                  <Typography variant="body2" color="text.secondary" sx={{ color: '#FF3533' }}>Delayed by 30 min</Typography>
                                )}
                              </Box>
                            </Box>

                            {/* At Unloading */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">At Unloading</Typography>
                                  <Typography variant="body2" color="text.secondary">ETA: 2 hr</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Location: {order.details.destination}</Typography>
                                {order.status === 'Delayed' && (
                                  <Typography variant="body2" color="text.secondary" sx={{ color: '#FF3533' }}>Delayed by 30 min</Typography>
                                )}
                              </Box>
                            </Box>
                          </>
                        )}

                        {/* PTL Tracking Statuses */}
                        {order.tripType === 'PTL' && (
                          <>
                            {/* Picked up */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">Picked up</Typography>
                                  <Typography variant="body2" color="text.secondary">At: 09:30 AM</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Location: {order.details.origin}</Typography>
                              </Box>
                            </Box>

                            {/* In Transit */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">In Transit</Typography>
                                  <Typography variant="body2" color="text.secondary">Runtime: 2 hr</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Distance traveled: {order.details.distance || '123'} km</Typography>
                                {order.status === 'Delayed' && (
                                  <Typography variant="body2" color="text.secondary" sx={{ color: '#FF3533' }}>Delayed by 30 min</Typography>
                                )}
                              </Box>
                            </Box>

                            {/* At Destination */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">At Destination</Typography>
                                  <Typography variant="body2" color="text.secondary">At: 15:45 PM</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Hub: {order.details.destination}</Typography>
                              </Box>
                            </Box>

                            {/* Out for delivery */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">Out for delivery</Typography>
                                  <Typography variant="body2" color="text.secondary">At: 08:30 AM</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Vehicle: {order.details.vehicle}</Typography>
                                <Typography variant="body2" color="text.secondary">Driver: {order.details.driver}</Typography>
                              </Box>
                            </Box>

                            {/* Delivered */}
                            <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                              <Box sx={{
                                width: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body1">Delivered</Typography>
                                  <Typography variant="body2" color="text.secondary">At: 11:45 AM</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">Received by: Customer</Typography>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Show second date header only if ePOD or Freight Invoicing stages are visible */}
              {(order.stage === 'ePOD' || order.stage === 'Freight Invoicing') && (
                <Box sx={{ mb: 2, mt: 4 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{new Date(new Date().getTime() + 86400000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                </Box>
              )}

              {/* ePOD - Show if order stage is ePOD or later */}
              {(order.stage === 'ePOD' || order.stage === 'Freight Invoicing') && (
                <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                  {/* Timeline Dot */}
                  <Box sx={{
                    width: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Box sx={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      bgcolor: order.stage === 'ePOD' ? '#1890FF' : '#1890FF',
                      border: '3px solid #fff',
                      boxShadow: '0 0 0 2px #1890FF'
                    }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">ePOD</Typography>
                      <Typography variant="body2" color="text.secondary">Time taken: 12 hrs</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {order.generatedIds && order.generatedIds['Invoice ID'] !== 'Pending' ?
                        `ePOD ID: ${order.generatedIds['Invoice ID']}` :
                        'ePOD ID: Pending'}
                    </Typography>

                    {/* Sub-items */}
                    <Box sx={{ mt: 2 }}>
                      {/* ePOD Submitted */}
                      <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                        <Box sx={{
                          width: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1">ePOD Submitted</Typography>
                            <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">Submitted by: {order.details.driver_name || 'Raju'}</Typography>
                        </Box>
                      </Box>

                      {/* ePOD Approve - Only show if we're past ePOD stage or Invoice ID is available */}
                      {(order.stage === 'Freight Invoicing' || (order.generatedIds && order.generatedIds['Invoice ID'] !== 'Pending')) && (
                        <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                          <Box sx={{
                            width: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body1">ePOD Approve</Typography>
                              <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">Submitted by: {order.details.driver_name || 'Raju'}</Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Freight Invoicing - Show only if order stage is Freight Invoicing */}
              {order.stage === 'Freight Invoicing' && (
                <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                  {/* Timeline Dot */}
                  <Box sx={{
                    width: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Box sx={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      bgcolor: '#1890FF',
                      border: '3px solid #fff',
                      boxShadow: '0 0 0 2px #1890FF'
                    }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">Freight Invoicing</Typography>
                      <Typography variant="body2" color="text.secondary">Time taken: 17 days</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {order.generatedIds && order.generatedIds['Invoice ID'] !== 'Pending' ?
                        `Invoice ID: ${order.generatedIds['Invoice ID']}` :
                        'Invoice ID: Pending'}
                    </Typography>

                    {/* Sub-items - Different for FTL and PTL */}
                    <Box sx={{ mt: 2 }}>
                      {/* FTL Freight Invoicing Statuses */}
                      {order.tripType === 'FTL' && (
                        <>
                          {/* Invoice Generated */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Generated</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">{order.details.origin || 'JSW Steel, Nashik, Maharashtra'}</Typography>
                              {order.status === 'Delayed' && (
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FF3533' }}>Delayed by 30 min</Typography>
                              )}
                            </Box>
                          </Box>

                          {/* Invoice Approved */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Approved</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Approved by: Finance Team</Typography>
                            </Box>
                          </Box>

                          {/* Invoice Disputed */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Disputed</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Reason: Rate mismatch</Typography>
                            </Box>
                          </Box>
                        </>
                      )}

                      {/* PTL Freight Invoicing Statuses */}
                      {order.tripType === 'PTL' && (
                        <>
                          {/* Contracted Bill */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Contracted Bill</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Contract: {order.details.origin || 'JSW Steel'}</Typography>
                            </Box>
                          </Box>

                          {/* Reconciliation */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Reconciliation</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Status: In Progress</Typography>
                            </Box>
                          </Box>

                          {/* Approved */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Approved</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Approved by: Finance Team</Typography>
                            </Box>
                          </Box>

                          {/* Dispute Management */}
                          <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
                            <Box sx={{
                              width: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#9E9E9E' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Dispute Management</Typography>
                                <Typography variant="body2" color="text.secondary">At: 09:30:34 AM</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">Status: Resolved</Typography>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </TabPanel>

        {/* Comments Tab */}
        <TabPanel value={tabValue} index={2}>
          <List>
            {order.comments && order.comments.map((comment, index) => (
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
        </TabPanel>
      </Box>
    </Box>
  );
};

export default OrderDetailsPane;
