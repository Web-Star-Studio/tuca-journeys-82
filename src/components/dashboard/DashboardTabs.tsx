
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendationsTab from "./RecommendationsTab";
import NotificationsTab from "./NotificationsTab";
import { useNotifications } from "@/contexts/NotificationContext";

interface DashboardTabsProps {
  recommendations: Array<{
    id: number;
    title: string;
    image: string;
    score: number;
  }>;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ recommendations }) => {
  const { unreadCount } = useNotifications();

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <Tabs defaultValue="recommendations">
        <TabsList className="grid grid-cols-2 h-12 mb-6">
          <TabsTrigger value="recommendations">
            Recomendações para você
          </TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notificações
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <RecommendationsTab recommendations={recommendations} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
