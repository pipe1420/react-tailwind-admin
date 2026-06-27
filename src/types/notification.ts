// src/types/notification.ts
import { User } from "./user";

export interface AccessNotification {
  id: number;
  access_type: 'vehicular' | 'peatonal';
  status: string;
  failure_reason: string | null;
  ip_address: string;
  created_at: string;
  // Pick toma exactamente las propiedades que necesitas de la interfaz User original
  user: Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>; 
}