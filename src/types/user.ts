// src/types/user.ts

export interface Permission {
  name: string;
}

export interface Role {
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface Department {
  id?: number | null;
  number: string;
  purchase_date?: string;
  condominium_id?: number;
}

export interface User {
  id: number; 
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: Role; // Relación completa con el objeto de rol y sus permisos
  department: Department | null;
}
