
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

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
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Query to fetch notifications
  const { 
    data: notifications = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // In a real app, we would fetch from the API
      // For this demo, we'll return mock data
      return [
        { 
          id: 1, 
          title: "Reserva confirmada", 
          message: "Seu passeio para o dia 22/08 foi confirmado", 
          date: "Hoje", 
          read: false,
          type: 'booking',
          link: '/bookings' 
        },
        { 
          id: 2, 
          title: "Novo passeio disponível", 
          message: "Conheça nosso novo passeio de caiaque", 
          date: "Ontem", 
          read: true,
          type: 'recommendation',
          link: '/passeios' 
        },
        { 
          id: 3, 
          title: "Oferta especial", 
          message: "Aproveite 15% OFF em hospedagens", 
          date: "3 dias atrás", 
          read: true,
          type: 'promo',
          link: '/hospedagens' 
        }
      ] as Notification[];
    },
    enabled: !!user,
  });

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      if (!user) throw new Error("User not authenticated");
      
      // In a real app, we would update the database
      console.log(`Marking notification ${notificationId} as read`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    },
    onSuccess: (_, notificationId) => {
      // Update the cache optimistically
      queryClient.setQueryData(
        ['notifications', user?.id],
        (oldData: Notification[] = []) => 
          oldData.map(n => 
            n.id === notificationId 
              ? { ...n, read: true } 
              : n
          )
      );
    },
    onError: () => {
      toast.error('Erro ao marcar notificação como lida');
    }
  });

  // Mark all notifications as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      // In a real app, we would update the database
      console.log('Marking all notifications as read');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { success: true };
    },
    onSuccess: () => {
      // Update the cache optimistically
      queryClient.setQueryData(
        ['notifications', user?.id],
        (oldData: Notification[] = []) => 
          oldData.map(n => ({ ...n, read: true }))
      );
      
      toast.success('Todas as notificações foram marcadas como lidas');
    },
    onError: () => {
      toast.error('Erro ao marcar notificações como lidas');
    }
  });

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch,
    markAsRead: (id: number) => markAsReadMutation.mutate(id),
    markAllAsRead: () => markAllAsReadMutation.mutate()
  };
};
