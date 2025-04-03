
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";

const BookingBackground = () => {
  return (
    <>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue opacity-90 mix-blend-multiply z-10" />
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="/hero-noronha-sunset.jpg"
          alt="Fernando de Noronha sunset"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-20 h-20 md:w-40 md:h-40 bg-tuca-coral rounded-full opacity-20 filter blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 md:w-60 md:h-60 bg-tuca-light-blue rounded-full opacity-20 filter blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </>
  );
};

export default BookingBackground;
