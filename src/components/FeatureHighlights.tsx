
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./features/FeatureCard";
import { features } from "./features/FeatureData";

const FeatureHighlights = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Por Que Nos Escolher</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubra o que torna a Tuca Noronha a melhor opção para sua viagem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
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
