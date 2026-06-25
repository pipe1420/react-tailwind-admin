const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
import { AccessNotification } from "../types/notification";

export const notificationService = {
  /**
   * Obtiene el historial de notificaciones de acceso.
   * @param limit Cantidad máxima opcional de registros a recuperar.
   * @returns Una promesa que se resuelve en un array de notificaciones.
   */
  getAccessHistory: async (limit?: number): Promise<AccessNotification[]> => {
    try {
      // Construimos la URL base
      let url = `${API_URL}/history/me`;

      // Si se pasa un límite, lo añadimos de forma limpia como query param (?limit=X)
      if (limit !== undefined) {
        const params = new URLSearchParams({ limit: limit.toString() });
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Esencial para la autenticación basada en cookies
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data: AccessNotification[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el historial de accesos:", error);
      throw error;
    }
  },

  /**
   * Obtiene el historial de notificaciones de acceso.
   * @param limit Cantidad máxima opcional de registros a recuperar.
   * @returns Una promesa que se resuelve en un array de notificaciones.
   */
  getAllAccessHistory: async (limit?: number): Promise<AccessNotification[]> => {
    try {
      // Construimos la URL base
      let url = `${API_URL}/history`;

      // Si se pasa un límite, lo añadimos de forma limpia como query param (?limit=X)
      if (limit !== undefined) {
        const params = new URLSearchParams({ limit: limit.toString() });
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Esencial para la autenticación basada en cookies
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data: AccessNotification[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el historial de accesos:", error);
      throw error;
    }
  },

    getAccessHistoryServerSide: async (start: number, length: number, search: string, draw: number, isResident: boolean): Promise<any> => {
    try {
      // Si es residente va a /history/me, sino al endpoint general /history
      const urlBase = isResident ? `${API_URL}/history/me` : `${API_URL}/history`;
      
      const params = new URLSearchParams({
        draw: draw.toString(), // Envia el draw secuencial real al backend
        start: start.toString(),
        length: length.toString(),
      });

      // Solo añadimos el parámetro search si el usuario escribió algo
      if (search.trim() !== "") {
        params.append("search", search);
      }

      const response = await fetch(`${urlBase}?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getAccessHistoryServerSide:", error);
      throw error;
    }
  }

};

