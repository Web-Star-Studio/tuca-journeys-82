
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/tour/TourCard";
import { ArrowRight } from "lucide-react";
import { useTours } from "@/hooks/use-tours";
import { adaptDBTourToComponentTour } from "@/utils/tourAdapter";
import { Skeleton } from "@/components/ui/skeleton";
import { Tour } from "@/data/tours";

// Tour categories for filtering
const categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico"];

const FeaturedTours = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { featuredTours, isFeaturedLoading } = useTours();
  const [displayTours, setDisplayTours] = useState<Tour[]>([]);
  
  // Process tours when data is loaded or category changes
  useEffect(() => {
    if (!featuredTours) return;
    
    // Convert from DB format to component format
    const componentTours = featuredTours.map(adaptDBTourToComponentTour);
    
    // Filter by category if needed
    if (activeCategory === "Todos") {
      setDisplayTours(componentTours);
    } else {
      setDisplayTours(
        componentTours.filter(tour => 
          tour.category.toLowerCase() === activeCategory.toLowerCase()
        )
      );
    }
  }, [featuredTours, activeCategory]);

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

  // Loading state placeholder
  if (isFeaturedLoading) {
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
              Carregando passeios em destaque...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-6" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
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

        {displayTours.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
          >
            {displayTours.slice(0, 3).map((tour) => (
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
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Nenhum passeio na categoria {activeCategory}</h3>
            <p className="text-muted-foreground mb-6">
              No momento não temos passeios em destaque nesta categoria.
            </p>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => setActiveCategory("Todos")}
            >
              Ver todos os passeios
            </Button>
          </div>
        )}

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
