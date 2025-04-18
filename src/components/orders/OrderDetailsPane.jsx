import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OrderDetailsTab from './OrderDetailsTab';
import OrderTimelineTab from './OrderTimelineTab';
import OrderCommentsTab from './OrderCommentsTab';

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

const OrderDetailsPane = ({ order, timeline, comments, onClose, onPrevious, onNext }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
        <Typography variant="h6">Invoice Details</Typography>
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
        <TabPanel value={tabValue} index={0}>
          <OrderDetailsTab order={order} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <OrderTimelineTab timeline={timeline} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <OrderCommentsTab comments={comments} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default OrderDetailsPane;
