
export interface Event {
  id: number;
  name: string;
  description: string;
  image_url: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  category: string;
  capacity: number;
  available_spots: number;
  status: "scheduled" | "ongoing" | "completed" | "canceled";
  organizer: string;
  featured?: boolean;
}
