
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventHero from "@/components/event/EventHero";
import EventSearchFilter from "@/components/event/EventSearchFilter";
import EventsGrid from "@/components/event/EventsGrid";
import { Button } from "@/components/ui/button";
import { CalendarRange, Filter } from "lucide-react";
import { useEventSearch } from "@/hooks/events/use-event-search";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/event-service";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

const EventsList = () => {
  // Fetch categories
  const { data: categories = ['Todas'], isLoading: categoriesLoading } = useQuery({
    queryKey: ['events', 'categories'],
    queryFn: () => eventService.getEventCategories(),
  });

  // Initialize search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Use our event search hook
  const {
    events,
    isLoading,
    updateFilters,
    pagination,
    filters
  } = useEventSearch({
    searchQuery: '',
    category: 'Todas',
  });

  // Update filters when inputs change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateFilters({ searchQuery: query });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters({ category });
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    if (range) {
      setDateRange(range);
      updateFilters({
        startDate: range.from ? format(range.from, 'yyyy-MM-dd') : undefined,
        endDate: range.to ? format(range.to, 'yyyy-MM-dd') : undefined
      });
    } else {
      setDateRange({ from: undefined, to: undefined });
      updateFilters({ startDate: undefined, endDate: undefined });
    }
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    updateFilters({
      minPrice: values[0],
      maxPrice: values[1]
    });
  };

  const handleLoadMore = () => {
    pagination.setPage(pagination.page + 1);
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
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[280px]">
                <EventSearchFilter 
                  searchQuery={searchQuery}
                  setSearchQuery={handleSearchChange}
                  selectedCategory={selectedCategory}  
                  setSelectedCategory={handleCategoryChange}
                  categories={categories}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtrar Eventos</SheetTitle>
                    <SheetDescription>
                      Refine sua busca para encontrar o evento perfeito
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Faixa de Preço</h3>
                    <Slider 
                      defaultValue={[0, 1000]} 
                      max={1000} 
                      step={10}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>R$ {priceRange[0].toFixed(2).replace('.', ',')}</span>
                      <span>R$ {priceRange[1].toFixed(2).replace('.', ',')}</span>
                    </div>

                    <Separator className="my-6" />
                    
                    <h3 className="font-medium mb-3">Datas</h3>
                    <div className="mt-2">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={handleDateRangeChange}
                        locale={ptBR}
                        showOutsideDays
                        className="mx-auto"
                      />
                    </div>
                    
                    <div className="mt-6 flex justify-between text-sm">
                      <span>
                        {dateRange.from ? format(dateRange.from, 'dd/MM/yyyy') : 'Qualquer data'}
                      </span>
                      <span>
                        {dateRange.to ? format(dateRange.to, 'dd/MM/yyyy') : ''}
                      </span>
                    </div>

                    <Button 
                      onClick={() => {
                        setDateRange({ from: undefined, to: undefined });
                        setPriceRange([0, 1000]);
                        updateFilters({
                          minPrice: undefined,
                          maxPrice: undefined,
                          startDate: undefined,
                          endDate: undefined
                        });
                      }}
                      variant="outline" 
                      className="w-full mt-6"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
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
            <EventsGrid events={events} isLoading={isLoading} />
            
            {/* Load More Button */}
            {!isLoading && pagination.page < pagination.totalPages && (
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

export default EventsList;
