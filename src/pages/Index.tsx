
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import DestinationHighlight from "@/components/DestinationHighlight";
import FeaturedTours from "@/components/FeaturedTours";
import BookingCTA from "@/components/BookingCTA";
import FeaturedPackages from "@/components/FeaturedPackages";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import InstagramFeed from "@/components/InstagramFeed";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import AnimatedSections from "@/components/layout/AnimatedSections";
import AnimatedSection from "@/components/layout/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <AnimatedSections>
          <AnimatedSection>
            <FeatureHighlights />
          </AnimatedSection>
          
          <AnimatedSection>
            <DestinationHighlight />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedTours />
          </AnimatedSection>
          
          {/* Featured Events section now has more prominence */}
          <AnimatedSection>
            <FeaturedEvents />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedAccommodations />
          </AnimatedSection>
          
          <AnimatedSection>
            <BookingCTA />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedPackages />
          </AnimatedSection>
          
          <AnimatedSection>
            <Testimonials />
          </AnimatedSection>
          
          <AnimatedSection>
            <ContactCTA />
          </AnimatedSection>
          
          <AnimatedSection>
            <InstagramFeed />
          </AnimatedSection>
        </AnimatedSections>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
