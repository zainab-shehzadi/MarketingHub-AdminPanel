"use client";

import { create } from "zustand";
import { paymentService } from "@/services/payment.service";
import {
  PaymentCatalogPlan,
  PaymentPagination,
  PaymentSubscriber,
  PaymentSubscribersParams,
  SubscriberBillingDetail,
  SubscriberPaymentHistory,
} from "@/types/payment.types";

type PaymentState = {
  plans: PaymentCatalogPlan[];
  organizationType: string | null;
  currentPlanKey: string | null;
  billingStatus: string | null;

  subscribers: PaymentSubscriber[];
  selectedSubscriber: PaymentSubscriber | null;

  subscriberDetail: SubscriberBillingDetail | null;
  subscriberHistory: SubscriberPaymentHistory[];

  pagination: PaymentPagination | null;
  historyPagination: PaymentPagination | null;

  isCatalogLoading: boolean;
  isLoading: boolean;
  isHistoryLoading: boolean;
  error: string | null;

  getCatalog: () => Promise<void>;

  getSubscribers: (params?: PaymentSubscribersParams) => Promise<void>;
  getSubscriberHistory: (
    userId: string,
    params?: PaymentSubscribersParams
  ) => Promise<void>;

  setSelectedSubscriber: (subscriber: PaymentSubscriber | null) => void;
  clearHistory: () => void;
  clearError: () => void;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  plans: [],
  organizationType: null,
  currentPlanKey: null,
  billingStatus: null,

  subscribers: [],
  selectedSubscriber: null,

  subscriberDetail: null,
  subscriberHistory: [],

  pagination: null,
  historyPagination: null,

  isCatalogLoading: false,
  isLoading: false,
  isHistoryLoading: false,
  error: null,

  getCatalog: async () => {
    set({ isCatalogLoading: true, error: null });

    try {
      const response = await paymentService.getCatalog();

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch plans catalog");
      }

      set({
        plans: response.data?.plans || [],
        organizationType: response.data?.organizationType || null,
        currentPlanKey: response.data?.currentPlanKey || null,
        billingStatus: response.data?.billingStatus || null,
        isCatalogLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        plans: [],
        organizationType: null,
        currentPlanKey: null,
        billingStatus: null,
        isCatalogLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch plans catalog",
      });
    }
  },

  getSubscribers: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await paymentService.getSubscribers({
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        search: params.search,
        status: params.status,
        planKey: params.planKey,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch subscribers");
      }

      set({
        subscribers: response.data?.subscribers || [],
        pagination: response.data?.pagination || null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        subscribers: [],
        pagination: null,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch subscribers",
      });
    }
  },

  getSubscriberHistory: async (userId, params = {}) => {
    if (!userId) {
      set({ error: "User ID is required" });
      return;
    }

    set({ isHistoryLoading: true, error: null });

    try {
      const response = await paymentService.getSubscriberHistory(userId, {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      });

      if (!response.success) {
        throw new Error(
          response.message || "Failed to fetch subscriber billing history"
        );
      }

      set({
        subscriberDetail: response.data || null,
        subscriberHistory: response.data?.payments || [],
        historyPagination: response.data?.pagination || null,
        isHistoryLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        subscriberDetail: null,
        subscriberHistory: [],
        historyPagination: null,
        isHistoryLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch subscriber billing history",
      });
    }
  },

  setSelectedSubscriber: (subscriber) => {
    set({ selectedSubscriber: subscriber });
  },

  clearHistory: () => {
    set({
      subscriberDetail: null,
      subscriberHistory: [],
      historyPagination: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));