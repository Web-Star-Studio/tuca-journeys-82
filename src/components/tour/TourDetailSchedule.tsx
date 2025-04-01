
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { Tour } from "@/data/tours";

interface TourDetailScheduleProps {
  tour: Tour;
}

const TourDetailSchedule = ({ tour }: TourDetailScheduleProps) => {
  return (
    <div>
      <h3 className="text-xl font-serif font-bold mb-4">Cronograma</h3>
      <ul className="space-y-3">
        {tour.schedule.map((item, index) => (
          <li key={index} className="flex items-start border-b pb-3 last:border-0">
            <Clock className="h-5 w-5 text-tuca-ocean-blue mr-2 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourDetailSchedule;
