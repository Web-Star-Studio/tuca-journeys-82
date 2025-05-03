
import React from "react";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import { Loader } from "lucide-react";

interface ActivitiesGridProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivitiesGrid = ({ activities, isLoading }: ActivitiesGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="h-10 w-10 animate-spin text-tuca-ocean-blue" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">Nenhuma atividade encontrada</h3>
        <p className="text-muted-foreground">
          Tente ajustar seus filtros ou volte mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivitiesGrid;
