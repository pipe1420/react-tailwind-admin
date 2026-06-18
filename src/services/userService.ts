import { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      // Obtener el token guardado en el paso anterior
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Enviamos el Bearer token requerido por el backend
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Opcional: Manejar token expirado o inválido (ej. redirigir a /signin)
          localStorage.removeItem('token');
          window.location.href = '/signin';
        }
        throw new Error(`Error ${response.status}: No autorizado o recurso no encontrado`);
      }

      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }
};
