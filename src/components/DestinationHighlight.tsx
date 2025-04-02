
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Camera, Umbrella, Fish } from "lucide-react";

const DestinationHighlight = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-tuca-light-blue to-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Conheça o Paraíso Brasileiro
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fernando de Noronha é um arquipélago vulcânico situado a 354 km da costa do estado de Pernambuco. 
              Com águas cristalinas, biodiversidade marinha exuberante e praias deslumbrantes, o local é 
              considerado Patrimônio Natural da Humanidade pela UNESCO.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium">21 Praias</h3>
                  <p className="text-sm text-muted-foreground">Cada uma com sua beleza única</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium">10+ Mirantes</h3>
                  <p className="text-sm text-muted-foreground">Vistas panorâmicas incríveis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Umbrella className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Clima Perfeito</h3>
                  <p className="text-sm text-muted-foreground">Temperatura média de 28°C</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-tuca-ocean-blue/10 flex items-center justify-center">
                  <Fish className="h-6 w-6 text-tuca-ocean-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Vida Marinha</h3>
                  <p className="text-sm text-muted-foreground">Golfinhos, tartarugas e mais</p>
                </div>
              </div>
            </div>
            
            <Link to="/sobre">
              <Button 
                className="rounded-full px-8 py-6 bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white transition-all duration-300 group"
                size="lg"
              >
                <span>Descubra Mais</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Right image grid */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[500px]">
              <div className="col-span-7 row-span-6 rounded-xl overflow-hidden">
                <img
                  src="/hero-noronha-beach.jpg"
                  alt="Praia de Noronha"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-3 rounded-xl overflow-hidden">
                <img
                  src="/hero-noronha-sunset.jpg"
                  alt="Pôr do sol em Noronha"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 row-span-3 rounded-xl overflow-hidden">
                <img
                  src="/hero-noronha-aerial.jpg"
                  alt="Vista aérea de Noronha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationHighlight;
