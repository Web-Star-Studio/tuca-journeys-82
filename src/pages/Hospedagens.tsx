
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AccommodationHero from "@/components/accommodation/AccommodationHero";
import AccommodationFilters from "@/components/accommodation/AccommodationFilters";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";
import { getAmenityIcon } from "@/utils/accommodationUtils";

const Hospedagens = () => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
              />

              <AccommodationsGrid />
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
