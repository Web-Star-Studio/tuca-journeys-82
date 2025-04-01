
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Star } from "lucide-react";
import { packages } from "@/data/packages";

const FeaturedPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  
  // Select featured packages (first 3)
  const featuredPackages = packages.slice(0, 3);

  return (
    <section className="section-padding bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">Pacotes em Destaque</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Selecionamos os melhores pacotes para sua experiência em Fernando de Noronha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredPackage === pkg.id ? "scale-110" : ""
                  }`}
                />
                <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                  A partir de R$ {pkg.price.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pkg.days} dias</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pkg.persons} {pkg.persons === 1 ? 'pessoa' : 'pessoas'}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="text-sm">{pkg.rating}</span>
                  </div>
                </div>

                <Link to={`/pacotes`}>
                  <Button className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/pacotes">
            <Button
              variant="outline"
              className="border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
            >
              Ver Todos os Pacotes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
