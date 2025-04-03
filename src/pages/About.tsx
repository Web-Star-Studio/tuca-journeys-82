
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import OurTeam from "@/components/about/OurTeam";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <OurValues />
        <OurTeam />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
