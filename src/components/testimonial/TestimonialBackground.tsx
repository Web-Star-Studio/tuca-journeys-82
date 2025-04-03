
import { motion } from "framer-motion";

const TestimonialBackground = () => {
  return (
    <>
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
    </>
  );
};

export default TestimonialBackground;
