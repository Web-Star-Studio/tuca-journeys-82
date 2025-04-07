
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsTable from "@/components/booking/BookingsTable";
import NotificationsTab from "./NotificationsTab";
import RecommendationsTab from "./RecommendationsTab";

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
  return (
    <Tabs defaultValue="reservas" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="reservas">Minhas Reservas</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        <TabsTrigger value="recomendacoes">Para Você</TabsTrigger>
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
  );
};

export default DashboardTabs;
