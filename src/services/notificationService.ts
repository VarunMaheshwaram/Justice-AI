import { AppNotification, UserRole } from '../types';
import { mockNotifications } from '../data/mockNotifications';

let localNotifications: AppNotification[] = [...mockNotifications];

export const notificationService = {
  async getNotifications(role?: UserRole): Promise<AppNotification[]> {
    if (!role) return [...localNotifications];
    return localNotifications.filter((n) => n.role === role);
  },

  async markAsRead(id: string): Promise<AppNotification[]> {
    localNotifications = localNotifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return [...localNotifications];
  },

  async markAllAsRead(role: UserRole): Promise<AppNotification[]> {
    localNotifications = localNotifications.map((n) =>
      n.role === role ? { ...n, read: true } : n
    );
    return localNotifications.filter((n) => n.role === role);
  },
};
