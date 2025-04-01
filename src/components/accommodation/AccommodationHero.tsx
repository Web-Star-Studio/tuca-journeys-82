
import React from "react";

const AccommodationHero = () => {
  return (
    <section className="relative">
      <div
        className="h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-noronha-3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hospedagens em Fernando de Noronha</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Descubra as melhores opções de estadia para uma experiência completa na ilha.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationHero;
