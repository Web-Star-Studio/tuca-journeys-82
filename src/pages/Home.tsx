
import React from "react";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import FeaturedTours from "@/components/FeaturedTours";
import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import FeaturedEvents from "@/components/FeaturedEvents";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import BookingCTA from "@/components/BookingCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureHighlights />
        <FeaturedTours />
        <FeaturedAccommodations />
        <FeaturedEvents />
        <Testimonials />
        <BookingCTA />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
