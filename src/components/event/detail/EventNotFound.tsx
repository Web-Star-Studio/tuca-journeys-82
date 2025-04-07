
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EventNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
      <p className="mb-6">O evento que você está procurando não existe.</p>
      <Button onClick={() => navigate("/eventos")}>Voltar para Eventos</Button>
    </div>
  );
};

export default EventNotFound;
