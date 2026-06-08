export type UserRole = "admin" | "employee" | "user" | "agency" | "brand";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationType?: string;
  employeeDesignation?: string;

  // Backend fields
  active?: boolean;
  blocked?: boolean;

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