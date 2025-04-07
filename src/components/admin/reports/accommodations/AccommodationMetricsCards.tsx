
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Star, Calendar, PercentCircle, DollarSign } from "lucide-react";

interface AccommodationMetricsCardsProps {
  totalAccommodations: number;
  avgOccupancy: number;
  avgRating: number;
  totalReservations: number;
  avgPricePerNight: number;
}

const AccommodationMetricsCards = ({
  totalAccommodations,
  avgOccupancy,
  avgRating,
  totalReservations,
  avgPricePerNight,
}: AccommodationMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="bg-blue-100 p-2 rounded-full mb-3">
            <Home className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm text-blue-700 font-medium">Total de Hospedagens</p>
          <h4 className="text-2xl font-bold text-blue-800">{totalAccommodations}</h4>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="bg-green-100 p-2 rounded-full mb-3">
            <PercentCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm text-green-700 font-medium">Taxa de Ocupação</p>
          <h4 className="text-2xl font-bold text-green-800">{avgOccupancy.toFixed(1)}%</h4>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="bg-yellow-100 p-2 rounded-full mb-3">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-700 font-medium">Avaliação Média</p>
          <h4 className="text-2xl font-bold text-yellow-800">{avgRating.toFixed(1)}</h4>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="bg-purple-100 p-2 rounded-full mb-3">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-sm text-purple-700 font-medium">Total de Reservas</p>
          <h4 className="text-2xl font-bold text-purple-800">{totalReservations}</h4>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="p-4 flex flex-col items-center">
          <div className="bg-red-100 p-2 rounded-full mb-3">
            <DollarSign className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-sm text-red-700 font-medium">Diária Média</p>
          <h4 className="text-2xl font-bold text-red-800">R$ {avgPricePerNight}</h4>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccommodationMetricsCards;
