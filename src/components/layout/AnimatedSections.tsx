
import React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionsProps {
  children: React.ReactNode;
}

const AnimatedSections = ({ children }: AnimatedSectionsProps) => {
  // Staggered animation for page sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div 
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="space-y-0" // Remove default spacing and let each section handle its own padding
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSections;
