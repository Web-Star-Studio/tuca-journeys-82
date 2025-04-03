
import React from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const sectionItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div variants={sectionItemVariants}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
