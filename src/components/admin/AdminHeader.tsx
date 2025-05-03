
import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserMenu from "./UserMenu";
import { toast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  pageTitle: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

const AdminHeader = ({ pageTitle }: AdminHeaderProps) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nova reserva",
      message: "João Silva acaba de reservar um passeio",
      date: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "2",
      title: "Atualização de sistema",
      message: "O sistema foi atualizado para a versão 1.2.4",
      date: new Date(Date.now() - 86400000),
      read: false
    },
    {
      id: "3",
      title: "Solicitação de suporte",
      message: "Maria Pereira precisa de assistência com uma reserva",
      date: new Date(Date.now() - 259200000),
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notificações",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours} h atrás`;
    return `${diffDays} dia${diffDays !== 1 ? 's' : ''} atrás`;
  };

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Pesquisar..." 
            className="pl-10 w-64 bg-gray-50" 
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-medium">Notificações</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Nenhuma notificação
                </div>
              )}
            </div>
            <div className="p-2 border-t text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs w-full text-blue-600 hover:text-blue-800"
              >
                Ver todas as notificações
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default AdminHeader;
