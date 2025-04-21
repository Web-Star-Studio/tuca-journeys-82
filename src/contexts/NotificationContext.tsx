
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "promo" | "booking" | "system";
  read: boolean;
  createdAt: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void;
  loading: boolean;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  addNotification: () => {},
  loading: true,
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Only fetch from Supabase
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setNotifications(
          (data ?? []).map((d) => ({
            id: d.id?.toString() || "",
            userId: d.user_id,
            title: d.title,
            message: d.message,
            type: d.type,
            read: d.is_read ?? false,
            createdAt: d.created_at ?? "",
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        toast.error("Não foi possível carregar suas notificações");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
      const { supabase } = await import('@/lib/supabase');
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user?.id);
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(
        notifications.map((n) => ({ ...n, read: true }))
      );
      const { supabase } = await import('@/lib/supabase');
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user?.id);
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error);
    }
  };

  const addNotification = async (notification: Omit<Notification, "id" | "createdAt">) => {
    if (!user) return;
    const { supabase } = await import('@/lib/supabase');
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          is_read: notification.read
        }])
        .select()
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setNotifications(prev => [
          {
            id: data.id?.toString() || "",
            userId: user.id,
            title: data.title,
            message: data.message,
            type: data.type,
            read: data.is_read ?? false,
            createdAt: data.created_at ?? "",
          },
          ...prev
        ]);
        if (!notification.read) {
          toast(notification.title, {
            description: notification.message,
          });
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar notificação:", error);
    }
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    loading,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
