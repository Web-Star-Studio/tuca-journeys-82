
import React from "react";
import { useParams } from "react-router-dom";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAccommodation } from "@/hooks/use-accommodations";
import AvailabilityCalendar from "@/components/partner/accommodations/AvailabilityCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AccommodationAvailability = () => {
  const { id } = useParams<{ id: string }>();
  const accommodationId = Number(id);
  const { data: accommodation, isLoading } = useAccommodation(accommodationId);

  if (isLoading) {
    return (
      <PartnerLayout pageTitle="Gerenciando disponibilidade">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PartnerLayout>
    );
  }

  if (!accommodation) {
    return (
      <PartnerLayout pageTitle="Hospedagem não encontrada">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-muted-foreground">
            Hospedagem não encontrada ou você não tem permissão para acessá-la.
          </p>
          <Button asChild>
            <Link to="/parceiro/hospedagens">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para hospedagens
            </Link>
          </Button>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout pageTitle="Gerenciar disponibilidade">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/parceiro/hospedagens">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para hospedagens
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Disponibilidade: {accommodation.title}
          </h1>
          <p className="text-muted-foreground">
            Gerencie a disponibilidade e preços para esta hospedagem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <AvailabilityCalendar accommodationId={accommodationId} />
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informações da hospedagem</CardTitle>
                <CardDescription>Detalhes sobre esta acomodação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Tipo</h3>
                  <p className="text-sm text-muted-foreground">{accommodation.type}</p>
                </div>
                <div>
                  <h3 className="font-medium">Preço padrão</h3>
                  <p className="text-sm text-muted-foreground">R$ {accommodation.price_per_night} por noite</p>
                </div>
                <div>
                  <h3 className="font-medium">Capacidade</h3>
                  <p className="text-sm text-muted-foreground">{accommodation.max_guests} hóspedes</p>
                </div>
                <div>
                  <h3 className="font-medium">Configuração</h3>
                  <p className="text-sm text-muted-foreground">{accommodation.bedrooms} quartos, {accommodation.bathrooms} banheiros</p>
                </div>
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-sm text-muted-foreground">{accommodation.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default AccommodationAvailability;
