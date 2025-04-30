import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import DestinationHighlight from "@/components/DestinationHighlight";
import FeaturedTours from "@/components/FeaturedTours";
import BookingCTA from "@/components/BookingCTA";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedPackages from "@/components/FeaturedPackages";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import InstagramFeed from "@/components/InstagramFeed";
import FeaturedEvents from "@/components/FeaturedEvents";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <FeatureHighlights />
        <DestinationHighlight />
        <FeaturedTours />
        <FeaturedEvents />
        <FeaturedAccommodations />
        <BookingCTA />
        <FeaturedProducts />
        <FeaturedPackages />
        <Testimonials />
        <ContactCTA />
        <InstagramFeed />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
