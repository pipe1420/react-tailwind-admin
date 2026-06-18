import { BrowserRouter as Router, Routes, Route } from "react-router";
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
import Users from "./pages/Users";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            {/* Accesos */}
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/vehicles" element={<Vehicles />} />

            {/* Administración de Perfiles   */}
            <Route path="/admin-profiles" element={<AdminProfiles />} />
            <Route path="/access-history" element={<AccessHistory />} />
            <Route path="/users" element={<Users />} />




            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>


          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

          
        </Routes>
      </Router>
    </>
  );
}
