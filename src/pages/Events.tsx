
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event/EventHero";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import EventsGrid from "@/components/event/EventsGrid";
import { events, categories } from "@/data/events";
import { Button } from "@/components/ui/button";
import { CalendarRange } from "lucide-react";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);

  // Simulate a loading state for better UX demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter events by category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "Todas" || event.category === activeCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Events to display with pagination
  const displayedEvents = filteredEvents.slice(0, displayCount);
  
  const handleLoadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 6, filteredEvents.length));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <EventHero 
          title="Eventos em Fernando de Noronha"
          subtitle="Descubra experiências únicas e memoráveis no paraíso. De workshops gastronômicos a festivais de música, há sempre algo especial acontecendo na ilha."
          backgroundImage="/hero-noronha-sunset.jpg"
        />
        
        {/* Content Section */}
        <section className="py-12 md:py-16 lg:py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            {/* Search and Filter */}
            <EventSearchFilter 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={activeCategory}  
              setSelectedCategory={setActiveCategory}
              // These are optional props that will be used by the component
              activeCategory={activeCategory}
              categories={categories}
              onSearchChange={setSearchQuery}
              onCategoryChange={setActiveCategory}
            />
            
            {/* Calendar Section Promo */}
            <div className="mb-12 bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue rounded-xl p-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center">
                  <CalendarRange className="h-10 w-10 mr-4 opacity-90" />
                  <div>
                    <h3 className="text-xl font-medium">Calendário de Eventos</h3>
                    <p className="text-white/90">Consulte nosso calendário completo para planejar sua visita</p>
                  </div>
                </div>
                <Button className="bg-white text-tuca-deep-blue hover:bg-white/90 px-6">
                  Ver Calendário
                </Button>
              </div>
            </div>
            
            {/* Events Grid */}
            <EventsGrid events={displayedEvents} isLoading={isLoading} />
            
            {/* Load More Button */}
            {!isLoading && displayCount < filteredEvents.length && (
              <div className="mt-10 text-center">
                <Button 
                  variant="outline" 
                  className="border-tuca-ocean-blue text-tuca-ocean-blue hover:bg-tuca-light-blue"
                  onClick={handleLoadMore}
                >
                  Carregar Mais Eventos
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Subscription Banner */}
        <section className="py-12 px-4 bg-tuca-light-blue">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Não perca nenhum evento!</h2>
            <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter para receber atualizações sobre novos eventos e promoções exclusivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="px-4 py-2 rounded-lg border border-gray-300 flex-grow"
              />
              <Button>Inscrever-se</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
