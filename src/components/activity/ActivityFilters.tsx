
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ActivityFilters as FiltersType } from "@/types/activity";

interface ActivityFiltersProps {
  categories: string[];
  difficultyLevels: string[];
  filters: FiltersType;
  onFilterChange: (filters: Partial<FiltersType>) => void;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  categories,
  difficultyLevels,
  filters,
  onFilterChange
}) => {
  const minPrice = 0;
  const maxPrice = 1500;

  // Handle category change
  const handleCategoryChange = (category: string) => {
    onFilterChange({ category: category === 'Todos' ? '' : category });
  };

  // Handle difficulty change
  const handleDifficultyChange = (difficulty: string) => {
    onFilterChange({ difficulty: filters.difficulty === difficulty ? '' : difficulty });
  };

  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    onFilterChange({ 
      minPrice: values[0], 
      maxPrice: values[1] 
    });
  };

  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
      category: '',
      difficulty: '',
      minPrice: null,
      maxPrice: null,
      searchQuery: ''
    });
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-white rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filtros</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="h-8"
        >
          Limpar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "difficulty", "price"]}>
        {/* Category filter */}
        <AccordionItem value="category">
          <AccordionTrigger>Categoria</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div 
                  key={category} 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted p-1 rounded-md"
                  onClick={() => handleCategoryChange(category)}
                >
                  <Checkbox 
                    id={`category-${category}`}
                    checked={category === 'Todos' ? !filters.category : filters.category === category}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label 
                    htmlFor={`category-${category}`} 
                    className="w-full cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Difficulty filter */}
        <AccordionItem value="difficulty">
          <AccordionTrigger>Nível de Dificuldade</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {difficultyLevels.map((level) => (
                <div 
                  key={level} 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-muted p-1 rounded-md"
                  onClick={() => handleDifficultyChange(level)}
                >
                  <Checkbox 
                    id={`difficulty-${level}`} 
                    checked={filters.difficulty === level} 
                    onCheckedChange={() => handleDifficultyChange(level)}
                  />
                  <Label 
                    htmlFor={`difficulty-${level}`} 
                    className="w-full cursor-pointer capitalize"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price range filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Faixa de Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={50}
                value={[
                  filters.minPrice !== null ? filters.minPrice : minPrice,
                  filters.maxPrice !== null ? filters.maxPrice : maxPrice
                ]}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm">
                <span>
                  R$ {filters.minPrice !== null ? filters.minPrice : minPrice}
                </span>
                <span>
                  R$ {filters.maxPrice !== null ? filters.maxPrice : maxPrice}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default ActivityFilters;
