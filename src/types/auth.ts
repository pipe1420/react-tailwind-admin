// Interfaces de User, Role, Permission
export interface Permission {
  code: string;
  name: string;
}

export interface Role {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  phone?: string;
  avatar?: string;
  role: Role;
  department: import('./condominium').Department | null; // Relación entre archivos
}