
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import TourFilters from "@/components/tour/TourFilters";
import TourGrid from "@/components/tour/TourGrid";
import { Tour, tours } from "@/data/tours";

const Tours = () => {
  const [filteredTours, setFilteredTours] = useState(tours);
  const [sortedTours, setSortedTours] = useState(tours);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(700);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("priceAsc");

  // Get unique categories from all tours
  const allCategories = Array.from(
    new Set(tours.map((tour) => tour.category))
  ).sort();

  // Helper function to map duration string to hour range
  const getDurationRange = (duration: string): string => {
    const hours = parseInt(duration.split(" ")[0]);
    if (hours <= 2) return "1-2 horas";
    if (hours <= 4) return "2-4 horas";
    return "4+ horas";
  };

  // Apply sorting to filtered tours
  useEffect(() => {
    const sortTours = (tours: Tour[]) => {
      const sorted = [...tours];
      switch (sortBy) {
        case "priceAsc":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "priceDesc":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "durationAsc":
          sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
          break;
        case "durationDesc":
          sorted.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
          break;
        case "ratingDesc":
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      return sorted;
    };

    setSortedTours(sortTours(filteredTours));
  }, [filteredTours, sortBy]);

  // Filter tours based on criteria
  const applyFilters = () => {
    const filtered = tours.filter((tour) => {
      // Price filter
      if (tour.price < minPrice || tour.price > maxPrice) return false;

      // Category filter
      if (categoryFilter.length > 0 && !categoryFilter.includes(tour.category)) return false;

      // Duration filter
      if (
        durationFilter.length > 0 &&
        !durationFilter.includes(getDurationRange(tour.duration))
      ) {
        return false;
      }

      return true;
    });

    setFilteredTours(filtered);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Reset filters
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(700);
    setCategoryFilter([]);
    setDurationFilter([]);
    setFilteredTours(tours);
  };

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter((c) => c !== category));
    } else {
      setCategoryFilter([...categoryFilter, category]);
    }
  };

  // Toggle duration filter
  const toggleDurationFilter = (duration: string) => {
    if (durationFilter.includes(duration)) {
      setDurationFilter(durationFilter.filter((d) => d !== duration));
    } else {
      setDurationFilter([...durationFilter, duration]);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero section for Tours page */}
        <section className="relative">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-3.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Passeios em Fernando de Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Descubra experiências incríveis na ilha com nossos passeios guiados por especialistas locais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tours content */}
        <section className="section-padding py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <TourFilters
                categories={allCategories}
                selectedCategories={categoryFilter}
                toggleCategoryFilter={toggleCategoryFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                durationFilter={durationFilter}
                toggleDurationFilter={toggleDurationFilter}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />

              <TourGrid
                tours={sortedTours}
                resetFilters={resetFilters}
                onSortChange={handleSortChange}
                sortBy={sortBy}
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

export default Tours;
