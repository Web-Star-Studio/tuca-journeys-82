
import React from "react";
import { Accommodation } from "@/types/database";
import AccommodationsLoading from "./AccommodationsLoading";
import AccommodationsEmpty from "./AccommodationsEmpty";
import AccommodationItem from "./AccommodationItem";

interface AccommodationsListProps {
  accommodations: Accommodation[];
  isLoading: boolean;
}

const AccommodationsList = ({ accommodations, isLoading }: AccommodationsListProps) => {
  if (isLoading) {
    return <AccommodationsLoading />;
  }

  if (accommodations.length === 0) {
    return <AccommodationsEmpty />;
  }

  return (
    <div className="grid gap-4">
      {accommodations.map((accommodation) => (
        <AccommodationItem 
          key={accommodation.id} 
          accommodation={accommodation} 
        />
      ))}
    </div>
  );
};

export default AccommodationsList;
