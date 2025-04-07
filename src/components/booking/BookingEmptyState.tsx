
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BookingEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 bg-white rounded-lg border">
      <div className="rounded-full bg-tuca-light-blue/50 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Calendar className="h-8 w-8 text-tuca-ocean-blue" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma reserva encontrada</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6 px-4">
        Você ainda não possui nenhuma reserva. Que tal explorar nossas opções de passeios e hospedagens?
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={() => navigate('/tours')}
          className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
        >
          Ver Passeios
        </Button>
        <Button 
          onClick={() => navigate('/hospedagens')}
          variant="outline"
          className="border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-light-blue/50"
        >
          Ver Hospedagens
        </Button>
      </div>
    </div>
  );
};

export default BookingEmptyState;
