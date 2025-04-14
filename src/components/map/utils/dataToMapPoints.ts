
import { Event } from "@/types/event";
import { Tour } from "@/types/database";
import { Accommodation } from "@/data/accommodations";
import { PointData } from "./mapData";
import { MapPin, Compass, Hotel, Calendar } from "lucide-react";

// Convert accommodations to map points
export const accommodationsToPoints = (accommodations: Accommodation[]): PointData[] => {
  return accommodations.map(accommodation => ({
    id: `accommodation-${accommodation.id}`,
    name: accommodation.title,
    coordinates: getApproximateCoordinates(accommodation.location),
    category: "Hospedagem",
    description: accommodation.description.substring(0, 100) + "...",
    color: "#e91e63", // Pink color for accommodations
    price: accommodation.price,
    rating: accommodation.rating,
    url: `/hospedagens/${accommodation.id}`,
    image: accommodation.image,
    location: accommodation.location,
    tags: accommodation.amenities,
    featured: accommodation.featured,
  }));
};

// Convert tours to map points
export const toursToPoints = (tours: Tour[]): PointData[] => {
  return tours.map(tour => ({
    id: `tour-${tour.id}`,
    name: tour.title,
    coordinates: getApproximateCoordinates(tour.meeting_point || "Fernando de Noronha"),
    category: "Passeio",
    description: tour.short_description,
    color: "#2196f3", // Blue color for tours
    price: tour.price,
    rating: tour.rating,
    url: `/passeios/${tour.id}`,
    image: tour.image_url,
    location: tour.meeting_point || undefined,
    tags: tour.includes || [],
    featured: false, // Set a default value since it doesn't exist in the Tour type
  }));
};

// Convert events to map points
export const eventsToPoints = (events: Event[]): PointData[] => {
  return events.map(event => ({
    id: `event-${event.id}`,
    name: event.name,
    coordinates: getApproximateCoordinates(event.location),
    category: "Evento",
    description: event.description.substring(0, 100) + "...",
    color: "#4caf50", // Green color for events
    price: event.price,
    rating: null,
    url: `/eventos/${event.id}`,
    image: event.image_url,
    location: event.location,
    date: event.date,
    startTime: event.start_time,
    endTime: event.end_time,
    tags: [event.category],
    featured: event.featured || false,
  }));
};

// Get approximate coordinates based on location name
// In a real application, this would be replaced with actual geocoding or stored coordinates
const getApproximateCoordinates = (location: string): [number, number] => {
  // Fernando de Noronha center coordinates
  const centerLng = -32.426;
  const centerLat = -3.854;

  // For demo purposes, create a deterministic but varied position based on location string
  const locationHash = location.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Create variation within a reasonable radius around the island
  const latVariation = (locationHash % 100) / 1000; // Small variation
  const lngVariation = ((locationHash % 100) + 50) / 1000; // Different variation

  return [centerLng + lngVariation, centerLat + latVariation];
};

// Get category icon based on category name
export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'hospedagem':
      return Hotel;
    case 'passeio':
      return Compass;
    case 'evento':
      return Calendar;
    default:
      return MapPin;
  }
};

// Get all points combined
export const getAllMapPoints = (
  accommodations: Accommodation[],
  tours: Tour[],
  events: Event[]
): PointData[] => {
  return [
    ...accommodationsToPoints(accommodations),
    ...toursToPoints(tours),
    ...eventsToPoints(events),
  ];
};
