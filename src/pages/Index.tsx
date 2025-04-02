
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import FeaturedPackages from "@/components/FeaturedPackages";
import FeaturedTours from "@/components/FeaturedTours";
import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import Testimonials from "@/components/Testimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import InstagramFeed from "@/components/InstagramFeed";
import ContactCTA from "@/components/ContactCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingCTA from "@/components/BookingCTA";
import DestinationHighlight from "@/components/DestinationHighlight";

const Index = () => {
  // Staggered animation for page sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const sectionItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="space-y-0" // Remove default spacing and let each section handle its own padding
        >
          <motion.div variants={sectionItemVariants}>
            <FeatureHighlights />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <DestinationHighlight />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <FeaturedPackages />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <BookingCTA />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <FeaturedTours />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <FeaturedAccommodations />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <Testimonials />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <FeaturedProducts />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <InstagramFeed />
          </motion.div>
          
          <motion.div variants={sectionItemVariants}>
            <ContactCTA />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
