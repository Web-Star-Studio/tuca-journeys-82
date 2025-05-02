
import React from "react";
import ActivityCard from "./ActivityCard";
import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

interface ActivityGridProps {
  activities: Activity[];
  categories: string[];
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ activities, categories }) => {
  // View mode state - grid or list
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  if (!activities || activities.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-2">Nenhuma atividade encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros para encontrar atividades disponíveis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Header with result count and view toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {activities.length} {activities.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8"
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Visualização em grade</span>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-8 w-8"
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Visualização em lista</span>
          </Button>
        </div>
      </div>

      {/* Activities grid */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;
