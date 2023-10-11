import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/dashboard/home/Home";
import Configuration from "../../pages/dashboard/configuration/Configuration";
import Clients from "../../pages/dashboard/clients/Clients";
import UserProfiles from "../../pages/dashboard/userProfile/UserProfiles";
import Statistics from "../../pages/dashboard/Statistics/Statistics";
import LayoutDashboard from "../../pages/dashboard/Layout/LayoutDashboard";

import Diary from "../../pages/dashboard/diary/Diary";
import Comments from "../../pages/dashboard/comments/Comments";
import Profile from "../../pages/dashboard/profile/Profile";

import Memberships from "../../pages/dashboard/memberships/Memberships";
import Appointment from "../../pages/dashboard/diary/appointment/Appointment";
import DiaryCreate from "../../pages/dashboard/diary/diaryCreate/DiaryCreate";
import Providers from "../../pages/dashboard/providers/Providers";
import Collaborators from "../../pages/dashboard/collaborators/Collaborators";
import Service from "../../pages/dashboard/services/Service";


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
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/diaryCreate" element={<DiaryCreate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userProfile" element={<UserProfiles />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/comments/:providerId" element={<Comments />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/services" element={<Service />} />
        </Routes>
      </LayoutDashboard>
    </Suspense>
  );
};

export default DashboardRoutes;
