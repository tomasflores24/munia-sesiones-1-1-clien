import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import Configuration from "../../pages/dashboard/configuration/Configuration";
import Clients from "../../pages/dashboard/clients/Clients";
import UserProfiles from "../../pages/dashboard/userProfile/UserProfiles";
import Statistics from "../../pages/dashboard/Statistics/Statistics";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";
/* import Diary from "../../pages/dashboard/diary/Diary"; */
import Comments from "../../pages/dashboard/comments/Comments"
import Diary from "../../pages/dashboard/appointment/Appointment";
import Memberships from "../../pages/dashboard/memberships/Memberships";
import Appointment from "../../pages/dashboard/appointment/Appointment";
import Providers from "../../pages/dashboard/providers/Providers";
import Collaborators from "../../pages/dashboard/collaborators/Collaborators";

const DashboardRoutes = () => {
  return (
    <Suspense>
      <LayoutDashboard>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/diary" element={<Appointment />} />
          <Route path="/profile" element={<Diary />} />
          <Route path="/userProfile" element={<UserProfiles />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/collaborators" element={<Collaborators />} />
        </Routes>
      </LayoutDashboard>
    </Suspense>
  );
};

export default DashboardRoutes;
