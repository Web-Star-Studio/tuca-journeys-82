
export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  price: number;
  image_url: string;
  category: string;
  featured: boolean;
  capacity: number;
  available_spots: number;
  organizer: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}
