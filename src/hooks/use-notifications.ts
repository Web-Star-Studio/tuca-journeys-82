
import { useState, useEffect } from 'react';

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'booking' | 'promo' | 'system' | 'recommendation';
  link?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Reserva confirmada",
      message: "Sua reserva para o passeio de mergulho foi confirmada",
      date: "10/04/2023",
      read: false,
      type: "booking",
      link: "/account/bookings/123"
    },
    {
      id: 2,
      title: "Promoção imperdível",
      message: "Aproveite 20% de desconto em passeios de barco",
      date: "08/04/2023",
      read: true,
      type: "promo",
      link: "/tours"
    },
    {
      id: 3,
      title: "Novo passeio disponível",
      message: "Conheça nossa nova trilha ecológica",
      date: "05/04/2023",
      read: false,
      type: "recommendation",
      link: "/tours/new-eco-trail"
    },
    {
      id: 4,
      title: "Atualização de perfil",
      message: "Complete seu perfil para desbloquear benefícios",
      date: "01/04/2023",
      read: true,
      type: "system",
      link: "/profile"
    }
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate unread notifications count
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newId = notifications.length > 0 
      ? Math.max(...notifications.map(n => n.id)) + 1 
      : 1;
    
    setNotifications([
      { ...notification, id: newId },
      ...notifications
    ]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};
