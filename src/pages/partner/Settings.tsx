
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";
import SettingsTab from "@/components/partner/profile/SettingsTab";

const PartnerSettings: React.FC = () => {
  return (
    <PartnerLayout pageTitle="Configurações">
      <div className="grid gap-6">
        <SettingsTab />
      </div>
    </PartnerLayout>
  );
};

export default PartnerSettings;
