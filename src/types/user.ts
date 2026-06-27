// src/types/user.ts
import { Department } from "./condominium";

export interface Permission {
  code: string;
  name: string;
  is_disabled: boolean;
}

// 1. Estructura real del objeto que viene del Backend
export interface RoleObject {
  name: string;
  description: string;
  permissions: Permission[];
}

// 2. Interfaz del Usuario Unificada (Mantiene compatibilidad y agrega lo nuevo)
export interface User {
  // Propiedades básicas
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  phone?: string;
  avatar?: string;
  
  // Retrocompatibilidad (Campos que usabas inicialmente para evitar que se rompa la UI)
  name: string;             // Ej: "Juan Perez" (Concatenado en el Context)
  role: string;             // Ej: "resident" (Para componentes viejos)
  role_description: string; // Ej: "Residente" (Para UserMetaCard)
  permissions: string[];    // Ej: ["dashboard", "visits"] (Arreglo plano de códigos)

  // Estructuras extendidas (Para los nuevos componentes y lógica modular)
  role_object?: RoleObject; // Objeto completo del backend por si necesitas usarlo después
  department: Department | null;
}