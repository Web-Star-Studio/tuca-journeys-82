
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityItem from "./ActivityItem";
import { PackagePlus, Users, ShoppingCart, Home } from "lucide-react";

const RecentActivities = () => {
  const activities = [
    {
      icon: <ShoppingCart className="h-4 w-4 text-tuca-ocean-blue" />,
      title: "Nova Reserva: Passeio de Barco ao Pôr do Sol",
      description: "João Silva realizou uma nova reserva",
      time: "5 minutos atrás"
    },
    {
      icon: <Users className="h-4 w-4 text-green-600" />,
      title: "Novo Usuário Registrado",
      description: "Maria Oliveira criou uma conta",
      time: "30 minutos atrás"
    },
    {
      icon: <Home className="h-4 w-4 text-purple-600" />,
      title: "Atualização de Hospedagem",
      description: "Pousada Vista Mar teve preço ajustado",
      time: "2 horas atrás"
    },
    {
      icon: <PackagePlus className="h-4 w-4 text-amber-600" />,
      title: "Novo Pacote Criado",
      description: "Pacote Família em Noronha foi adicionado",
      time: "4 horas atrás"
    }
  ];

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>
          Últimas ações na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            icon={activity.icon}
            title={activity.title}
            description={activity.description}
            time={activity.time}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
