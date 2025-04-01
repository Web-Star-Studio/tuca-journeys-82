
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample testimonials data
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

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="section-padding bg-tuca-light-blue relative overflow-hidden">
      <div 
        className="absolute right-0 top-0 w-64 h-64 bg-tuca-light-green rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3"
        style={{zIndex: 0}}
      />
      <div 
        className="absolute left-0 bottom-0 w-64 h-64 bg-tuca-sand rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/3"
        style={{zIndex: 0}}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">O Que Nossos Clientes Dizem</h2>
        <p className="section-subtitle">
          Experiências autênticas de quem já viveu a magia de Fernando de Noronha com a Tuca
        </p>

        <div className="flex justify-center items-center mt-12 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="mr-4 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-tuca-ocean-blue" />
          </Button>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl max-w-3xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="shrink-0">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-tuca-ocean-blue"
                />
              </div>
              <div>
                <div className="flex mb-2">
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
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonials[activeIndex].comment}"
                </blockquote>
                <div className="font-serif font-bold text-lg">
                  {testimonials[activeIndex].name}
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="ml-4 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-tuca-ocean-blue" />
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-tuca-ocean-blue w-8"
                  : "bg-tuca-ocean-blue/30"
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
