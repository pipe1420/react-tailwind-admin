import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

// IMPORTAMOS NUESTRO NUEVO SERVICIO DESDE EL FRONT
import { accessService } from "../../services/accessService";

export default function Diagnostic() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const testShellyPulse = async () => {
    setLoading(true);
    setStatusMessage(null);

    try {
      // Llamada limpia usando el método del servicio
      await accessService.openGate("vehicular", "Prueba de Diagnóstico desde Frontend");
      
      setStatusMessage({
        type: "success",
        text: "¡Pulso enviado con éxito! Relé activado en red local.",
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Error al conectar con el backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Diagnostico Dashboard"
        description="Esta es una pagina para diagnosticar problemas y/o inconvenientes del sistema, pruebas de conexion y funcionamiento."
      />
      <PageBreadcrumb pageTitle="Diagnostico" />

      {/* CARD DE DIAGNÓSTICO DE HARDWARE */}
      <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Prueba de Hardware Local
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Este botón envía un pulso directo vía HTTP RPC al Shelly 1 Gen4 configurado para la barrera vehicular.
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={testShellyPulse}
            disabled={loading}
            className={`px-5 py-2.5 rounded-lg font-medium text-white shadow-sm transition-all duration-200 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "Enviando pulso..." : "Testear Pulso Shelly"}
          </button>

          {statusMessage && (
            <div
              className={`text-sm font-medium px-4 py-2 rounded-md ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
        </div>
      </div>

   
    </div>
  );
}