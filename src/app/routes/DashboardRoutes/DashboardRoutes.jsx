import { Suspense } from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import Configuration from "../../pages/dashboard/configuration/Configuration";
import Clients from "../../pages/dashboard/clients/Clients";
import Statistics from "../../pages/dashboard/statistics/Statistics";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";
import Diary from "../../pages/dashboard/diary/Diary";


const DashboardRoutes = () => {
  return (
    <Suspense >
      <Routes element={<LayoutDashboard />}>
        <Route path="/home" element={<Home />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </Suspense>
  );
};

export default DashboardRoutes;
