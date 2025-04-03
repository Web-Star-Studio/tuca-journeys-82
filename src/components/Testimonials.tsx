
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SafeImage from "@/components/ui/safe-image";

// Updated testimonials data with correct image paths
const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    image: "/testimonial-1.jpg",
    comment:
      "A viagem com a Tuca Noronha superou todas as minhas expectativas! O atendimento foi impecável desde o primeiro contato, e os passeios sugeridos foram perfeitos para o que eu buscava.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos e Juliana",
    image: "/testimonial-2.jpg",
    comment:
      "Planejamos nossa lua de mel com a Tuca Noronha e foi a melhor decisão. Cada detalhe foi pensado com carinho, desde a pousada com vista para o mar até os passeios românticos.",
    rating: 5,
  },
  {
    id: 3,
    name: "Família Oliveira",
    image: "/testimonial-3.jpg",
    comment:
      "Viajar com crianças pode ser desafiador, mas a equipe da Tuca facilitou tudo! Roteiros adaptados para as crianças, hospedagem confortável e atendimento personalizado.",
    rating: 4,
  },
  {
    id: 4,
    name: "Patricia Mendes",
    image: "/testimonial-4.jpg",
    comment:
      "Sou viajante solo e me preocupava com a logística, mas a Tuca Noronha cuidou de tudo. Me senti segura e aproveitei cada momento nesse paraíso!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setAutoplay(false);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setAutoplay(false);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [autoplay]);

  // Animation variants
  const testimonialVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 lg:py-32 bg-tuca-light-blue relative overflow-hidden">
      <motion.div 
        className="absolute right-0 top-0 w-96 h-96 bg-tuca-light-green rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{zIndex: 0}}
      />
      <motion.div 
        className="absolute left-0 bottom-0 w-96 h-96 bg-tuca-sand rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/3"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
        style={{zIndex: 0}}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-5">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experiências autênticas de quem já viveu a magia de Fernando de Noronha com a Tuca
          </p>
        </motion.div>

        <div className="flex justify-center items-center mt-12 mb-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="mr-4 bg-white rounded-full shadow-md hover:bg-gray-100 hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6 text-tuca-ocean-blue" />
          </Button>

          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl max-w-4xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={testimonialVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                <div className="shrink-0">
                  <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-tuca-ocean-blue">
                    <AvatarImage 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                    />
                    <AvatarFallback>{testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[activeIndex].rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill={
                          i < testimonials[activeIndex].rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-5 text-lg">
                    "{testimonials[activeIndex].comment}"
                  </blockquote>
                  <div className="font-serif font-bold text-xl text-tuca-deep-blue">
                    {testimonials[activeIndex].name}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="ml-4 bg-white rounded-full shadow-md hover:bg-gray-100 hidden md:flex"
          >
            <ChevronRight className="h-6 w-6 text-tuca-ocean-blue" />
          </Button>
        </div>

        <div className="flex justify-center md:hidden space-x-4 mt-6 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-tuca-ocean-blue" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-tuca-ocean-blue" />
          </Button>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setAutoplay(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-tuca-ocean-blue w-10"
                  : "bg-tuca-ocean-blue/30 hover:bg-tuca-ocean-blue/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
