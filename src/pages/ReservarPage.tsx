
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";
import { ArrowRight, Hotel, Compass, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ReservarPage = () => {
  // Get featured items for each category
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 3);
  const featuredAccommodations = accommodations.filter(acc => acc.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  Reserve Sua Experiência em Noronha
                </h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Escolha entre nossa seleção de hospedagens, passeios e pacotes exclusivos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="py-16 bg-tuca-sand">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hospedagens */}
              <Link 
                to="/hospedagens"
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Hotel className="h-8 w-8 text-tuca-ocean-blue" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-medium mb-2">Hospedagens</h3>
                <p className="text-gray-600">
                  Pousadas, hotéis e casas selecionadas para sua estadia perfeita
                </p>
              </Link>

              {/* Passeios */}
              <Link 
                to="/passeios"
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Compass className="h-8 w-8 text-tuca-ocean-blue" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-medium mb-2">Passeios</h3>
                <p className="text-gray-600">
                  Experiências únicas e inesquecíveis pela ilha
                </p>
              </Link>

              {/* Pacotes */}
              <Link 
                to="/pacotes"
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Package className="h-8 w-8 text-tuca-ocean-blue" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-medium mb-2">Pacotes</h3>
                <p className="text-gray-600">
                  Combinações especiais de hospedagem e passeios
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Tours */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-medium mb-8">Passeios em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredTours.map(tour => (
                <div key={tour.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{tour.title}</h3>
                    <p className="text-gray-600 mb-4">{tour.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-tuca-ocean-blue font-bold">
                        R$ {tour.price.toLocaleString('pt-BR')}
                      </span>
                      <Link to={`/passeios/${tour.id}`}>
                        <Button>Ver Detalhes</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/passeios">
                <Button variant="outline" size="lg">
                  Ver Todos os Passeios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Accommodations */}
        <section className="py-16 bg-tuca-sand">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-medium mb-8">Hospedagens em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredAccommodations.map(acc => (
                <div key={acc.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <img 
                    src={acc.image} 
                    alt={acc.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{acc.title}</h3>
                    <p className="text-gray-600 mb-4">{acc.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-tuca-ocean-blue font-bold">
                        R$ {acc.price.toLocaleString('pt-BR')}
                        <span className="text-sm text-gray-500">/noite</span>
                      </span>
                      <Link to={`/hospedagens/${acc.id}`}>
                        <Button>Ver Detalhes</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/hospedagens">
                <Button variant="outline" size="lg">
                  Ver Todas as Hospedagens
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReservarPage;
