
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccommodationGrid from "@/components/accommodation/AccommodationGrid";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import { useAccommodations } from "@/hooks/use-accommodations";

const Hospedagens = () => {
  const { accommodations = [], isLoading } = useAccommodations();
  
  // Define proper filter types
  const [filters, setFilters] = useState({
    priceRange: [0, 5000] as number[], // Explicitly typed as number[]
    amenities: [] as string[],
    guests: 1,
    bedrooms: 0,
    bathrooms: 0,
    types: [] as string[],
    searchQuery: '',
  });
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Hospedagens em Fernando de Noronha</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Encontre o lugar perfeito para sua estadia neste paraíso tropical
            </p>
          </div>

          <AccommodationFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <AccommodationGrid 
            accommodations={accommodations}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hospedagens;
