
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, LifeBuoy, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-tuca-ocean-blue" />,
    title: "Experiências Exclusivas",
    description: "Acesso a passeios e atividades únicas, desenvolvidas especialmente para nossos clientes."
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-tuca-ocean-blue" />,
    title: "Suporte Personalizado",
    description: "Atendimento dedicado 24/7 durante toda a sua viagem para resolver qualquer necessidade."
  },
  {
    icon: <Calendar className="h-8 w-8 text-tuca-ocean-blue" />,
    title: "Flexibilidade Total",
    description: "Opções de remarcação e cancelamento para garantir sua tranquilidade no planejamento."
  },
  {
    icon: <Shield className="h-8 w-8 text-tuca-ocean-blue" />,
    title: "Compromisso Ambiental",
    description: "Passeios e acomodações selecionados com foco na preservação do ecossistema local."
  }
];

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
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 p-4 rounded-full bg-tuca-light-blue shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
