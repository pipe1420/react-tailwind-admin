const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type AccessType = "vehicular" | "peatonal";

interface RegisterAccessParams {
  accessType: AccessType;
  targetDescription: string;
  vehiclePlate?: string | null;
}

export const accessLogService = {
  /**
   * Registra un nuevo evento de acceso en el backend.
   * @param params Los parámetros para el registro de acceso.
   */
  registerAccess: async (params: RegisterAccessParams): Promise<void> => {
    const { accessType, targetDescription, vehiclePlate } = params;
    const queryParams = new URLSearchParams({
      access_type: accessType,
      target_description: targetDescription,
    });

    if (vehiclePlate) {
      queryParams.append("vehicle_plate", vehiclePlate);
    }

    const response = await fetch(`${API_URL}/access/open?${queryParams.toString()}`, {
      method: "POST",
      credentials: "include", // Esencial para que el backend identifique al usuario por la sesión/cookie.
    });

    if (!response.ok) {
      throw new Error("Error al registrar el acceso en el servidor.");
    }
  },
};