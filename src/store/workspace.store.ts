'use client';

import { create } from 'zustand';
import { workspaceService } from '@/services/workspace.service';
import {
  GetWorkspacesParams,
  Workspace,
  WorkspacePagination,
} from '@/types/workspace';

type WorkspaceState = {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  pagination: WorkspacePagination | null;
  isLoading: boolean;
  error: string | null;

  getWorkspaces: (params?: GetWorkspacesParams) => Promise<void>;
  getWorkspaceById: (id: string) => Workspace | null;
  setSelectedWorkspace: (workspace: Workspace | null) => void;
  clearError: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  selectedWorkspace: null,
  pagination: null,
  isLoading: false,
  error: null,

  getWorkspaces: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await workspaceService.getWorkspaces({
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        workspaceType: params.workspaceType,
        status: params.status,
        search: params.search,
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch workspaces');
      }

      set({
        workspaces: response.data?.workspaces || [],
        pagination: response.data?.pagination || null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        workspaces: [],
        pagination: null,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch workspaces',
      });
    }
  },

  getWorkspaceById: (id: string) => {
    const { workspaces, selectedWorkspace } = get();

    const workspaceFromList =
      workspaces.find((workspace) => workspace._id === id) || null;

    if (workspaceFromList) return workspaceFromList;

    if (selectedWorkspace?._id === id) {
      return selectedWorkspace;
    }

    if (typeof window !== 'undefined') {
      const storedWorkspace = sessionStorage.getItem('selectedWorkspace');

      if (storedWorkspace) {
        try {
          const parsedWorkspace = JSON.parse(storedWorkspace) as Workspace;

          if (parsedWorkspace?._id === id) {
            return parsedWorkspace;
          }
        } catch {
          sessionStorage.removeItem('selectedWorkspace');
        }
      }
    }

    return null;
  },

  setSelectedWorkspace: (workspace) => {
    if (typeof window !== 'undefined') {
      if (workspace) {
        sessionStorage.setItem('selectedWorkspace', JSON.stringify(workspace));
      } else {
        sessionStorage.removeItem('selectedWorkspace');
      }
    }

    set({ selectedWorkspace: workspace });
  },

  clearError: () => {
    set({ error: null });
  },
}));