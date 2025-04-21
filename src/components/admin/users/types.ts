
// Update the User type to use string IDs instead of numbers
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  avatar: string | null;
}

// Add the missing UserRole and UserStatus types
export type UserRole = 'admin' | 'customer' | 'partner';
export type UserStatus = 'active' | 'inactive';
