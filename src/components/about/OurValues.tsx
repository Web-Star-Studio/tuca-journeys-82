
import React from "react";
import { Users, Heart, Map, Award } from "lucide-react";

const OurValues = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center">
          Nossos Valores
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center mb-16">
          Na Tuca Noronha, trabalhamos com princípios sólidos que guiam
          todas as nossas ações e decisões
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
            <div className="bg-tuca-light-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-tuca-ocean-blue h-8 w-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">
              Atendimento Personalizado
            </h3>
            <p className="text-gray-700">
              Cada cliente é único, e por isso oferecemos um atendimento
              personalizado e exclusivo para cada viajante.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
            <div className="bg-tuca-light-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-tuca-green h-8 w-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">
              Paixão por Noronha
            </h3>
            <p className="text-gray-700">
              Amamos o que fazemos e compartilhamos nosso entusiasmo e
              conhecimento sobre Fernando de Noronha.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
            <div className="bg-tuca-sand w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Map className="text-tuca-coral h-8 w-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">
              Conhecimento Local
            </h3>
            <p className="text-gray-700">
              Nossa equipe conhece todos os segredos e melhores momentos para
              aproveitar cada atração da ilha.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
            <div className="bg-tuca-light-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-tuca-deep-blue h-8 w-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">
              Excelência e Qualidade
            </h3>
            <p className="text-gray-700">
              Compromisso com a excelência em todos os serviços, garantindo a
              mais alta qualidade em cada detalhe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
