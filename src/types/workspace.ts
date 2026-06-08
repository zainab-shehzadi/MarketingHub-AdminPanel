export type WorkspaceStatus = 'active' | 'inactive' | 'suspended';
export type WorkspaceType = 'brand' | 'agency';

export type WorkspaceUser = {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  organizationType?: string;
  employeeDesignation?: string;
};

export type WorkspaceMember = {
  user: WorkspaceUser;
  role: string;
  seatStatus: string;
  activatedAt?: string;
};

export type WorkspaceProject = {
  _id: string;
  workspaceId: string;
  owner?: WorkspaceUser;
  status?: string;
  organizationBasics?: {
    projectType?: string;
    organizationName?: string;
    websiteUrl?: string;
    industry?: string;
    companySize?: string;
    businessLocation?: string;
    targetMarketScope?: string;
    primaryProductsServices?: string;
    targetAudience?: string;
  };
  teamMembers?: unknown[];
  createdAt?: string;
  updatedAt?: string;
};

export type Workspace = {
  _id: string;
  workspaceType: WorkspaceType;
  name: string;
  createdBy?: WorkspaceUser;
  members: WorkspaceMember[];
  projects: WorkspaceProject[];
  seatsLimit: number;
  status: WorkspaceStatus;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type WorkspacePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type GetWorkspacesParams = {
  page?: number;
  limit?: number;
  workspaceType?: string;
  status?: string;
  search?: string;
};

export type GetWorkspacesResponse = {
  success: boolean;
  message: string;
  data: {
    workspaces: Workspace[];
    pagination: WorkspacePagination;
  };
  ok: boolean;
};