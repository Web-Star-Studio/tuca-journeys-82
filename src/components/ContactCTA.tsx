
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="py-16 bg-tuca-deep-blue text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tuca-ocean-blue/20 rounded-full" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-tuca-ocean-blue/20 rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Está Pronto Para Vivenciar o Paraíso?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Entre em contato conosco e planeje sua viagem perfeita para Fernando de Noronha.
            Nossa equipe especializada está pronta para criar uma experiência exclusiva para você.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a 
              href="https://wa.me/5511968008888" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-tuca-coral hover:bg-tuca-coral/90 text-white py-3 px-6 rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">+55 11 96800-8888</span>
            </a>
            
            <a 
              href="mailto:karol@tucanoronha.com.br"
              className="flex items-center justify-center gap-2 bg-white text-tuca-deep-blue hover:bg-gray-100 py-3 px-6 rounded-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">karol@tucanoronha.com.br</span>
            </a>
          </div>
          
          <Link to="/contato">
            <Button className="bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 text-white px-8 py-6 text-lg">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
