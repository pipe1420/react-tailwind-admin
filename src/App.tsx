import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router";
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
import AccessVisits from "./pages/Access/AccessVisits";
import Residents from "./pages/Users/Residents";
import Reports from "./pages/Reports/Reports";
import Config from "./pages/Config/Config";
import Conecctions from "./pages/developer/Conecctions";
import Logs from "./pages/developer/Logs";
import Diagnostic from "./pages/developer/Diagnostic";
import { useAuth } from "./context/AuthContext";

// 🛡️ GUARDIÁN DE RUTA: Bloquea el renderizado inmediatamente si no hay sesión
// 🛡️ GUARDIÁN TOTALMENTE CONSUMIDOR DEL CONTEXTO (0% llamadas HTTP propias)
const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // 👈 Consume el estado que ya descargó el AuthContext

  // Bloqueo estricto del parpadeo: no renderiza nada mientras el contexto inicializa
  if (loading) return null; 

  // Si tras terminar la carga global no hay usuario válido, expulsa de inmediato
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Luz verde: renderiza las pantallas privadas de forma instantánea
  return <Outlet />;
};




export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        {/* 🔒 Rutas Privadas Totalmente Protegidas por Backend y Frontend */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/vehicles" element={<Vehicles/>} />
            <Route path="/admin-profiles" element={<AdminProfiles />} />
            <Route path="/history" element={<AccessHistory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/access-visits" element={<AccessVisits />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/config" element={<Config />} />
            <Route path="/conections" element={<Conecctions />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/logs" element={<Logs />} />
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
          </Route>
        </Route>

        {/* 🔓 Rutas Públicas */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}