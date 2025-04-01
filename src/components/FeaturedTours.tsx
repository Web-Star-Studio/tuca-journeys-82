
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/tour/TourCard";
import { tours } from "@/data/tours";
import { ArrowRight } from "lucide-react";

// Tour categories for filtering
const categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico"];

const FeaturedTours = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Get featured tours or filter by category
  const filteredTours = tours.filter(tour => {
    if (activeCategory === "Todos") return tour.featured;
    return tour.category === activeCategory && tour.featured;
  });

  return (
    <section className="section-padding bg-tuca-sand">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-4">Passeios Imperdíveis</h2>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          Descubra as experiências mais incríveis de Fernando de Noronha
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "default" : "outline"}
              className={
                category === activeCategory
                  ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                  : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {filteredTours.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/passeios" className="inline-flex items-center text-tuca-ocean-blue hover:text-tuca-ocean-blue/80 transition-colors group">
            <span className="text-lg font-medium">Ver Todos os Passeios</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
