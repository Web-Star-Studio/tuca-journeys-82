
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccommodations } from "@/hooks/use-accommodations";
import AccommodationHero from "@/components/accommodation/AccommodationHero";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";

const Hospedagens = () => {
  const { accommodations = [], isLoading } = useAccommodations();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <AccommodationHero />
        <div className="container mx-auto py-12 px-4 md:px-6">
          <AccommodationFilters />
          <AccommodationsGrid 
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
