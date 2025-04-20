
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";
import PartnerCustomersTable from "@/components/partner/dashboard/PartnerCustomersTable";

const PartnerClients: React.FC = () => {
  return (
    <PartnerLayout pageTitle="Clientes">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            Visualize e gerencie seus clientes.
          </p>
          <PartnerCustomersTable />
        </CardContent>
      </Card>
    </PartnerLayout>
  );
};

export default PartnerClients;
