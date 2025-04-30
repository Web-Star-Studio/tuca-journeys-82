
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAccommodation } from "@/hooks/use-accommodations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const AccommodationAvailability = () => {
  const { id } = useParams<{ id: string }>();
  const accommodationId = id ? parseInt(id) : undefined;
  
  // Get accommodation details
  const { accommodation, isLoading, error } = useAccommodation(accommodationId);
  
  if (isLoading) {
    return (
      <AdminLayout pageTitle="Carregando disponibilidade...">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error || !accommodation) {
    return (
      <AdminLayout pageTitle="Erro ao carregar hospedagem">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Hospedagem não encontrada</h3>
          <p className="text-red-600 mt-2">Não foi possível carregar os detalhes da hospedagem.</p>
          <Button asChild className="mt-4">
            <Link to="/admin/accommodations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para listagem
            </Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle={`Disponibilidade - ${accommodation.title}`}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <h3 className="font-medium mb-3">Detalhes da Hospedagem</h3>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {accommodation.id}</p>
                  <p><strong>Nome:</strong> {accommodation.title}</p>
                  <p><strong>Tipo:</strong> {accommodation.type}</p>
                  <p><strong>Preço por noite:</strong> R$ {accommodation.price_per_night.toFixed(2)}</p>
                  <p><strong>Avaliação:</strong> {accommodation.rating || "Sem avaliações"}</p>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="font-medium mb-3">Calendário de Disponibilidade</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground mb-4">
                    A implementação do calendário será feita no próximo sprint. Por enquanto, 
                    este é um placeholder para visualizar a disponibilidade para reservas.
                  </p>
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    onSelect={() => {}}
                    className="border rounded-md"
                    locale={ptBR}
                    footer={
                      <div className="text-center text-sm text-muted-foreground">
                        {format(new Date(), "MMMM yyyy", { locale: ptBR })}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AccommodationAvailability;
