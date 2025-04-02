
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./features/FeatureCard";
import { features } from "./features/FeatureData";

const FeatureHighlights = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">Por Que Nos Escolher</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra o que torna a Tuca Noronha a melhor opção para sua viagem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
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
