
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRestaurants } from "@/hooks/use-restaurants";
import RestaurantFilters from "@/components/restaurant/RestaurantFilters";
import RestaurantsGrid from "@/components/restaurant/RestaurantsGrid";

const Restaurants = () => {
  const { restaurants = [], isLoading } = useRestaurants();
  const [filters, setFilters] = useState({
    cuisineType: "",
    priceRange: "",
    rating: 0,
    searchQuery: ""
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Restaurantes em Fernando de Noronha</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Descubra os melhores restaurantes e experiências gastronômicas da ilha
            </p>
          </div>

          <RestaurantFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
          <RestaurantsGrid 
            restaurants={restaurants}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
