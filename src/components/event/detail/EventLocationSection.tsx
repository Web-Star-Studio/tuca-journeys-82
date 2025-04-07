
import React from "react";
import EventLocation from "@/components/event/EventLocation";

interface EventLocationSectionProps {
  location: string;
}

const EventLocationSection = ({ location }: EventLocationSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Localização</h2>
      <EventLocation location={location} />
    </div>
  );
};

export default EventLocationSection;
