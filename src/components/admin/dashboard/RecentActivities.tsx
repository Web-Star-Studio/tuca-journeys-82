
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityItem from "./ActivityItem";

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
        <CardDescription>Últimas atualizações e atividades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ActivityItem 
            title="Nova reserva de passeio"
            description="João Silva reservou o passeio 'Mergulho em Noronha'"
            time="Há 2 horas"
          />
          <ActivityItem 
            title="Nova hospedagem adicionada"
            description="'Pousada Vista Mar' foi adicionada ao catálogo"
            time="Ontem"
          />
          <ActivityItem 
            title="Atualização de pacote"
            description="Pacote 'Noronha Completo' foi atualizado"
            time="2 dias atrás"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
