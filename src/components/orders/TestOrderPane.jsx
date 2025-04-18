import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import OrderDetailsPane from './OrderDetailsPane';
import { orders, orderTimelines, orderComments } from '../../data/orderData';

const TestOrderPane = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleOrderClick = () => {
    setSelectedOrderId('21424');
  };

  const handleClosePane = () => {
    setSelectedOrderId(null);
  };

  const handlePreviousOrder = () => {
    const currentIndex = orders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex > 0) {
      setSelectedOrderId(orders[currentIndex - 1].id);
    }
  };

  const handleNextOrder = () => {
    const currentIndex = orders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex < orders.length - 1) {
      setSelectedOrderId(orders[currentIndex + 1].id);
    }
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);
  const selectedTimeline = selectedOrderId ? orderTimelines[selectedOrderId] : null;
  const selectedComments = selectedOrderId ? orderComments[selectedOrderId] : null;

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" onClick={handleOrderClick}>
        Open Order Details
      </Button>

      {selectedOrderId && (
        <OrderDetailsPane 
          order={selectedOrder}
          timeline={selectedTimeline}
          comments={selectedComments}
          onClose={handleClosePane}
          onPrevious={handlePreviousOrder}
          onNext={handleNextOrder}
        />
      )}
    </Box>
  );
};

export default TestOrderPane;
