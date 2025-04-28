
import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAccommodation } from "@/hooks/use-accommodations";
import AccommodationAvailabilityCalendar from "@/components/admin/accommodations/AccommodationAvailabilityCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AccommodationAvailability = () => {
  // Pegar o ID da hospedagem da URL
  const { id } = useParams<{ id: string }>();
  const accommodationId = id ? parseInt(id) : undefined;
  
  // Buscar dados da hospedagem
  const { data: accommodation, isLoading, error } = useAccommodation(accommodationId);

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Carregando...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tuca-ocean-blue"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !accommodation) {
    return (
      <AdminLayout pageTitle="Erro">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <h2 className="font-bold mb-2">Erro ao carregar hospedagem</h2>
          <p>{error?.message || "Hospedagem não encontrada"}</p>
          <div className="mt-4">
            <Link to="/admin/accommodations">
              <Button variant="outline">Voltar para Hospedagens</Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle={`Disponibilidade: ${accommodation.title}`}>
      <div className="mb-6 flex items-center">
        <Link to="/admin/accommodations" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{accommodation.title}</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AccommodationAvailabilityCalendar accommodationId={accommodationId} />
        </div>

        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Hospedagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Capacidade</h3>
                  <p>{accommodation.max_guests} hóspedes</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Preço Padrão</h3>
                  <p>R$ {accommodation.price_per_night.toFixed(2)} por noite</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                  <p>{accommodation.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Quartos</h3>
                  <p>{accommodation.bedrooms} quartos, {accommodation.bathrooms} banheiros</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccommodationAvailability;
