
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BookingEmptyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-tuca-light-blue rounded-full p-4 mb-4">
            <Calendar className="h-8 w-8 text-tuca-ocean-blue" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhuma reserva encontrada</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Você ainda não possui reservas. Explore nossos passeios e hospedagens 
            para começar a planejar sua viagem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link to="/passeios">Ver Passeios</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/hospedagens">Ver Hospedagens</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingEmptyState;
