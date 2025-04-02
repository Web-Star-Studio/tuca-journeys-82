
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
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Header />
      <main className="w-full">
        <HeroSection />
        <div className="container mx-auto px-4">
          <FeatureHighlights />
          <DestinationHighlight />
          <FeaturedPackages />
          <BookingCTA />
          <FeaturedTours />
          <FeaturedAccommodations />
          <Testimonials />
          <FeaturedProducts />
          <InstagramFeed />
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
