import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Paper,
  Chip,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

// Custom Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-details-tabpanel-${index}`}
      aria-labelledby={`order-details-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `order-details-tab-${index}`,
    'aria-controls': `order-details-tabpanel-${index}`,
  };
}

// Function to generate timeline data based on order stage
const generateTimelineData = (stage, status) => {
  // Base timeline - all orders have SO Generated
  const timeline = [
    {
      stage: 'SO Generated',
      date: '12 March 2023',
      time: '09:34 AM',
      soNumber: '7134895',
      completed: true
    }
  ];

  // Add Planning stage if the order is at or past Planning
  if (['Planning', 'Indent', 'Tracking', 'ePOD', 'Freight Invoicing'].includes(stage)) {
    timeline.push({
      stage: 'Planning',
      soNumber: '7134895',
      timeTaken: '2 hrs',
      completed: stage !== 'Planning' || status === 'Plan generated',
      details: [
        {
          status: 'In Process',
          weight: '21 Ton',
          runtime: '2 hr'
        },
        {
          status: 'Plan generated',
          planId: '32151235',
          time: '09:34 AM'
        }
      ]
    });
  }

  // Add Indent stage if the order is at or past Indent
  if (['Indent', 'Tracking', 'ePOD', 'Freight Invoicing'].includes(stage)) {
    timeline.push({
      stage: 'Indent',
      indentId: '7283465',
      timeTaken: '12 hrs',
      completed: stage !== 'Indent' || ['Published', 'Pending Acceptance', 'In Assignment', 'Reporting'].includes(status),
      details: [
        {
          status: 'Published',
          time: '09:34 AM',
          acceptanceDeadline: '09:45 AM, 26 April 2025',
          publishedTo: 'Safe and Express Transporters'
        },
        {
          status: 'Pending Acceptance',
          timeTaken: '2 hrs',
          start: '09:34 AM',
          end: '11:34 AM'
        },
        {
          status: 'In Assignment',
          timeTaken: '4 hrs',
          start: '09:34 AM',
          end: '11:34 AM'
        },
        {
          status: 'Reporting',
          reportedOn: '09:34 AM',
          vehicleNo: 'AP 12K 1234'
        }
      ]
    });
  }

  // Add Tracking stage if the order is at or past Tracking
  if (['Tracking', 'ePOD', 'Freight Invoicing'].includes(stage)) {
    timeline.push({
      stage: 'Transit',
      tripId: '7283465',
      timeTaken: '3 days',
      completed: stage !== 'Tracking' || status !== 'In Transit'
    });
  }

  // Add ePOD stage if the order is at or past ePOD
  if (['ePOD', 'Freight Invoicing'].includes(stage)) {
    timeline.push({
      stage: 'ePOD',
      epodId: '623748',
      timeTaken: '1 day',
      completed: stage !== 'ePOD' || status !== 'Pending'
    });
  }

  // Add Freight Invoicing stage if the order is at Freight Invoicing
  if (stage === 'Freight Invoicing') {
    timeline.push({
      stage: 'Freight Invoicing',
      invoiceId: '12635',
      timeTaken: '2 days',
      completed: status === 'Approved'
    });
  }

  return timeline;
}

const OrderDetailsDrawer = ({ open, onClose, order, onNavigatePrevious, onNavigateNext }) => {
  const [tabValue, setTabValue] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && order) {
      // In a real app, this would be an API call to fetch order details
      // For now, we'll use mock data based on the order stage
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        // Generate timeline data based on order stage
        const timelineData = generateTimelineData(order.stage, order.status);

        setOrderDetails({
          id: order.id,
          soNumber: order.id.replace('SO: ', ''),
          totalWeight: '70 Ton',
          numberOfDOs: 1,
          numberOfSKUs: 20,
          totalCost: '₹ 5,00,000',
          createdAt: '3 PM, 10 Feb 24',
          status: order.status,
          isOnTime: true,
          eta: '09:34 AM, 12 Mar 23',
          sta: '06:14 AM, 11 Mar 23',
          nextMilestone: 'At Destination',
          nextMilestoneEta: '07:20 AM, 11 Mar 23',
          sender: {
            name: 'MDC Labs Ltd',
            address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, Amritsar, Punjab',
            gstin: '123456789',
            email: 'someemailaddress@somemail.com',
            phone: '84973-47593'
          },
          shipTo: {
            name: 'Sai Traders',
            address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001',
            gstin: '123456789',
            email: 'someemailaddress@somemail.com',
            phone: '84973-47593'
          },
          billTo: {
            name: 'Sai Traders',
            address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001',
            gstin: '123456789',
            email: 'someemailaddress@somemail.com',
            phone: '84973-47593'
          },
          ids: {
            planningId: '84975345',
            indentId: '84975345',
            journeyId: '84975345',
            epodId: '-',
            invoiceNumber: '-'
          },
          timeline: timelineData,
          comments: [
            {
              user: 'Shastri',
              time: '11:20 AM, 12 Mar 24',
              comment: 'Some comments done by some user on some time'
            },
            {
              user: 'Shastri',
              time: '11:20 AM, 12 Mar 24',
              comment: 'Some comments done by some user on some time'
            }
          ]
        });
        setLoading(false);
      }, 500);
    }
  }, [open, order]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Render the details tab content
  const renderDetailsTab = () => {
    if (!orderDetails) return null;

    return (
      <Box sx={{ p: 2 }}>
        {/* Basic Order Details */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">SO Number</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.soNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Total weight</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.totalWeight}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">No. of DOs</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.numberOfDOs}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">No. of SKUs</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.numberOfSKUs}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Total Cost</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.totalCost}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Created at</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.createdAt}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Current Status */}
        <Box sx={{
          display: 'flex',
          bgcolor: '#F5F7FA',
          borderRadius: 1,
          p: 2,
          mb: 3
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {orderDetails.status}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">ETA</Typography>
                <Typography variant="body1" fontWeight="medium">{orderDetails.eta}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">STA</Typography>
                <Typography variant="body1" fontWeight="medium">{orderDetails.sta}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 2,
            borderLeft: '1px dashed #CBD5E1',
            pl: 2
          }}>
            <Chip
              label={orderDetails.isOnTime ? "On time" : "Delayed"}
              size="small"
              sx={{
                bgcolor: orderDetails.isOnTime ? '#DFFFE8' : '#FFE9E9',
                color: orderDetails.isOnTime ? '#00763D' : '#D92D20',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '4px',
                height: '24px',
              }}
            />
          </Box>
        </Box>

        {/* Next Milestone */}
        <Box sx={{
          display: 'flex',
          bgcolor: '#F5F7FA',
          borderRadius: 1,
          p: 2,
          mb: 3
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Next Milestone:
            </Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.nextMilestone}</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 2,
            borderLeft: '1px dashed #CBD5E1',
            pl: 2
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">ETA:</Typography>
              <Typography variant="body1" fontWeight="medium">{orderDetails.nextMilestoneEta}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Sender Information */}
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Sender</Typography>
          <Typography variant="h6" fontWeight="medium">{orderDetails.sender.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {orderDetails.sender.address}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              GSTIN: {orderDetails.sender.gstin}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.sender.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.sender.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Ship To Information */}
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Ship To</Typography>
          <Typography variant="h6" fontWeight="medium">{orderDetails.shipTo.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {orderDetails.shipTo.address}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              GSTIN: {orderDetails.shipTo.gstin}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.shipTo.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.shipTo.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Bill To Information */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary">Bill To</Typography>
          <Typography variant="h6" fontWeight="medium">{orderDetails.billTo.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {orderDetails.billTo.address}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              GSTIN: {orderDetails.billTo.gstin}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.billTo.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.billTo.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* IDs Section */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Planning ID</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="medium">{orderDetails.ids.planningId}</Typography>
              <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: 'primary.main' }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Indent ID</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="medium">{orderDetails.ids.indentId}</Typography>
              <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: 'primary.main' }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Journey ID</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="medium">{orderDetails.ids.journeyId}</Typography>
              <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: 'primary.main' }} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">ePOD ID</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight="medium">{orderDetails.ids.epodId}</Typography>
              {orderDetails.ids.epodId !== '-' && (
                <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5, color: 'primary.main' }} />
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Invoice Number</Typography>
            <Typography variant="body1" fontWeight="medium">{orderDetails.ids.invoiceNumber}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Render the timeline tab content
  const renderTimelineTab = () => {
    if (!orderDetails) return null;

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{
          display: 'inline-block',
          bgcolor: '#F1F5F9',
          borderRadius: '16px',
          px: 1.5,
          py: 0.5,
          mb: 2
        }}>
          12 March 2023
        </Typography>

        <Timeline position="right" sx={{
          p: 0,
          m: 0,
          [`& .MuiTimelineItem-root`]: {
            minHeight: 'auto',
          },
          [`& .MuiTimelineContent-root`]: {
            py: 1,
            px: 2,
          },
          [`& .MuiTimelineOppositeContent-root`]: {
            flex: 0.2,
            py: 1,
          },
        }}>
          {orderDetails.timeline.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="text.secondary">
                {item.time && <Typography variant="body2">At {item.time}</Typography>}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: item.completed ? 'primary.main' : 'grey.300',
                    boxShadow: 'none',
                    m: 0,
                  }}
                />
                {index < orderDetails.timeline.length - 1 && (
                  <TimelineConnector sx={{ height: item.details ? 'auto' : 40 }} />
                )}
              </TimelineSeparator>

              <TimelineContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {item.stage}
                    </Typography>
                  </Box>
                  {item.timeTaken && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Time taken: {item.timeTaken}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {item.soNumber && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    SO: {item.soNumber}
                  </Typography>
                )}

                {item.indentId && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Indent ID: {item.indentId}
                  </Typography>
                )}

                {item.tripId && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Trip ID: {item.tripId}
                  </Typography>
                )}

                {/* Render sub-details if available */}
                {item.details && item.details.map((detail, detailIndex) => (
                  <Box key={detailIndex} sx={{ mt: 2, ml: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {detail.status}
                      </Typography>
                      {detail.runtime && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Runtime: {detail.runtime}
                          </Typography>
                        </Box>
                      )}
                      {detail.time && (
                        <Typography variant="body2" color="text.secondary">
                          At {detail.time}
                        </Typography>
                      )}
                      {detail.reportedOn && (
                        <Typography variant="body2" color="text.secondary">
                          Reported On: {detail.reportedOn}
                        </Typography>
                      )}
                    </Box>

                    {detail.weight && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Weight: {detail.weight}
                      </Typography>
                    )}

                    {detail.planId && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Plan ID: {detail.planId}
                      </Typography>
                    )}

                    {detail.acceptanceDeadline && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Acceptance deadline: {detail.acceptanceDeadline}
                      </Typography>
                    )}

                    {detail.publishedTo && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Published to: {detail.publishedTo}
                      </Typography>
                    )}

                    {detail.timeTaken && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Time taken: {detail.timeTaken}
                        </Typography>
                      </Box>
                    )}

                    {(detail.start || detail.end) && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                        {detail.start && (
                          <Typography variant="body2" color="text.secondary">
                            Start: {detail.start}
                          </Typography>
                        )}
                        {detail.end && (
                          <Typography variant="body2" color="text.secondary">
                            End: {detail.end}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {detail.vehicleNo && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Vehicle No: {detail.vehicleNo}
                      </Typography>
                    )}
                  </Box>
                ))}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    );
  };

  // Render the comments tab content
  const renderCommentsTab = () => {
    if (!orderDetails) return null;

    return (
      <Box sx={{ p: 2 }}>
        {orderDetails.comments.map((comment, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {comment.time}
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              {comment.comment}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: 'warning.main',
                  fontSize: '0.75rem',
                  mr: 1
                }}
              >
                {comment.user.charAt(0)}
              </Avatar>
              <Typography variant="body2" fontWeight="medium">
                {comment.user}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
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
        <Typography variant="h6">Order Details</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onNavigatePrevious} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={onNavigateNext} size="small">
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="order details tabs"
          variant="fullWidth"
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Timeline" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {loading ? (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <>
          <TabPanel value={tabValue} index={0}>
            {renderDetailsTab()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderTimelineTab()}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {renderCommentsTab()}
          </TabPanel>
        </>
      )}
    </Drawer>
  );
};

OrderDetailsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.object,
  onNavigatePrevious: PropTypes.func.isRequired,
  onNavigateNext: PropTypes.func.isRequired,
};

export default OrderDetailsDrawer;
