import { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      // 🔑 CONEXIÓN SEGURA: El navegador adjuntará la cookie HttpOnly automáticamente gracias a credentials: 'include'
      const response = await fetch(`${API_URL}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // 👈 OBLIGATORIO: Envía la sesión encriptada a FastAPI
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Si el servidor invalida la sesión, forzamos la redirección nativa
          window.location.replace('/signin');
          throw new Error('Sesión expirada o no autorizada');
        }
        throw new Error(`Error ${response.status}: Recurso no encontrado`);
      }

      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }
};
