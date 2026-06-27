import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

// 1. Diccionario completo basado en tus 12 permisos de la Base de Datos
const MODULES_CONFIG = [
  {
    id: "access",
    title: "Accesos",
    description: "Apertura remota de portón y gestión de llaves virtuales autorizadas.",
    link: "/access",
    buttonText: "Gestionar Accesos",
    permissionName: "Accesos",
    bgIcon: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    )
  },
  {
    id: "history",
    title: "Historial",
    description: "Línea de tiempo de ingresos peatonales y vehiculares de tu propiedad.",
    link: "/history",
    buttonText: "Ver Historial",
    permissionName: "Historial",
    bgIcon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3m0 0c-1.133.094-1.976 1.057-1.976 2.192V16.5A2.25 2.25 0 0 0 12 18.75h.445m-4.446 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-9.39c0-1.135.845-2.098 1.976-2.192a48.411 48.411 0 0 1 3.298-.313M8.75 17.25h.008v.008H8.75v-.008ZM8.75 14.25h.008v.008H8.75v-.008ZM8.75 11.25h.008v.008H8.75v-.008Z" />
      </svg>
    )
  },
  {
    id: "vehicles",
    title: "Vehículos",
    description: "Registra patentes de residentes para la integración con sistemas Tag/Cámaras.",
    link: "/vehicles",
    buttonText: "Gestionar Vehículos", // Cambiado para que tenga un texto útil cuando esté desbloqueado
    permissionName: "Vehículos",
    bgIcon: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400", // Cambiado color gris por default a azul activo
    isAvailable: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM18.75 18.75a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM4.5 10.5h15M21 12a9 9 0 0 0-9-9c-1.236 0-2.418.248-3.5.7l-2.4 4.8a1.5 1.5 0 0 0-.1.6V15c0 1.243 1.007 2.25 2.25 2.25h11.5A2.25 2.25 0 0 0 21 15v-3Z" />
      </svg>
    )
  },
  {
    id: "visits",
    title: "Visitas",
    description: "Pre-autoriza invitados para acelerar la entrada de tus visitas en conserjería.",
    link: "/visits",
    buttonText: "Gestionar Visitas", // Cambiado para que tenga un texto útil cuando esté desbloqueado
    permissionName: "Visitas",
    bgIcon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400", // Cambiado color gris por default a verde activo
    isAvailable: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-3.076c-1.3-.288-2.686-.409-4.087-.365m-4.937-4.039a4.25 4.25 0 1 0-4.475-6.918M2.25 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-3.076c-1.3-.288-2.686-.409-4.087-.365m14.5-6.146a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9 13.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
      </svg>
    )
  },
  {
    id: "residents",
    title: "Residentes",
    description: "Administra el padrón de propietarios, copropietarios y arrendatarios vigentes.",
    link: "/residents",
    buttonText: "Gestionar Residentes",
    permissionName: "Residentes",
    bgIcon: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    )
  },
  {
    id: "users",
    title: "Usuarios",
    description: "Configura cuentas del personal de copropiedad, conserjes y administradores.",
    link: "/users",
    buttonText: "Gestionar Cuentas",
    permissionName: "Usuarios",
    bgIcon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )
  },
  {
    id: "reports",
    title: "Reportes",
    description: "Visualiza analíticas de flujo vehicular, horas pico y alertas de seguridad.",
    link: "/reports",
    buttonText: "Ver Reportes",
    permissionName: "Reportes",
    bgIcon: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
      </svg>
    )
  },
  {
    id: "settings",
    title: "Configuración",
    description: "Modifica parámetros generales del condominio y tiempos de relevo.",
    link: "/config",
    buttonText: "Ajustes Sistema",
    permissionName: "Configuración",
    bgIcon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    isAvailable: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767c-.3.23-.452.617-.431.996a4.42 4.42 0 0 1 0 .222c-.021.379.13.767.431.996l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.512 6.512 0 0 1-.22-.127a1.125 1.125 0 0 0-1.074-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.767c.301-.23.452-.617.43-.996a4.448 4.448 0 0 1 0-.222c.023-.379-.128-.767-.43-.996l-1.004-.767a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128c.332-.183.582-.495.645-.869L9.594 3.94Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    )
  }
];

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Link to="/signin" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  // Comprobamos si el usuario es "dev" de forma centralizada
  const isDev = user.role?.toLowerCase() === "dev" || user.role_description?.toLowerCase() === "dev";

  // CORREGIDO: Buscamos usando el 'id' (código técnico) en lugar del nombre en español
  const authorizedModules = MODULES_CONFIG.filter((mod) => {
    if (isDev) return true; 
    if (!user.permissions || !Array.isArray(user.permissions)) return false;
    
    // Como mod.id es "access", "visits", "history", etc., calzará perfecto con el backend
    return user.permissions.includes(mod.id);
  });

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Panel del {user.role_description?.toUpperCase()}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-gray-800 dark:text-white/90">
              Bienvenido, <span className="text-blue-600 dark:text-blue-400">{user.name}</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Gestiona los accesos y revisa la actividad de tu condominio en Fuentes de Rucalhue 2.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Dinámico */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {authorizedModules.map((mod) => {
          // Si es dev, el módulo se considera "disponible" localmente para saltarse bloqueos visuales
          const moduleActive = isDev || mod.isAvailable;
          // Si el módulo está deshabilitado por backend pero eres dev, mostramos un botón genérico en vez de "Bloqueado"
          const currentButtonText = !mod.isAvailable && !isDev ? "Bloqueado" : mod.buttonText;

          return (
            <div
              key={mod.id}
              className={`relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition dark:border-gray-800 dark:bg-gray-900 ${
                moduleActive 
                  ? "hover:shadow-sm" 
                  : "opacity-50 grayscale select-none"
              }`}
            >
              {/* Ocultamos el tag "Próximamente" para el rol dev */}
              {!mod.isAvailable && !isDev && (
                <div className="absolute top-4 right-4 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  Próximamente
                </div>
              )}

              <div>
                {/* Cambia dinámicamente el color del fondo del icono si no está disponible para usuarios comunes */}
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                  moduleActive ? mod.bgIcon : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                }`}>
                  {mod.icon}
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${moduleActive ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-500"}`}>
                  {mod.title}
                </h3>
                <p className={`mt-1 text-sm ${moduleActive ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>
                  {mod.description}
                </p>
              </div>

              {moduleActive ? (
                <Link
                  to={mod.link}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {currentButtonText}
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                >
                  {currentButtonText}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}