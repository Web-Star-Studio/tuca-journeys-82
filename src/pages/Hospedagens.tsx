
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
    applyFilters,
    priceRange 
  } = useAccommodations();
  
  // State for filters that will be applied to the database query
  const [minPrice, setMinPrice] = useState(priceRange?.min || 0);
  const [maxPrice, setMaxPrice] = useState(priceRange?.max || 3000);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [capacityFilter, setCapacityFilter] = useState<number[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  
  // Update local state when price range is fetched
  useEffect(() => {
    if (priceRange) {
      setMinPrice(priceRange.min);
      setMaxPrice(priceRange.max);
    }
  }, [priceRange]);
  
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
  
  // Apply filters function - this now applies filters to the database query
  const applyAllFilters = () => {
    // Determine max guests based on capacity filter
    const maxGuests = capacityFilter.length > 0 ? Math.max(...capacityFilter) : null;
    
    applyFilters({
      minPrice: minPrice,
      maxPrice: maxPrice,
      type: typeFilter,
      amenities: amenitiesFilter,
      maxGuests: maxGuests
    });
  };
  
  // Reset filters function
  const resetFilters = () => {
    setMinPrice(priceRange?.min || 0);
    setMaxPrice(priceRange?.max || 3000);
    setCapacityFilter([]);
    setAmenitiesFilter([]);
    setTypeFilter("all");
    
    applyFilters({
      minPrice: null,
      maxPrice: null,
      type: "all",
      amenities: [],
      maxGuests: null
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
                applyFilters={applyAllFilters}
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
