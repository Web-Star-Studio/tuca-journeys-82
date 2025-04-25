
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowLeft, Share2, Heart } from "lucide-react";

// Make the component accept any accommodation type to avoid type errors
interface AccommodationDetailHeaderProps {
  accommodation: any;
}

const AccommodationDetailHeader = ({ accommodation }: AccommodationDetailHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
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
    </>
  );
};

export default AccommodationDetailHeader;
