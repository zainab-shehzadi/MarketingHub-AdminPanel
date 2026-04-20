// Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'admin' | 'moderator' | 'support';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Organization Types
export interface Brand {
  id: string;
  name: string;
  website: string;
  ownerEmail: string;
  plan: PlanName;
  status: OrganizationStatus;
  visibility: Visibility;
  agencyId?: string;
  seatsUsed: number;
  seatsLimit: number;
  createdAt: Date;
  logo?: string;
}

export interface Agency {
  id: string;
  name: string;
  description: string;
  website: string;
  ownerEmail: string;
  status: OrganizationStatus;
  brandCount: number;
  totalSeatsUsed: number;
  createdAt: Date;
  logo?: string;
  brands?: Brand[];
}

export type OrganizationStatus = 'active' | 'suspended' | 'inactive';
export type Visibility = 'public' | 'private' | 'unlisted';

// Plan Types
export interface Plan {
  id: string;
  name: PlanName;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  status: 'available' | 'deprecated';
  createdAt: Date;
  updatedAt: Date;
}

export type PlanName = 'starter' | 'professional' | 'enterprise';

// Subscription Types
export interface Subscription {
  id: string;
  organizationId: string;
  organizationType: 'brand' | 'agency';
  organizationName: string;
  currentPlan: PlanName;
  billingStatus: BillingStatus;
  seatsUsed: number;
  seatsLimit: number;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: Date;
  status: SubscriptionStatus;
  createdAt: Date;
}

export type BillingStatus = 'active' | 'past_due' | 'suspended' | 'cancelled';
export type SubscriptionStatus = 'active' | 'suspended' | 'expired' | 'cancelled';

// Logs Types
export interface AuditLog {
  id: string;
  timestamp: Date;
  actor: string;
  action: LogAction;
  module: LogModule;
  targetEntity: string;
  targetId: string;
  status: LogStatus;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export type LogAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'suspend'
  | 'activate'
  | 'change_plan'
  | 'export';

export type LogModule =
  | 'auth'
  | 'organizations'
  | 'users'
  | 'plans'
  | 'subscriptions'
  | 'settings';

export type LogStatus = 'success' | 'failure' | 'warning';
