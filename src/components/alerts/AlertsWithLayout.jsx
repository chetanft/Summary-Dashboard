import React, { useState } from 'react';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import Alerts from './Alerts';

const AlertsWithLayout = () => {
  const [activeTab, setActiveTab] = useState('operations');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Summary Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <Alerts />
    </Layout>
  );
};

export default AlertsWithLayout;
