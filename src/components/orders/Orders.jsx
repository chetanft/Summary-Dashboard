import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { orders, orderTimelines, orderComments } from '../../data/orderData';
import OrderDetailsPane from './OrderDetailsPane';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.soNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shipTo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderClick = (orderId) => {
    console.log('Order clicked:', orderId);
    setSelectedOrderId(orderId);
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

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'In Transit':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Planning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const selectedOrder = orders.find(order => order.id === selectedOrderId);
  const selectedTimeline = selectedOrderId ? orderTimelines[selectedOrderId] : null;
  const selectedComments = selectedOrderId ? orderComments[selectedOrderId] : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>Orders Management System</Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search orders by SO number, sender, receiver, or status"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>SO Number</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ETA</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">
                  {order.soNumber}
                </TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>{order.sender.name}</TableCell>
                <TableCell>{order.shipTo.name}</TableCell>
                <TableCell>{order.totalWeight}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusChipColor(order.status)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{order.eta}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOrderClick(order.id)}
                    aria-label="view order details"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default Orders;
