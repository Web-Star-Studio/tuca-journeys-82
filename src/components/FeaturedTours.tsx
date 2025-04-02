
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/tour/TourCard";
import { tours } from "@/data/tours";
import { ArrowRight } from "lucide-react";

// Tour categories for filtering
const categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico"];

const FeaturedTours = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Get featured tours or filter by category
  const filteredTours = tours.filter(tour => {
    if (activeCategory === "Todos") return tour.featured;
    return tour.category === activeCategory && tour.featured;
  });

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
    <section className="py-24 lg:py-32 bg-tuca-sand">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-5">Passeios Imperdíveis</h2>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Descubra as experiências mais incríveis de Fernando de Noronha
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? "default" : "outline"}
              className={
                category === activeCategory
                  ? "rounded-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
                  : "rounded-full text-foreground hover:bg-background hover:text-tuca-ocean-blue"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
        >
          {filteredTours.slice(0, 3).map((tour) => (
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/passeios" className="inline-flex items-center text-tuca-ocean-blue hover:text-tuca-deep-blue transition-colors group">
            <span className="text-lg font-medium">Ver Todos os Passeios</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTours;
