
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Bell, ShoppingBag, Calendar, Star, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Notification, useNotifications } from "@/hooks/use-notifications";
import { Link } from "react-router-dom";

interface NotificationsTabProps {
  notifications: Notification[];
}

const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  const { markAsRead, markAllAsRead } = useNotifications();

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-tuca-ocean-blue" />;
      case 'promo':
        return <ShoppingBag className="h-5 w-5 text-green-500" />;
      case 'recommendation':
        return <Star className="h-5 w-5 text-amber-500" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Nenhuma notificação</h3>
          <p className="text-gray-500 mt-1 max-w-md mx-auto">
            Você não tem notificações no momento. Quando houver atualizações sobre suas reservas ou ofertas especiais, elas aparecerão aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Suas notificações</h3>
          {notifications.some(n => !n.read) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => markAllAsRead()}
              className="text-sm"
            >
              <Check className="h-4 w-4 mr-1" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        
        <ul className="divide-y">
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`py-4 px-2 rounded-md transition-colors ${
                !notification.read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex">
                <div className="mr-3 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium flex items-center">
                      {notification.title}
                      {!notification.read && (
                        <Badge variant="tuca" className="ml-2 text-xs py-0.5 px-1.5">
                          Novo
                        </Badge>
                      )}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {notification.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center">
                    {notification.link && (
                      <Link 
                        to={notification.link}
                        className="text-sm text-tuca-ocean-blue hover:underline"
                      >
                        Ver detalhes
                      </Link>
                    )}
                    
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs ml-auto"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
