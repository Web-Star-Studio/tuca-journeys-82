
import React from "react";
import { Card } from "@/components/ui/card";

const UserRegionInsights = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border border-blue-200 bg-blue-50">
        <div className="p-6 pb-4">
          <div className="text-sm font-medium">
            Região com Mais Usuários
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="font-bold text-xl">Sudeste</div>
          <div className="text-sm text-muted-foreground">280 usuários (35%)</div>
        </div>
      </Card>
      
      <Card className="border border-yellow-200 bg-yellow-50">
        <div className="p-6 pb-4">
          <div className="text-sm font-medium">
            Maior Crescimento
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="font-bold text-xl">Nordeste</div>
          <div className="text-sm text-muted-foreground">+32% no último mês</div>
        </div>
      </Card>
      
      <Card className="border border-purple-200 bg-purple-50">
        <div className="p-6 pb-4">
          <div className="text-sm font-medium">
            Maior Conversão
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="font-bold text-xl">Sul</div>
          <div className="text-sm text-muted-foreground">34% de taxa de conversão</div>
        </div>
      </Card>
    </div>
  );
};

export default UserRegionInsights;
