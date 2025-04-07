
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/map/MapView";
import MapFilters from "@/components/map/MapFilters";
import { MapFilterProvider } from "@/contexts/MapFilterContext";
import PageContainer from "@/components/layout/PageContainer";

const Mapa = () => {
  return (
    <PageContainer>
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-tuca-deep-blue">
            Mapa de Fernando de Noronha
          </h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Explore a ilha de Fernando de Noronha através do nosso mapa interativo.
            Descubra praias incríveis, pontos turísticos, restaurantes, hospedagens
            e eventos em toda a ilha. Use os filtros para encontrar exatamente o que procura.
          </p>
        </div>

        <MapFilterProvider>
          <div className="relative h-[calc(100vh-220px)] md:h-[calc(100vh-240px)]">
            <MapFilters />
            <MapView />
          </div>
        </MapFilterProvider>
      </main>
      <Footer />
    </PageContainer>
  );
};

export default Mapa;
