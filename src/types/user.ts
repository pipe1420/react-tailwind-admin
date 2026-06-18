// src/types/user.ts

export interface Permission {
  name: string;
}

export interface Role {
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface User {
  id: number; // Tu backend usa números enteros incrementales para las llaves primarias
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: Role; // Relación completa con el objeto de rol y sus permisos
}
