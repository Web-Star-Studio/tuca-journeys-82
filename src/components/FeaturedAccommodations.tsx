
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, MapPin, Users, Bath, Star } from "lucide-react";
import { accommodations } from "@/data/accommodations";

const FeaturedAccommodations = () => {
  const [hoveredAccommodation, setHoveredAccommodation] = useState<number | null>(null);
  
  // Select featured accommodations
  const featuredAccommodations = accommodations.filter(accommodation => accommodation.featured);

  return (
    <section className="section-padding bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Hospedagens em Destaque</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Selecionamos as melhores opções de estadia em Fernando de Noronha para você aproveitar o paraíso com conforto
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredAccommodation(accommodation.id)}
              onMouseLeave={() => setHoveredAccommodation(null)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredAccommodation === accommodation.id ? "scale-110" : ""
                  }`}
                />
                <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                  R$ {accommodation.price.toLocaleString('pt-BR')}/noite
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold">{accommodation.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{accommodation.location}</span>
                </div>

                <p className="text-gray-600 mb-4">{accommodation.description}</p>

                <div className="flex justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{accommodation.capacity} pessoas</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{accommodation.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{accommodation.bathrooms} banheiros</span>
                  </div>
                </div>

                <Link to={`/hospedagens`}>
                  <Button className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hospedagens">
            <Button
              variant="outline"
              className="border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
            >
              Ver Todas as Hospedagens
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAccommodations;
