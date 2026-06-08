export type UserRole = "admin" | "employee" | "user" | "agency" | "brand";

export type EmployeeWorkspace = {
  _id: string;
  name: string;
  workspaceType: string;
  status: string;
};

export type EmployeeAccountOwner = {
  _id: string;
  email: string;
  organizationType?: string;
};

export type EmployeeAssignment = {
  projectId: string;
  organizationName: string;
  projectType: string;
  projectStatus: string;
  position: string;
  memberType: string;
  weeklyHoursAvailable: number;
  workspace?: EmployeeWorkspace | null;
  accountOwner?: EmployeeAccountOwner | null;
};

export type EmployeeEmployment = {
  assignments: EmployeeAssignment[];
  brands: string[];
  brandCount: number;
  primaryBrand?: string;
  workspaceCount: number;
};

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationType?: string;
  employeeDesignation?: string;

  planId?: string | null;
  planKey?: string | null;
  billingStatus?: string;
  stripeCustomerId?: string | null;

  active?: boolean;
  blocked?: boolean;

  employment?: EmployeeEmployment;

  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type UsersPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type GetUsersParams = {
  page?: number;
  limit?: number;
  role?: string;
};

export type GetUsersResponse = {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: UsersPagination;
  };
  ok: boolean;
};

export type BlockUserPayload = {
  blocked: boolean;
};

export type BlockUserResponse = {
  success: boolean;
  message: string;
  data: AdminUser;
  ok: boolean;
};