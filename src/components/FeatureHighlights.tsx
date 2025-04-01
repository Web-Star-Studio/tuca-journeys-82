
import React from "react";
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
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-center mb-4">Por Que Nos Escolher</h2>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          Descubra o que torna a Tuca Noronha a melhor opção para sua viagem
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 p-4 rounded-full bg-tuca-light-blue">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
