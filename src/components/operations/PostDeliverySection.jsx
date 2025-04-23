import React from 'react';
import { Grid, Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KpiCard from './KpiCard';
import DonutChartComponent from '../charts/DonutChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * Post Delivery Section component
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Post Delivery KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PostDeliverySection = ({ data, onKPIClick }) => {
  if (!data) return null;

  const { ftl, ptl } = data;
  const activeData = ftl; // Use FTL data by default, can be changed based on toggle

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F8F9', borderRadius: '12px', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#434F64' }}>
          Post Delivery
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* ePOD Submitted vs Pending Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.epodSubmittedVsPending.name}
                </Typography>
                <Tooltip title="Split of ePOD submission status">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.epodSubmittedVsPending.id, activeData.epodSubmittedVsPending)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={activeData.epodSubmittedVsPending.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: "Submitted",
                  value: `${activeData.epodSubmittedVsPending.breakdown.submitted.percentage}%`,
                  subtitle: ""
                }}
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* ePOD Approval Rate Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.epodApprovalRate.name}
                </Typography>
                <Tooltip title="Approval rate of submitted ePODs">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.epodApprovalRate.id, activeData.epodApprovalRate)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {activeData.epodApprovalRate.value}{activeData.epodApprovalRate.unit}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#4CAF50' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    +{activeData.epodApprovalRate.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              APPROVAL BREAKDOWN
            </Typography>

            <Box sx={{ height: '150px' }}>
              <DonutChartComponent
                data={activeData.epodApprovalRate.approvalBreakdown}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Invoice Status Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.invoiceStatus.name}
                </Typography>
                <Tooltip title="Status of invoices">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.invoiceStatus.id, activeData.invoiceStatus)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={activeData.invoiceStatus.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: "Generated",
                  value: `${activeData.invoiceStatus.breakdown.generated.percentage}%`,
                  subtitle: ""
                }}
              />
            </Box>
          </KpiCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostDeliverySection;
