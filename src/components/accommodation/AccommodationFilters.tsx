
import React from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AccommodationFiltersProps {
  filters: {
    priceRange: number[];
    amenities: any[];
    guests: number;
    bedrooms: number;
    bathrooms: number;
    types: any[];
    searchQuery: string;
  };
  onFilterChange: (filters: any) => void;
}

const AccommodationFilters = ({ filters, onFilterChange }: AccommodationFiltersProps) => {
  // Handler for price range changes
  const handlePriceRangeChange = (values: number[]) => {
    onFilterChange({ ...filters, priceRange: values });
  };

  // Handler for amenities changes
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    let newAmenities = [...filters.amenities];
    
    if (checked) {
      newAmenities.push(amenity);
    } else {
      newAmenities = newAmenities.filter(a => a !== amenity);
    }
    
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  // Handler for accommodation type changes
  const handleTypeChange = (type: string, checked: boolean) => {
    let newTypes = [...filters.types];
    
    if (checked) {
      newTypes.push(type);
    } else {
      newTypes = newTypes.filter(t => t !== type);
    }
    
    onFilterChange({ ...filters, types: newTypes });
  };

  // Handler for search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  // Handler for number-based filters (guests, bedrooms, bathrooms)
  const handleNumericFilterChange = (type: 'guests' | 'bedrooms' | 'bathrooms', value: number) => {
    onFilterChange({ ...filters, [type]: value });
  };

  const amenitiesList = [
    "Wi-Fi", "Ar-condicionado", "Piscina", "Café da manhã", 
    "Estacionamento", "Cozinha", "Vista para o mar", "Churrasqueira"
  ];

  const typesList = [
    "Pousada", "Casa", "Apartamento", "Chalé", "Villa", "Eco-hospedagem"
  ];

  return (
    <Card className="p-6 mb-8 bg-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Buscar</h3>
        <Input
          placeholder="Buscar hospedagens..."
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Faixa de Preço</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span>R$ {filters.priceRange[0]}</span>
          <span>R$ {filters.priceRange[1]}</span>
        </div>
        <Slider
          defaultValue={filters.priceRange}
          min={0}
          max={5000}
          step={100}
          onValueChange={handlePriceRangeChange}
          className="my-4"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Tipo de Hospedagem</h3>
        <div className="grid grid-cols-2 gap-2">
          {typesList.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type}`} 
                checked={filters.types.includes(type)} 
                onCheckedChange={(checked) => handleTypeChange(type, checked === true)}
              />
              <Label htmlFor={`type-${type}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Comodidades</h3>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox 
                id={`amenity-${amenity}`} 
                checked={filters.amenities.includes(amenity)} 
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
              />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="guests">Hóspedes: {filters.guests}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('guests', Math.max(1, filters.guests - 1))}
              disabled={filters.guests <= 1}
            >-</Button>
            <div className="w-full text-center">{filters.guests}</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('guests', filters.guests + 1)}
            >+</Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="bedrooms">Quartos: {filters.bedrooms}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('bedrooms', Math.max(0, filters.bedrooms - 1))}
              disabled={filters.bedrooms <= 0}
            >-</Button>
            <div className="w-full text-center">{filters.bedrooms}</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('bedrooms', filters.bedrooms + 1)}
            >+</Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="bathrooms">Banheiros: {filters.bathrooms}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('bathrooms', Math.max(0, filters.bathrooms - 1))}
              disabled={filters.bathrooms <= 0}
            >-</Button>
            <div className="w-full text-center">{filters.bathrooms}</div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNumericFilterChange('bathrooms', filters.bathrooms + 1)}
            >+</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccommodationFilters;
