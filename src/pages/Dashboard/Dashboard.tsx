
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

export default function Dashboard() {
  const { user } = useAuth();

  // Si por una anomalía el componente se renderiza sin datos de sesión, muestra botón de acceso
  if (!user) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Link to="/signin" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida Principal */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Panel del Residente
            </span>
            <h1 className="mt-1 text-3xl font-bold text-gray-800 dark:text-white/90">
              ¡Bienvenido, <span className="text-blue-600 dark:text-blue-400">{user.name}</span>!
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Gestiona los accesos y revisa la actividad de tu hogar en Fuentes de Rucalhue 2.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Principal de Módulos */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* 1. Módulo Activo: Accesos */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition hover:shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">Accesos</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Apertura remota de portón y gestión de llaves virtuales autorizadas.
            </p>
          </div>
          <Link
            to="/access"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Gestionar Accesos
          </Link>
        </div>

        {/* 2. Módulo Activo: Historial */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition hover:shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0 1 12 3m0 0c-1.133.094-1.976 1.057-1.976 2.192V16.5A2.25 2.25 0 0 0 12 18.75h.445m-4.446 0H4.5A2.25 2.25 0 0 1 2.25 16.5v-9.39c0-1.135.845-2.098 1.976-2.192a48.411 48.411 0 0 1 3.298-.313M8.75 17.25h.008v.008H8.75v-.008ZM8.75 14.25h.008v.008H8.75v-.008ZM8.75 11.25h.008v.008H8.75v-.008Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white/90">Historial</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Línea de tiempo de ingresos peatonales y vehiculares de tu propiedad.
            </p>
          </div>
          <Link
            to="/history"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Ver Historial
          </Link>
        </div>

        {/* 3. Módulo Deshabilitado: Vehículos */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 opacity-50 grayscale dark:border-gray-800 dark:bg-gray-900 select-none">
          <div className="absolute top-4 right-4 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            Próximamente
          </div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM18.75 18.75a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM4.5 10.5h15M21 12a9 9 0 0 0-9-9c-1.236 0-2.418.248-3.5.7l-2.4 4.8a1.5 1.5 0 0 0-.1.6V15c0 1.243 1.007 2.25 2.25 2.25h11.5A2.25 2.25 0 0 0 21 15v-3Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-400 dark:text-gray-500">Vehículos</h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Registra patentes de residentes para la integración con sistemas Tag/Cámaras.
            </p>
          </div>
          <button disabled className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600">
            Bloqueado
          </button>
        </div>

        {/* 4. Módulo Deshabilitado: Visitas */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 opacity-50 grayscale dark:border-gray-800 dark:bg-gray-900 select-none">
          <div className="absolute top-4 right-4 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            Próximamente
          </div>
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-3.076c-1.3-.288-2.686-.409-4.087-.365m-4.937-4.039a4.25 4.25 0 1 0-4.475-6.918M2.25 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-3.076c-1.3-.288-2.686-.409-4.087-.365m14.5-6.146a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9 13.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-400 dark:text-gray-500">Visitas</h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Pre-autoriza invitados para acelerar la entrada de tus visitas en conserjería.
            </p>
          </div>
          <button disabled className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600">
            Bloqueado
          </button>
        </div>

      </div>
    </div>
  );
}
