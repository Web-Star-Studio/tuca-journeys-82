
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { accommodations } from "@/data/accommodations";
import AccommodationCard from "./accommodation/AccommodationCard";

const FeaturedAccommodations = () => {
  const [hoveredAccommodation, setHoveredAccommodation] = useState<number | null>(null);
  
  // Select featured accommodations
  const featuredAccommodations = accommodations.filter(accommodation => accommodation.featured).slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-4">Hospedagens Exclusivas</h2>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          Opções selecionadas para uma estadia perfeita em Fernando de Noronha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {featuredAccommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hospedagens" className="inline-flex items-center text-tuca-ocean-blue hover:text-tuca-ocean-blue/80 transition-colors group">
            <span className="text-lg font-medium">Ver Todas as Hospedagens</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAccommodations;
