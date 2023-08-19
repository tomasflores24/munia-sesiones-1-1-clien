import { Routes, Route } from "react-router-dom";
import Register from "../components/register/register";
import Table from "../components/Table/Table";
import Sidebar from "../components/sideBar/SideBar"
import Home from "../views/Home/Home";
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      <Route path="/user/register" element={<Register />} />
      <Route path="/table" element={<Table />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/home" element={<Home />} />
      
      {/* Agregar más rutas aca */}
    </Routes>
  );
}

export default AppRoutes;
