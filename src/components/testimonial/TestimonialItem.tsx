
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialItemProps {
  testimonial: {
    id: number;
    name: string;
    image: string;
    comment: string;
    rating: number;
  };
}

const TestimonialItem = ({ testimonial }: TestimonialItemProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="shrink-0">
        <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-tuca-ocean-blue">
          <AvatarImage 
            src={testimonial.image} 
            alt={testimonial.name} 
          />
          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill={
                i < testimonial.rating
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>
        <blockquote className="text-gray-700 italic mb-5 text-lg">
          "{testimonial.comment}"
        </blockquote>
        <div className="font-serif font-bold text-xl text-tuca-deep-blue">
          {testimonial.name}
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
