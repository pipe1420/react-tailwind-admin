// src/config.js

// 1. Intenta leer la URL del archivo .env. Si no existe, usa el hostname actual.
const envApiUrl = import.meta.env.VITE_API_URL;
const currentHost = window.location.hostname;

export const API_URL = `http://${currentHost}:8080`;

// 2. Lee el nombre de la app según el ambiente
export const APP_NAME = import.meta.env.VITE_APP_NAME || "Fuentes de Rucalhue 2";
