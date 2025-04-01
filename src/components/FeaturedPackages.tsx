
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, Star } from "lucide-react";

// Sample data for packages
const packages = [
  {
    id: 1,
    title: "Escapada Romântica",
    description: "Um pacote perfeito para casais que desejam vivenciar momentos inesquecíveis em Fernando de Noronha.",
    image: "/package-romantic.jpg",
    price: 4899,
    days: 5,
    persons: 2,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Aventura Completa",
    description: "Para os amantes da natureza e aventuras. Inclui trilhas, mergulho e passeios de barco.",
    image: "/package-adventure.jpg",
    price: 5299,
    days: 7,
    persons: 1,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Família em Noronha",
    description: "Pacote ideal para famílias descobrirem as maravilhas de Fernando de Noronha com conforto e segurança.",
    image: "/package-family.jpg",
    price: 9899,
    days: 6,
    persons: 4,
    rating: 4.7,
  },
];

const FeaturedPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Pacotes em Destaque</h2>
        <p className="section-subtitle">
          Selecionamos os melhores pacotes para sua experiência em Fernando de Noronha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
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

                <Link to={`/pacotes/${pkg.id}`}>
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
