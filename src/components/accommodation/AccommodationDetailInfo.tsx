
import React from "react";
import { Users, Bed, Bath } from "lucide-react";
import { Accommodation } from "@/data/accommodations";
import { getAmenityIcon } from "@/utils/accommodationUtils";

interface AccommodationDetailInfoProps {
  accommodation: Accommodation;
}

const AccommodationDetailInfo = ({ accommodation }: AccommodationDetailInfoProps) => {
  return (
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
  );
};

export default AccommodationDetailInfo;
