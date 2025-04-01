
export type Package = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  days: number;
  persons: number;
  rating: number;
  highlights?: string[];
  includes?: string[];
  excludes?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
  dates?: string[];
};
