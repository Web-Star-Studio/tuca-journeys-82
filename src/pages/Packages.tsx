
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calendar, Users, Clock, Star, Filter } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";

// Import packages data
import { packages } from "@/data/packages";

const Packages = () => {
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [daysFilter, setDaysFilter] = useState<number[]>([]);
  const [personsFilter, setPersonsFilter] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter packages based on criteria
  const applyFilters = () => {
    const filtered = packages.filter((pkg) => {
      // Price filter
      if (pkg.price < minPrice || pkg.price > maxPrice) return false;

      // Days filter
      if (daysFilter.length > 0 && !daysFilter.includes(pkg.days)) return false;

      // Persons filter
      if (personsFilter.length > 0 && !personsFilter.includes(pkg.persons)) return false;

      return true;
    });

    setFilteredPackages(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(15000);
    setDaysFilter([]);
    setPersonsFilter([]);
    setFilteredPackages(packages);
  };

  // Toggle days filter
  const toggleDaysFilter = (days: number) => {
    if (daysFilter.includes(days)) {
      setDaysFilter(daysFilter.filter((d) => d !== days));
    } else {
      setDaysFilter([...daysFilter, days]);
    }
  };

  // Toggle persons filter
  const togglePersonsFilter = (persons: number) => {
    if (personsFilter.includes(persons)) {
      setPersonsFilter(personsFilter.filter((p) => p !== persons));
    } else {
      setPersonsFilter([...personsFilter, persons]);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero section for Packages page */}
        <section className="relative">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Pacotes para Fernando de Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Descubra o paraíso com nossos pacotes exclusivos, cuidadosamente elaborados para proporcionar a melhor experiência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages content */}
        <section className="section-padding py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile filter button */}
              <div className="md:hidden w-full mb-4">
                <Collapsible
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtrar Pacotes
                      </span>
                      <span>{isFilterOpen ? "−" : "+"}</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 p-4 border rounded-md">
                    {/* Filter content for mobile */}
                    <div className="space-y-6">
                      {/* Price range filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Faixa de Preço</h3>
                        <div className="mb-6">
                          <Slider
                            defaultValue={[minPrice, maxPrice]}
                            max={15000}
                            step={100}
                            onValueChange={(value) => {
                              setMinPrice(value[0]);
                              setMaxPrice(value[1]);
                            }}
                            className="my-6"
                          />
                          <div className="flex justify-between">
                            <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
                            <span>R$ {maxPrice.toLocaleString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Duration filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Duração</h3>
                        <div className="flex flex-wrap gap-2">
                          {[3, 4, 5, 6, 7].map((days) => (
                            <Button
                              key={days}
                              variant={daysFilter.includes(days) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleDaysFilter(days)}
                              className={daysFilter.includes(days) ? "bg-tuca-ocean-blue" : ""}
                            >
                              {days} dias
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Persons filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Viajantes</h3>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 4, 6].map((persons) => (
                            <Button
                              key={persons}
                              variant={personsFilter.includes(persons) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePersonsFilter(persons)}
                              className={personsFilter.includes(persons) ? "bg-tuca-ocean-blue" : ""}
                            >
                              {persons} {persons === 1 ? "pessoa" : "pessoas"}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Filter actions */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={applyFilters}
                          className="flex-1 bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
                        >
                          Aplicar Filtros
                        </Button>
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          className="flex-1"
                        >
                          Limpar
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Desktop sidebar filter */}
              <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
                <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-serif font-bold mb-6">Filtros</h2>

                  {/* Price range filter */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Faixa de Preço</h3>
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      max={15000}
                      step={100}
                      onValueChange={(value) => {
                        setMinPrice(value[0]);
                        setMaxPrice(value[1]);
                      }}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
                      <span>R$ {maxPrice.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Duration filter */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Duração</h3>
                    <div className="flex flex-wrap gap-2">
                      {[3, 4, 5, 6, 7].map((days) => (
                        <Button
                          key={days}
                          variant={daysFilter.includes(days) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleDaysFilter(days)}
                          className={daysFilter.includes(days) ? "bg-tuca-ocean-blue" : ""}
                        >
                          {days} dias
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Persons filter */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Viajantes</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 4, 6].map((persons) => (
                        <Button
                          key={persons}
                          variant={personsFilter.includes(persons) ? "default" : "outline"}
                          size="sm"
                          onClick={() => togglePersonsFilter(persons)}
                          className={personsFilter.includes(persons) ? "bg-tuca-ocean-blue" : ""}
                        >
                          {persons} {persons === 1 ? "pessoa" : "pessoas"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Filter actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={applyFilters}
                      className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white"
                    >
                      Aplicar Filtros
                    </Button>
                    <Button
                      onClick={resetFilters}
                      variant="outline"
                      className="w-full"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              </div>

              {/* Packages grid */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif font-bold">
                    {filteredPackages.length} Pacotes Disponíveis
                  </h2>
                  <div className="hidden md:block">
                    <select className="py-2 px-4 border rounded-md">
                      <option value="priceAsc">Menor Preço</option>
                      <option value="priceDesc">Maior Preço</option>
                      <option value="durationAsc">Menor Duração</option>
                      <option value="durationDesc">Maior Duração</option>
                      <option value="ratingDesc">Melhor Avaliação</option>
                    </select>
                  </div>
                </div>

                {filteredPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg) => (
                      <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                            A partir de R$ {pkg.price.toLocaleString('pt-BR')}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="font-serif">{pkg.title}</CardTitle>
                          <CardDescription>{pkg.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="text-sm">{pkg.days} dias</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-sm">
                                {pkg.persons} {pkg.persons === 1 ? 'pessoa' : 'pessoas'}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              <span className="text-sm">{pkg.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue text-white">
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">Nenhum pacote encontrado</h3>
                    <p className="text-gray-500 mb-6">
                      Nenhum pacote corresponde aos filtros selecionados. Por favor, ajuste seus filtros.
                    </p>
                    <Button onClick={resetFilters} variant="outline">
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Packages;
