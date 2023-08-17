import { Routes, Route } from "react-router-dom";
import Register from "../components/register/register";
import Table from "../components/Table/Table";
import Sidebar from "../components/sideBar/SideBar"
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      <Route path="/user/register" element={<Register />} />
      <Route path="/table" element={<Table />} />
      <Route path="/sidebar" element={<Sidebar />} />

      {/* Agregar más rutas aca */}
    </Routes>
  );
}

export default AppRoutes;
