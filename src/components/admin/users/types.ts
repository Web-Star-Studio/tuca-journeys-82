
// Update the User type to use string IDs instead of numbers
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar: string | null;
}
