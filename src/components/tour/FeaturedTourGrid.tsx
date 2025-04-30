
import React from "react";
import { motion } from "framer-motion";
import { Tour } from "@/data/tours";
import TourCard from "@/components/tour/TourCard";

interface FeaturedTourGridProps {
  tours: Tour[];
  activeCategory: string;
}

const FeaturedTourGrid = ({ tours, activeCategory }: FeaturedTourGridProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      key={`tour-list-${activeCategory}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
    >
      {tours.slice(0, 3).map((tour) => (
        <motion.div 
          key={tour.id} 
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedTourGrid;
