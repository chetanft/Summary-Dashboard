import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Divider, Button, IconButton } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as AttachMoneyIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Import components from the core library
import {
  StatusBadge,
  ValueDisplay,
  TrendIndicator,
  MetricCard,
  MetricCardGroup,
  DataTable,
  StatusChip,
} from '../components/core';

// Sample data for the table demo
const tableData = [
  {
    id: 'SO-21424',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-MUM',
    tripType: 'FTL',
    stage: 'Planning',
    status: 'In Process',
    deliveryDate: '2025-04-25',
    statusColor: 'default',
  },
  {
    id: 'SO-21425',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-MUM',
    tripType: 'FTL',
    stage: 'Indent',
    status: 'In Assignment',
    deliveryDate: '2025-04-25',
    statusColor: 'default',
  },
  {
    id: 'SO-21426',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'FTL',
    stage: 'Tracking',
    status: 'In Transit',
    deliveryDate: '2025-04-26',
    statusColor: 'error',
    delayed: true,
    delayDuration: 24,
  },
  {
    id: 'SO-21427',
    consignor: 'JSW- AMRIT',
    consignee: 'Star Retailers',
    route: 'AMRIT-HYD',
    tripType: 'FTL',
    stage: 'ePOD',
    status: 'Pending',
    deliveryDate: '2025-04-25',
    statusColor: 'error',
    delayed: true,
    delayDuration: 12,
  },
  {
    id: 'SO-21428',
    consignor: 'JSW- AMRIT',
    consignee: 'Yonex Retailers',
    route: 'AMRIT-CHN',
    tripType: 'FTL',
    stage: 'Freight Invoicing',
    status: 'Pending Approval',
    deliveryDate: '2025-04-25',
    statusColor: 'success',
  },
];

