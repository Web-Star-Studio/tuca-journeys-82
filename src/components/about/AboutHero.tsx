
import React from "react";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-tuca-deep-blue text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue opacity-90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Sobre a Tuca Noronha
          </h1>
          <p className="text-lg md:text-xl">
            Somos especialistas em criar experiências inesquecíveis em
            Fernando de Noronha, com a dedicação e o cuidado que você merece.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
