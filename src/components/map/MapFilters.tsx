
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import SearchFilter from "./filters/SearchFilter";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import ResetFilters from "./filters/ResetFilters";

const MapFilters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="absolute left-0 right-0 top-0 z-20 p-3 md:p-4">
      <div className="bg-white rounded-lg shadow-lg p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          {/* Barra de pesquisa */}
          <SearchFilter />

          {/* Controles de filtro visíveis em desktop ou quando expandidos em mobile */}
          <div className={`md:flex items-center gap-2 ${isFiltersOpen ? 'flex mt-3 md:mt-0' : 'hidden'}`}>
            {/* Filtro de categoria */}
            <CategoryFilter />
            
            {/* Filtro de preço */}
            <PriceFilter />
            
            {/* Filtro de avaliação */}
            <RatingFilter />

            {/* Botão de reset */}
            <ResetFilters />
          </div>

          {/* Botão de expandir/recolher filtros (apenas em mobile) */}
          <Button
            size="icon"
            variant="outline"
            className="md:hidden ml-auto"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
