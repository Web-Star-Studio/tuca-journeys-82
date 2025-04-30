
import React from "react";
import { Button } from "@/components/ui/button";
import { TOUR_CATEGORIES } from "./constants";

interface TourCategorySelectorProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const TourCategorySelector = ({ 
  activeCategory, 
  onCategoryChange 
}: TourCategorySelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-14">
      {TOUR_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={category === activeCategory ? "default" : "outline"}
          className={
            category === activeCategory
              ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
              : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default TourCategorySelector;
