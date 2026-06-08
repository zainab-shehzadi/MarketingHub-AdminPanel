import { api } from '@/lib/api';
import { apiCall } from '@/lib/callApi';
import { GetWorkspacesParams, GetWorkspacesResponse } from '@/types/workspace';

export const workspaceService = {
  getWorkspaces: (params: GetWorkspacesParams) => {
    return apiCall<GetWorkspacesResponse>(() =>
      api.get('/workspace/admin/workspaces', {
        params,
      })
    );
  },
};