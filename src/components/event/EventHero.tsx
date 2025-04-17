
import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface EventHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const EventHero = ({ title, subtitle, backgroundImage }: EventHeroProps) => {
  return (
    <section className="relative">
      <div 
        className="h-[50vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('${backgroundImage}')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 animate-fade-in">
              {title}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
              {subtitle}
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 animate-fade-in delay-200">
              <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Filtrar por data</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Explorar locais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
