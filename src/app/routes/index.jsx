import { Routes, Route } from "react-router-dom";

import Table from "../components/Table/Table";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { user1 } from "../utils/data";
import Register from "../pages/register/Register";
import Home from "../pages/dashboard/home/Home";
import LayoutDashboard from "../pages/dashboard/Layout/LayoutDashboard";
import Configuration from "../pages/dashboard/configuration/Configuration";
import Statistics from "../pages/dashboard/statistics/Statistics";
import Clients from "../pages/dashboard/clients/Clients";

function AppRoutes() {
  sessionStorage.setItem("session", JSON.stringify(user1));

  const [user, setUser] = useState(sessionStorage.getItem("session"));

  useEffect(() => {
    setUser(sessionStorage.getItem("session"));
  }, [user]);

  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/user/register" element={<Register />} />
        {/* flujo de user(hardcodeo con user1 porque no esta termiando lo del login) */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user1?.UserTypeId?.id === "1"}
            />
          }
        >
          <Route path="/admin/table" element={<Table />} />
          <Route path="/dashboard" element={<LayoutDashboard />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/estadisticas" element={<Statistics />} />
          <Route path="/admin/configuration" element={<Configuration />} />
          <Route path="/admin/clientes" element={<Clients />} />

          {/* AGREGAR NUEVA RUTA SI SE NECESITA */}
        </Route>
        {/* flujo de provider */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user1?.UserTypeId?.id === "2"}
            />
          }
        >
          <Route path="/provider" element={<Table />} />
        </Route>
        {/* flujo de company */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user1?.UserTypeId?.id === "3"}
            />
          }
        >
          <Route path="/company" element={<Table />} />
        </Route>
        {/* flujo de admin */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user1?.UserTypeId?.id === "4"}
            />
          }
        >
          <Route path="/admin" element={<Table />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
