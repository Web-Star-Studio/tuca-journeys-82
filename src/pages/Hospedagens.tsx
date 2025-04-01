
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
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Wind, Coffee, Pool, Users, Bed, Bath, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";

// Import accommodations data
import { accommodations, Accommodation } from "@/data/accommodations";

const Hospedagens = () => {
  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodations);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [capacityFilter, setCapacityFilter] = useState<number[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique amenities from all accommodations
  const allAmenities = Array.from(
    new Set(accommodations.flatMap((accommodation) => accommodation.amenities))
  ).sort();

  // Filter accommodations based on criteria
  const applyFilters = () => {
    const filtered = accommodations.filter((accommodation) => {
      // Price filter
      if (accommodation.price < minPrice || accommodation.price > maxPrice) return false;

      // Capacity filter
      if (capacityFilter.length > 0 && !capacityFilter.includes(accommodation.capacity)) return false;

      // Amenities filter
      if (
        amenitiesFilter.length > 0 &&
        !amenitiesFilter.every((amenity) =>
          accommodation.amenities.includes(amenity)
        )
      ) {
        return false;
      }

      return true;
    });

    setFilteredAccommodations(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setCapacityFilter([]);
    setAmenitiesFilter([]);
    setFilteredAccommodations(accommodations);
  };

  // Toggle capacity filter
  const toggleCapacityFilter = (capacity: number) => {
    if (capacityFilter.includes(capacity)) {
      setCapacityFilter(capacityFilter.filter((c) => c !== capacity));
    } else {
      setCapacityFilter([...capacityFilter, capacity]);
    }
  };

  // Toggle amenity filter
  const toggleAmenityFilter = (amenity: string) => {
    if (amenitiesFilter.includes(amenity)) {
      setAmenitiesFilter(amenitiesFilter.filter((a) => a !== amenity));
    } else {
      setAmenitiesFilter([...amenitiesFilter, amenity]);
    }
  };

  // Get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wi-Fi":
        return <Wifi className="h-3 w-3" />;
      case "Ar-condicionado":
        return <Wind className="h-3 w-3" />;
      case "Café da manhã":
        return <Coffee className="h-3 w-3" />;
      case "Piscina":
      case "Piscina privativa":
        return <Pool className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero section for Accommodations page */}
        <section className="relative">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-noronha-3.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hospedagens em Fernando de Noronha</h1>
                <p className="text-xl max-w-2xl mx-auto">
                  Descubra as melhores opções de estadia para uma experiência completa na ilha.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodations content */}
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
                        Filtrar Hospedagens
                      </span>
                      <span>{isFilterOpen ? "−" : "+"}</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 p-4 border rounded-md">
                    {/* Filter content for mobile */}
                    <div className="space-y-6">
                      {/* Price range filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Faixa de Preço (por noite)</h3>
                        <div className="mb-6">
                          <Slider
                            defaultValue={[minPrice, maxPrice]}
                            max={3000}
                            step={50}
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

                      {/* Capacity filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Capacidade</h3>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 4, 6, 8].map((capacity) => (
                            <Button
                              key={capacity}
                              variant={capacityFilter.includes(capacity) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleCapacityFilter(capacity)}
                              className={capacityFilter.includes(capacity) ? "bg-tuca-ocean-blue" : ""}
                            >
                              {capacity} {capacity === 1 ? "pessoa" : "pessoas"}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Amenities filter */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Comodidades</h3>
                        <div className="flex flex-wrap gap-2">
                          {allAmenities.map((amenity) => (
                            <Button
                              key={amenity}
                              variant={amenitiesFilter.includes(amenity) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleAmenityFilter(amenity)}
                              className={amenitiesFilter.includes(amenity) ? "bg-tuca-ocean-blue" : ""}
                            >
                              {amenity}
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
                    <h3 className="text-lg font-medium mb-3">Faixa de Preço (por noite)</h3>
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      max={3000}
                      step={50}
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

                  {/* Capacity filter */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Capacidade</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 4, 6, 8].map((capacity) => (
                        <Button
                          key={capacity}
                          variant={capacityFilter.includes(capacity) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleCapacityFilter(capacity)}
                          className={capacityFilter.includes(capacity) ? "bg-tuca-ocean-blue" : ""}
                        >
                          {capacity} {capacity === 1 ? "pessoa" : "pessoas"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities filter */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Comodidades</h3>
                    <div className="flex flex-col gap-2">
                      {allAmenities.map((amenity) => (
                        <Button
                          key={amenity}
                          variant={amenitiesFilter.includes(amenity) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleAmenityFilter(amenity)}
                          className={`justify-start ${amenitiesFilter.includes(amenity) ? "bg-tuca-ocean-blue" : ""}`}
                        >
                          {getAmenityIcon(amenity) && (
                            <span className="mr-2">{getAmenityIcon(amenity)}</span>
                          )}
                          {amenity}
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

              {/* Accommodations grid */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif font-bold">
                    {filteredAccommodations.length} Hospedagens Disponíveis
                  </h2>
                  <div className="hidden md:block">
                    <select className="py-2 px-4 border rounded-md">
                      <option value="priceAsc">Menor Preço</option>
                      <option value="priceDesc">Maior Preço</option>
                      <option value="ratingDesc">Melhor Avaliação</option>
                      <option value="capacityAsc">Menor Capacidade</option>
                      <option value="capacityDesc">Maior Capacidade</option>
                    </select>
                  </div>
                </div>

                {filteredAccommodations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAccommodations.map((accommodation) => (
                      <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={accommodation.image}
                            alt={accommodation.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 bg-tuca-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                            R$ {accommodation.price.toLocaleString('pt-BR')}/noite
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="font-serif">{accommodation.title}</CardTitle>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{accommodation.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{accommodation.location}</span>
                          </div>
                          <CardDescription>{accommodation.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                              <Users className="h-4 w-4 text-gray-500 mb-1" />
                              <span className="text-xs text-center">{accommodation.capacity} pessoas</span>
                            </div>
                            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                              <Bed className="h-4 w-4 text-gray-500 mb-1" />
                              <span className="text-xs text-center">{accommodation.bedrooms} quartos</span>
                            </div>
                            <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                              <Bath className="h-4 w-4 text-gray-500 mb-1" />
                              <span className="text-xs text-center">{accommodation.bathrooms} banheiros</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {accommodation.amenities.slice(0, 4).map((amenity) => (
                              <Badge key={amenity} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {accommodation.amenities.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{accommodation.amenities.length - 4}
                              </Badge>
                            )}
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
                    <h3 className="text-xl font-medium mb-2">Nenhuma hospedagem encontrada</h3>
                    <p className="text-gray-500 mb-6">
                      Nenhuma hospedagem corresponde aos filtros selecionados. Por favor, ajuste seus filtros.
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

export default Hospedagens;
