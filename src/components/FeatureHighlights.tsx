
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./features/FeatureCard";
import { features } from "./features/FeatureData";

const FeatureHighlights = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">Por Que Nos Escolher</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra o que torna a Tuca Noronha a melhor opção para sua viagem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
