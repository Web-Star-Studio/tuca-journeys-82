
import HeroSection from "@/components/HeroSection";
import FeaturedPackages from "@/components/FeaturedPackages";
import FeaturedTours from "@/components/FeaturedTours";
import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import Testimonials from "@/components/Testimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import InstagramFeed from "@/components/InstagramFeed";
import ContactCTA from "@/components/ContactCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPackages />
        <FeaturedAccommodations />
        <FeaturedTours />
        <Testimonials />
        <FeaturedProducts />
        <InstagramFeed />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
