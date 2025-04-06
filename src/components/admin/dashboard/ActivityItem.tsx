
import React from "react";

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ icon, title, description, time }: ActivityItemProps) => (
  <div className="border-l-2 border-tuca-ocean-blue pl-3 py-1">
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  </div>
);

export default ActivityItem;
