import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta de tu contexto

interface ProtectedRouteProps {
  moduleCode?: string; // Opcional: código del módulo a validar (ej: 'history', 'visits')
}

export const ProtectedRoute = ({ moduleCode }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Si el contexto está cargando los datos del usuario (fase de fetchUserData), puedes mostrar un spinner temporal
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Cargando sesión...</div>;
  }

  // 2. Control de Autenticación Base
  if (!user) {
    // Redirige al login guardando la ruta de origen para volver después de iniciar sesión
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 3. Control de Módulo Deshabilitado (Si se especificó un moduleCode)
  if (moduleCode) {
    const permission = user.role_object?.permissions?.find(
      (p: any) => p.code === moduleCode
    );

    // Si el permiso no existe en el rol del usuario, o el backend lo marcó como is_disabled: true
    if (!permission || permission.is_disabled) {
      console.warn(`El módulo [${moduleCode}] se encuentra deshabilitado. Redireccionando al Inicio.`);
      return <Navigate to="/" replace />;
    }
  }

  // Si pasa todas las validaciones, renderiza las páginas hijas
  return <Outlet />;
};