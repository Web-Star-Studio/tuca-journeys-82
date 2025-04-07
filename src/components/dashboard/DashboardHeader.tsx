
import React from "react";
import { Bell } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";

interface DashboardHeaderProps {
  notificationCount: number;
}

const DashboardHeader = ({ notificationCount }: DashboardHeaderProps) => {
  const { profile } = useProfile();

  return (
    <div className="flex flex-wrap items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-medium mb-2">Meu Painel</h1>
        {profile && (
          <p className="text-gray-500">
            Bem-vindo, {profile.name || "Visitante"}! Veja suas atividades e recomendações.
          </p>
        )}
      </div>
      <div className="relative">
        <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
