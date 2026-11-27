import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '../types';
import { authService, LoginPayload, RegisterPayload } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  loginAsDemo: (role: UserRole) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  updateCurrentUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  const login = useCallback(async (payload: LoginPayload) => {
    const loggedIn = await authService.login(payload);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const loginAsDemo = useCallback(async (role: UserRole) => {
    const demoUser = await authService.loginAsDemoRole(role);
    setUser(demoUser);
    return demoUser;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const created = await authService.register(payload);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const updateCurrentUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      localStorage.setItem('justice_ai_demo_user', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        loginAsDemo,
        register,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
