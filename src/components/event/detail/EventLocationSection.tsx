
import React from "react";
import { MapPin } from "lucide-react";

interface EventLocationSectionProps {
  location: string;
}

const EventLocationSection = ({ location }: EventLocationSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-tuca-ocean-blue" />
        Local do Evento
      </h3>
      
      <div className="rounded-md overflow-hidden border h-64">
        {/* In a real app, we'd integrate with Google Maps or another mapping service */}
        {/* For now, we'll use a placeholder */}
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="font-medium">{location}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Fernando de Noronha, PE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLocationSection;
