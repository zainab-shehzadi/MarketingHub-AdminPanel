export type PaymentSubscribersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  planKey?: string;
};

export type PaymentPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaymentSubscriberUser = {
  _id: string;
  email: string;
  organizationType?: string;
  role?: string;
  billingStatus?: string;
  planKey?: string;
  stripeCustomerId?: string | null;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PaymentSubscriberPlan = {
  _id: string;
  key: string;
  name: string;
  isFree: boolean;
  price?: {
    monthly?: number;
    extraSeatMonthly?: number;
  };
};

export type PaymentSubscriberSubscription = {
  _id: string;
  status: string;
  planKey: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  updatedAt?: string;
};

export type PaymentSummary = {
  totalPayments: number;
  succeededPayments: number;
  totalPaidCents: number;
  totalPaidFormatted: number;
  lastPaymentAt: string | null;
};

export type PaymentSubscriber = {
  user: PaymentSubscriberUser;
  plan: PaymentSubscriberPlan | null;
  subscription: PaymentSubscriberSubscription | null;
  paymentSummary: PaymentSummary;
};

export type GetPaymentSubscribersResponse = {
  success: boolean;
  message: string;
  ok?: boolean;
  data?: {
    subscribers: PaymentSubscriber[];
    pagination: PaymentPagination;
  };
};





export type SubscriberBillingUser = {
  _id: string;
  email: string;
  role: string;
  organizationType: string;
  planId?: string;
  planKey?: string;
  billingStatus?: string;
  stripeCustomerId?: string | null;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SubscriberBillingSubscription = {
  _id: string;
  userId: string;
  status: string;
  planKey: string;
  planId?: string;
  stripeCustomerId?: string | null;
  stripePriceId?: string | null;
  stripeSubscriptionId?: string | null;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  workspaceId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type SubscriberBillingPlan = {
  _id: string;
  key: string;
  name: string;
  isFree: boolean;
  audience?: string;
  price?: {
    monthly?: number;
    extraSeatMonthly?: number;
  };
};

export type SubscriberEntitlements = {
  brandsIncluded?: number;
  scansPerMonth?: number;
  dailyScans?: boolean;
  seatsIncluded?: number;
  extraSeatPrice?: number;
  features?: string[];
};

export type SubscriberLimits = {
  maxWorkspaces?: number;
  maxProjects?: number;
  seatsIncluded?: number;
  isFree?: boolean;
  isPaid?: boolean;
};

export type SubscriberUsage = {
  workspaces?: number;
  projects?: number;
};

export type SubscriberBilling = {
  user: {
    _id: string;
    organizationType?: string;
    billingStatus?: string;
    planKey?: string;
  };
  plan: SubscriberBillingPlan | null;
  entitlements?: SubscriberEntitlements;
  limits?: SubscriberLimits;
  usage?: SubscriberUsage;
  canCreateWorkspace?: boolean;
  canCreateProject?: boolean;
};

export type SubscriberPaymentSummary = {
  totalPayments: number;
  succeededCount: number;
  failedCount: number;
  pendingCount: number;
  totalPaidCents: number;
  totalPaidFormatted: number;
};

export type SubscriberPaymentHistory = {
  _id: string;
  amount?: number;
  currency?: string;
  status?: string;
  paymentMethod?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
  paidAt?: string;
  createdAt?: string;
  [key: string]: unknown;
};

export type SubscriberBillingDetail = {
  user: SubscriberBillingUser;
  subscription: SubscriberBillingSubscription | null;
  billing: SubscriberBilling;
  paymentSummary: SubscriberPaymentSummary;
  payments: SubscriberPaymentHistory[];
  pagination: PaymentPagination;
};

export type GetSubscriberHistoryResponse = {
  success: boolean;
  message: string;
  ok?: boolean;
  data?: SubscriberBillingDetail;
};


export type PlanAudience = "AGENCY" | "BRAND";

export type PlanPrice = {
  monthly: number;
  extraSeatMonthly: number;
};

export type PlanEntitlements = {
  brandsIncluded?: number;
  scansPerMonth?: number | null;
  dailyScans?: boolean;
  seatsIncluded?: number;
  extraSeatPrice?: number;
  features?: string[];
};

export type PaymentCatalogPlan = {
  _id: string;
  key: string;
  name: string;
  description: string;
  audience: PlanAudience;
  price: PlanPrice;
  isFree: boolean;
  entitlements: PlanEntitlements;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
  stripeSeatPriceId?: string | null;
};

export type GetPaymentCatalogResponse = {
  success: boolean;
  message: string;
  ok?: boolean;
  data?: {
    organizationType: string;
    currentPlanKey?: string;
    billingStatus?: string;
    plans: PaymentCatalogPlan[];
  };
};