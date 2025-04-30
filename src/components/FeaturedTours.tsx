
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFeaturedTours } from "@/hooks/use-featured-tours";
import TourCategorySelector from "@/components/tour/TourCategorySelector";
import FeaturedToursLoading from "@/components/tour/FeaturedToursLoading";
import NoToursFound from "@/components/tour/NoToursFound";
import FeaturedTourGrid from "@/components/tour/FeaturedTourGrid";

const FeaturedTours = () => {
  const {
    activeCategory,
    displayTours,
    isFeaturedLoading,
    handleCategoryChange
  } = useFeaturedTours();

  // Loading state placeholder
  if (isFeaturedLoading) {
    return <FeaturedToursLoading />;
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
        >
          <TourCategorySelector 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {displayTours.length > 0 ? (
          <FeaturedTourGrid tours={displayTours} activeCategory={activeCategory} />
        ) : (
          <NoToursFound 
            category={activeCategory}
            onReset={() => handleCategoryChange("Todos")}
          />
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
