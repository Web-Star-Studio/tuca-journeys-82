
import { useNotifications as useContextNotifications } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Notification } from "@/contexts/NotificationContext";
import { useToast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const { user } = useAuth();
  const contextNotifications = useContextNotifications();
  const { toast } = useToast();
  
  // Use React Query to fetch notifications from Supabase
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        // For demo users, return mock notifications
        if (user.id.startsWith('demo-')) {
          return contextNotifications.notifications;
        }
        
        // For real users, fetch from Supabase
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Map Supabase results to our Notification type
        return (data || []).map(notification => ({
          id: String(notification.id),
          userId: notification.user_id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          read: notification.is_read !== undefined ? notification.is_read : false,
          createdAt: notification.created_at,
        }));
      } catch (error) {
        console.error('Error fetching notifications:', error);
        return contextNotifications.notifications;
      }
    },
    enabled: !!user && !contextNotifications.loading,
  });
  
  // Create a notification
  const createNotification = async (notification: {
    title: string;
    message: string;
    type: "promo" | "booking" | "system";
  }) => {
    if (!user) return null;
    
    try {
      // Use context method for all users (which will handle demo users)
      contextNotifications.addNotification({
        userId: user.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: false,
      });
      
      // For real users, also save to Supabase
      if (!user.id.startsWith('demo-')) {
        const { error } = await supabase
          .from('notifications')
          .insert([{
            user_id: user.id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            is_read: false, // Fixed: is_read instead of read
          }]);
          
        if (error) throw error;
      }
      
      // Refresh notifications
      refetch();
      
      return true;
    } catch (error) {
      console.error('Error creating notification:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a notificação.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  // Helper method to send a booking notification
  const sendBookingNotification = async (bookingId: string, serviceName: string) => {
    return createNotification({
      title: "Reserva confirmada",
      message: `Sua reserva para ${serviceName} foi confirmada! Confira os detalhes.`,
      type: "booking"
    });
  };
  
  // Helper method to send a promotional notification
  const sendPromoNotification = async (title: string, message: string) => {
    return createNotification({
      title,
      message,
      type: "promo"
    });
  };

  return {
    ...contextNotifications,
    notifications: data || contextNotifications.notifications,
    isLoading: isLoading || contextNotifications.loading,
    createNotification,
    sendBookingNotification,
    sendPromoNotification,
    refetch
  };
};
