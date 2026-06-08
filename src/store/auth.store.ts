'use client';

import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import { AuthUser, SigninPayload } from '@/types/auth';

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;

  signin: (payload: SigninPayload) => Promise<boolean>;
  logout: () => void;
  hydrateAuth: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isHydrated: false,

  signin: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.signin(payload);

      const token =
        response.token ||
        response.accessToken ||
        response.data?.token ||
        response.data?.accessToken ||
        null;

      const user = response.user || response.data?.user || null;

      if (!response.success) {
        throw new Error(response.message || 'Signin failed');
      }

      if (!token) {
        throw new Error('Token not found in API response');
      }

      if (!user) {
        throw new Error('User not found in API response');
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
      }

      set({
        token,
        user,
        isLoading: false,
        error: null,
        isHydrated: true,
      });

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid email or password';

      set({
        isLoading: false,
        error: message,
      });

      return false;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('authUser');
      sessionStorage.clear();

      window.location.href = '/login';
    }

    set({
      user: null,
      token: null,
      error: null,
      isHydrated: true,
    });
  },

  hydrateAuth: () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('accessToken');
    const authUser = localStorage.getItem('authUser');

    let parsedUser: AuthUser | null = null;

    if (authUser) {
      try {
        parsedUser = JSON.parse(authUser);
      } catch {
        localStorage.removeItem('authUser');
      }
    }

    set({
      token,
      user: parsedUser,
      isHydrated: true,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));