
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AccommodationHero from "@/components/accommodation/AccommodationHero";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";
import { getAmenityIcon } from "@/utils/accommodationUtils";

// Import accommodations data
import { accommodations, Accommodation } from "@/data/accommodations";

const Hospedagens = () => {
  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodations);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [capacityFilter, setCapacityFilter] = useState<number[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique amenities from all accommodations
  const allAmenities = Array.from(
    new Set(accommodations.flatMap((accommodation) => accommodation.amenities))
  ).sort();

  // Filter accommodations based on criteria
  const applyFilters = () => {
    const filtered = accommodations.filter((accommodation) => {
      // Price filter
      if (accommodation.price < minPrice || accommodation.price > maxPrice) return false;

      // Capacity filter
      if (capacityFilter.length > 0 && !capacityFilter.includes(accommodation.capacity)) return false;

      // Amenities filter
      if (
        amenitiesFilter.length > 0 &&
        !amenitiesFilter.every((amenity) =>
          accommodation.amenities.includes(amenity)
        )
      ) {
        return false;
      }

      return true;
    });

    setFilteredAccommodations(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setCapacityFilter([]);
    setAmenitiesFilter([]);
    setFilteredAccommodations(accommodations);
  };

  // Toggle capacity filter
  const toggleCapacityFilter = (capacity: number) => {
    if (capacityFilter.includes(capacity)) {
      setCapacityFilter(capacityFilter.filter((c) => c !== capacity));
    } else {
      setCapacityFilter([...capacityFilter, capacity]);
    }
  };

  // Toggle amenity filter
  const toggleAmenityFilter = (amenity: string) => {
    if (amenitiesFilter.includes(amenity)) {
      setAmenitiesFilter(amenitiesFilter.filter((a) => a !== amenity));
    } else {
      setAmenitiesFilter([...amenitiesFilter, amenity]);
    }
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
                minPrice={minPrice}
                maxPrice={maxPrice}
                capacityFilter={capacityFilter}
                amenitiesFilter={amenitiesFilter}
                allAmenities={allAmenities}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                toggleCapacityFilter={toggleCapacityFilter}
                toggleAmenityFilter={toggleAmenityFilter}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                getAmenityIcon={getAmenityIcon}
              />

              <AccommodationsGrid
                filteredAccommodations={filteredAccommodations}
                resetFilters={resetFilters}
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
