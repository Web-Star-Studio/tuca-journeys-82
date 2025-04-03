
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, MapPin, Globe } from "lucide-react";

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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalUsers}</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
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
      
      <Card>
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Taxa de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{conversionRate}%</div>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMetricsCards;
