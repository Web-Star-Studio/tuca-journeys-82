
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, MapPin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-tuca-ocean-blue bg-gradient-to-br from-white to-tuca-light-blue/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalUsers}</div>
            <Users className="h-4 w-4 text-tuca-ocean-blue" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Novos Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalNewUsers}</div>
            <UserPlus className="h-4 w-4 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-white to-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Regiões Atendidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalRegions}</div>
            <MapPin className="h-4 w-4 text-red-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-white to-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Taxa de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{conversionRate}%</div>
            <Globe className="h-4 w-4 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMetricsCards;
