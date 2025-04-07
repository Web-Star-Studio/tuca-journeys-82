
import React, { useMemo } from "react";
import { Event } from "@/types/event";
import { PointData } from "./utils/mapData";

interface MapEventPointsProps {
  events: Event[];
}

// Convert events to map point data
export const convertEventsToPoints = (events: Event[]): PointData[] => {
  return events.map(event => ({
    id: `event-${event.id}`,
    name: event.name,
    category: event.category,
    description: `${event.date} - ${event.start_time}`,
    // For demonstration, we're using approximate coordinates
    // In a real app, these would come from geocoding or a database
    coordinates: [-32.426 + (Math.random() * 0.02 - 0.01), -3.854 + (Math.random() * 0.02 - 0.01)] as [number, number],
    color: '#4caf50' // Green color for events
  }));
};

const MapEventPoints: React.FC<MapEventPointsProps> = ({ events }) => {
  const eventPoints = useMemo(() => convertEventsToPoints(events), [events]);
  
  // This is a render-less component that just processes data
  return null;
};

export default MapEventPoints;
