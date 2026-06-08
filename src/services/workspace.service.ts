import { api } from "@/lib/api";
import { apiCall } from "@/lib/callApi";
import type {
  GetWorkspacesParams,
  GetWorkspacesResponse,
} from "@/types/workspace";

export const workspaceService = {
  getWorkspaces: (params: GetWorkspacesParams = {}) => {
    return apiCall<GetWorkspacesResponse>(() =>
      api.get("/workspace/admin/workspaces", {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 20,
          type: params.type,
          status: params.status,
          q: params.q,
        },
      })
    );
  },
};