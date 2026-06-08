import { api } from "@/lib/api";
import { apiCall } from "@/lib/callApi";
import type {
  AdminDashboardParams,
  AdminDashboardResponse,
  AdminDashboardStatsResponse,
  AdminRecentActivityResponse,
  AdminSubscriptionDistributionResponse,
} from "@/types/dashboard";

export const adminDashboardService = {
  getDashboard: (params: AdminDashboardParams = {}) => {
    return apiCall<AdminDashboardResponse>(() =>
      api.get("/admin/dashboard", {
        params: {
          hours: params.hours ?? 24,
          activityLimit: params.activityLimit ?? 20,
        },
      })
    );
  },

  getStats: () => {
    return apiCall<AdminDashboardStatsResponse>(() =>
      api.get("/admin/dashboard/stats")
    );
  },

  getRecentActivity: (
    params: Pick<AdminDashboardParams, "hours" | "activityLimit"> = {}
  ) => {
    return apiCall<AdminRecentActivityResponse>(() =>
      api.get("/admin/dashboard/recent-activity", {
        params: {
          hours: params.hours ?? 24,
          activityLimit: params.activityLimit ?? 20,
        },
      })
    );
  },

  getSubscriptionDistribution: () => {
    return apiCall<AdminSubscriptionDistributionResponse>(() =>
      api.get("/admin/dashboard/subscription-distribution")
    );
  },
};