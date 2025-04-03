
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import SafeImage from "@/components/ui/safe-image";

const BookingContent = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full">
      {/* Content */}
      <motion.div 
        className="max-w-3xl mx-auto text-center relative z-10 py-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-medium mb-6 text-white">
          Pronto para sua experiência em Noronha?
        </h2>
        <p className="text-white/80 mb-10 text-lg max-w-2xl mx-auto">
          Reserve suas atividades e hospedagem com antecedência e garanta uma viagem sem preocupações. Vagas limitadas para preservar o meio ambiente.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => navigate("/reservar")}
            className="bg-white hover:bg-white/90 text-tuca-ocean-blue px-8 py-7 text-lg rounded-full shadow-lg"
            size="lg"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            Fazer Reserva
          </Button>
          
          <Button 
            onClick={() => navigate("/pacotes")}
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-7 text-lg rounded-full"
            size="lg"
          >
            Ver Pacotes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingContent;
