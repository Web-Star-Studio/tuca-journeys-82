
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ProfileInfoTab from "./ProfileInfoTab";
import ProfileSecurityTab from "./ProfileSecurityTab";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="info">
      <TabsList className="mb-8">
        <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
      </TabsList>
      
      <TabsContent value="info">
        <ProfileInfoTab />
      </TabsContent>
      
      <TabsContent value="security">
        <ProfileSecurityTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
