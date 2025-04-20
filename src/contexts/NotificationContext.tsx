
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

  // Carrega notificações do usuário quando o componente é montado ou o usuário muda
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Para demonstração, usamos dados simulados
        // Em um ambiente real, buscaríamos do Supabase
        if (user.id.startsWith('demo-')) {
          const mockNotifications: Notification[] = [
            {
              id: "1",
              userId: user.id,
              title: "Reserva confirmada",
              message: "Sua reserva para Passeio de Barco foi confirmada!",
              type: "booking",
              read: false,
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: "2",
              userId: user.id,
              title: "Promoção especial",
              message: "25% de desconto em passeios selecionados este fim de semana!",
              type: "promo",
              read: false,
              createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: "3",
              userId: user.id,
              title: "Bem-vindo ao Tuca Noronha",
              message: "Esperamos que você aproveite sua experiência com a gente!",
              type: "system",
              read: true,
              createdAt: new Date(Date.now() - 604800000).toISOString(),
            },
          ];
          setNotifications(mockNotifications);
        } else {
          // Código real para buscar do Supabase
          // const { data, error } = await supabase
          //   .from('notifications')
          //   .select('*')
          //   .eq('user_id', user.id)
          //   .order('created_at', { ascending: false });
          
          // if (error) throw error;
          // setNotifications(data || []);
        }
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
      // Atualiza localmente
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );

      // Em um ambiente real, atualizaríamos no Supabase
      // if (!user.id.startsWith('demo-')) {
      //   await supabase
      //     .from('notifications')
      //     .update({ read: true })
      //     .eq('id', id)
      //     .eq('user_id', user.id);
      // }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Atualiza localmente
      setNotifications(
        notifications.map((n) => ({ ...n, read: true }))
      );

      // Em um ambiente real, atualizaríamos no Supabase
      // if (!user.id.startsWith('demo-')) {
      //   await supabase
      //     .from('notifications')
      //     .update({ read: true })
      //     .eq('user_id', user.id);
      // }
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error);
    }
  };

  const addNotification = async (notification: Omit<Notification, "id" | "createdAt">) => {
    if (!user) return;
    
    const newNotification: Notification = {
      ...notification,
      id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Atualiza localmente
    setNotifications([newNotification, ...notifications]);

    try {
      // Em um ambiente real, salvaríamos no Supabase
      // if (!user.id.startsWith('demo-')) {
      //   const { data, error } = await supabase
      //     .from('notifications')
      //     .insert([{
      //       user_id: notification.userId,
      //       title: notification.title,
      //       message: notification.message,
      //       type: notification.type,
      //       read: notification.read
      //     }])
      //     .select();
      //
      //   if (error) throw error;
      //   
      //   // Atualiza com o ID real do banco
      //   if (data && data[0]) {
      //     setNotifications(prev => 
      //       prev.map(n => n.id === newNotification.id ? { ...n, id: data[0].id } : n)
      //     );
      //   }
      // }

      // Exibe toast para notificações não lidas
      if (!notification.read) {
        toast(notification.title, {
          description: notification.message,
        });
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
