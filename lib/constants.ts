export const PLAN_DETAILS = {
  starter: {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ['Up to 3 brands', '5 team members', 'Basic analytics', 'Email support'],
    color: 'bg-blue-500',
  },
  professional: {
    name: 'Professional',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: ['Up to 10 brands', 'Unlimited team members', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    color: 'bg-purple-500',
  },
  enterprise: {
    name: 'Enterprise',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: ['Unlimited brands', 'Unlimited team members', 'Real-time analytics', 'Dedicated support', 'API access', 'Custom workflows'],
    color: 'bg-emerald-500',
  },
};

export const USER_ROLES = {
  admin: 'Administrator',
  moderator: 'Moderator',
  support: 'Support Agent',
};

export const STATUS_CONFIG = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' },
  suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' },
  inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-500' },
  expired: { label: 'Expired', color: 'bg-orange-100 text-orange-800', dotColor: 'bg-orange-500' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-800', dotColor: 'bg-slate-500' },
  past_due: { label: 'Past Due', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' },
};

export const BILLING_STATUS_CONFIG = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  past_due: { label: 'Past Due', color: 'bg-red-100 text-red-800' },
  suspended: { label: 'Suspended', color: 'bg-orange-100 text-orange-800' },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
};

export const LOG_ACTION_CONFIG = {
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
  login: 'Login',
  logout: 'Logout',
  suspend: 'Suspend',
  activate: 'Activate',
  change_plan: 'Change Plan',
  export: 'Export',
};

export const LOG_MODULE_CONFIG = {
  auth: 'Authentication',
  organizations: 'Organizations',
  users: 'Users',
  plans: 'Plans',
  subscriptions: 'Subscriptions',
  settings: 'Settings',
};

export const SIDEBAR_ROUTES = [
  { icon: 'LayoutDashboard', label: 'Dashboard', href: '/dashboard', roles: ['admin', 'moderator', 'support'] },
  { icon: 'Building2', label: 'Organizations', href: '/organizations', roles: ['admin', 'moderator'] },
  { icon: 'Users', label: 'Users', href: '/users', roles: ['admin', 'moderator'] },
  { icon: 'CreditCard', label: 'Plans', href: '/plans', roles: ['admin'] },
  { icon: 'Zap', label: 'Subscriptions', href: '/subscriptions', roles: ['admin', 'moderator'] },
  { icon: 'FileText', label: 'Logs', href: '/logs', roles: ['admin', 'moderator', 'support'] },
];
