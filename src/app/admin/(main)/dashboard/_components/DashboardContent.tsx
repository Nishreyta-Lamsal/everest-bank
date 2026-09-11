'use client';

import { useState } from 'react';

import DashboardTabs from './DashboardTabs';
import ActionsSection from './actions/ActionsSection';
import OverviewSection from './overview/OverviewSection';
import ActivitiesSection from './activities/ActivitiesSection';

import { tabs } from '../_data/dashboard-tabs';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'Actions' && <ActionsSection />}
      {activeTab === 'Overview' && <OverviewSection />}
      {activeTab === 'Activities' && <ActivitiesSection />}
    </>
  );
}
