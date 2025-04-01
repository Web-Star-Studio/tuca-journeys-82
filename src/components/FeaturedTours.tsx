
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/tour/TourCard";
import { tours } from "@/data/tours";

// Tour categories for filtering
const categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico", "Aventura", "Workshop", "Cultural"];

const FeaturedTours = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Get featured tours or filter by category
  const filteredTours = tours.filter(tour => {
    if (activeCategory === "Todos") return tour.featured;
    return tour.category === activeCategory && tour.featured;
  });

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Passeios Imperdíveis</h2>
        <p className="section-subtitle">
          Descubra as melhores experiências em Fernando de Noronha com nossos guias especializados
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "default" : "outline"}
              className={
                category === activeCategory
                  ? "bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                  : "text-tuca-ocean-blue border-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/passeios">
            <Button
              variant="outline"
              className="border-tuca-coral text-tuca-coral hover:bg-tuca-coral hover:text-white"
            >
              Ver Todos os Passeios
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
