import { Route, Routes } from "react-router-dom";
import Register from "../components/register/register";
import Table from "../components/Table";
// Importa más páginas si es necesario

function AppRoutes() {
  return (
    <Routes>
      {/* ejemplo */}
      <Route path="/user/register" element={<Register />} />
      <Route path="/table" element={<Table />} />

      {/* Agregar más rutas aca */}
    </Routes>
  );
}

export default AppRoutes;
