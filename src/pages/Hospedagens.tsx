
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAccommodations } from "@/hooks/use-accommodations";
import AccommodationHero from "@/components/accommodation/AccommodationHero";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";

const Hospedagens = () => {
  const { accommodations = [], isLoading } = useAccommodations();
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    capacityFilter: 2,
    amenitiesFilter: [],
    typeFilter: [],
    sortOrder: "price_asc",
    searchQuery: "",
    bedroomsFilter: 1,
    bathroomsFilter: 1,
    locationFilter: "",
    dateFilter: null,
    featuredOnly: false,
    ratingFilter: 0
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <AccommodationHero />
        <div className="container mx-auto py-12 px-4 md:px-6">
          <AccommodationFilters 
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            capacityFilter={filters.capacityFilter}
            amenitiesFilter={filters.amenitiesFilter}
            typeFilter={filters.typeFilter}
            sortOrder={filters.sortOrder}
            searchQuery={filters.searchQuery}
            bedroomsFilter={filters.bedroomsFilter}
            bathroomsFilter={filters.bathroomsFilter}
            locationFilter={filters.locationFilter}
            dateFilter={filters.dateFilter}
            featuredOnly={filters.featuredOnly}
            ratingFilter={filters.ratingFilter}
            onFilterChange={setFilters}
          />
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
