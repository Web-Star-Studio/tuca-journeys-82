import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AccommodationHero from "@/components/accommodation/AccommodationHero";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";
import { getAmenityIcon } from "@/utils/accommodationUtils";
import { useAccommodations } from "@/hooks/use-accommodations";

const Hospedagens = () => {
  
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // State for filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [capacityFilter, setCapacityFilter] = useState<number[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  
  // Get all available amenities for filtering
  const commonAmenities = [
    "Wi-Fi", 
    "Ar-condicionado", 
    "Café da manhã", 
    "Piscina", 
    "Cozinha equipada", 
    "TV",
    "Estacionamento"
  ];
  
  // Get accommodations with the useAccommodations hook
  const { 
    accommodations, 
    isLoading, 
    error, 
    filters,
    applyFilters: applyAccommodationFilters,
    priceRange 
  } = useAccommodations();
  
  // Handler to toggle capacity filter
  const toggleCapacityFilter = (capacity: number) => {
    if (capacityFilter.includes(capacity)) {
      setCapacityFilter(capacityFilter.filter(item => item !== capacity));
    } else {
      setCapacityFilter([...capacityFilter, capacity]);
    }
  };
  
  // Handler to toggle amenity filter
  const toggleAmenityFilter = (amenity: string) => {
    if (amenitiesFilter.includes(amenity)) {
      setAmenitiesFilter(amenitiesFilter.filter(item => item !== amenity));
    } else {
      setAmenitiesFilter([...amenitiesFilter, amenity]);
    }
  };
  
  // Apply filters function
  const applyFilters = () => {
    applyAccommodationFilters({
      minPrice: minPrice,
      maxPrice: maxPrice,
      type: typeFilter
    });
    console.log("Applying filters:", {
      minPrice,
      maxPrice,
      capacityFilter,
      amenitiesFilter
    });
  };
  
  // Reset filters function
  const resetFilters = () => {
    setMinPrice(priceRange?.min || 0);
    setMaxPrice(priceRange?.max || 3000);
    setCapacityFilter([]);
    setAmenitiesFilter([]);
    setTypeFilter("all");
    applyAccommodationFilters({
      minPrice: null,
      maxPrice: null,
      type: "all"
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AccommodationHero />

        {/* Accommodations content */}
        <section className="section-padding py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <AccommodationFilters
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                getAmenityIcon={getAmenityIcon}
                minPrice={minPrice}
                maxPrice={maxPrice}
                capacityFilter={capacityFilter}
                amenitiesFilter={amenitiesFilter}
                allAmenities={commonAmenities}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                toggleCapacityFilter={toggleCapacityFilter}
                toggleAmenityFilter={toggleAmenityFilter}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                priceRange={priceRange}
              />

              <AccommodationsGrid 
                isLoading={isLoading} 
                accommodations={accommodations || []} 
                error={error}
              />
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Hospedagens;
