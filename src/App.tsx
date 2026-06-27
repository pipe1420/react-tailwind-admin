import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/Profiles/UserProfiles";
import Videos from "./pages/_Otros/UiElements/Videos";
import Images from "./pages/_Otros/UiElements/Images";
import Alerts from "./pages/_Otros/UiElements/Alerts";
import Badges from "./pages/_Otros/UiElements/Badges";
import Avatars from "./pages/_Otros/UiElements/Avatars";
import Buttons from "./pages/_Otros/UiElements/Buttons";
import LineChart from "./pages/_Otros/Charts/LineChart";
import BarChart from "./pages/_Otros/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/_Otros/Tables/BasicTables";
import FormElements from "./pages/_Otros/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import AccessControl from "./pages/Access/AccessControl"
import AdminProfiles from "./pages/Profiles/AdminProfiles";

import AccessHistory from "./pages/Access/AccessHistory";
import Vehicles from "./pages/Vehicles/Vehicles";

import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Visits from "./pages/Access/Visits";
import Residents from "./pages/Users/Residents";
import Reports from "./pages/Reports/Reports";
import Config from "./pages/Config/Config";
import Conecctions from "./pages/Developer/Conecctions";
import Logs from "./pages/Developer/Logs";
import Diagnostic from "./pages/Developer/Diagnostic";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  moduleCode?: string; // Código técnico opcional para módulos dinámicos
}

// 🛡️ GUARDIÁN DE RUTA AVANZADO: Bloquea sesión general y módulos deshabilitados
const ProtectedRoute = ({ moduleCode }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Bloqueo estricto del parpadeo: no renderiza nada mientras el contexto inicializa
  if (loading) return null; 

  // 1. Si tras terminar la carga global no hay usuario válido, expulsa de inmediato
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2. Si se especificó un módulo, verificamos si está deshabilitado en el backend
  if (moduleCode) {
    // Buscamos el objeto de permiso en la colección que armamos en el AuthContext
    const permission = user.role_object?.permissions?.find(
      (p: any) => p.code === moduleCode
    );

    // Si el permiso no existe, o explícitamente viene "is_disabled": true, se deniega el acceso
    if (!permission || permission.is_disabled) {
      console.warn(`[Acceso Denegado]: El módulo [${moduleCode}] se encuentra deshabilitado.`);
      return <Navigate to="/" replace />; // Redirección limpia al Inicio
    }
  }

  // Luz verde: renderiza las pantallas privadas de forma instantánea
  return <Outlet />;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        {/* 1. Nivel Base: Rutas que solo requieren estar Autenticado */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            
            <Route index path="/" element={<Dashboard />} />
            <Route path="/admin-profiles" element={<AdminProfiles />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

            {/* 2. Nivel Módulos: Validaciones individuales contra el 'is_disabled' del Backend */}
            <Route element={<ProtectedRoute moduleCode="access" />}>
              <Route path="/access" element={<AccessControl />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="vehicles" />}>
              <Route path="/vehicles" element={<Vehicles/>} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="history" />}>
              <Route path="/history" element={<AccessHistory />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="users" />}>
              <Route path="/users" element={<Users />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="visits" />}>
              <Route path="/visits" element={<Visits />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="residents" />}>
              <Route path="/residents" element={<Residents />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="reports" />}>
              <Route path="/reports" element={<Reports />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="settings" />}>
              <Route path="/config" element={<Config />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="connections" />}>
              <Route path="/conections" element={<Conecctions />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="diagnostics" />}>
              <Route path="/diagnostic" element={<Diagnostic />} />
            </Route>

            <Route element={<ProtectedRoute moduleCode="logs" />}>
              <Route path="/logs" element={<Logs />} />
            </Route>
            
          </Route>
        </Route>

        {/* Rutas Públicas */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
          
      </Routes>
      <Toaster 
        position="top-center" 
        containerStyle={{
          top: 40, 
          zIndex: 99999, 
        }} 
        reverseOrder={false} 
      />
    </Router>
  );
}