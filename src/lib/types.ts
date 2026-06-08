// Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date | null;
}
export type UserRole = 'admin' | 'moderator' | 'support';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

export type BrandStatus = 'banned' | 'unbanned';

export interface Brand {
  id: string;
  name: string;
  website: string;
  ownerEmail: string;
  plan: PlanName;
  status: BrandStatus;
  visibility: 'public' | 'private';
  seatsUsed: number;
  seatsLimit: number;
  createdAt: Date;

  agencyId?: string;
  agencyName?: string;
  businessType?: string;
  visibilityScore?: number;
  deletedAt?: Date | null;
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

export type PlanName = 'free' | 'starter' | 'professional' | 'enterprise';
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

// Subscription Types
export interface Subscription {
  id: string;
  organizationId: string;
  organizationType: 'brand' | 'agency';
  organizationName: string;
  currentPlan: 'starter' | 'professional' | 'enterprise';
  billingStatus: 'active' | 'past_due' | 'suspended' | 'cancelled';
  seatsUsed: number;
  seatsLimit: number;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: Date;
  status: 'active' | 'suspended' | 'expired' | 'cancelled';
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
