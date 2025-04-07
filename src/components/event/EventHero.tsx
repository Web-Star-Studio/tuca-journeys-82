
import React from "react";

interface EventHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const EventHero = ({ title, subtitle, backgroundImage }: EventHeroProps) => {
  return (
    <section className="relative">
      <div 
        className="h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{title}</h1>
            <p className="text-xl max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
