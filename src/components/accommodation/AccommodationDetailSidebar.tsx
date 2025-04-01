
import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Calendar } from "lucide-react";
import { Accommodation } from "@/data/accommodations";

interface AccommodationDetailSidebarProps {
  accommodation: Accommodation;
}

const AccommodationDetailSidebar = ({ accommodation }: AccommodationDetailSidebarProps) => {
  return (
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
  );
};

export default AccommodationDetailSidebar;
