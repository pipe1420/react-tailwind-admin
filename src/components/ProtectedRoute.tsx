import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
  // Cambia 'user_token' por la clave exacta que uses para guardar tu sesión
  const isAuthenticated = !!localStorage.getItem('user_token'); 

  if (!isAuthenticated) {
    // Si no está autenticado, redirige inmediatamente sin renderizar nada
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, permite la carga de las páginas hijas
  return <Outlet />;
};
