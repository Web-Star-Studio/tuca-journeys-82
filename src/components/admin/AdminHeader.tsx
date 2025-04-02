
import React from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-menu/UserAvatar";

interface AdminHeaderProps {
  pageTitle: string;
}

const AdminHeader = ({ pageTitle }: AdminHeaderProps) => {
  const { user } = useAuth();

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
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user?.user_metadata?.name || user?.email}</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
