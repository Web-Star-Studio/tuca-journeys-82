
import React from "react";
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
import PageContainer from "@/components/layout/PageContainer";
import AnimatedSections from "@/components/layout/AnimatedSections";
import AnimatedSection from "@/components/layout/AnimatedSection";

const Index = () => {
  return (
    <PageContainer>
      <Header />
      <main className="flex flex-col relative">
        <HeroSection />
        
        <AnimatedSections>
          <AnimatedSection>
            <FeatureHighlights />
          </AnimatedSection>
          
          <AnimatedSection>
            <DestinationHighlight />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedPackages />
          </AnimatedSection>
          
          <AnimatedSection>
            <BookingCTA />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedTours />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedAccommodations />
          </AnimatedSection>
          
          <AnimatedSection>
            <Testimonials />
          </AnimatedSection>
          
          <AnimatedSection>
            <FeaturedProducts />
          </AnimatedSection>
          
          <AnimatedSection>
            <InstagramFeed />
          </AnimatedSection>
          
          <AnimatedSection>
            <ContactCTA />
          </AnimatedSection>
        </AnimatedSections>
      </main>
      <Footer />
    </PageContainer>
  );
};

export default Index;
