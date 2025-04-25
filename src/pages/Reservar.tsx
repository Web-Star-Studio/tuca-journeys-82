
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";
import { events } from "@/data/events";
import TourGrid from "@/components/tour/TourGrid";
import AccommodationsGrid from "@/components/accommodation/AccommodationsGrid";
import EventsGrid from "@/components/event/EventsGrid";

const Reservar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Faça sua Reserva</h1>
          
          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tours">Passeios</TabsTrigger>
              <TabsTrigger value="accommodations">Hospedagens</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tours">
              <TourGrid tours={tours} />
            </TabsContent>
            
            <TabsContent value="accommodations">
              <AccommodationsGrid 
                filteredAccommodations={accommodations}
                resetFilters={() => {}}
                onSortChange={() => {}}
                sortBy="priceAsc"
              />
            </TabsContent>
            
            <TabsContent value="events">
              <EventsGrid events={events} isLoading={false} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservar;
