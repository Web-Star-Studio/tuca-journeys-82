
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Star, ArrowRight } from "lucide-react";
import { getFeaturedPackages } from "@/data/packages";

const FeaturedPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  
  // Get featured packages using our helper function
  const featuredPackages = getFeaturedPackages(3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-4">Pacotes em Destaque</h2>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-14">
          Experiências cuidadosamente planejadas para sua viagem perfeita em Fernando de Noronha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover-scale"
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredPackage === pkg.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium">{pkg.title}</h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 line-clamp-2">{pkg.description}</p>

                <div className="flex flex-wrap items-center mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center mr-6 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{pkg.days} dias</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{pkg.persons} {pkg.persons === 1 ? 'pessoa' : 'pessoas'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-tuca-ocean-blue">
                    <span className="text-sm">A partir de</span>
                    <p className="text-xl font-medium">R$ {pkg.price.toLocaleString('pt-BR')}</p>
                  </div>
                  <Link to={`/pacotes/${pkg.id}`}>
                    <Button className="rounded-full bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/pacotes" className="inline-flex items-center text-tuca-ocean-blue hover:text-tuca-ocean-blue/80 transition-colors group">
            <span className="text-lg font-medium">Ver Todos os Pacotes</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
