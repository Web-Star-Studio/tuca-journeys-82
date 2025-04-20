
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  last_booking: string | null;
  total_bookings: number;
}
