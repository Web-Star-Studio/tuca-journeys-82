
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchActivities } from "@/hooks/use-activities";
import ActivityFilters from "@/components/activity/ActivityFilters";
import ActivityGrid from "@/components/activity/ActivityGrid";
import { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from "@/types/activity";
import { Loader2 } from "lucide-react";

const Activities = () => {
  const { 
    activities, 
    isLoading, 
    searchParams, 
    updateSearch, 
    selectedCategory, 
    handleCategoryChange 
  } = useSearchActivities();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Atividades em Fernando de Noronha</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Encontre as melhores atividades para aproveitar ao máximo sua estadia na ilha paradisíaca
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <ActivityFilters
              categories={ACTIVITY_CATEGORIES}
              difficultyLevels={ACTIVITY_DIFFICULTY_LEVELS}
              filters={{
                category: selectedCategory,
                difficulty: searchParams.difficulty || "",
                minPrice: searchParams.minPrice || null,
                maxPrice: searchParams.maxPrice || null,
                searchQuery: searchParams.query || ""
              }}
              onFilterChange={(filters) => {
                updateSearch({
                  category: filters.category,
                  difficulty: filters.difficulty,
                  minPrice: filters.minPrice,
                  maxPrice: filters.maxPrice,
                  query: filters.searchQuery
                });
              }}
            />
            
            {isLoading ? (
              <div className="flex-1 flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              <ActivityGrid 
                activities={activities || []} 
                categories={ACTIVITY_CATEGORIES} 
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
