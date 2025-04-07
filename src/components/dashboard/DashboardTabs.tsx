
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsTable from "@/components/booking/BookingsTable";
import NotificationsTab from "./NotificationsTab";
import RecommendationsTab from "./RecommendationsTab";
import { useIsBelowBreakpoint } from "@/hooks/use-mobile";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface Recommendation {
  id: number;
  title: string;
  image: string;
  score: number;
}

interface DashboardTabsProps {
  notifications: Notification[];
  recommendations: Recommendation[];
}

const DashboardTabs = ({ notifications, recommendations }: DashboardTabsProps) => {
  const isMobile = useIsBelowBreakpoint("sm");
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-1 sm:p-4">
      <Tabs defaultValue="reservas" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="reservas" className="text-sm sm:text-base">
            {isMobile ? "Reservas" : "Minhas Reservas"}
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="text-sm sm:text-base">
            {isMobile ? "Notificações" : "Notificações"}
          </TabsTrigger>
          <TabsTrigger value="recomendacoes" className="text-sm sm:text-base">
            {isMobile ? "Para Você" : "Para Você"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reservas" className="space-y-4">
          <BookingsTable />
        </TabsContent>
        
        <TabsContent value="notificacoes">
          <NotificationsTab notifications={notifications} />
        </TabsContent>
        
        <TabsContent value="recomendacoes">
          <RecommendationsTab recommendations={recommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
