"use client";

import { create } from "zustand";
import { userService } from "@/services/user.service";
import { AdminUser, GetUsersParams, UsersPagination } from "@/types/user";

type UserState = {
  users: AdminUser[];
  selectedUser: AdminUser | null;
  pagination: UsersPagination | null;
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;

  getUsers: (params?: GetUsersParams) => Promise<void>;
  getUserById: (id: string) => AdminUser | null;
  blockUnblockUser: (userId: string, blocked: boolean) => Promise<boolean>;
  setSelectedUser: (user: AdminUser | null) => void;
  clearError: () => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  pagination: null,
  isLoading: false,
  isActionLoading: false,
  error: null,

  getUsers: async (params = {}) => {
    set({ isLoading: true, error: null });

    try {
      const response = await userService.getUsers({
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        role: params.role,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch users");
      }

      set({
        users: response.data?.users || [],
        pagination: response.data?.pagination || null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        users: [],
        pagination: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      });
    }
  },

  blockUnblockUser: async (userId, blocked) => {
    set({ isActionLoading: true, error: null });

    try {
      const response = await userService.blockUnblockUser(userId, {
        blocked,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to update user status");
      }

      const updatedUser = response.data;

      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId
            ? {
                ...user,
                ...updatedUser,
                blocked: updatedUser.blocked ?? blocked,
                active: updatedUser.active ?? !blocked,
              }
            : user
        ),
        selectedUser:
          state.selectedUser?._id === userId
            ? {
                ...state.selectedUser,
                ...updatedUser,
                blocked: updatedUser.blocked ?? blocked,
                active: updatedUser.active ?? !blocked,
              }
            : state.selectedUser,
        isActionLoading: false,
        error: null,
      }));

      if (typeof window !== "undefined") {
        const currentSelectedUser = get().selectedUser;

        if (currentSelectedUser?._id === userId) {
          sessionStorage.setItem(
            "selectedUser",
            JSON.stringify(currentSelectedUser)
          );
        }
      }

      return true;
    } catch (error) {
      set({
        isActionLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update user status",
      });

      return false;
    }
  },

  getUserById: (id: string) => {
    const { users, selectedUser } = get();

    const userFromList = users.find((user) => user._id === id) || null;

    if (userFromList) return userFromList;

    if (selectedUser?._id === id) {
      return selectedUser;
    }

    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("selectedUser");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as AdminUser;

          if (parsedUser?._id === id) {
            return parsedUser;
          }
        } catch {
          sessionStorage.removeItem("selectedUser");
        }
      }
    }

    return null;
  },

  setSelectedUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        sessionStorage.setItem("selectedUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("selectedUser");
      }
    }

    set({ selectedUser: user });
  },

  clearError: () => {
    set({ error: null });
  },
}));