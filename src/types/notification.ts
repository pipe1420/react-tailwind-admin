export interface AccessNotification {
  id: number;
  access_type: 'vehicular' | 'peatonal';
  status: string;
  failure_reason: string;
  ip_address: string;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }; // Esta es la llave que cierra 'user', sin el punto y coma aquí
} // Aquí cierra la interfaz principal