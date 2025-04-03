
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonialCarousel from "./testimonial/TestimonialCarousel";
import TestimonialDots from "./testimonial/TestimonialDots";
import TestimonialBackground from "./testimonial/TestimonialBackground";
import { testimonials } from "./testimonial/TestimonialData";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

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

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  return (
    <section className="py-24 lg:py-32 bg-tuca-light-blue relative overflow-hidden">
      <TestimonialBackground />
      
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

        <TestimonialCarousel 
          testimonials={testimonials}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setAutoplay={setAutoplay}
        />

        <TestimonialDots 
          testimonials={testimonials}
          activeIndex={activeIndex}
          onClick={handleDotClick}
        />
      </div>
    </section>
  );
};

export default Testimonials;
