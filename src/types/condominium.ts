// src/types/condominium.ts

export interface ParkingSpot {
  id: number;
  number: string;
  purchase_date: string | null; // Corregido para mapear el string "2020-06-20" o nulos de la API
}

export interface Department {
  id: number; // Ya viene definitivo desde el backend
  number: string;
  purchase_date: string | null; // Mapea "2020-05-12"
  condominium_id?: number;
  parking_spots: ParkingSpot[]; // Lista de estacionamientos completamente tipada
}