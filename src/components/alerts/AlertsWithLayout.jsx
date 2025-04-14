import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import Alerts from './Alerts';
import RealtimeKPIDashboard from '../realtime-kpis/RealtimeKPIDashboard';

const AlertsWithLayout = () => {
  const [activeTab, setActiveTab] = useState('operations');
  const [activeSubTab, setActiveSubTab] = useState('realtime');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
  };

  return (
    <Layout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Operations Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Sub-tabs for Operations Dashboard */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, px: 3, pt: 2 }}>
        <Tabs
          value={activeSubTab}
          onChange={handleSubTabChange}
          aria-label="operations dashboard tabs"
        >
          <Tab
            label="Real-Time KPIs"
            value="realtime"
            id="operations-tab-0"
            aria-controls="operations-tabpanel-0"
          />
          <Tab
            label="Alerts"
            value="alerts"
            id="operations-tab-1"
            aria-controls="operations-tabpanel-1"
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box role="tabpanel" hidden={activeSubTab !== 'realtime'} id="operations-tabpanel-0" aria-labelledby="operations-tab-0">
        {activeSubTab === 'realtime' && <RealtimeKPIDashboard />}
      </Box>

      <Box role="tabpanel" hidden={activeSubTab !== 'alerts'} id="operations-tabpanel-1" aria-labelledby="operations-tab-1">
        {activeSubTab === 'alerts' && <Alerts />}
      </Box>
    </Layout>
  );
};

export default AlertsWithLayout;
