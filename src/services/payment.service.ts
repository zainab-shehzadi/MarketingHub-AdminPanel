// src/services/payment.service.ts

import { api } from "@/lib/api";
import { apiCall } from "@/lib/callApi";
import {
  GetPaymentCatalogResponse,
  GetPaymentSubscribersResponse,
  GetSubscriberHistoryResponse,
  PaymentSubscribersParams,
} from "@/types/payment.types";

export const paymentService = {
  getCatalog: () => {
    return apiCall<GetPaymentCatalogResponse>(() =>
      api.get("/payment/catalog")
    );
  },

  getSubscribers: (params: PaymentSubscribersParams = {}) => {
    return apiCall<GetPaymentSubscribersResponse>(() =>
      api.get("/payment/admin/subscribers", {
        params,
      })
    );
  },

  getSubscriberHistory: (
    userId: string,
    params: PaymentSubscribersParams = {}
  ) => {
    return apiCall<GetSubscriberHistoryResponse>(() =>
      api.get(`/payment/admin/subscribers/${userId}/history`, {
        params,
      })
    );
  },
};