const tableColumns = [
  { id: 'id', label: 'Order ID', sortable: true },
  { id: 'consignor', label: 'Consignor', sortable: true },
  { id: 'consignee', label: 'Consignee', sortable: true },
  { id: 'route', label: 'Route', sortable: true },
  { id: 'tripType', label: 'Trip Type', sortable: true },
  { id: 'stage', label: 'Stage', sortable: true },
  {
    id: 'status',
    label: 'Status',
    sortable: true,
    renderCell: (row) => (
      <StatusChip
        label={row.status}
        status={row.statusColor === 'error' ? 'error' : row.statusColor === 'success' ? 'success' : 'default'}
        variant="subtle"
      />
    )
  },
  {
    id: 'deliveryDate',
    label: 'Delivery Status',
    sortable: true,
    renderCell: (row) => (
      <Box>
        {row.delayed ? (
          <>
            <StatusChip
              label="Delayed"
              count={`${row.delayDuration}h`}
              status="error"
              variant="subtle"
              sx={{ mb: 0.5 }}
            />
            <Typography variant="caption" sx={{ display: 'block', color: '#5F697B' }}>
              ETA: {new Date(row.deliveryDate).toLocaleDateString()}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">
            {new Date(row.deliveryDate).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    )
  },
];

const ComponentLibraryDemo = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleToggleLoading = () => {
    setLoading(!loading);
  };

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
  };

  const handleSelectionChange = (selected) => {
    setSelectedRows(selected);
    console.log('Selected rows:', selected);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Component Library Demo
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleToggleLoading}
        >
          Toggle Loading State
        </Button>
      </Box>

      {/* Atoms Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        Atoms
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        StatusBadge
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Variants
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <StatusBadge status="success" label="Completed" />
              <StatusBadge status="warning" label="Pending" variant="outlined" />
              <StatusBadge status="error" label="Failed" variant="text" />
              <StatusBadge status="info" label="In Progress" icon={TrendingUpIcon} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Sizes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <StatusBadge status="success" label="Small" size="small" />
              <StatusBadge status="success" label="Medium" size="medium" />
              <StatusBadge status="success" label="Large" size="large" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        ValueDisplay
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Formats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ValueDisplay label="Currency" value={1234.56} format="currency" />
              <ValueDisplay label="Percentage" value={75.5} format="percentage" />
              <ValueDisplay label="Number" value={1234} format="number" />
              <ValueDisplay label="Decimal" value={75.5} format="decimal" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Sizes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ValueDisplay label="Small" value={1234} size="small" />
              <ValueDisplay label="Medium" value={1234} size="medium" />
              <ValueDisplay label="Large" value={1234} size="large" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Colors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ValueDisplay label="Primary" value={1234} color="primary" />
              <ValueDisplay label="Success" value={1234} color="success" />
              <ValueDisplay label="Warning" value={1234} color="warning" />
              <ValueDisplay label="Error" value={1234} color="error" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              With Icons
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ValueDisplay label="Revenue" value={1234.56} format="currency" icon={AttachMoneyIcon} />
              <ValueDisplay label="Shipments" value={42} icon={LocalShippingIcon} />
              <ValueDisplay label="Success Rate" value={95.5} format="percentage" icon={CheckCircleIcon} color="success" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Molecules Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        Molecules
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        TrendIndicator
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Directions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TrendIndicator value={5.2} />
              <TrendIndicator value={0} />
              <TrendIndicator value={-3.8} />
              <TrendIndicator value={-3.8} inverse={true} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Sizes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TrendIndicator value={5.2} size="small" />
              <TrendIndicator value={5.2} size="medium" />
              <TrendIndicator value={5.2} size="large" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Variants
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TrendIndicator value={5.2} />
              <TrendIndicator value={5.2} showIcon={false} />
              <TrendIndicator value={5.2} suffix="pts" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        MetricCard
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Revenue"
            value={1234567}
            format="currency"
            trend={5.2}
            icon={AttachMoneyIcon}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Orders"
            value={1234}
            format="number"
            trend={-3.8}
            icon={LocalShippingIcon}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Success Rate"
            value={95.5}
            format="percentage"
            trend={2.1}
            icon={CheckCircleIcon}
            variant="status"
            status="success"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Error Rate"
            value={4.5}
            format="percentage"
            trend={-1.2}
            trendInverse={true}
            icon={ErrorIcon}
            variant="status"
            status="error"
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Default Variant"
            subtitle="With subtitle"
            value={1234}
            format="number"
            trend={5.2}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Outlined Variant"
            value={1234}
            format="number"
            trend={5.2}
            variant="outlined"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Filled Variant"
            value={1234}
            format="number"
            trend={5.2}
            variant="filled"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Elevated Variant"
            value={1234}
            format="number"
            trend={5.2}
            variant="elevated"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Organisms Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        Organisms
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        MetricCardGroup
      </Typography>
      <Box sx={{ mb: 4 }}>
        <MetricCardGroup
          title="Performance Metrics"
          subtitle="Last 30 days"
          headerAction={
            <IconButton>
              <RefreshIcon />
            </IconButton>
          }
        >
          <MetricCard
            title="Revenue"
            value={1234567}
            format="currency"
            trend={5.2}
            icon={AttachMoneyIcon}
            loading={loading}
          />
          <MetricCard
            title="Orders"
            value={1234}
            format="number"
            trend={-3.8}
            icon={LocalShippingIcon}
            loading={loading}
          />
          <MetricCard
            title="Success Rate"
            value={95.5}
            format="percentage"
            trend={2.1}
            icon={CheckCircleIcon}
            loading={loading}
          />
          <MetricCard
            title="Error Rate"
            value={4.5}
            format="percentage"
            trend={-1.2}
            trendInverse={true}
            icon={ErrorIcon}
            loading={loading}
          />
        </MetricCardGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <MetricCardGroup
          title="Variant Examples"
          variant="filled"
          columns={{ xs: 1, sm: 2, md: 2, lg: 2 }}
        >
          <MetricCard
            title="Default Card in Filled Group"
            value={1234}
            format="number"
            trend={5.2}
            loading={loading}
          />
          <MetricCard
            title="Elevated Card in Filled Group"
            value={5678}
            format="number"
            trend={-2.1}
            variant="elevated"
            loading={loading}
          />
        </MetricCardGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <MetricCardGroup
          variant="none"
          columns={{ xs: 1, sm: 1, md: 1 }}
          spacing={1}
        >
          <MetricCard
            title="Status Success"
            value={95.5}
            format="percentage"
            trend={2.1}
            variant="status"
            status="success"
            loading={loading}
          />
          <MetricCard
            title="Status Warning"
            value={65.5}
            format="percentage"
            trend={-1.2}
            variant="status"
            status="warning"
            loading={loading}
          />
          <MetricCard
            title="Status Error"
            value={4.5}
            format="percentage"
            trend={0.8}
            trendInverse={true}
            variant="status"
            status="error"
            loading={loading}
          />
        </MetricCardGroup>
      </Box>

      {/* DataTable Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        DataTable
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Default Table
        </Typography>
        <DataTable
          columns={tableColumns}
          data={tableData}
          onRowClick={handleRowClick}
          loading={loading}
          initialSortBy="id"
          actionColumn={{
            label: 'Actions',
            icon: <ChevronRightIcon />,
            onClick: (row) => console.log('Action clicked:', row),
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Selectable Table
        </Typography>
        <DataTable
          columns={tableColumns.slice(0, 6)}
          data={tableData}
          onRowClick={handleRowClick}
          loading={loading}
          selectable
          onSelectionChange={handleSelectionChange}
          variant="outlined"
          headerBackgroundColor="#F8F9FA"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Compact Table
        </Typography>
        <DataTable
          columns={tableColumns.slice(0, 5)}
          data={tableData}
          loading={loading}
          variant="compact"
          size="small"
          zebra={false}
          pagination={false}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Expandable Table
        </Typography>
        <DataTable
          columns={tableColumns.slice(0, 4)}
          data={tableData}
          loading={loading}
          expandableRows
          renderExpandedRow={(row) => (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Order Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Trip Type
                  </Typography>
                  <Typography variant="body2">{row.tripType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Stage
                  </Typography>
                  <Typography variant="body2">{row.stage}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Status
                  </Typography>
                  <StatusChip
                    label={row.status}
                    status={row.statusColor === 'error' ? 'error' : row.statusColor === 'success' ? 'success' : 'default'}
                    variant="subtle"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Delivery Date
                  </Typography>
                  <Typography variant="body2">
                    {new Date(row.deliveryDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default ComponentLibraryDemo;
