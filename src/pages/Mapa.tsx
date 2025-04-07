
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/map/MapView";
import MapFilters from "@/components/map/MapFilters";
import { MapFilterProvider } from "@/contexts/MapFilterContext";

const Mapa = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-20">
        <MapFilterProvider>
          <div className="relative h-[calc(100vh-80px)]">
            <MapFilters />
            <MapView />
          </div>
        </MapFilterProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Mapa;
