
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Check, Clock, Users } from "lucide-react";

interface BookingStats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalVisitors: number;
}

interface BookingsSummaryCardsProps {
  stats: BookingStats;
}

const BookingsSummaryCards = ({ stats }: BookingsSummaryCardsProps) => {
  const { totalBookings, confirmedBookings, pendingBookings, totalVisitors } = stats;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalBookings}</div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Reservas Confirmadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{confirmedBookings}</div>
            <Check className="h-4 w-4 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Reservas Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{pendingBookings}</div>
            <Clock className="h-4 w-4 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Visitantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">{totalVisitors}</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsSummaryCards;
