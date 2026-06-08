"use client";

import { useEffect } from "react";

import {
  RecentActivityWidget,
  SubscriptionSummaryWidget,
} from "@/components/Dashboard/DashboardWidgets";
import { KPICards } from "@/components/Dashboard/KPICards";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAdminDashboardStore } from "@/store/dashboard.store";

export default function DashboardPage() {
  const {
    stats,
    recentActivity,
    subscriptionDistribution,
    isLoading,
    isStatsLoading,
    isActivityLoading,
    isDistributionLoading,
    error,
    getAllDashboardData,
  } = useAdminDashboardStore();

  useEffect(() => {
    getAllDashboardData({
      hours: 24,
      activityLimit: 20,
    });
  }, [getAllDashboardData]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to your super admin panel. Monitor key metrics and system health."
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <KPICards stats={stats} isLoading={isLoading || isStatsLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivityWidget
          activities={recentActivity}
          isLoading={isLoading || isActivityLoading}
        />

        <SubscriptionSummaryWidget
          data={subscriptionDistribution}
          isLoading={isLoading || isDistributionLoading}
        />
      </div>
    </div>
  );
}