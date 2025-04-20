
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import AccommodationsList from "@/components/partner/accommodations/AccommodationsList";
import { useAccommodations } from "@/hooks/use-accommodations";
import { useCurrentPartner } from "@/hooks/use-partner";
import AccommodationFormDialog from "@/components/partner/accommodations/AccommodationFormDialog";
import { Input } from "@/components/ui/input";

const PartnerAccommodations = () => {
  const { data: partner } = useCurrentPartner();
  const { accommodations, isLoading } = useAccommodations();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter accommodations for current partner
  const filteredAccommodations = accommodations
    ?.filter((acc) => acc.partner_id === partner?.id)
    .filter((acc) => 
      searchTerm === "" || 
      acc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      acc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <PartnerLayout pageTitle="Minhas Hospedagens">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Minhas Hospedagens</h1>
          <p className="text-muted-foreground">
            Gerencie suas acomodações e disponibilidade
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar hospedagens..."
              className="pl-8 w-full md:w-[240px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="h-4 w-4" /> Nova Hospedagem
          </Button>
        </div>
      </div>
      
      <AccommodationsList 
        accommodations={filteredAccommodations || []}
        isLoading={isLoading}
      />

      <AccommodationFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </PartnerLayout>
  );
};

export default PartnerAccommodations;
