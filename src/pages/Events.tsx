
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event/EventHero";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import EventsGrid from "@/components/event/EventsGrid";
import { events, categories } from "@/data/events";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events by category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "Todas" || event.category === activeCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <EventHero 
          title="Eventos em Noronha"
          subtitle="Descubra experiências únicas e memoráveis no paraíso"
          backgroundImage="/tour-sunset.jpg"
        />
        
        {/* Events Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            {/* Search and Filter */}
            <EventSearchFilter 
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              categories={categories}
              onSearchChange={setSearchQuery}
              onCategoryChange={setActiveCategory}
            />
            
            {/* Events Grid */}
            <EventsGrid events={filteredEvents} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
