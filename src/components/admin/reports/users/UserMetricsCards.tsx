
import React from "react";
import { Users, UserPlus, MapPin, Globe } from "lucide-react";
import MetricCard from "./metrics/MetricCard";

interface UserMetricsCardsProps {
  totalUsers: number;
  totalNewUsers: number;
  totalRegions: number;
  conversionRate: number;
}

const UserMetricsCards = ({ 
  totalUsers, 
  totalNewUsers, 
  totalRegions, 
  conversionRate 
}: UserMetricsCardsProps) => {
  const metrics = [
    {
      title: "Total de Usuários",
      value: totalUsers,
      icon: Users,
      borderColor: "border-l-tuca-ocean-blue",
      iconColor: "text-tuca-ocean-blue",
      gradientFrom: "white",
      gradientTo: "tuca-light-blue/30"
    },
    {
      title: "Novos Usuários",
      value: totalNewUsers,
      icon: UserPlus,
      borderColor: "border-l-blue-500",
      iconColor: "text-blue-500",
      gradientFrom: "white",
      gradientTo: "blue-50"
    },
    {
      title: "Regiões Atendidas",
      value: totalRegions,
      icon: MapPin,
      borderColor: "border-l-red-500",
      iconColor: "text-red-500",
      gradientFrom: "white",
      gradientTo: "red-50"
    },
    {
      title: "Taxa de Conversão",
      value: `${conversionRate}%`,
      icon: Globe,
      borderColor: "border-l-green-500",
      iconColor: "text-green-500",
      gradientFrom: "white",
      gradientTo: "green-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          {...metric}
        />
      ))}
    </div>
  );
};

export default UserMetricsCards;
