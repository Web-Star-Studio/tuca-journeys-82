
import React from "react";

interface ActivityHeroProps {
  title: string;
  subtitle: string;
}

const ActivityHero = ({ title, subtitle }: ActivityHeroProps) => {
  return (
    <div className="relative bg-tuca-ocean-blue/90 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{title}</h1>
        <p className="text-xl max-w-2xl mx-auto">{subtitle}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default ActivityHero;
