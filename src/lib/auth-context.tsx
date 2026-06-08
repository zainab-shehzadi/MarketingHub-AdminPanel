'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthSession } from './types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const stored = localStorage.getItem('auth_session');
    if (stored) {
      try {
        const session: AuthSession = JSON.parse(stored);
        if (new Date(session.expiresAt) > new Date()) {
          setUser(session.user);
        } else {
          localStorage.removeItem('auth_session');
        }
      } catch (error) {
        localStorage.removeItem('auth_session');
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call a real API
    if (email === 'admin@example.com' && password === 'password') {
      const mockUser: User = {
        id: '1',
        email: 'admin@example.com',
        name: 'John Admin',
        role: 'admin',
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date(),
      };

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const session: AuthSession = {
        user: mockUser,
        token: 'mock-token-' + Math.random().toString(36),
        expiresAt,
      };

      localStorage.setItem('auth_session', JSON.stringify(session));
      setUser(mockUser);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
