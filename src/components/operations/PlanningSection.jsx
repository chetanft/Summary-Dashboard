import React from 'react';
import { Grid, Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KpiSection from './KpiSection';
import KpiCard from './KpiCard';
import DonutChartComponent from '../charts/DonutChartComponent';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * Planning Section component
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Planning KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PlanningSection = ({ data, onKPIClick }) => {
  if (!data) return null;

  const { totalOrders, plannedLogisticCost, ordersPlanned } = data;

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F8F9', borderRadius: '12px', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#434F64' }}>
          Planning
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Total Orders Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Total Orders
                </Typography>
                <Tooltip title="Total number of orders in the system">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick('total-orders', totalOrders)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {totalOrders.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#FF3533' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    +{totalOrders.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Partially Planned
                </Typography>
                <Typography variant="h6">
                  {totalOrders.breakdown.partiallyPlanned.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({totalOrders.breakdown.partiallyPlanned.percentage}%)
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Unplanned
                </Typography>
                <Typography variant="h6">
                  {totalOrders.breakdown.unplanned.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({totalOrders.breakdown.unplanned.percentage}%)
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Planned
                </Typography>
                <Typography variant="h6">
                  {totalOrders.breakdown.planned.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({totalOrders.breakdown.planned.percentage}%)
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ height: '150px', mt: 2 }}>
              <LineChartComponent
                data={totalOrders.trendChart}
                lines={[{ dataKey: 'value', color: '#FF3533', strokeWidth: 2 }]}
                xAxisKey="month"
                showGrid={true}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Planned Logistic Cost Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Planned Logistic Cost
                </Typography>
                <Tooltip title="Total planned logistics cost across all transporters">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick('planned-logistic-cost', plannedLogisticCost)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  ₹{plannedLogisticCost.value} Cr
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#FF3533' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    +{plannedLogisticCost.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={plannedLogisticCost.transporters}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Orders Planned Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Orders Planned
                </Typography>
                <Tooltip title="Number of orders that have been planned">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick('orders-planned', ordersPlanned)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {ordersPlanned.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#FF3533' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    +{ordersPlanned.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ height: '150px', mb: 2 }}>
              <DonutChartComponent
                data={[
                  { name: 'Unfulfilled Orders', value: ordersPlanned.fulfillment.unfulfilled.percentage, color: '#FF3533' },
                  { name: 'Fulfilled Orders', value: ordersPlanned.fulfillment.fulfilled.percentage, color: '#E0E0E0' }
                ]}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              SLA BREACHED UNFULFILLED ORDERS
            </Typography>

            <Box sx={{ height: '100px' }}>
              <BarChartComponent
                data={ordersPlanned.slaBreached}
                dataKey="value"
                xAxisKey="category"
                color="#FF3533"
                showGrid={false}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanningSection;
