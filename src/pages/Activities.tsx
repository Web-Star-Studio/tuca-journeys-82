
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ActivityFilters from "@/components/activity/ActivityFilters";
import ActivityGrid from "@/components/activity/ActivityGrid";
import { useActivities } from "@/hooks/use-activities";
import { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from "@/types/activity";
import { Loader2 } from "lucide-react";

const Activities = () => {
  const { activities, isLoading, error, filters, setFilters } = useActivities();
  const [filteredActivities, setFilteredActivities] = useState(activities || []);
  const [activeTab, setActiveTab] = useState("list");

  // Update filtered activities when base activities change
  useEffect(() => {
    if (activities) {
      setFilteredActivities(activities);
    }
  }, [activities]);
  
  // Function to apply filters
  const applyFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-tuca-sand pt-24 pb-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-medium text-center mb-6">Atividades em Fernando de Noronha</h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Descubra experiências únicas que vão tornar a sua viagem inesquecível
            </p>
          </div>
        </section>

        {/* Main content section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar with filters */}
              <ActivityFilters
                categories={ACTIVITY_CATEGORIES}
                difficultyLevels={ACTIVITY_DIFFICULTY_LEVELS}
                filters={filters}
                onFilterChange={applyFilters}
              />

              {/* Activity grid */}
              {isLoading ? (
                <div className="flex-1 flex justify-center items-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
                </div>
              ) : error ? (
                <div className="flex-1 bg-red-50 p-6 rounded-lg">
                  <p className="text-red-600">
                    Não foi possível carregar as atividades. Por favor, tente novamente mais tarde.
                  </p>
                </div>
              ) : (
                <ActivityGrid 
                  activities={filteredActivities} 
                  categories={ACTIVITY_CATEGORIES}
                />
              )}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
