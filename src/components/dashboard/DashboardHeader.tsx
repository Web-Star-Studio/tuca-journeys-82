
import React from "react";
import { Bell, User } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { useIsBelowBreakpoint } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  notificationCount: number;
}

const DashboardHeader = ({ notificationCount }: DashboardHeaderProps) => {
  const { profile } = useProfile();
  const isMobile = useIsBelowBreakpoint("md");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-6">
      <div className="text-center md:text-left w-full md:w-auto">
        <h1 className="text-2xl sm:text-3xl font-medium mb-3 text-gray-800">Meu Painel</h1>
        {profile && (
          <p className="text-gray-500">
            Bem-vindo, <span className="font-medium">{profile.name || "Visitante"}</span>! 
            {!isMobile && " Veja suas atividades e recomendações."}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-gray-50 transition-colors"
          onClick={() => window.location.href = "/profile"}
        >
          <User className="h-5 w-5 text-gray-600" />
        </Button>
        <Button className="relative p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
