
import { motion } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";

// Array of hero images for rotation with high-quality free-to-use images
const heroImages = [
  "/hero-noronha-beach.jpg",
  "/hero-noronha-aerial.jpg",
  "/hero-noronha-sunset.jpg",
];

type HeroBackgroundProps = {
  currentImageIndex: number;
  scrollProgress: number;
};

const HeroBackground = ({ currentImageIndex, scrollProgress }: HeroBackgroundProps) => {
  // Preload all hero images
  const preloadImages = () => {
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Preload images on component mount
  React.useEffect(() => {
    preloadImages();
  }, []);

  return (
    <>
      {/* Background Image Slider with Parallax */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
              y: scrollProgress * -100 // Parallax effect
            }}
            transition={{ 
              opacity: { duration: 1.5 },
              scale: { duration: 7 }
            }}
          >
            <SafeImage
              src={image}
              alt={`Fernando de Noronha - Scene ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ width: "100vw", height: "100vh" }}
              fallbackSrc="/placeholder.svg"
            />
          </motion.div>
        ))}
      </div>

      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10 w-full h-full" />
      
      {/* Abstract shapes for visual interest */}
      <div className="absolute right-0 top-1/4 w-48 h-48 rounded-full bg-tuca-ocean-blue/20 blur-3xl z-10 animate-pulse" />
      <div className="absolute left-10 bottom-1/4 w-40 h-40 rounded-full bg-tuca-coral/20 blur-3xl z-10 animate-pulse" 
           style={{ animationDelay: "1s" }} />
    </>
  );
};

export default HeroBackground;
export { heroImages };
