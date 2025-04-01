
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { accommodations } from "@/data/accommodations";
import { 
  MapPin, 
  Star, 
  Users, 
  Bed, 
  Bath, 
  ArrowLeft,
  Share2, 
  Heart,
  Calendar 
} from "lucide-react";
import { getAmenityIcon } from "@/utils/accommodationUtils";

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the accommodation by ID
  const accommodation = accommodations.find(
    (acc) => acc.id === Number(id)
  );

  // If accommodation not found, show error
  if (!accommodation) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Hospedagem não encontrada
            </h2>
            <p className="text-gray-600 mb-8">
              A hospedagem solicitada não foi encontrada ou não está mais disponível.
            </p>
            <Button 
              onClick={() => navigate('/hospedagens')}
              className="bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
            >
              Ver outras hospedagens
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 text-gray-600"
              onClick={() => navigate('/hospedagens')}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Hospedagens
            </Button>
          </div>
        </div>

        {/* Accommodation Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                {accommodation.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{accommodation.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{accommodation.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Heart className="h-4 w-4" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Accommodation Images */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden">
            <div className="md:col-span-2 h-80 md:h-[500px] relative">
              <img
                src={accommodation.image}
                alt={accommodation.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4">
              <div className="h-full">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className="w-full h-full object-cover brightness-95"
                />
              </div>
              <div className="h-full">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className="w-full h-full object-cover brightness-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-serif font-bold mb-4">Sobre a hospedagem</h2>
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{accommodation.capacity} pessoas</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <Bed className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{accommodation.bedrooms} {accommodation.bedrooms === 1 ? 'quarto' : 'quartos'}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <Bath className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{accommodation.bathrooms} {accommodation.bathrooms === 1 ? 'banheiro' : 'banheiros'}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  {accommodation.description}
                </p>
                <p className="text-gray-700">
                  Esta é uma hospedagem privilegiada em Fernando de Noronha, com localização estratégica e conforto para garantir a melhor experiência na ilha. Ideal para {accommodation.capacity === 1 ? 'viajantes solo' : (accommodation.capacity === 2 ? 'casais' : 'grupos e famílias')}, oferece uma combinação perfeita de conforto e praticidade para aproveitar o melhor que Noronha tem a oferecer.
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-serif font-bold mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {accommodation.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <span className="mr-2">{getAmenityIcon(amenity)}</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif font-bold mb-4">Localização</h2>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">Mapa de {accommodation.location}</p>
                </div>
                <p className="text-gray-700">
                  Localizada em {accommodation.location}, esta hospedagem oferece fácil acesso às principais atrações da ilha. A região conta com praias deslumbrantes, restaurantes e infraestrutura para garantir uma estadia tranquila e agradável.
                </p>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">
                      R$ {accommodation.price.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-gray-500 text-sm">por noite</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{accommodation.rating}</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-4">Selecione as datas</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="border rounded p-2 text-sm">
                      <p className="text-gray-500">Check-in</p>
                      <p>Selecione</p>
                    </div>
                    <div className="border rounded p-2 text-sm">
                      <p className="text-gray-500">Check-out</p>
                      <p>Selecione</p>
                    </div>
                  </div>
                  <div className="border rounded p-2 text-sm mb-4">
                    <p className="text-gray-500">Hóspedes</p>
                    <p>1 hóspede</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <p>R$ {accommodation.price.toLocaleString('pt-BR')} x 5 noites</p>
                    <p>R$ {(accommodation.price * 5).toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Taxa de limpeza</p>
                    <p>R$ 150</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Taxa de serviço</p>
                    <p>R$ 200</p>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold">
                    <p>Total</p>
                    <p>R$ {(accommodation.price * 5 + 350).toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                <Button className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white flex items-center justify-center gap-2 mb-4">
                  <Calendar className="h-4 w-4" />
                  Reservar agora
                </Button>
                
                <p className="text-sm text-center text-gray-500">
                  Você não será cobrado ainda
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
