import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import KpiSection from './KpiSection';
import KpiToggle from './KpiToggle';
import StatTile from '../realtime-kpis/StatTile';
import DonutChartComponent from '../charts/DonutChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * Post Delivery Section component with FTL/PTL toggle
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Post Delivery KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const PostDeliverySection = ({ data, onKPIClick }) => {
  const [activeType, setActiveType] = useState('ftl');
  
  if (!data) return null;
  
  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setActiveType(newType);
    }
  };
  
  // Get the active data based on the selected type
  const activeData = data[activeType];
  if (!activeData) return null;
  
  // Render FTL KPIs
  const renderFtlKpis = () => {
    // Extract ePOD KPIs
    const epodSubmittedVsPending = activeData.epod?.kpis.find(kpi => kpi.id === 'epod-submitted-vs-pending');
    const approvalStatusSplit = activeData.epod?.kpis.find(kpi => kpi.id === 'approval-status-split');
    const rejectedReasonSplit = activeData.epod?.kpis.find(kpi => kpi.id === 'rejected-reason-split');
    const deliveredJourneyStatus = activeData.epod?.kpis.find(kpi => kpi.id === 'delivered-journey-status');
    
    // Extract Invoicing KPIs
    const totalInvoicedAmount = activeData.invoicing?.kpis.find(kpi => kpi.id === 'total-invoiced-amount');
    const approvedInvoices = activeData.invoicing?.kpis.find(kpi => kpi.id === 'approved-invoices');
    const pendingApproval = activeData.invoicing?.kpis.find(kpi => kpi.id === 'pending-approval');
    const rejectedInvoices = activeData.invoicing?.kpis.find(kpi => kpi.id === 'rejected-invoices');
    const disputedInvoices = activeData.invoicing?.kpis.find(kpi => kpi.id === 'disputed-invoices');
    const overchargedRaisedCases = activeData.invoicing?.kpis.find(kpi => kpi.id === 'overcharged-raised-cases');
    const settledInvoices = activeData.invoicing?.kpis.find(kpi => kpi.id === 'settled-invoices');
    
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
            ePOD KPIs
          </Typography>
        </Grid>
        
        {/* ePOD KPIs */}
        <Grid item xs={12} md={4}>
          {epodSubmittedVsPending && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={epodSubmittedVsPending.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: epodSubmittedVsPending.name,
                  value: `${epodSubmittedVsPending.chartData[0].value}%`,
                  subtitle: 'Submitted'
                }}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {approvalStatusSplit && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={approvalStatusSplit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: approvalStatusSplit.name,
                  value: `${approvalStatusSplit.chartData[0].value}%`,
                  subtitle: 'Approved'
                }}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {deliveredJourneyStatus && (
              <StatTile
                title={deliveredJourneyStatus.name}
                value={deliveredJourneyStatus.value}
                trend={deliveredJourneyStatus.trend}
                status={deliveredJourneyStatus.status}
                onClick={() => onKPIClick && onKPIClick(deliveredJourneyStatus.id, deliveredJourneyStatus)}
              />
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {rejectedReasonSplit && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {rejectedReasonSplit.name}
              </Typography>
              <BarChartComponent
                data={rejectedReasonSplit.chartData}
                dataKey="value"
                xAxisKey="reason"
                color="#FF3533"
                unit={rejectedReasonSplit.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 600, color: '#434F64' }}>
            Freight Invoicing & Reconciliation
          </Typography>
        </Grid>
        
        {/* Invoicing KPIs - First row */}
        <Grid item xs={12} md={4}>
          {totalInvoicedAmount && (
            <StatTile
              title={totalInvoicedAmount.name}
              value={totalInvoicedAmount.value}
              subtitle={totalInvoicedAmount.subtitle}
              trend={totalInvoicedAmount.trend}
              status={totalInvoicedAmount.status}
              onClick={() => onKPIClick && onKPIClick(totalInvoicedAmount.id, totalInvoicedAmount)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {approvedInvoices && (
            <StatTile
              title={approvedInvoices.name}
              value={approvedInvoices.value}
              subtitle={approvedInvoices.subtitle}
              trend={approvedInvoices.trend}
              status={approvedInvoices.status}
              onClick={() => onKPIClick && onKPIClick(approvedInvoices.id, approvedInvoices)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {pendingApproval && (
            <StatTile
              title={pendingApproval.name}
              value={pendingApproval.value}
              subtitle={pendingApproval.subtitle}
              trend={pendingApproval.trend}
              status={pendingApproval.status}
              onClick={() => onKPIClick && onKPIClick(pendingApproval.id, pendingApproval)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        {/* Invoicing KPIs - Second row */}
        <Grid item xs={12} md={4}>
          {rejectedInvoices && (
            <StatTile
              title={rejectedInvoices.name}
              value={rejectedInvoices.value}
              subtitle={rejectedInvoices.subtitle}
              trend={rejectedInvoices.trend}
              status={rejectedInvoices.status}
              onClick={() => onKPIClick && onKPIClick(rejectedInvoices.id, rejectedInvoices)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {disputedInvoices && (
            <StatTile
              title={disputedInvoices.name}
              value={disputedInvoices.value}
              subtitle={disputedInvoices.subtitle}
              trend={disputedInvoices.trend}
              status={disputedInvoices.status}
              onClick={() => onKPIClick && onKPIClick(disputedInvoices.id, disputedInvoices)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {settledInvoices && (
            <StatTile
              title={settledInvoices.name}
              value={settledInvoices.value}
              subtitle={settledInvoices.subtitle}
              trend={settledInvoices.trend}
              status={settledInvoices.status}
              onClick={() => onKPIClick && onKPIClick(settledInvoices.id, settledInvoices)}
              sx={{ mb: 2 }}
            />
          )}
        </Grid>
        
        {/* Invoicing KPIs - Third row */}
        <Grid item xs={12} md={6}>
          {overchargedRaisedCases && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {overchargedRaisedCases.name}
              </Typography>
              <BarChartComponent
                data={overchargedRaisedCases.chartData}
                dataKey="value"
                xAxisKey="type"
                color="#FFC107"
                unit={overchargedRaisedCases.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    );
  };
  
  // Render PTL KPIs
  const renderPtlKpis = () => {
    // Extract PTL ePOD KPIs
    const epodSubmission = activeData.epod?.kpis.find(kpi => kpi.id === 'ptl-epod-submission');
    const epodApprovalSplit = activeData.epod?.kpis.find(kpi => kpi.id === 'ptl-epod-approval-split');
    const rejectionReasons = activeData.epod?.kpis.find(kpi => kpi.id === 'ptl-rejection-reasons');
    const totalFreightInvoiced = activeData.epod?.kpis.find(kpi => kpi.id === 'ptl-total-freight-invoiced');
    const ptlRecoCases = activeData.epod?.kpis.find(kpi => kpi.id === 'ptl-reco-cases');
    
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
            PTL - ePOD & Invoicing
          </Typography>
        </Grid>
        
        {/* First row */}
        <Grid item xs={12} md={4}>
          {epodSubmission && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={epodSubmission.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: epodSubmission.name,
                  value: `${epodSubmission.chartData[0].value}%`,
                  subtitle: 'Submitted'
                }}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {epodApprovalSplit && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <DonutChartComponent
                data={epodApprovalSplit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: epodApprovalSplit.name,
                  value: `${epodApprovalSplit.chartData[0].value}%`,
                  subtitle: 'Approved'
                }}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          {totalFreightInvoiced && (
            <StatTile
              title={totalFreightInvoiced.name}
              value={totalFreightInvoiced.value}
              subtitle={totalFreightInvoiced.subtitle}
              trend={totalFreightInvoiced.trend}
              status={totalFreightInvoiced.status}
              onClick={() => onKPIClick && onKPIClick(totalFreightInvoiced.id, totalFreightInvoiced)}
            />
          )}
        </Grid>
        
        {/* Second row */}
        <Grid item xs={12} md={6}>
          {rejectionReasons && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {rejectionReasons.name}
              </Typography>
              <BarChartComponent
                data={rejectionReasons.chartData}
                dataKey="value"
                xAxisKey="reason"
                color="#FF3533"
                unit={rejectionReasons.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {ptlRecoCases && (
            <Box sx={{ height: '250px', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#434F64' }}>
                {ptlRecoCases.name}
              </Typography>
              <BarChartComponent
                data={ptlRecoCases.chartData}
                dataKey="value"
                xAxisKey="type"
                color="#FFC107"
                unit={ptlRecoCases.metadata?.unit || ''}
                showGrid={true}
                height="220px"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    );
  };
  
  return (
    <KpiSection title={data.title}>
      <KpiToggle activeType={activeType} onChange={handleTypeChange} />
      
      {activeType === 'ftl' ? renderFtlKpis() : renderPtlKpis()}
    </KpiSection>
  );
};

export default PostDeliverySection;
