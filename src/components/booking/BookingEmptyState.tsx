
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookingEmptyState = () => {
  return (
    <div className="text-center py-12 bg-white rounded-lg border">
      <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma reserva encontrada</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-4">
        Você ainda não possui nenhuma reserva. Que tal explorar nossas opções de passeios e hospedagens?
      </p>
      <Button 
        onClick={() => window.location.href = '/tours'}
        className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90"
      >
        Ver Passeios
      </Button>
    </div>
  );
};

export default BookingEmptyState;
