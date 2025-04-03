
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialNavigationProps {
  goToPrevious: () => void;
  goToNext: () => void;
  className?: string;
}

const TestimonialNavigation = ({ 
  goToPrevious, 
  goToNext, 
  className = "" 
}: TestimonialNavigationProps) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="h-5 w-5 text-tuca-ocean-blue" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-tuca-ocean-blue" />
      </Button>
    </div>
  );
};

export default TestimonialNavigation;
