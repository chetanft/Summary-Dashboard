import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  IconButton,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import DonutChartComponent from '../charts/DonutChartComponent';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * KPI Drilldown Dialog component for displaying detailed KPI information
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to close the dialog
 * @param {string} props.kpiId - ID of the KPI
 * @param {Object} props.kpiData - Data for the KPI
 * @returns {JSX.Element}
 */
const KpiDrilldownDialog = ({ open, onClose, kpiId, kpiData }) => {
  if (!kpiData) return null;
  
  // Function to render the appropriate chart based on the KPI type
  const renderChart = () => {
    // Planning section KPIs
    if (kpiId === 'total-orders' && kpiData.trendChart) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Total Orders Trend
          </Typography>
          <LineChartComponent
            data={kpiData.trendChart}
            lines={[{ dataKey: 'value', color: '#FF3533', strokeWidth: 2 }]}
            xAxisKey="month"
            showGrid={true}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'planned-logistic-cost' && kpiData.transporters) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Transporter Breakdown
          </Typography>
          <DonutChartComponent
            data={kpiData.transporters}
            innerRadius={60}
            outerRadius={80}
            showLabel={true}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'orders-planned' && kpiData.slaBreached) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            SLA Breached Orders
          </Typography>
          <BarChartComponent
            data={kpiData.slaBreached}
            dataKey="value"
            xAxisKey="category"
            color="#FF3533"
            showGrid={false}
            height="100%"
          />
        </Box>
      );
    }
    
    // Pre-Dispatch section KPIs
    if ((kpiId === 'indent-status' || kpiId === 'accepted-split') && kpiData.chartData) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            {kpiData.name} Breakdown
          </Typography>
          <DonutChartComponent
            data={kpiData.chartData}
            innerRadius={60}
            outerRadius={80}
            showLabel={true}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'pickup-sla-breached' && kpiData.slaBreakdown) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            SLA Breach Breakdown
          </Typography>
          <BarChartComponent
            data={kpiData.slaBreakdown}
            dataKey="value"
            xAxisKey="category"
            color="#FF3533"
            showGrid={false}
            height="100%"
          />
        </Box>
      );
    }
    
    // In-Transit section KPIs
    if (kpiId === 'delivered-vs-in-transit' && kpiData.chartData) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            {kpiData.name} Breakdown
          </Typography>
          <DonutChartComponent
            data={kpiData.chartData}
            innerRadius={60}
            outerRadius={80}
            showLabel={true}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'trip-delay-flag' && kpiData.delayBreakdown) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Delay Breakdown
          </Typography>
          <BarChartComponent
            data={kpiData.delayBreakdown}
            dataKey="value"
            xAxisKey="category"
            color="#FF3533"
            showGrid={false}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'eta-accuracy' && kpiData.accuracyTrend) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            ETA Accuracy Trend
          </Typography>
          <LineChartComponent
            data={kpiData.accuracyTrend}
            lines={[{ dataKey: 'value', color: '#4CAF50', strokeWidth: 2 }]}
            xAxisKey="date"
            showGrid={true}
            height="100%"
          />
        </Box>
      );
    }
    
    // Post-Delivery section KPIs
    if ((kpiId === 'epod-submitted-vs-pending' || kpiId === 'invoice-status') && kpiData.chartData) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            {kpiData.name} Breakdown
          </Typography>
          <DonutChartComponent
            data={kpiData.chartData}
            innerRadius={60}
            outerRadius={80}
            showLabel={true}
            height="100%"
          />
        </Box>
      );
    }
    
    if (kpiId === 'epod-approval-rate' && kpiData.approvalBreakdown) {
      return (
        <Box sx={{ height: 300, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Approval Breakdown
          </Typography>
          <DonutChartComponent
            data={kpiData.approvalBreakdown}
            innerRadius={60}
            outerRadius={80}
            showLabel={true}
            height="100%"
          />
        </Box>
      );
    }
    
    // Default case - no chart available
    return (
      <Box sx={{ height: 300, mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No detailed data available for this KPI
        </Typography>
      </Box>
    );
  };
  
  // Function to render KPI details
  const renderKpiDetails = () => {
    return (
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: '8px' }}>
            <Typography variant="subtitle2" color="text.secondary">
              KPI Description
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {getKpiDescription(kpiId)}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: '8px' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
              {formatKpiValue(kpiData)}
            </Typography>
            {kpiData.trend && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1, 
                color: kpiData.trend === 'up' ? '#FF3533' : '#4CAF50' 
              }}>
                <Typography variant="body2">
                  {kpiData.trend === 'up' ? '+' : '-'}{kpiData.trendValue}%
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  };
  
  // Helper function to get KPI description
  const getKpiDescription = (kpiId) => {
    const descriptions = {
      'total-orders': 'Total number of orders in the system, including planned, partially planned, and unplanned orders.',
      'planned-logistic-cost': 'Total planned logistics cost across all transporters, broken down by transporter.',
      'orders-planned': 'Number of orders that have been planned, including fulfillment status and SLA breached orders.',
      'indent-status': 'Status of indents, showing the breakdown between accepted and pending indents.',
      'accepted-split': 'Breakdown of accepted indents, showing the split between reporting and assign.',
      'pickup-sla-breached': 'Percentage of pickups with SLA breach, broken down by time categories.',
      'delivered-vs-in-transit': 'Split of delivered vs in-transit trips, showing the current status of all trips.',
      'trip-delay-flag': 'Percentage of trips with SLA breach, broken down by delay categories.',
      'eta-accuracy': 'Accuracy of estimated time of arrival, showing the trend over time.',
      'epod-submitted-vs-pending': 'Split of ePOD submission status, showing submitted vs pending ePODs.',
      'epod-approval-rate': 'Approval rate of submitted ePODs, broken down by approval status.',
      'invoice-status': 'Status of invoices, showing the breakdown between generated and pending invoices.'
    };
    
    return descriptions[kpiId] || 'No description available for this KPI.';
  };
  
  // Helper function to format KPI value
  const formatKpiValue = (kpiData) => {
    if (!kpiData) return 'N/A';
    
    if (kpiData.unit) {
      return `${kpiData.value}${kpiData.unit}`;
    }
    
    return kpiData.value;
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="kpi-drilldown-dialog-title"
    >
      <DialogTitle id="kpi-drilldown-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {kpiData.name} Details
          </Typography>
          <Box>
            <IconButton
              aria-label="download"
              onClick={() => console.log('Download data for', kpiId)}
              sx={{ mr: 1 }}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        {renderKpiDetails()}
        {renderChart()}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KpiDrilldownDialog;
