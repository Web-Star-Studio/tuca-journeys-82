
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourDetailInfoProps {
  tour: Tour;
}

const TourDetailInfo = ({ tour }: TourDetailInfoProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-4">Sobre este passeio</h2>
        <p className="text-gray-700">{tour.description}</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-serif font-bold mb-4">O que está incluído</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Incluso:</h4>
            <ul className="space-y-2">
              {tour.inclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Não incluso:</h4>
            <ul className="space-y-2">
              {tour.exclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xl font-serif font-bold mb-4">Informações importantes</h3>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-blue-600 mb-2">O que levar e requisitos</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {tour.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailInfo;
