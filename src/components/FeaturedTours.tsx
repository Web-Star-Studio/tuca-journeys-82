
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";

// Sample data for tours
const tours = [
  {
    id: 1,
    title: "Passeio de Barco ao Pôr do Sol",
    description: "Navegue pelas águas cristalinas e aprecie o espetacular pôr do sol em Fernando de Noronha.",
    image: "/tour-sunset.jpg",
    price: 350,
    duration: "3 horas",
    rating: 4.9,
    category: "Barco",
  },
  {
    id: 2,
    title: "Mergulho na Baía dos Porcos",
    description: "Explore a vida marinha única da Baía dos Porcos, um dos pontos mais famosos para mergulho.",
    image: "/tour-diving.jpg",
    price: 480,
    duration: "4 horas",
    rating: 5.0,
    category: "Mergulho",
  },
  {
    id: 3,
    title: "Trilha Ecológica Mirante dos Golfinhos",
    description: "Uma trilha com vista panorâmica onde é possível observar golfinhos em seu habitat natural.",
    image: "/tour-trail.jpg",
    price: 200,
    duration: "2 horas",
    rating: 4.7,
    category: "Trilha",
  },
  {
    id: 4,
    title: "Tour de Buggy pela Ilha",
    description: "Explore as principais praias e atrações da ilha com um confortável passeio de buggy.",
    image: "/tour-buggy.jpg",
    price: 550,
    duration: "6 horas",
    rating: 4.8,
    category: "Terrestre",
  },
];

// Tour categories for filtering
const categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre"];

const FeaturedTours = () => {
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
              variant={category === "Todos" ? "default" : "outline"}
              className={
                category === "Todos"
                  ? "bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white"
                  : "text-tuca-ocean-blue border-tuca-ocean-blue hover:bg-tuca-ocean-blue hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid-gallery">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover-scale"
            >
              <div className="relative h-56">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-tuca-green text-white text-xs px-2 py-1 rounded">
                  {tour.category}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-serif font-bold">{tour.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium ml-1">{tour.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="text-tuca-ocean-blue font-bold">
                    R$ {tour.price}
                  </div>
                </div>

                <Link to={`/passeios/${tour.id}`} className="mt-4 block">
                  <Button className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white">
                    Reservar
                  </Button>
                </Link>
              </div>
            </div>
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
