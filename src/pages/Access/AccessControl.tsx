import toast from "react-hot-toast";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { accessLogService } from "../../services/accessLogService";

export default function AccessControl() {
  // Función que maneja el registro y la notificación del acceso.
  // Ahora utiliza el servicio 'accessLogService'.
  const handleAccess = async (accessType: 'vehicular' | 'peatonal', description: string, emoji: string) => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const toastId = toast.loading('Procesando solicitud...', {
      style: {
        background: isDarkMode ? '#1e293b' : '#ffffff',
        color: isDarkMode ? '#f8fafc' : '#333333',
      },
    });

    try {
      // Llamamos al servicio para registrar el acceso.
      await accessLogService.registerAccess({
        accessType: accessType,
        targetDescription: description,
      });

      toast.success(`${emoji} Acceso ${accessType} abierto y registrado.`, {
        id: toastId,
        duration: 8000,
        style: {
          borderRadius: '10px',
          background: isDarkMode ? '#1e293b' : '#ffffff',
          color: isDarkMode ? '#f8fafc' : '#333333',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: isDarkMode ? '#1e293b' : '#ffffff',
        },
      });

    } catch (error) {
      console.error("Error en la solicitud de acceso:", error);
      toast.error('No se pudo registrar el acceso. Inténtalo de nuevo.', {
        id: toastId,
        style: {
          borderRadius: '10px',
          background: isDarkMode ? '#1e293b' : '#ffffff',
          color: isDarkMode ? '#f8fafc' : '#333333',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        },
      });
    }
  };

  return (
    <div>
      <PageMeta
        title="Accesos | Fuentes de Rucalhue 2"
        description="Esta página permite gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados. Mantén el control de quién puede ingresar a través del portón vehicular para garantizar la seguridad y el orden en tu comunidad."
      />
      <PageBreadcrumb pageTitle="Accesos Condominio" />

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">
          <div>
            <div className="mx-auto w-full max-w-[385px]">
              <h2 className="font-bold text-center text-gray-800 mb-7 text-title-sm dark:text-white/90">
                Accesos Condominio
              </h2>
            </div>
            
            <div>
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 xl:gap-6">

                {/* Tarjeta de Acceso Vehicular */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                  <span className="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                    Acceso Vehicular
                  </span>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aquí puedes gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados.
                  </p>
                  
                  <div className="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div>
                  
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => handleAccess('vehicular', 'Acceso Vehicular Principal', '🚗')}
                      className="flex w-full flex-col items-center justify-center gap-3 rounded-lg bg-blue-600 p-3.5 text-center text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-blue-700 dark:hover:bg-blue-700"
                      style={{ width: "190px", height: "190px" }}
                    >
                      <span className="text-5xl select-none" role="img" aria-label="Auto">
                        🚗
                      </span>
                      <span>Abrir Acceso Vehicular</span>
                    </button>
                  </div>
                </div>

                {/* Tarjeta de Acceso Peatonal */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"> 
                  <span className="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90"> 
                    Acceso Peatonal 
                  </span> 
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400"> 
                    Aquí puedes gestionar el acceso al portón peatonal, permitiendo o denegando la entrada a los peatones autorizados. 
                  </p> 
                  
                  <div className="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div> 
                  
                  <div className="mt-8 flex justify-center"> 
                    <button 
                      onClick={() => handleAccess('peatonal', 'Acceso Peatonal Principal', '🚶')}
                      className="flex w-full flex-col items-center justify-center gap-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 p-3.5 text-center text-sm font-medium text-white shadow-theme-xs transition-colors dark:hover:bg-emerald-600 dark:bg-emerald-700" 
                      style={{ width: "190px", height: "190px" }} 
                    > 
                      <span className="text-5xl select-none" role="img" aria-label="Peatón">
                        🚶
                      </span>
                      <span>Abrir Acceso Peatonal</span> 
                    </button> 
                  </div> 
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
