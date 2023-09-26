import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import Configuration from "../../pages/dashboard/configuration/Configuration";
import Clients from "../../pages/dashboard/clients/Clients";
import UserProfiles from "../../pages/dashboard/userProfile/UserProfiles";
import Statistics from "../../pages/dashboard/Statistics/Statistics";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";
import Diary from "../../pages/dashboard/diary/Diary";
import Comments from "../../pages/comments/Comments"

const DashboardRoutes = () => {
  return (
    <Suspense>
      <LayoutDashboard>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/profile" element={<Diary />} />
          <Route path="/userProfile" element={<UserProfiles />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </LayoutDashboard>
    </Suspense>
  );
};

export default DashboardRoutes;
