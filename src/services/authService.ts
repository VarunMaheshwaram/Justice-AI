import { User, UserRole } from '../types';
import {
  DEMO_ADMIN_USER,
  DEMO_ADVOCATE_USER,
  DEMO_CLIENT_USER,
  mockUsers,
} from '../data/mockUsers';

const STORAGE_KEY = 'justice_ai_demo_user';

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType: 'client' | 'advocate';
}

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    const existing = mockUsers.find(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );
    const user: User = existing || {
      ...DEMO_CLIENT_USER,
      id: `usr-demo-${Date.now()}`,
      name: payload.email.split('@')[0].replace(/[._]/g, ' '),
      email: payload.email,
      isDemoAccount: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async loginAsDemoRole(role: UserRole): Promise<User> {
    const user =
      role === 'client'
        ? DEMO_CLIENT_USER
        : role === 'advocate'
          ? DEMO_ADVOCATE_USER
          : DEMO_ADMIN_USER;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const newUser: User = {
      id: `usr-reg-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: payload.accountType,
      city: 'Hyderabad',
      state: 'Telangana',
      preferredLanguage: 'English',
      status: 'Active',
      createdAt: new Date().toISOString(),
      isDemoAccount: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
};
