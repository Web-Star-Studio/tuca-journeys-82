
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'promo' | 'recommendation' | 'system';
  read: boolean;
  date: string;
  link?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { user } = useAuth();

  // Load mock notifications
  useEffect(() => {
    if (user) {
      // Mock data - in a real app, this would come from an API
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Reserva confirmada',
          message: 'Sua reserva para o passeio de barco foi confirmada.',
          type: 'booking',
          read: false,
          date: '2025-04-16',
          link: '/bookings/123'
        },
        {
          id: '2',
          title: 'Oferta especial',
          message: '20% de desconto em passeios para o próximo mês.',
          type: 'promo',
          read: false,
          date: '2025-04-15',
          link: '/tours'
        },
        {
          id: '3',
          title: 'Recomendação de passeio',
          message: 'Baseado em suas preferências, você pode gostar do passeio de mergulho.',
          type: 'recommendation',
          read: true,
          date: '2025-04-14',
          link: '/tours/456'
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};
