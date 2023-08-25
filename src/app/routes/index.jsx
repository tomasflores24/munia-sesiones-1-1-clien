import { Routes, Route } from "react-router-dom";
import Table from "../components/Table/Table";
import Home from "../views/Home/Home";
import SideBar from "../components/sideBar/SideBar";
import Register from "../pages/register/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { user1 } from "../utils/data";

function AppRoutes() {
  sessionStorage.setItem("session", JSON.stringify(user1))
  
  const [user, setUser] = useState(sessionStorage.getItem("session"));

  useEffect(() => {
    setUser(sessionStorage.getItem("session"))
}, [user])

  console.log(user, user1?.UserTypeId?.id)

  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/user/register" element={<Register />} />
        {/* flujo de user(hardcodeo con user1 porque no esta termiando lo del login) */}
        <Route element={<ProtectedRoute isAllowed={!!user && user1?.UserTypeId?.id === "1"} />}>
          <Route path="/table" element={<Table />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/home" element={<Home />} />
        </Route>
        {/* flujo de provider */}
        <Route element={<ProtectedRoute isAllowed={!!user && user1?.UserTypeId?.id === "2"} />}>
          <Route path="/provider" element={<Table />} />
        </Route>
        {/* flujo de company */}
        <Route element={<ProtectedRoute isAllowed={!!user && user1?.UserTypeId?.id === "3"} />}>
          <Route path="/company" element={<Table />} />
        </Route>
        {/* flujo de admin */}
        <Route element={<ProtectedRoute isAllowed={!!user && user1?.UserTypeId?.id === "4"} />}>
          <Route path="/admin" element={<Table />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
