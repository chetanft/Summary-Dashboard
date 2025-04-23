import React from 'react';
import { Grid, Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KpiCard from './KpiCard';
import DonutChartComponent from '../charts/DonutChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * Pre Dispatch Section component
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Pre Dispatch KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PreDispatchSection = ({ data, onKPIClick }) => {
  if (!data) return null;

  const { ftl, ptl } = data;
  const activeData = ftl; // Use FTL data by default, can be changed based on toggle

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F8F9', borderRadius: '12px', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#434F64' }}>
          Pre Dispatch
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Indent Status Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.indentStatus.name}
                </Typography>
                <Tooltip title="Status of indents (accepted vs pending)">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.indentStatus.id, activeData.indentStatus)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={activeData.indentStatus.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: "Accepted",
                  value: `${activeData.indentStatus.breakdown.accepted.percentage}%`,
                  subtitle: ""
                }}
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Accepted Split Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.acceptedSplit.name}
                </Typography>
                <Tooltip title="Split of accepted indents">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.acceptedSplit.id, activeData.acceptedSplit)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={activeData.acceptedSplit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: "Reporting",
                  value: `${activeData.acceptedSplit.breakdown.reporting.percentage}%`,
                  subtitle: ""
                }}
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Pickup SLA Breached Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.pickupSlaBreached.name}
                </Typography>
                <Tooltip title="Percentage of pickups with SLA breach">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.pickupSlaBreached.id, activeData.pickupSlaBreached)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {activeData.pickupSlaBreached.value}{activeData.pickupSlaBreached.unit}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#4CAF50' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    -{activeData.pickupSlaBreached.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              SLA BREACH BREAKDOWN
            </Typography>

            <Box sx={{ height: '150px' }}>
              <BarChartComponent
                data={activeData.pickupSlaBreached.slaBreakdown}
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

export default PreDispatchSection;
