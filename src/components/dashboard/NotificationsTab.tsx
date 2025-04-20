
import React from "react";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Gift, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

const NotificationItem: React.FC<{ 
  notification: Notification, 
  onMarkRead: (id: string) => void 
}> = ({ notification, onMarkRead }) => {
  const { id, title, message, type, read, createdAt } = notification;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return `Hoje, ${format(date, "HH:mm")}`;
    } else if (isYesterday(date)) {
      return `Ontem, ${format(date, "HH:mm")}`;
    } else if (isThisWeek(date)) {
      return format(date, "EEEE', 'HH:mm", { locale: ptBR });
    } else {
      return format(date, "dd/MM/yyyy, HH:mm");
    }
  };

  const getIcon = () => {
    switch (type) {
      case "promo":
        return <Gift className="h-5 w-5 text-purple-500" />;
      case "booking":
        return <CalendarCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card 
      className={`mb-3 transition-colors ${read ? 'bg-white' : 'bg-blue-50'}`}
      onClick={() => !read && onMarkRead(id)}
    >
      <CardContent className="p-4 flex items-start">
        <div className="mr-3 mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          {!read && (
            <div className="mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead(id);
                }}
              >
                Marcar como lida
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NotificationsTab = () => {
  const { notifications, markAsRead, markAllAsRead, loading, unreadCount } = useNotifications();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Nenhuma notificação</h3>
        <p className="text-gray-500 mt-1">
          Você não tem notificações no momento.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          Notificações 
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onMarkRead={markAsRead} 
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
