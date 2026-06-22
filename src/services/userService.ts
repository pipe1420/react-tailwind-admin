import { User } from '../types/user'; // Asegúrate de que esta interfaz refleje el tipado completo si es necesario

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const userService = {
  // 📡 Nueva función para obtener la sesión del usuario actual
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.replace('/signin');
          throw new Error('Sesión expirada o no autorizada');
        }
        throw new Error(`Error ${response.status}: No se pudo obtener el usuario`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en userService.getCurrentUser:', error);
      throw error;
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_URL}/api/users/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.replace('/signin');
          throw new Error('Sesión expirada o no autorizada');
        }
        throw new Error(`Error ${response.status}: Recurso no encontrado`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
  }
};
