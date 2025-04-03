
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar: string | null;
}

export type UserRole = 'admin' | 'customer';
export type UserStatus = 'active' | 'inactive';

export interface UserTableActions {
  onEmailClick?: (user: User) => void;
  onEditClick?: (user: User) => void;
  onDeleteClick?: (user: User) => void;
}
