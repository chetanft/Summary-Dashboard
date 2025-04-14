import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import OrderDetailsDrawer from './OrderDetailsDrawer';
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
    tripType: 'FTL',
    stage: 'ePOD',
    status: 'Pending',
    trackingId: 'EPOD: 623748',
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
    id: 'SO: 21425',
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
    id: 'SO: 21426',
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
  const [activeTab, setActiveTab] = useState('orderData');
  const [page, setPage] = useState(1);
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(-1);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

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
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleNavigatePrevious = () => {
    if (currentOrderIndex > 0) {
      const prevIndex = currentOrderIndex - 1;
      setCurrentOrderIndex(prevIndex);
      setSelectedOrder(orderData[prevIndex]);
    }
  };

  const handleNavigateNext = () => {
    if (currentOrderIndex < orderData.length - 1) {
      const nextIndex = currentOrderIndex + 1;
      setCurrentOrderIndex(nextIndex);
      setSelectedOrder(orderData[nextIndex]);
    }
  };

  return (
    <Fragment>
      <Layout>
        {/* Dashboard Header */}
        <DashboardHeader
          title="Summary Dashboard"
          activeTab={activeTab}
          onTabChange={handleTabChange}
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
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: '#FFFFFF',
                px: 1.5,
              }}
            />
            <Chip
              label={<><Typography component="span" sx={{ fontWeight: 600, fontSize: '16px' }}>76</Typography><Typography component="span" sx={{ fontWeight: 600, fontSize: '14px', ml: 0.5 }}>PTL</Typography></>}
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: '#FFFFFF',
                px: 1.5,
              }}
            />
            <Chip
              label={<><Typography component="span" sx={{ fontWeight: 600, fontSize: '16px', color: '#FF3533' }}>76</Typography><Typography component="span" sx={{ fontWeight: 600, fontSize: '14px', ml: 0.5 }}>Delivery delayed</Typography></>}
              sx={{
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #CED1D7',
                bgcolor: '#FFFFFF',
                px: 1.5,
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
              248 Orders available
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
                {orderData.map((order, index) => (
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
