
import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useTour } from "@/hooks/use-tours";
import TourAvailabilityCalendar from "@/components/admin/tours/TourAvailabilityCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TourAvailability = () => {
  // Pegar o ID do passeio da URL
  const { id } = useParams<{ id: string }>();
  const tourId = id ? parseInt(id) : undefined;
  
  // Buscar dados do passeio
  const { data: tour, isLoading, error } = useTour(tourId);

  if (isLoading) {
    return (
      <AdminLayout pageTitle="Carregando...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tuca-ocean-blue"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !tour) {
    return (
      <AdminLayout pageTitle="Erro">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <h2 className="font-bold mb-2">Erro ao carregar passeio</h2>
          <p>{error?.message || "Passeio não encontrado"}</p>
          <div className="mt-4">
            <Link to="/admin/tours">
              <Button variant="outline">Voltar para Passeios</Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle={`Disponibilidade: ${tour.title}`}>
      <div className="mb-6 flex items-center">
        <Link to="/admin/tours" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{tour.title}</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TourAvailabilityCalendar tourId={tourId} />
        </div>

        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Passeio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Capacidade</h3>
                  <p>{tour.max_participants} pessoas</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Preço Padrão</h3>
                  <p>R$ {tour.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duração</h3>
                  <p>{tour.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Categoria</h3>
                  <p>{tour.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TourAvailability;
