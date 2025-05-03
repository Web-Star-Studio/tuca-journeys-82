
import React from "react";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import ActivityEmptyState from "./ActivityEmptyState";
import ActivityLoadingState from "./ActivityLoadingState";
import ActivityErrorState from "./ActivityErrorState";

interface ActivityListProps {
  activities: Activity[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  isProcessing?: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isLoading,
  error,
  onEdit,
  onDelete,
  isProcessing = false,
}) => {
  if (isLoading) {
    return <ActivityLoadingState />;
  }

  if (error) {
    return <ActivityErrorState />;
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="rounded-md border bg-white p-6">
        <ActivityEmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={isProcessing}
        />
      ))}
    </div>
  );
};

export default ActivityList;
