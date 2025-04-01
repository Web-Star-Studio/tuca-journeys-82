
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const BookingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Pronto para sua experiência em Noronha?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Reserve suas atividades e hospedagem com antecedência e garanta uma viagem sem preocupações.
          </p>
          <Button 
            onClick={() => navigate("/reservar")}
            className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white px-8 py-6 text-lg rounded-full"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            Fazer Reserva
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
