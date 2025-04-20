
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";

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
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Em breve</h3>
            <p className="text-gray-500 mt-2">
              Esta funcionalidade estará disponível em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    </PartnerLayout>
  );
};

export default PartnerClients;
