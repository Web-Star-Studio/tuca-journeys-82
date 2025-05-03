
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityHero from "@/components/activity/ActivityHero";
import ActivitiesGrid from "@/components/activity/ActivitiesGrid";
import ActivitySearchFilter from "@/components/activity/ActivitySearchFilter";
import { useQuery } from "@tanstack/react-query";
import { activityService } from "@/services/activity-service";
import { ActivityFilters } from "@/types/activity";

const Activities = () => {
  const [filters, setFilters] = useState<ActivityFilters>({
    category: "",
    date: null,
    searchQuery: "",
    difficulty: "",
  });
  
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', filters],
    queryFn: () => activityService.getActivities(filters)
  });
  
  const { data: categories = ["Todos", "Barco", "Mergulho", "Trilha", "Terrestre", "Ecológico", "Cultural", "Gastronômico"] } = useQuery({
    queryKey: ['activityCategories'],
    queryFn: () => activityService.getActivityCategories()
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <ActivityHero 
          title="Atividades em Fernando de Noronha" 
          subtitle="Descubra as melhores atividades e aventuras na ilha" 
        />
        <div className="container mx-auto py-12 px-4 md:px-6">
          <ActivitySearchFilter 
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />
          <ActivitiesGrid 
            activities={activities}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
