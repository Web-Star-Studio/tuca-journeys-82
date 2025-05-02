
import React from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventNotFound = () => {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-muted/50 p-8 rounded-full">
            <Search className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="mt-6 text-3xl font-bold">Evento não encontrado</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
          O evento que você está procurando não existe ou foi removido.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link to="/eventos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Eventos
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">
              Página Inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventNotFound;
