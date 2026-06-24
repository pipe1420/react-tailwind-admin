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
};