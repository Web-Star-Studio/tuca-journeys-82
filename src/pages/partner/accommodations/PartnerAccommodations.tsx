
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import AccommodationsList from "@/components/partner/accommodations/AccommodationsList";
import { useAccommodations } from "@/hooks/use-accommodations";
import { useCurrentPartner } from "@/hooks/use-partner";

const PartnerAccommodations = () => {
  const { data: partner } = useCurrentPartner();
  const { accommodations, isLoading } = useAccommodations();

  // Filter accommodations for current partner
  const partnerAccommodations = accommodations?.filter(
    (acc) => acc.partner_id === partner?.id
  );

  return (
    <PartnerLayout pageTitle="Minhas Hospedagens">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Minhas Hospedagens</h1>
          <p className="text-muted-foreground">
            Gerencie suas acomodações e disponibilidade
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nova Hospedagem
        </Button>
      </div>
      
      <AccommodationsList 
        accommodations={partnerAccommodations || []}
        isLoading={isLoading}
      />
    </PartnerLayout>
  );
};

export default PartnerAccommodations;
