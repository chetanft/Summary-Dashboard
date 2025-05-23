import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useSearch } from '../../context/SearchContext';
import OrderDetailsDrawer from './OrderDetailsDrawer';
import EnhancedSearchDropdown from '../common/EnhancedSearchDropdown';
import { Badge } from '../core';
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
  InputBase,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';

// Sample order data
const orderData = [
  {
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
  },
  {
    id: 'SO: 21425',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-MUM',
    tripType: 'FTL',
    stage: 'Indent',
    status: 'In Assignment',
    trackingId: 'Indent: 875453',
    deliveryStatus: '25 April, 2025',
    statusColor: 'default',
  },
  {
    id: 'SO: 21426',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'FTL',
    stage: 'Tracking',
    status: 'In Transit',
    trackingId: 'Trip: 66147250',
    deliveryStatus: (
      <>
        <Badge
          label="Delayed by 1 day"
          status="error"
        />
        <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
          ETA: 25 April, 2025
        </Typography>
      </>
    ),
    statusColor: 'error',
  },
  {
    id: 'SO: 21427',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'FTL',
    stage: 'ePOD',
    status: 'Pending',
    trackingId: 'EPOD: 623748',
    deliveryStatus: (
      <>
        <Badge
          label="Delayed by 1 day"
          status="error"
        />
        <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
          25 April, 2025
        </Typography>
      </>
    ),
    statusColor: 'error',
  },
  {
    id: 'SO: 214248',
    consignor: 'JSW- AMRIT',
    consignee: 'Yonex Retailers',
    route: 'AMRIT-CHN',
    tripType: 'FTL',
    stage: 'Freight Invoicing',
    status: 'Pending Approval',
    trackingId: 'INV: 12635',
    deliveryStatus: (
      <>
        <Chip
          label="On time"
          size="small"
          sx={{
            bgcolor: '#DFFFE8',
            color: '#00763D',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '4px',
            height: '24px',
          }}
        />
        <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
          25 April, 2025
        </Typography>
      </>
    ),
    statusColor: 'success',
  },
  {
    id: 'SO: 21428',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-MUM',
    tripType: 'PTL',
    stage: 'Order Booking',
    status: 'In Assignment',
    trackingId: 'Ref: 723895',
    deliveryStatus: '25 April, 2025',
    statusColor: 'default',
  },
  {
    id: 'SO: 21429',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'PTL',
    stage: 'Tracking',
    status: 'In Transit',
    trackingId: 'AWB: 872356',
    deliveryStatus: (
      <>
        <Chip
          label="Delayed by 1 day"
          size="small"
          sx={{
            bgcolor: '#FFEAEA',
            color: '#FF3533',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '4px',
            height: '24px',
          }}
        />
        <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
          ETA: 25 April, 2025
        </Typography>
      </>
    ),
    statusColor: 'error',
  },
  {
    id: 'SO: 21427',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'PTL',
    stage: 'Freight Invoicing',
    status: 'Reconciliation Pending',
    trackingId: 'AWB: 312567',
    deliveryStatus: (
      <>
        <Chip
          label="On time"
          size="small"
          sx={{
            bgcolor: '#DFFFE8',
            color: '#00763D',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '4px',
            height: '24px',
          }}
        />
        <Typography variant="body2" sx={{ color: '#434F64', mt: 0.5 }}>
          25 April, 2025
        </Typography>
      </>
    ),
    statusColor: 'success',
  },
];

const OrdersPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { searchTerm, handleSearchTermChange } = useData();
  const { recentSearches, addRecentSearch } = useSearch();
  const [activeTab, setActiveTab] = useState('orderData');
  const [page, setPage] = useState(1);
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(-1);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  // Filter states
  const [filterFTL, setFilterFTL] = useState(false);
  const [filterPTL, setFilterPTL] = useState(false);
  const [filterDelayed, setFilterDelayed] = useState(false);

  // Filtered order data
  const [filteredOrders, setFilteredOrders] = useState(orderData);

  // Initialize local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Apply filters when filter states, selected stage, or search term changes
  useEffect(() => {
    let result = [...orderData];

    // Apply trip type filters
    if (filterFTL && !filterPTL) {
      result = result.filter(order => order.tripType === 'FTL');
    } else if (filterPTL && !filterFTL) {
      result = result.filter(order => order.tripType === 'PTL');
    }

    // Apply delayed deliveries filter
    if (filterDelayed) {
      result = result.filter(order => order.statusColor === 'error');
    }

    // Apply stage filter
    if (selectedStage !== 'All Stages') {
      result = result.filter(order => order.stage === selectedStage);
    }

    // Apply search filter
    if (localSearchTerm) {
      const searchLower = localSearchTerm.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(searchLower) ||
        order.consignor.toLowerCase().includes(searchLower) ||
        order.consignee.toLowerCase().includes(searchLower) ||
        order.route.toLowerCase().includes(searchLower) ||
        order.stage.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(result);

    // Reset current order index when filters change
    setCurrentOrderIndex(-1);
  }, [filterFTL, filterPTL, filterDelayed, selectedStage, localSearchTerm]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleStageChange = (event) => {
    setSelectedStage(event.target.value);
  };

  const handleOrderClick = (order, index) => {
    setSelectedOrder(order);
    setCurrentOrderIndex(index);
    setDrawerOpen(true);

    // Add to recent searches with current stage ID
    addRecentSearch({
      type: 'Order ID',
      value: order.id,
      tripId: order.stage // Use the current stage as the Trip ID
    });
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleNavigatePrevious = () => {
    if (currentOrderIndex > 0) {
      const prevIndex = currentOrderIndex - 1;
      setCurrentOrderIndex(prevIndex);
      setSelectedOrder(filteredOrders[prevIndex]);
    }
  };

  const handleNavigateNext = () => {
    if (currentOrderIndex < filteredOrders.length - 1) {
      const nextIndex = currentOrderIndex + 1;
      setCurrentOrderIndex(nextIndex);
      setSelectedOrder(filteredOrders[nextIndex]);
    }
  };

  // Filter toggle handlers
  const handleToggleFTL = () => {
    setFilterFTL(!filterFTL);
  };

  const handleTogglePTL = () => {
    setFilterPTL(!filterPTL);
  };

  const handleToggleDelayed = () => {
    setFilterDelayed(!filterDelayed);
  };

  // Handle search selection
  const handleSearchSelect = (item) => {
    // Find the order that matches the selected search item
    let matchingOrder;

    switch (item.type) {
      case 'Order ID':
        matchingOrder = orderData.find(order => order.id === item.value);
        break;
      case 'Consignor':
        matchingOrder = orderData.find(order => order.consignor === item.value);
        break;
      case 'Consignee':
        matchingOrder = orderData.find(order => order.consignee === item.value);
        break;
      case 'Route':
        matchingOrder = orderData.find(order => order.route === item.value);
        break;
      case 'Trip Type':
        matchingOrder = orderData.find(order => order.tripType === item.value);
        break;
      case 'Stage':
        matchingOrder = orderData.find(order => order.stage === item.value);
        break;
      case 'Status':
        matchingOrder = orderData.find(order => order.status === item.value);
        break;
      case 'Tracking ID':
        matchingOrder = orderData.find(order => order.trackingId === item.value);
        break;
      default:
        // If type is not recognized, try to find a match in any field
        matchingOrder = orderData.find(order =>
          order.id === item.value ||
          order.consignor === item.value ||
          order.consignee === item.value ||
          order.route === item.value ||
          order.tripType === item.value ||
          order.stage === item.value ||
          order.status === item.value ||
          order.trackingId === item.value
        );
    }

    if (matchingOrder) {
      const index = orderData.indexOf(matchingOrder);
      handleOrderClick(matchingOrder, index);
    }

    // Update search term
    setLocalSearchTerm(item.value);
    if (handleSearchTermChange) {
      handleSearchTermChange(item.value);
    }
  };

  // Handle search clear
  const handleClearSearch = () => {
    setLocalSearchTerm('');
    if (handleSearchTermChange) {
      handleSearchTermChange('');
    }
  };

  return (
    <Fragment>
      <Layout>
        {/* Dashboard Header */}
        <DashboardHeader
          title="Orders Dashboard"
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchBar={true}
          searchData={[
            // Order IDs
            ...orderData.map(order => ({
              type: 'Order ID',
              value: order.id,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Consignors
            ...orderData.map(order => ({
              type: 'Consignor',
              value: order.consignor,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Consignees
            ...orderData.map(order => ({
              type: 'Consignee',
              value: order.consignee,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Routes
            ...orderData.map(order => ({
              type: 'Route',
              value: order.route,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Trip Types
            ...orderData.map(order => ({
              type: 'Trip Type',
              value: order.tripType,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Stages
            ...orderData.map(order => ({
              type: 'Stage',
              value: order.stage,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Statuses
            ...orderData.map(order => ({
              type: 'Status',
              value: order.status,
              tripId: order.stage // Use the current stage as the Trip ID
            })),
            // Tracking IDs
            ...orderData.filter(order => order.trackingId).map(order => ({
              type: 'Tracking ID',
              value: order.trackingId,
              tripId: order.stage // Use the current stage as the Trip ID
            }))
          ]}
          onSearch={(value) => {
            setLocalSearchTerm(value);
            if (handleSearchTermChange) {
              handleSearchTermChange(value);
            }
          }}
        />

        {/* Status Filters */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 20px',
            gap: '20px',
            width: '100%',
            height: '40px',
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Chip
              label={<><Typography component="span" sx={{ fontWeight: 600, fontSize: '16px' }}>121</Typography><Typography component="span" sx={{ fontWeight: 600, fontSize: '14px', ml: 0.5 }}>FTL</Typography></>}
              onClick={handleToggleFTL}
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: filterFTL ? '#E6F7FF' : '#FFFFFF',
                px: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: filterFTL ? '#CCF0FF' : '#F5F5F5',
                },
              }}
            />
            <Chip
              label={<><Typography component="span" sx={{ fontWeight: 600, fontSize: '16px' }}>76</Typography><Typography component="span" sx={{ fontWeight: 600, fontSize: '14px', ml: 0.5 }}>PTL</Typography></>}
              onClick={handleTogglePTL}
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: filterPTL ? '#E6F7FF' : '#FFFFFF',
                px: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: filterPTL ? '#CCF0FF' : '#F5F5F5',
                },
              }}
            />
            <Chip
              label={<><Typography component="span" sx={{ fontWeight: 600, fontSize: '16px', color: filterDelayed ? '#FF3533' : '#FF3533' }}>76</Typography><Typography component="span" sx={{ fontWeight: 600, fontSize: '14px', ml: 0.5 }}>Delivery delayed</Typography></>}
              onClick={handleToggleDelayed}
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: filterDelayed ? '#FFEAEA' : '#FFFFFF',
                px: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: filterDelayed ? '#FFD6D6' : '#F5F5F5',
                },
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={selectedStage}
                onChange={handleStageChange}
                displayEmpty
                sx={{
                  height: '40px',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#CED1D7',
                  },
                }}
              >
                <MenuItem value="All Stages">All Stages</MenuItem>
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="Indent">Indent</MenuItem>
                <MenuItem value="Tracking">Tracking</MenuItem>
                <MenuItem value="ePOD">ePOD</MenuItem>
                <MenuItem value="Freight Invoicing">Freight Invoicing</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px 20px',
            gap: '20px',
            width: '100%',
            mt: 2,
          }}
        >
          {/* Order Count and Actions */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '40px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64',
              }}
            >
              {filteredOrders.length} Orders available
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <IconButton
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              >
                <SettingsIcon sx={{ color: '#434F64' }} />
              </IconButton>
              <IconButton
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              >
                <FilterIcon sx={{ color: '#434343' }} />
              </IconButton>
              <IconButton
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              >
                <SortIcon sx={{ color: '#434343' }} />
              </IconButton>
              <IconButton
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              >
                <FileDownloadIcon sx={{ color: '#434F64' }} />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <IconButton
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  sx={{
                    width: '39px',
                    height: '39px',
                    bgcolor: '#FFFFFF',
                    borderRadius: '100px',
                  }}
                >
                  <ChevronLeftIcon sx={{ color: '#434F64' }} />
                </IconButton>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '54px',
                    height: '40px',
                    border: '1px solid #CED1D7',
                    borderRadius: '8px',
                  }}
                >
                  <Typography sx={{ color: '#434F64' }}>{page}</Typography>
                </Paper>
                <IconButton
                  onClick={() => handlePageChange(page + 1)}
                  sx={{
                    width: '39px',
                    height: '39px',
                    bgcolor: '#FFFFFF',
                    borderRadius: '100px',
                  }}
                >
                  <ChevronRightIcon sx={{ color: '#434F64' }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Orders Table */}
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
              borderRadius: '8px 8px 0 0',
              boxShadow: 'none',
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: '#838C9D' }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Consignor
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Consignee
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Route
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Trip Type
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Stage
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Delivery status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '15px 8px',
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleOrderClick(order, index)}
                    sx={{
                      '&:nth-of-type(odd)': {
                        bgcolor: '#F8F8F9',
                      },
                      height: order.statusColor === 'default' ? '80px' : '94px',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#f0f7ff',
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.consignor}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.consignee}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.route}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.tripType}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.stage}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                      }}
                    >
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          bgcolor: '#F0F1F7',
                          color: '#434F64',
                          fontWeight: 600,
                          fontSize: '14px',
                          borderRadius: '4px',
                          height: '24px',
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#1890FF',
                      }}
                    >
                      {order.trackingId}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '20px 8px',
                        color: '#434F64',
                      }}
                    >
                      {order.deliveryStatus}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: '0px 8px',
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderClick(order, index);
                        }}
                        sx={{
                          width: '40px',
                          height: '40px',
                          border: '1px solid #CED1D7',
                          borderRadius: '100px',
                        }}
                      >
                        <ChevronRightIcon sx={{ color: '#434343' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        order={selectedOrder}
        onNavigatePrevious={handleNavigatePrevious}
        onNavigateNext={handleNavigateNext}
      />
    </Fragment>
  );
};

export default OrdersPage;
