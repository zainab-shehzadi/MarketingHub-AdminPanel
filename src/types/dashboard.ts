export type AdminDashboardParams = {
  hours?: number;
  activityLimit?: number;
};

export type DashboardMetric = {
  total: number;
  growthPercent: number;
  label: string;
};

export type AdminDashboardStats = {
  totalBrands: DashboardMetric;
  totalAgencies: DashboardMetric;
  activeUsers: DashboardMetric;
  activeSubscriptions: DashboardMetric;
};

export type AdminRecentActivity = {
  email: string;
  name: string | null;
  action: string;
  category: string;
  organizationType?: string;
  planKey?: string | null;
  at: string;
  timestamp: string;
  description: string;
  workspaceName?: string;
  workspaceType?: string;
  billingStatus?: string;
  planName?: string;
};

export type AdminRecentActivityData = {
  hours: number;
  since: string;
  activities: AdminRecentActivity[];
  total: number;
};

export type SubscriptionDistributionSegment = {
  planKey: string;
  planName: string;
  audience: string;
  isFree: boolean;
  count: number;
};

export type SubscriptionDistributionData = {
  total: number;
  segments: SubscriptionDistributionSegment[];
};

export type AdminDashboardResponse = {
  success: boolean;
  message: string;
  data: {
    stats?: AdminDashboardStats;
    recentActivity?: AdminRecentActivityData;
    subscriptionDistribution?: SubscriptionDistributionData;
  };
  ok: boolean;
};

export type AdminDashboardStatsResponse = {
  success: boolean;
  message: string;
  data: AdminDashboardStats;
  ok: boolean;
};

export type AdminRecentActivityResponse = {
  success: boolean;
  message: string;
  data: AdminRecentActivityData;
  ok: boolean;
};

export type AdminSubscriptionDistributionResponse = {
  success: boolean;
  message: string;
  data: SubscriptionDistributionData;
  ok: boolean;
};