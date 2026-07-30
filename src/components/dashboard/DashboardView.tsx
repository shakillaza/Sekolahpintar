import React from 'react';
import { RoleOverviewBanner } from './widgets/RoleOverviewBanner';
import { QuickActions } from './widgets/QuickActions';
import { MetricsGrid } from './widgets/MetricsGrid';
import { AIInsightsWidget } from './widgets/AIInsightsWidget';
import { ChartsSection } from './widgets/ChartsSection';
import { RecentActivities } from './widgets/RecentActivities';

export const DashboardView: React.FC = () => {
  return (
    <div id="dashboard-view-root" className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Role Banner */}
      <RoleOverviewBanner />

      {/* Quick Action Shortcuts */}
      <QuickActions />

      {/* 6 Core Enterprise Metrics Grid */}
      <MetricsGrid />

      {/* Real-Time AI Insights Generator */}
      <AIInsightsWidget />

      {/* Visual Analytics Charts */}
      <ChartsSection />

      {/* Audit Log Activities */}
      <RecentActivities />
    </div>
  );
};
