
import { tours } from "@/data/tours";
import { accommodations } from "@/data/accommodations";

// Point data interface
export interface PointData {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  image: string;
  price?: number;
}

// Posição central de Fernando de Noronha
export const NORONHA_CENTER: [number, number] = [-32.423611, -3.8425];

// Todos os pontos de interesse em Fernando de Noronha
export const poiData: PointData[] = [
  // Praias
  { id: "beach-1", name: "Praia do Sancho", category: "beaches", lat: -3.851389, lng: -32.442222, rating: 5, image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png" },
  { id: "beach-2", name: "Baía dos Porcos", category: "beaches", lat: -3.854444, lng: -32.444444, rating: 5, image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png" },
  { id: "beach-3", name: "Praia do Leão", category: "beaches", lat: -3.863611, lng: -32.422222, rating: 4.5, image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png" },
  { id: "beach-4", name: "Praia da Cacimba do Padre", category: "beaches", lat: -3.840833, lng: -32.439444, rating: 4.7, image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png" },
  
  // Atrações
  { id: "attr-1", name: "Forte Nossa Senhora dos Remédios", category: "attractions", lat: -3.836111, lng: -32.423611, rating: 4.2, image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png" },
  { id: "attr-2", name: "Mirante dos Golfinhos", category: "attractions", lat: -3.840000, lng: -32.428333, rating: 4.8, image: "/lovable-uploads/1ee83aef-4d58-4201-9998-59a29833ea4e.png" },
  { id: "attr-3", name: "Morro Dois Irmãos", category: "attractions", lat: -3.840278, lng: -32.441944, rating: 4.9, image: "/lovable-uploads/e336048f-0022-4f5b-a53a-de1f09cde38a.png" },
  
  // Restaurantes
  { id: "rest-1", name: "Restaurante Mergulhão", category: "restaurants", lat: -3.836667, lng: -32.416111, rating: 4.6, image: "/lovable-uploads/949f8aa0-19c8-4df4-b751-b730f41db238.png" },
  { id: "rest-2", name: "Restaurante Tartaruga", category: "restaurants", lat: -3.839444, lng: -32.419722, rating: 4.4, image: "/lovable-uploads/1da99f74-2aae-4813-af7f-d1cd24839a2d.png" },
  { id: "rest-3", name: "Bar do Meio", category: "restaurants", lat: -3.835000, lng: -32.417222, rating: 4.0, image: "/lovable-uploads/29f781ec-249e-490d-b220-30ce02793db1.png" },
];

// Transform tour and accommodation data to map format
export const getMapData = (): PointData[] => {
  const transformedTours = tours.map(tour => ({
    id: `tour-${tour.id}`,
    name: tour.title,
    category: "tours" as const,
    lat: -3.835 - Math.random() * 0.03, // Posição aproximada em Fernando de Noronha
    lng: -32.42 - Math.random() * 0.03,  // Posição aproximada em Fernando de Noronha
    rating: tour.rating,
    image: tour.image,
    price: tour.price,
  }));

  const transformedAccommodations = accommodations.map(acc => ({
    id: `acc-${acc.id}`,
    name: acc.title,
    category: "accommodations" as const,
    lat: -3.835 - Math.random() * 0.03, // Posição aproximada em Fernando de Noronha
    lng: -32.42 - Math.random() * 0.03,  // Posição aproximada em Fernando de Noronha
    rating: acc.rating,
    image: acc.image,
    price: acc.price,
  }));

  return [...poiData, ...transformedTours, ...transformedAccommodations];
};
