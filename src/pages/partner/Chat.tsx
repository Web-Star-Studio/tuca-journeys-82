
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PartnerLayout from "@/components/partner/PartnerLayout";

const PartnerChat: React.FC = () => {
  return (
    <PartnerLayout pageTitle="Mensagens">
      <Card>
        <CardHeader>
          <CardTitle>Chat com Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">
            Comunique-se com seus clientes.
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

export default PartnerChat;
