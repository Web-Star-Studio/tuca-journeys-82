
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ProfileInfoTab from "./ProfileInfoTab";
import ProfileSecurityTab from "./ProfileSecurityTab";
import ProfilePreferencesTab from "./ProfilePreferencesTab";
import ProfileDocumentsTab from "./ProfileDocumentsTab";
import ProfileNotificationsTab from "./ProfileNotificationsTab";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="info">
      <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-2">
        <TabsTrigger value="info">Informações</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="preferences">Preferências</TabsTrigger>
        <TabsTrigger value="documents">Documentos</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>
      
      <TabsContent value="info">
        <ProfileInfoTab />
      </TabsContent>
      
      <TabsContent value="security">
        <ProfileSecurityTab />
      </TabsContent>
      
      <TabsContent value="preferences">
        <ProfilePreferencesTab />
      </TabsContent>
      
      <TabsContent value="documents">
        <ProfileDocumentsTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <ProfileNotificationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
