
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'booking' | 'promo' | 'system' | 'recommendation';
  read: boolean;
  link?: string;
  date: string;
  created_at: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      try {
        // In a real app, we would fetch from Supabase
        // For now, use demo data
        const mockNotifications = generateMockNotifications(user.id);
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    
    // Setup real-time updates for notifications
    const setupRealtimeNotifications = () => {
      if (!user?.id) return;
      
      const channel = supabase
        .channel('public:notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    };
    
    // Skip for now since we're using mock data
    // return setupRealtimeNotifications();
  }, [user?.id]);
  
  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user?.id) return;
    
    try {
      // In a real app, we would update in Supabase
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user?.id) return;
    
    try {
      // In a real app, we would update in Supabase
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  // Mock notification data generator
  const generateMockNotifications = (userId: string): Notification[] => {
    const now = new Date();
    return [
      {
        id: '1',
        user_id: userId,
        title: 'Reserva confirmada!',
        message: 'Sua reserva para o Passeio de Barco foi confirmada. Confira os detalhes.',
        type: 'booking',
        read: false,
        link: '/bookings/123',
        date: 'Hoje, 14:30',
        created_at: now.toISOString()
      },
      {
        id: '2',
        user_id: userId,
        title: 'Oferta exclusiva!',
        message: 'Aproveite 15% de desconto em passeios de mergulho este mês.',
        type: 'promo',
        read: false,
        link: '/tours/diving',
        date: 'Ontem, 10:15',
        created_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        user_id: userId,
        title: 'Com base no seu perfil...',
        message: 'Recomendamos o novo tour de observação de tartarugas. Combina com suas preferências!',
        type: 'recommendation',
        read: true,
        link: '/tours/turtles',
        date: '3 dias atrás',
        created_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        user_id: userId,
        title: 'Manutenção programada',
        message: 'Nosso sistema estará em manutenção no dia 15/05 das 02:00 às 04:00.',
        type: 'system',
        read: true,
        date: '1 semana atrás',
        created_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  };
  
  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};
