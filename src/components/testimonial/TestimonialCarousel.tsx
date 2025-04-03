
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialItem from "./TestimonialItem";
import TestimonialNavigation from "./TestimonialNavigation";

interface TestimonialCarouselProps {
  testimonials: Array<{
    id: number;
    name: string;
    image: string;
    comment: string;
    rating: number;
  }>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setAutoplay: (autoplay: boolean) => void;
}

const TestimonialCarousel = ({ 
  testimonials, 
  activeIndex, 
  setActiveIndex, 
  setAutoplay 
}: TestimonialCarouselProps) => {
  const goToPrevious = () => {
    setActiveIndex(
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1
    );
    setAutoplay(false);
  };

  const goToNext = () => {
    setActiveIndex(
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1
    );
    setAutoplay(false);
  };

  // Animation variants
  const testimonialVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex justify-center items-center mt-12 mb-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="mr-4 bg-white rounded-full shadow-md hover:bg-gray-100 hidden md:flex"
      >
        <ChevronLeft className="h-6 w-6 text-tuca-ocean-blue" />
      </Button>

      <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl max-w-4xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={testimonialVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <TestimonialItem testimonial={testimonials[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="ml-4 bg-white rounded-full shadow-md hover:bg-gray-100 hidden md:flex"
      >
        <ChevronRight className="h-6 w-6 text-tuca-ocean-blue" />
      </Button>
      
      {/* Mobile navigation */}
      <TestimonialNavigation 
        goToPrevious={goToPrevious} 
        goToNext={goToNext} 
        className="justify-center md:hidden absolute bottom-2"
      />
    </div>
  );
};

export default TestimonialCarousel;
