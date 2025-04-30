
import React from "react";

interface EventHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const EventHero = ({ title, subtitle, backgroundImage = "/hero-noronha-sunset.jpg" }: EventHeroProps) => {
  return (
    <div 
      className="relative pt-24 pb-32 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${backgroundImage}')`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
