
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Conta</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">
          Gerencie as configurações da sua conta de parceiro.
        </p>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h3 className="font-medium">Notificações por Email</h3>
              <p className="text-sm text-gray-500">Receba atualizações sobre reservas e mensagens</p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h3 className="font-medium">Configurações de Pagamento</h3>
              <p className="text-sm text-gray-500">Gerencie seus métodos de recebimento</p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-red-600">Desativar Conta</h3>
              <p className="text-sm text-gray-500">Suspenda temporariamente sua conta de parceiro</p>
            </div>
            <Button variant="destructive">Desativar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
