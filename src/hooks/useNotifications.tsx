
import { create } from 'zustand';

export type NotificationType = 'info' | 'critico';

export interface Notification {
  id: number;
  mensagem: string;
  tipo: NotificationType;
  lido: boolean;
  data: string;
}

interface NotificationStore {
  notifications: Notification[];
  isOpen: boolean;
  openNotificationsPanel: () => void;
  closeNotificationsPanel: () => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
}

export const useNotifications = create<NotificationStore>((set, get) => ({
  notifications: [
    { id: 1, mensagem: 'Condomínio Villa Verde: Novo atraso reportado', tipo: 'critico', lido: false, data: '07/04/2025' },
    { id: 2, mensagem: 'Edifício Solaris: Foto enviada', tipo: 'info', lido: false, data: '06/04/2025' },
    { id: 3, mensagem: 'Escola Municipal: Tarefas pendentes', tipo: 'info', lido: false, data: '07/04/2025' },
    { id: 4, mensagem: 'Shopping Center Plaza: Problema com fornecedor', tipo: 'critico', lido: false, data: '05/04/2025' },
  ],
  isOpen: false,
  openNotificationsPanel: () => set({ isOpen: true }),
  closeNotificationsPanel: () => set({ isOpen: false }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((notification) =>
      notification.id === id ? { ...notification, lido: true } : notification
    ),
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((notification) => ({ ...notification, lido: true })),
  })),
  getUnreadCount: () => {
    return get().notifications.filter((notification) => !notification.lido).length;
  },
}));
