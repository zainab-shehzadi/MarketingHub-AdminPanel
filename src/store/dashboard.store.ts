"use client";

import { create } from "zustand";
import { adminDashboardService } from "@/services/dashboard.service";
import type {
  AdminDashboardParams,
  AdminDashboardStats,
  AdminRecentActivity,
  SubscriptionDistributionSegment,
} from "@/types/dashboard";

type AdminDashboardState = {
  stats: AdminDashboardStats | null;
  recentActivity: AdminRecentActivity[];
  subscriptionDistribution: SubscriptionDistributionSegment[];

  isLoading: boolean;
  isStatsLoading: boolean;
  isActivityLoading: boolean;
  isDistributionLoading: boolean;

  error: string | null;

  getStats: () => Promise<boolean>;
  getRecentActivity: (
    params?: Pick<AdminDashboardParams, "hours" | "activityLimit">
  ) => Promise<boolean>;
  getSubscriptionDistribution: () => Promise<boolean>;
  getAllDashboardData: (params?: AdminDashboardParams) => Promise<boolean>;

  clearError: () => void;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  stats: null,
  recentActivity: [],
  subscriptionDistribution: [],

  isLoading: false,
  isStatsLoading: false,
  isActivityLoading: false,
  isDistributionLoading: false,

  error: null,

  getStats: async () => {
    set({ isStatsLoading: true, error: null });

    try {
      const response = await adminDashboardService.getStats();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch dashboard stats");
      }

      set({
        stats: response.data,
        isStatsLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        stats: null,
        isStatsLoading: false,
        error: getErrorMessage(error, "Failed to fetch dashboard stats"),
      });

      return false;
    }
  },

  getRecentActivity: async (params = {}) => {
    set({ isActivityLoading: true, error: null });

    try {
      const response = await adminDashboardService.getRecentActivity({
        hours: params.hours ?? 24,
        activityLimit: params.activityLimit ?? 20,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch recent activity");
      }

      set({
        recentActivity: response.data?.activities || [],
        isActivityLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        recentActivity: [],
        isActivityLoading: false,
        error: getErrorMessage(error, "Failed to fetch recent activity"),
      });

      return false;
    }
  },

  getSubscriptionDistribution: async () => {
    set({ isDistributionLoading: true, error: null });

    try {
      const response =
        await adminDashboardService.getSubscriptionDistribution();

      if (!response.success) {
        throw new Error(
          response.message || "Failed to fetch subscription distribution"
        );
      }

      set({
        subscriptionDistribution: response.data?.segments || [],
        isDistributionLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        subscriptionDistribution: [],
        isDistributionLoading: false,
        error: getErrorMessage(
          error,
          "Failed to fetch subscription distribution"
        ),
      });

      return false;
    }
  },

  getAllDashboardData: async (params = {}) => {
    set({
      isLoading: true,
      isStatsLoading: true,
      isActivityLoading: true,
      isDistributionLoading: true,
      error: null,
    });

    try {
      const [statsResponse, activityResponse, distributionResponse] =
        await Promise.all([
          adminDashboardService.getStats(),
          adminDashboardService.getRecentActivity({
            hours: params.hours ?? 24,
            activityLimit: params.activityLimit ?? 20,
          }),
          adminDashboardService.getSubscriptionDistribution(),
        ]);

      if (!statsResponse.success) {
        throw new Error(
          statsResponse.message || "Failed to fetch dashboard stats"
        );
      }

      if (!activityResponse.success) {
        throw new Error(
          activityResponse.message || "Failed to fetch recent activity"
        );
      }

      if (!distributionResponse.success) {
        throw new Error(
          distributionResponse.message ||
            "Failed to fetch subscription distribution"
        );
      }

      set({
        stats: statsResponse.data,
        recentActivity: activityResponse.data?.activities || [],
        subscriptionDistribution: distributionResponse.data?.segments || [],
        isLoading: false,
        isStatsLoading: false,
        isActivityLoading: false,
        isDistributionLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        isStatsLoading: false,
        isActivityLoading: false,
        isDistributionLoading: false,
        error: getErrorMessage(error, "Failed to fetch dashboard data"),
      });

      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));