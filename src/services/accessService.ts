// src/services/accessService.js
import { API_URL } from "../config";

export const accessService = {
  openGate: async (accessType, targetDescription = null, vehiclePlate = null) => {
    const token = localStorage.getItem("token") || "";

    const params = new URLSearchParams({
      access_type: accessType,
    });
    
    if (targetDescription) params.append("target_description", targetDescription);
    if (vehiclePlate) params.append("vehicle_plate", vehiclePlate);

    const response = await fetch(`${API_URL}/access/open?${params.toString()}`, {
      method: "POST",
      credentials: "include", // ◄--- CLAVE: Permite enviar las cookies de sesión al backend
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Error al procesar la apertura del acceso.");
    }

    return data;
  }
};