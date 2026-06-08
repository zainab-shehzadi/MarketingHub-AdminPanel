export type WorkspaceStatus = "active" | "inactive" | "suspended" | "archived";
export type WorkspaceType = "brand" | "agency";

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

export type WorkspaceProjectTeamMember = {
  userId?: WorkspaceUser;
  name?: string;
  email?: string;
  position?: string;
  weeklyHoursAvailable?: number;
  type?: string;
};

export type WorkspaceProject = {
  _id: string;
  workspaceId: string;

  organizationName?: string;
  projectType?: string;
  industry?: string;
  websiteUrl?: string;
  status?: string;

  owner?: WorkspaceUser;
  teamMembers?: WorkspaceProjectTeamMember[];

  createdAt?: string;
  updatedAt?: string;
};

export type Workspace = {
  _id: string;
  workspaceType: WorkspaceType;
  type?: WorkspaceType;

  name: string;
  createdBy?: WorkspaceUser;

  members: WorkspaceMember[];
  projects: WorkspaceProject[];

  projectCount?: number;
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
  type?: WorkspaceType;
  status?: "active" | "archived";
  q?: string;
};

export type GetWorkspacesResponse = {
  success: boolean;
  message: string;
  data: {
    workspaces: Workspace[];
    filters?: {
      type?: WorkspaceType | null;
      status?: string | null;
      q?: string | null;
    };
    pagination: WorkspacePagination;
  };
  ok: boolean;
};