
interface TestimonialDotsProps {
  testimonials: Array<any>;
  activeIndex: number;
  onClick: (index: number) => void;
}

const TestimonialDots = ({ testimonials, activeIndex, onClick }: TestimonialDotsProps) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {testimonials.map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === activeIndex
              ? "bg-tuca-ocean-blue w-10"
              : "bg-tuca-ocean-blue/30 hover:bg-tuca-ocean-blue/50"
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default TestimonialDots;
