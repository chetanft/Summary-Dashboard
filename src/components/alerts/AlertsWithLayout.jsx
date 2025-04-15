import React, { useState } from 'react';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import RealtimeKPIDashboard from '../realtime-kpis/RealtimeKPIDashboard';

const AlertsWithLayout = () => {
  const [activeTab, setActiveTab] = useState('operations');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      {/* Dashboard Header with search and branch selector */}
      <DashboardHeader
        title="Operations Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchBar={true}
        branchSelector={true}
      />

      {/* Real-Time KPIs Dashboard */}
      <RealtimeKPIDashboard />
    </Layout>
  );
};

export default AlertsWithLayout;
