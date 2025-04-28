
// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  status: UserStatus | string;
  created_at: string;
  avatar: string | null;
}

// Possible user roles
export type UserRole = 'admin' | 'customer' | 'partner' | 'master';

// Possible user statuses
export type UserStatus = 'active' | 'inactive';

// Standard permissions
export type UserPermission = 'read' | 'write' | 'delete' | 'admin' | 'master';
